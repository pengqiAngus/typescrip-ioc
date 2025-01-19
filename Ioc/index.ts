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

function inject(serviceIdentifier:Symbol):Function {
    return (target: Function, targetKey:string, index:number) => {
        if ((!targetKey)) {
            Reflect.defineMetadata(
              serviceIdentifier,
              container.get(serviceIdentifier),
              target
            );
        }
    }
}

function controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args);
      const _params = getFunctionParams(constructor);
        let _identity: string;
        for (_identity of _params) {
        const _meta = Reflect.getMetadata(TYPES[_identity], constructor);
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
function hasKey<O extends Object>(obj: O, key: any): key is keyof O{
  return Object.prototype.hasOwnProperty.call(obj, key);
}

@controller
class IndexController {
  private indexService: IIndexService;
  constructor( @inject(TYPES.indexService) indexService?: IIndexService) {
    this.indexService = indexService!;
  }
  info() {
    this.indexService.log("angus");
  }
}
const indexController = new IndexController();
indexController.info();
