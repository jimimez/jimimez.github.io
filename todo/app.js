// localStorage.removeItem("todos");
// selectors
const addTodoButton = document.querySelector('.add_todo_button');
const toDoInput = document.querySelector('.todo_input');
const todoList = document.querySelector('.todo_list');
const deleteBtn = document.querySelector('.delete');
// eventlinteners
addTodoButton.addEventListener('click', saveToDo);

// functions
function saveToDo(e){
    let todo = {
        condition:"",
        todo:toDoInput.value
    }
    e.preventDefault();  
    if(localStorage.getItem('todos') === null){
    let todos = [];
    todos.unshift(todo); 
    localStorage.setItem('todos', JSON.stringify(todos));  
    }else{
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos.unshift(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    addTodos();
    toDoInput.value = '';
    
                 
}

function deleteTodo(item){
    

    let todosarr = JSON.parse(localStorage.getItem('todos'));
   for(let i=0; i<todosarr.length; i++){
        if(i === item){
            todosarr.splice(i, 1);
        }
   }
    localStorage.setItem('todos', JSON.stringify(todosarr));
    addTodos();
   
}

function todoDone(todo){
    let todoItem = event.target;
    todoItem.parentElement.classList.toggle('doneTodo');
    
}

function addTodos(){
    let todos = JSON.parse(localStorage.getItem('todos'));
    todoList.innerHTML = '';
    if(todos.length>0){
        todos.forEach(function(todo)
    {
        
        todoList.innerHTML += ` <li>
                                    <div class="todo_item flex">
                                        <div class="todo_text">${todo.todo}</div>
                                        <button onclick="todoDone()" class="done">done</button>
                                        <button onclick="deleteTodo(${todos.indexOf(todo)})" class="delete">delete</button>
                                    </div>
                                </li>`
                                
    
    });
    }
    
    
    // toDoInput.value = '';
}