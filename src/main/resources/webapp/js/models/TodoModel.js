export default class TodoModel {
    constructor(data){
        const { id, text, ready } = data;
        this.id = id;
        this.text = text;
        this.ready = ready;
    }
}