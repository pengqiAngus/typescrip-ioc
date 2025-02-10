import { parseScript } from "esprima";
import { Pattern } from "estree";
import CreateIoc from "./createIoc";
import 'reflect-metadata';
interface ITypes {
    [key: string]: Symbol;
}

const TYPES: ITypes = {
    indexService: Symbol.for("IIndexService"),
}

const container = new CreateIoc();
function hasKey<O extends Object>(obj: O, key: any): key is keyof O {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

interface IIndexService {
  log(str: string): void;
}
class IndexService implements IIndexService {
  public log(str: string): void {
    console.log(str);
  }
}

// 将类绑定到容器中
container.bind(TYPES.indexService,  ()=> new IndexService());

// 获取函数参数名
function getFunctionParams(func: Function) {
  const ast = parseScript(func.toString());
  const node = ast.body[0];
  let fnParams: Pattern[] = [];
  if (node.type === "FunctionDeclaration") {
    fnParams = node.params;
  }
  let validParams: string[] = [];
  fnParams.forEach((item) => {
    if (item.type === "Identifier") {
      validParams.push(item.name);
    }
  });
  return validParams;
}



function controller<T extends { new (...args: any[]): {} }>(value: T) {
  class Controller extends value {
    constructor(...args: any[]) {
      super(args);
      const _params = getFunctionParams(value);
      let _identity: string;
      for (_identity of _params) {
        const _meta = Reflect.getMetadata(TYPES[_identity], value);
        if (hasKey(this, _identity) && _meta) {
        //   this[_identity] = container.get(TYPES[_identity]);
          this[_identity] = _meta;
        }
      }
    }
  }
  return Controller;
}

// 判断一个对象是否有key


function inject(serviceIdentifier: Symbol): Function {
    return (value: any, context: ClassFieldDecorator) => {
      console.log("value", value);
      console.log("value", context);
     const Class = context.constructor.constructor;
      if (context) {
          Reflect.defineMetadata(
            serviceIdentifier,
            container.get(serviceIdentifier),
            Class
          );
      }
    };
}

@controller
class IndexController {
  @inject(TYPES.indexService)
  private indexService: IIndexService;
  constructor(indexService?: IIndexService) {
    this.indexService = indexService!;
  }
  info() {
    this.indexService.log("angus");
  }
}
const indexController = new IndexController();
indexController.info();
