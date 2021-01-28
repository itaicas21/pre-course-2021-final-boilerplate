// Initalizing variables for later use
const control = document.querySelector('#control');
const view = document.querySelector('#view');
const input = document.querySelector('#text-input');
// "Listening" for click on button
control.addEventListener('click', event => {
    if (event.target.id === 'add-button') {
        const task = input.value;
        //input field reset
        input.value = "";
        input.focus();
        const priority = document.querySelector('#priority-selector');
        // Part of modulation technique (thanks nir)
        // "Call" a function in practice, and than create 
        addTask(task, priority.value);
        // NOTE TO SELF-FIX COUNTER
    }
});

// Creating an add task function for code modularity
function addTask(task, priority) {
    //formatDate is declared as let to reduce code variables and lines.
    let formatDate = new Date();
    formatDate = convertJSONDate(formatDate.toJSON());
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    addDiv('todo-priority', priority,todoContainer);
    addDiv('todo-created-at',formatDate,todoContainer);
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
    todoDiv.innerHTML = `${innerContent} `;
    parentDiv.appendChild(todoDiv);
}
// function to convert JSON date to requested format
function convertJSONDate(date) {
    let returnDate = ''
    for (let i = 0; i < date.length;i++) {
        if (date[i] === 'T') {
            returnDate += " ";
        } else if (date[i] === '.') {
            return returnDate;
        }else returnDate += date[i];
        
    }
}