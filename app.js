console.log('Module loaded!')
let $tituloPpal = document.querySelector('#titulo-ppal')
let $tasksCounter = document.querySelector('#contador-tareas-pendientes')
let $newTaskForm = document.querySelector('.new-task-form')
let $resetFormButton = document.querySelector('.clear-button')
let $tasksList = document.querySelector('.tasks-list')

let todos = [
    {
        id: 1646783778271,
        description: 'Practigar mucho JavaScript',
        isDone: false
    },
    {
        id: 1646783778275,
        description: 'Aprender funcionesdel Array en JS',
        isDone: false
    },
    {
        id: 1646783778279,
        description: 'Aprender mucho CSS',
        isDone: false
    },
];

function renderTodos() {
    $tasksList.innerHTML = ''
    
    // renderedTask es un ARRAY que retorna todos.map
    let renderedTasks = todos.map(function(tarea) {
        return `
        <li class="task-list-item">
            <button class="button-list check-task-button">
                <i class="fa-regular fa-circle-check"></i>
            </button>
            <span class="task-description">
                ${tarea.description}
            </span>
            <button type="button" class="button-list remove-task-button">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </li> 
        `
    })
    $tasksList.innerHTML = renderedTasks.join('') 
}

renderTodos()