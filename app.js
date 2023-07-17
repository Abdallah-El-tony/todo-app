
// handle html element 
const taskinput = document.getElementById('taskinput')
const addBtn = document.getElementById('add')
const todosBody = document.querySelector('.todos-body')
let btnStatus = 'Add';
let temp = 0;
let temp2 =0;
let todos = [];

if(localStorage.getItem('todo') !=null) {
    todos = JSON.parse(localStorage.getItem('todo'));
}

class Todo {
    constructor(title,date,isdone) {
        this.title = title;
        this.date = date;
        this.isdone = isdone;
    }

    addNewTask() {
        if(btnStatus == 'Add') {
            todos.push(this)
        }else {
            todos[temp].title = taskinput.value;
            btnStatus = 'Add'
            addBtn.firstElementChild.classList.remove('fa-pencil')
            addBtn.firstElementChild.classList.add('fa-plus')
        }
        
        this.displayTasks();
    }
    deleteTask(i) {
       todos.splice(i,1);
       this.displayTasks();
    }
    editTask(i) {
        taskinput.value = todos[i].title;
        taskinput.focus();
        btnStatus = 'Edit';
        temp = i;
    }
    displayTasks() {
        let tasks ='';
        let i = 0;
        for(let todo of todos) {
            tasks+= `
            <div class="todo ${todos[i].isdone ?'completed':''} ">
                <div class="title">
                    <h2>${todo.title}</h2>
                    <span class="data">${todo.date}</span>
                </div>
                <div class="todos-actions">
                   ${todos[i].isdone?` <button id="notdone" data-target="${i}"><i class="fa-solid fa-xmark"></i></button>`
                   :` 
                   <button id="done" data-target="${i}"><i class="fa-solid fa-check"></i></button>
                   `}
                    <button id="edit" data-target="${i}"><i class="fa-solid fa-pencil"></i></button>
                    <button id="delete" data-target="${i}"><i class="fa-regular fa-trash-can"></i></button>
                </div>
        </div>
            `
            i++;
        }
        
        todosBody.innerHTML = tasks;
        localStorage.setItem('todo',JSON.stringify(todos))
    }
    addToLocalstorage() {
        localStorage.setItem('todo',JSON.stringify(todos))
    }
    
}   





// ************************************************************

const date = new Date();
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()
let hours = date.getHours()
let minutes = date.getMinutes()
let fullDate = `${day} / ${month} / ${year} | ${hours}:${minutes}`

const todo = new Todo()
todo.isdone = false;
todo.displayTasks();
addBtn.addEventListener('click',()=>{
  const newTodo = new Todo()
  newTodo.title = taskinput.value;
  newTodo.date = fullDate;
  newTodo.isdone = false;
  newTodo.addNewTask();
  taskinput.value = '';
  taskinput.focus();
})

todosBody.addEventListener('click',(e)=>{
    let target = e.target.closest('button')
   
    if(target !=null ) {
    let targetId = target.getAttribute('id')
    let targetIndex = target.dataset.target;

    if(targetId =='delete')
    todo.deleteTask(targetIndex)

    if(targetId =='edit') {
        todo.editTask(targetIndex)
        addBtn.firstElementChild.classList.add('fa-pencil')
        addBtn.firstElementChild.classList.remove('fa-plus')
    }
    if(targetId =='done') {
        todos[targetIndex].isdone = true;
        target.closest('.todo').classList.add('completed') ;
    }
    if(targetId =='notdone') {
        todos[targetIndex].isdone = false;
        target.closest('.todo').classList.remove('completed') ;
    }

    todo.addToLocalstorage()
    todo.displayTasks();
      
}
  
})