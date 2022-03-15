console.log('Module loaded!')
let $tituloPpal = document.querySelector('#titulo-ppal')
let $tasksCounter = document.querySelector('#contador-tareas-pendientes')
let $newTaskForm = document.querySelector('.new-task-form')
let $resetFormButton = document.querySelector('.clear-button')
let $tasksList = document.querySelector('.tasks-list')
let $newTask = document.querySelector('.caja-de-text')

$newTaskForm.addEventListener('submit', addTask) // addTaskt(event)

let todos = [
    {
        id: 1646783778271,
        description: 'Practicar mucho JavaScript',
        isDone: false
    },
    {
        id: 1646783778275,
        description: 'Aprender funcionesdel Array en JS',
        isDone: true
    },
    {
        id: 1646783778279,
        description: 'Aprender mucho CSS',
        isDone: false
    },
];

function addTask(event) {
    event.preventDefault()

    if($newTask.value === '') {
        return // Detenemos la ejecucion de la funcion
    }

    let newTask = {
        id: new Date().getTime(),
        description: $newTask.value, // $newTask: referencia al input de HTML
        isDone: false
    }

    todos.push(newTask)
    renderTodos()
    $newTask.value = ''
}

function checkTask(posicion){
    todos[posicion].isDone = todos[posicion].isDone === true ? false : true;
    renderTodos()
}

function renderPendingTasks() {
    const pendingTasksArray = todos.filter(function(task) {
        const noEstaTerminada = task.isDone === false
        return noEstaTerminada
    })

    const counterPendingTasks = pendingTasksArray.length
    $tasksCounter.innerHTML = `${counterPendingTasks} ${counterPendingTasks > 1 ? 'Tareas pendientes' : 'Tarea pendiente'}`
}

function renderTodos() {
    renderPendingTasks()
    $tasksList.innerHTML = ''
    
    // renderedTask es un ARRAY que retorna todos.map
    // ARRAY.map Siempre devuelve un array 
    let resultTasks = todos.map(function(task) {
        return `
        <li class="task-list-item">
            <button class="button-list check-task-button">
                <i
                    class="fa-regular fa-circle-check ${task.isDone === true ? 'fa-circle-check-done' : ''}"
                ></i>
            </button>
            <span class="task-description">
                ${task.description}
            </span>
            <button type="button" class="button-list remove-task-button">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </li> 
        `
    })
    // Resultado de las tareas unidas
    $tasksList.innerHTML = resultTasks.join('')


    const $checkButtons = document.querySelectorAll('.check-task-button')
    $checkButtons.forEach(function($checkButton, posicion) {
        $checkButton.addEventListener('click', function(){
            checkTask(posicion)
        })
    })
}

renderTodos()