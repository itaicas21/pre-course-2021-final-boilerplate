// Initalizing variables for later use
const control = document.querySelector('#control');
const view = document.querySelector('#view');
const input = document.querySelector('#text-input');
const count = 0;
// "Listening" for click on button
control.addEventListener('click', event => {
    if (event.target.id === 'add-button') {
        const task = input.value;
        input.value = "";
        input.focus();
        const priority = document.querySelector('#priority-selector');
        // Part of modulation technique (thanks nir)
        // "Call" a function in practice, and than create 
        addTask(task,priority.value);
    }
});

// Creating an add task function for code modularity
function addTask(task,priority) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    addDiv('todo-priority', priority,todoContainer);
    addDiv('todo-created-at', Date(),todoContainer);
    addDiv('todo-text', task,todoContainer);
    const newLine = document.createElement('span');
    newLine.innerHTML = '<br>';
    todoContainer.appendChild(newLine);
    view.firstElementChild.appendChild(todoContainer);
}
//creating a function to modulate sections added to a task 
function addDiv(name, innerContent,parentDiv) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add(name);
    todoDiv.innerHTML = innerContent;
    parentDiv.appendChild(todoDiv);
}
