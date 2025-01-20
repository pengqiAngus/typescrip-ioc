class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @log(123)
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

function log(number: number) {
  return (originalMethod: any, context: ClassMethodDecoratorContext) => {
    const methodName = String(context.name);
    console.log("originalMethod", number);

    function replacementMethod(this: any, ...args: any[]) {
      const result = originalMethod.call(this, ...args);
      return result;
    }

    return replacementMethod;
  };
}

const person = new Person("张三");
// "LOG: Entering method 'greet'."
// "Hello, my name is 张三."
// "LOG: Exiting method 'greet'."
