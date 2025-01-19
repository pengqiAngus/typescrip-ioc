class createIoc{
    private container: Map<Symbol, {callback: Function}> ;
    constructor() {
        this.container = new Map();
    }
    get(namespace: Symbol) {
        const item = this.container.get(namespace);
        if(!item) {
            throw new Error('未找到对应的服务');
        }
        return item.callback();
    }
    bind(KEY: Symbol, callback: Function) { 
        this.container.set(KEY, {callback});
    }
}

export default createIoc;