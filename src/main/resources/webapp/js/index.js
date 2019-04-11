import '../styles/default.scss';
import TodosListModel from './models/TodosListModel';
import TodosController from './controllers/TodosController';
import { TodoCreatorView } from './views/TodoCreatorView';

const todoListModel = new TodosListModel();
const controller = new TodosController(todoListModel);

window.addEventListener("load", function(event) {
    const todoCreatorView = new TodoCreatorView(todoListModel, controller);
});