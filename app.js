console.log('Module loaded!')
let todos = [];
let $tituloPpal = document.querySelector('#titulo-ppal')
let $tasksCounter = document.querySelector('#contador-tareas-pendientes')
let $newTaskForm = document.querySelector('.new-task-form')
let $resetFormButton = document.querySelector('.clear-button')
let $tasksList = document.querySelector('.tasks-list')
let $newTask = document.querySelector('.caja-de-text')

window.addEventListener('load', function () {
    const savedTodos = JSON.parse(window.localStorage.getItem('todos'))
    console.log(savedTodos)
    todos = savedTodos || [] // En caso de que sabed todos sea 'null' o 'undefined' ponemos por defecto un array vacio
    renderDate()
    renderTodos()
})

$newTaskForm.addEventListener('submit', addTask) // addTaskt(event)

function addTask(event) {
    event.preventDefault()

    if ($newTask.value === '') {
        return // Detenemos la ejecucion de la funcion
    }

    let newTask = {
        id: new Date().getTime(),
        description: $newTask.value, // $newTask: referencia al input de HTML
        isDone: false
    }

    todos.push(newTask)
    saveTodos()
    renderTodos()
    $newTask.value = ''
}

function checkTask(posicion) {
    todos[posicion].isDone = todos[posicion].isDone === true ? false : true;
    saveTodos()
    renderTodos()
}

function removeTask(position) {
    todos = todos.filter(function (_, index) {
        return index !== position
    })
    saveTodos()
    renderTodos()
}

function renderDate() {
    console.log('Rendering date')
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const date = new Date()
    const day = date.getDate()
    const dayOfWeek = daysOfWeek[date.getDay()]
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    $tituloPpal.innerHTML = `${dayOfWeek}, ${day} ${month} ${year}`
}

function renderPendingTasks() {
    const pendingTasksArray = todos.filter(function (task) {
        const noEstaTerminada = task.isDone === false
        return noEstaTerminada
    })

    const counterPendingTasks = pendingTasksArray.length
    $tasksCounter.innerHTML = `${counterPendingTasks} ${counterPendingTasks > 1 ? 'Tareas pendientes' : 'Tarea pendiente'}`
}

function saveTodos() {
    window.localStorage.setItem('todos', JSON.stringify(todos))
}

function renderTodos() {
    renderPendingTasks()
    $tasksList.innerHTML = ''

    // renderedTask es un ARRAY que retorna todos.map
    // ARRAY.map Siempre devuelve un array 
    let resultTasks = todos.map(function (task) {
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
    $checkButtons.forEach(function ($checkButton, posicion) {
        $checkButton.addEventListener('click', function () {
            checkTask(posicion)
        })
    })

    const $removeButtons = document.querySelectorAll('.remove-task-button')
    $removeButtons.forEach(function ($removeButton, posicion) {
        $removeButton.addEventListener('click', function () {
            removeTask(posicion)
        })
    })

}
