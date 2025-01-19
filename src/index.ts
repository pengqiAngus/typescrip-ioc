interface NumberArray {
    id: number,
    name: string,
    age: number,
    icon: string
    bb: string
}

interface StringArray {
    id: number,
    name: string,
    age: number,
    icon: string
    aa: string
}
type partArray = Partial<NumberArray>;
type readonlyArray = Readonly<NumberArray>;
type pickArray = Pick<NumberArray, 'id'>;
type recordArray = Record<"a" | "b", NumberArray>;
type omitArray = Omit<NumberArray, 'id'>;
type excludeArray = Exclude<NumberArray, 'id'>;


type selectPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

type Final = selectPartial<NumberArray, 'id' | 'age'>

type extractType = Extract<keyof NumberArray, keyof StringArray>
type excludeType = Exclude<keyof NumberArray, keyof StringArray>

const angus: Record<string, StringArray> = {
    angus: {
        id: 1,
        name: '123',
        age: 12,
        icon: '123',
        aa: '123'
    },
    angus2: {
        id: 1,
        name: '123',
        age: 12,
        icon: '123',
        aa: '123'
    }
}
const useFetch = () => {
    const response: string = '123'
    const age: number = 123;
    return tuplify(response, age)
}
const tuplify = <T extends unknown[]>(...ele:T):T => {
    return ele;
}

const [response] = useFetch()

interface aa{
    item: string
}

const useFetch2 = <T extends aa>(a:T) => {
}

function test<T>(a: number | string, b: Array<T> ): void {
    
}

type a = []

interface IClock{
    new(hour: number, minute: number): Clock
}
interface Clock{
    go(): void   
}
class Clocks implements Clock{
    constructor(hour: number, minute: number) {
        
    }
    go(): void {
       
    }
    
}

/**
 * @param crt {IClock} 
 * @param hour {number}
 * @param minute {number}
 * @returns {Clocks}
 * @description  测试
 * [link](https://www.baidu.com)
 *  ```js
 *  createClock(new Clocks(12, 12), 12, 12);
 *  ```
 */
const createClock = (crt: IClock, hour: number, minute: number): Clocks => {
  return new Clocks(12, 12);
};

const inputElem = document.querySelector<HTMLInputElement>('input')

if (inputElem !== null) {
    inputElem.addEventListener('click', (e) => { 
            
    })
}

const yd = (yideng: string, user: number) => { }
  
type yideng = Parameters<typeof yd>
const x = (...data: yideng) => {
    const [yideng, user] = data
    console.log(yideng, user);
}
x('123',1223)
const get = <T extends Object, K extends keyof T> (user:T, name:K): T[K] => {
    return user[name];
}
get({ name: '123' }, 'name')

type ab = {
    a: string,
    b: number
}
type abc = {
  a: string,
    b: number,
  c:object
};

type Lier<T extends U, U = ab> = T | (string & {});
const c: Lier<abc> = {
    a: '123',
    b: 123,
    c: {
        name: '123'
    }
};
const showType = (arg:NonNullable<string | number | undefined>) => {
    console.log(arg);   
}
 
type arays = {
  [P in keyof abc]: string;
};

type Cat = {
    name: string,
}

const cat: Cat = {
    name: '123'
}

function showCat(this: Cat) {
    console.log(this.name);
}
showCat.apply(cat)

type UserId = string & { readonly brand: unique symbol}
type OrderId = string & { readonly brand: unique symbol }

type Id = OrderId | UserId;

const id: Id = '123' as OrderId;

function OrderId(id: Id) {
     
}

class User{
    constructor(public name: string) {
        console.log(this.name);
    }
}

interface IConstructor<T extends new (...args: any) => any>{
    user: new(...args: ConstructorParameters<T>)=> InstanceType<T>
}

type UserConstructor = IConstructor<typeof User>

const userConstructor: UserConstructor = {
    user: User
}
new userConstructor.user('angus')


function isString(value: unknown): value is string {
    return typeof value === 'string'
}

type ToArray<T> = T extends unknown[] ? T : T[]

const arr1: ToArray<string> = ['123']
const arr2: ToArray<number[]> = [1, 2, 3]

//*[@id="doubao-ai-translate-image-assistant2dbc1640-8def-43c2-9040-aaca065a1787"]