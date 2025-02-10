import { Pattern } from 'estree';
import { parseScript } from 'esprima';
import createIoc from "./createIoc";
import "reflect-metadata";
type Itype = {
  [key: string]: Symbol;
};

const TYPES: Itype = {
  B: Symbol("B"),
};

const container = new createIoc();

container.bind(TYPES.B, () => new B());

interface Ib {
  log(name: string): void;
}

class B implements Ib {
  log(name: string) {
    console.log("class B" + name);
  }
}

const getClassProperties = (fn:Function) => {
    const ast = parseScript(fn.toString())
    const node = ast.body[0]
    let fnParams: Pattern[] = []
    if (node.type === "FunctionDeclaration") {
      fnParams = node.params;
    }
    const properties: any[] = []
    fnParams.forEach(item => {
        if (item.type === "Identifier") {
          properties.push(item);
        }
    })
    return properties;
}

const controller = <T extends { new (...args: any[]): {} }>(
  value: T,
  context: ClassDecoratorContext
) => {
  class newClass extends value {
    constructor(...args: any[]) {
        super(args);
        const properties = getClassProperties(value);
        let property:string
        for (property of properties) {
            const meta = Reflect.getMetaData(property);
            if (meta && Object.prototype.hasOwnProperty.call(this, property)) {
                this[property] = meta
            }
        }
    }
  }
};

const inject = (property: Symbol) => {
  return (value: undefined, context: ClassFieldDecoratorContext) => {
    const contextClass = context.constructor.constructor;
    const propertyClass = container.get(property);
    if (propertyClass) {
      Reflect.defineMetadata(property, propertyClass, contextClass);
    }
  };
};

@controller
class A {
  @inject(TYPES.B)
  private B: Ib;
  constructor(B?: Ib) {
    this.B = B!;
  }
  info() {
    this.B.log("angus");
  }
}
