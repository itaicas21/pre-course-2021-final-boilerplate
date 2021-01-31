// Initalizing variables for later use
const control = document.querySelector('#control');
const view = document.querySelector('#view');
const input = document.querySelector('#text-input');
const count = document.querySelector('#counter');
let counter = 0;
//save properties in my todo property
let savedList = {
    "my-todo":[{},{}]
}
let savedList1 = {
    "my-todo":[]
}
//
let priorityList = null;
// "Listening" for click on button
document.addEventListener('click', event => {
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
        //updates priority list every added task
        priorityList = document.querySelectorAll('.todo-priority');
    }
    if (event.target.id === 'sort-button') {
        sortPriorityList(priorityList);
    }
    if (event.target.id === 'delete-button') {
        event.target.closest('li').remove();
        counter--;
        countDisplay(counter);
    }
});

// Creating an add task function for code modularity
function addTask(task, priority) {
    //list item to append to ul
    const item = document.createElement('li');
    //formatDate is declared as let to reduce unnecessary code variables and lines. RETURN HERE AND MODULATE
    let formatDate = new Date();
    // create task container
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    //
    addElement('todo-priority', priority,todoContainer,'div');
    addElement('todo-created-at',formatDate,todoContainer,'div');
    addElement('todo-text', task, todoContainer,'div');
    addElement('delete-button', 'Delete', todoContainer, 'button');
    // append task to list in view
    view.firstElementChild.appendChild(item);
    item.appendChild(todoContainer);
}
//creating a function to modulate sections added to a task 
function addElement(name, innerContent,parentDiv,element) {
    const todoDiv = document.createElement(element);
    if (element === 'button') {
        todoDiv.id = name;
    } else {
        todoDiv.classList.add(name);
    }
    if (name === 'todo-created-at') {

        innerContent = convertJSONDate(innerContent.toJSON());
    }
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
// sorts a priority list from 1-5
function sortPriorityList(list) {
    if (list !== null||list !== undefined) {
        for (let i = 5; i > 0; i--) {
            list.forEach(item => {
                if (item.innerHTML == i) {
                    view.firstElementChild.appendChild(item.closest('li'));
                }
            }); 
        }
        
    }
}
function addToSavedList(counter) {
    
}