class Todo {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
    get description (){
        return this.data;
    }
    set descripption(description) {
        this.data = description;
    }
    get Id () {
        return this.id;
    }
}