import { Pattern } from 'estree';
import { parseScript } from 'esprima';
import createIoc from "./createIoc";
import "reflect-metadata";

const container = new createIoc();

type Itypes = {
    [key:string] : Symbol
}

const TYPES: Itypes = {
    B: Symbol('B')
}

interface Ib{
    log(name:string):void
}

class B implements Ib {
    log(name:string) {
        console.log('class B' + name);
        
    }
}

container.bind(TYPES.B, ()=>new B())


const hasKey = (obj,key) => {
    
}
const getProperties = (value: Function) => {
  const ast = parseScript(value.toString());
  const node = ast.body[0];
  let fnProperties: Pattern[] = [];
  if (node.type === "FunctionDeclaration") {
    fnProperties = node.params;
  }
  let properties: string[] = [];
  fnProperties.forEach((item) => {
    if (item.type === "Identifier") {
      properties.push(item);
    }
  });
  return properties;
};

const controller = <T extends {new (...args:any[]):{} }>(value:T, context:ClassDecoratorContext)=>{
    class newClass extends value {
      constructor(...args: any[]) {
          super(args);
          const _properties = getProperties(value)
          let property: string
          for (property of _properties) {
              const meta = Reflect.getMetadata(TYPES[property], value);
              if (
                Object.prototype.hasOwnProperty.call(this, property) &&
                meta
              ) {
                  this[property] = meta;
              }
          }
      }
    }
    return  newClass;
}
const inject = (property:Symbol):Function => {
    return (value: undefined, context: ClassFieldDecoratorContext) => {
       if (context) {
         const contextClass = context.constructor.constructor;
         Reflect.defineMetadata(
           property,
           container.get(property),
           contextClass
         );
       }
    };
}
@controller
class A {
    @inject(TYPES.B)
  private B:Ib;
    constructor(B?: Ib) {
      this.B = B!
  }
}