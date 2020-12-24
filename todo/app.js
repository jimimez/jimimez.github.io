// selectors
const addTodoButton = document.querySelector('.add_todo_button');
const toDoInput = document.querySelector('.todo_input');
const todoList = document.querySelector('.todo_list');
const isDoneWrapper = document.querySelector('.done_wrapper .todo_list');
const editTodoButton = document.querySelector('.edit_todo_button');
const modal = document.querySelector('.modal');
const editInput = document.querySelector('.edit_input');
const editButtonModal = document.querySelector('.edit_todo_modal');
const modalClose = document.querySelector('.modal-close');

// eventlisteners
addTodoButton.addEventListener('click', (e) => {
    saveToDo(e);
})
modalClose.addEventListener('click', ()=>{
    modal.classList.remove('active');
})

// functions
let idCounter = 1;
let todos;
let todo;
let item;
function setToLocalStorage(){
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    idCounter++;
}
function saveToDo(e) {
    e.preventDefault();
    if (toDoInput.value == ""){
        alert("enter todo text");
        return false;
    }
    todo = {
        id: idCounter,
        isDefault: false,
        todo: toDoInput.value
    }
    if (localStorage.getItem('todos') === null) {
        todos = [];
        setToLocalStorage();
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        setToLocalStorage();
    }
    addTodos();
    toDoInput.value = '';
}

function deleteTodo(item) {


    let todosarr = JSON.parse(localStorage.getItem('todos'));
    for (let i = 1; i <= todosarr.length; i++) {
        if (i === item) {
            todosarr.splice(i, 1);
        }
    }
    localStorage.setItem('todos', JSON.stringify(todosarr));

}


// dasaxati func
function addTodos() {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todoList.innerHTML = '';
    isDoneWrapper.innerHTML = '';
    if (todos != null) {
        if (todos.length > 0) {
            todos.forEach(function (todo) {

                if (todo.isDefault == false) {
                    let li = document.createElement('li');
                    li.innerHTML = `
                        <div class="todo_item flex">
                            <div class="todo_text">${todo.todo}</div>
                            <button data-id="${todo.id}" class="done"><i class="fas fa-check-square"></i></button>
                            <button data-id="${todo.id}" class="delete"><i class="fas fa-trash-alt"></i></button>
                            <button data-id="${todo.id}" class="edit"><i class="fas fa-pen-square"></i></button>
                        </div>
                    `;
                    todoList.prepend(li);
                    toDoInput.focus();
                } else {
                    let li = document.createElement('li');
                    li.innerHTML = `
                        <div class="todo_item flex">
                            <div class="todo_text">${todo.todo}</div>
                            <button data-id="${todo.id}" class="uncompleted doneTodo"><i class="fas fa-undo-alt"></i></button>
                            <button data-id="${todo.id}" class="delete"><i class="fas fa-trash-alt"></i></button>
                            <button data-id="${todo.id}" class="edit"><i class="fas fa-pen-square"></i></button>
                        </div>
                    `;
                    isDoneWrapper.prepend(li);
                    toDoInput.focus();
                }

            });
            
            console.log(todoList.children.length,'gauketebeli')
            console.log(isDoneWrapper.children.length,'gaketebuli')
            let doneButtons = document.querySelectorAll('.done');
            let uncompletedButtons = document.querySelectorAll('.uncompleted');
            let delButtons = document.querySelectorAll('.delete');
            let editButtons = document.querySelectorAll('.edit');
            // gaketebulebi
            doneButtons.forEach(done => {
                done.addEventListener('click', () => {
                    let id = done.getAttribute('data-id');
                    todos.map(item=>{
                        if (item.id == id) {
                            item.isDefault = true;
                        }
                    });
                    localStorage.setItem('todos', JSON.stringify(todos));
                    addTodos();
                })
            });
            
            // redaqtireba
            
            editButtons.forEach(editButton => {
                editButton.addEventListener('click', () => {
                    let id = editButton.getAttribute('data-id');
                    todos.map(item => {
                        if(item.id == id){
                            toDoInput.value = item.todo;
                            modal.classList.add('active');
                            editInput.focus();
                            editInput.value = item.todo;
                            editButtonModal.addEventListener('click', () => {
                                item.todo = editInput.value;
                                localStorage.setItem('todos', JSON.stringify(todos));
                                  addTodos();
                                  modal.classList.remove('active');
                             })

                             
                             
                        }
                    })
                })
            })
            // ukan abrunebs gasaketebelshi
            uncompletedButtons.forEach(unCompleted => {
                unCompleted.addEventListener('click', () => {
                    let id = unCompleted.getAttribute('data-id');
                    todos.map(item=>{
                        if (item.id == id) {
                            item.isDefault = false;
                        }
                    });
                    localStorage.setItem('todos', JSON.stringify(todos));
                    addTodos();
                })
            });
            // delete items
            delButtons.forEach(del=>{
                del.addEventListener('click',()=>{
                    let id = del.getAttribute('data-id');
                    removeElement(del.parentElement.parentElement);
                    todos = todos.filter(item => {
                        if(item.id != id){
                            return todos;
                        }
                    });
                    localStorage.setItem('todos', JSON.stringify(todos));
                    console.log(todoList.children.length,'gauketebeli')
            console.log(isDoneWrapper.children.length,'gaketebuli')
                })
            });
        }
    }
}
function removeElement(removedElement) {
    removedElement.remove();
}