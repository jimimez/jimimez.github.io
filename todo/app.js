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
const overLay = document.querySelector('.overlay');

// eventlisteners
addTodoButton.addEventListener('click', (e) => {
    saveToDo(e);
})
modalClose.addEventListener('click', ()=>{
    closeModal();
})
overLay.addEventListener('click', ()=>{
    closeModal();
})
// functions
function closeModal() {
    modal.classList.remove('active');
    overLay.classList.remove('active');
}
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
    if (toDoInput.value === ""){
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

// dasaxati func
function addTodos() {
    getTodosLsit();
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
                            <div class="todo_text flex">${todo.todo}
                                <div class="todo_buttons">
                                    <button data-id="${todo.id}" class="done"><i class="fas fa-check-square"></i></button>
                                    <button data-id="${todo.id}" class="delete"><i class="fas fa-trash-alt"></i></button>
                                    <button data-id="${todo.id}" class="edit"><i class="fas fa-pen-square"></i></button>
                                </div>
                            </div>
                            
                        </div>
                    `;
                    todoList.prepend(li);
                    toDoInput.focus();
                } else {
                    let li = document.createElement('li');
                    li.innerHTML = `
                        <div class="todo_item flex">
                            <div  class="todo_text flex">
                            <span class="done_todo_text">${todo.todo}</span>
                                <div class="done_todo_buttons">
                                    <button data-id="${todo.id}" class="uncompleted doneTodo"><i class="fas fa-undo-alt"></i></button>
                                    <button data-id="${todo.id}" class="delete"><i class="fas fa-trash-alt"></i></button>
                                    <button data-id="${todo.id}" class="edit"><i class="fas fa-pen-square"></i></button>
                                </div>
                            </div>
                            
                        </div>
                    `;
                    isDoneWrapper.prepend(li);
                    toDoInput.focus();
                }

            });
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
                            // toDoInput.value = item.todo;
                            modal.classList.add('active');
                            overLay.classList.add('active');
                            editInput.focus();
                            editInput.value = item.todo;
                            editButtonModal.addEventListener('click', () => {
                                item.todo = editInput.value;
                                localStorage.setItem('todos', JSON.stringify(todos));
                                  addTodos();
                                 closeModal();
                             }); 
                        }
                    });
                });
            });
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
                });
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
                    getTodosLsit();
                })
            });
        }
    }
}
function removeElement(removedElement) {
    removedElement.remove();
}
function getTodosLsit(){
    let allTodos = JSON.parse(localStorage.getItem('todos'));
    let allTodosCount = document.querySelector(".all_todos_count");
    let completedCount = document.querySelector(".all_completed_count");
    let unCompletedCount = document.querySelector(".all_uncompleted_count");
    if (allTodos != null) {
        if(allTodos.length > 0){
            allTodosCount.innerText = allTodos.length;
            let completedTodos = allTodos.filter(item=> item.isDefault !== false);
            let unCompletedTodos = allTodos.filter(item=> item.isDefault !== true);
            if (completedTodos.length > 0) {
                completedCount.innerText = completedTodos.length;
            }else{
                completedCount.innerText = '0';
            }
            if (unCompletedTodos.length > 0) {
                unCompletedCount.innerText = unCompletedTodos.length;
            }else{
                unCompletedCount.innerText = '0';
            }
        }else{
            allTodosCount.innerText = '0';
            completedCount.innerText = '0';
            unCompletedCount.innerText = '0';
        }
    }
}
