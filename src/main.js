// Initalizing variables for later use
const control = document.querySelector('#control');
const view = document.querySelector('#view');
const input = document.querySelector('#text-input');
const count = document.querySelector('#counter');
let counter = 0;
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
        //counter increases when task is added, need to call count display again when task is removed
        counter++;
        countDisplay(counter);
    }
});

// Creating an add task function for code modularity
function addTask(task, priority) {
    //list item to append to ul
    const listItem = document.createElement('li');
    //formatDate is declared as let to reduce unnecessary code variables and lines. RETURN HERE AND MODULATE
    let formatDate = new Date();
    formatDate = convertJSONDate(formatDate.toJSON());
    // create task container
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    //
    addDiv('todo-priority', priority,todoContainer);
    addDiv('todo-created-at',formatDate,todoContainer);
    addDiv('todo-text', task, todoContainer);
    
    // append task to list in view
    view.firstElementChild.appendChild(listItem);
    listItem.appendChild(todoContainer);
}
//creating a function to modulate sections added to a task 
function addDiv(name, innerContent,parentDiv) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add(name);
    todoDiv.innerHTML = `${innerContent}`;
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
//simple switch case for counter
function countDisplay(counter) {
    switch (counter){
        case 0: count.innerHTML = `Zen Mode`;
            break;
        case 1: count.innerHTML = `${counter} more headache...`;
            break;
        default: count.innerHTML = `${counter} more headaches...`;
    }
}