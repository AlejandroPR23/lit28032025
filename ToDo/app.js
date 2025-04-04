const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

loadTasks();

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        storeTasksInLocalStorage(taskText);
        taskInput.value = '';
    }
});


function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteButton = document.createElement('span');
    const editButton = document.createElement('span');
    editButton.textContent = '✏️';
    deleteButton.textContent = '❌';

    deleteButton.classList.add('delete-btn');
    editButton.classList.add('edit-btn');

    deleteButton.addEventListener('click', () => deleteTask(taskItem));
    editButton.addEventListener('click', () => editTask(taskItem));

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);

    return taskItem;
}


function editTask(taskItem) {
    const currentTask = taskItem.firstChild.textContent.trim();
    const newTask = prompt("Edit task:", currentTask);
    if (newTask !== null && newTask.trim() !== '' && newTask.trim() !== currentTask) {
        taskItem.firstChild.textContent = newTask.trim();
        updateLocalStorage();
    }
}


function deleteTask(taskItem) {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        const taskText = taskItem.firstChild.textContent.trim();

        // Eliminar del DOM
        taskList.removeChild(taskItem);

        // Eliminar del LocalStorage
        deleteTaskFromLocalStorage(taskText);
    }
}



function storeTasksInLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}


function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => li.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

const themeToggle = document.getElementById('toggle-theme-btn');
const currentTheme = localStorage.getItem('theme') || 'light';
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

if (currentTheme === 'dark'){
    document.body.classList.add('dark-theme');
}




