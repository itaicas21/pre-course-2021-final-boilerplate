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

