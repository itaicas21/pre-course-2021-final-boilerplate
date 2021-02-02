async function main() {

    const API_KEY = '601684a00ba5ca5799d18446'; // Assign this variable to your JSONBIN.io API key if you choose to use it.
    
    // Gets data from persistent storage by the given key and returns it
    async function getPersistent(key) {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${key}/latest`);
        const data = await response.json();
        return data.record["my-todo"];
    }

    // Saves the given data into persistent storage by the given key.
    // Returns 'true' on success.
    async function setPersistent(key, savedList) {
        await fetch(`https://api.jsonbin.io/v3/b/${key}`, { method: "put", headers: { "Content-Type": "application/json",}, body: JSON.stringify(savedList)})
      }
    
    // Initalizing variables for later use
    const data = await getPersistent(API_KEY);
    const control = document.querySelector('#control');
    const view = document.querySelector('#view');
    const input = document.querySelector('#text-input');
    const count = document.querySelector('#counter');
    const countText = document.querySelector('#counter-text');
    let counter = 0;
    let selected = null;
    //save properties in my todo property
    let savedList = {
        "my-todo": []
    }
    //
    let priorityList = null;
    //
    printPage(data);
    // "Listening" for click on button
    document.addEventListener('click', async event => {
        //
        if (event.target.id === 'add-button' && input.value.trim()!=="") {
            const task = input.value;
            //input field reset
            input.value = "";
            input.focus();
            const priority = document.querySelector('#priority-selector');
            // Part of modulation technique (thanks nir)
            // "Call" a function in practice, and than create 
            addTask(task, priority.value);
            //counter increases when task is added, need to call count display again when task is remove
            counter++;
            countDisplay(counter);
            //updates priority list every added task
            priorityList = document.querySelectorAll('.todo-priority');
            //Remember to add localStorage option
            //
            await setPersistent(API_KEY, savedList);
        }
        if (event.target.id === 'sort-button') {
            priorityList = document.querySelectorAll('.todo-priority');
            sortPriorityList(priorityList);
        }
        if (event.target.id === 'delete-button') {
            // FIX THIS *** NOT DELETING SPECIFIED PLACE,DELETES LAST IN DATABASE INSTEAD
            const listItem = event.target.closest('li');
            //
            savedList["my-todo"].splice(listItem.id, 1);
        
            listItem.remove();
            //
            priorityList = document.querySelectorAll('.todo-priority');
            counter--;
            countDisplay(counter);
            // תקשורת בסוף כדי למנוע באגים של לחיצה על כפתור שעוד לא נמחק אבל נמחק בפועל
            await setPersistent(API_KEY, savedList);
        }
        //edit a thing
        if (event.target.classList.contains('todo-text')) {
            selected = event.target;
            selected.contentEditable = true;
        } else if (selected!==null){
            selected.contentEditable = false;
        }
        if ((selected !== null)) {
            if (selected.contentEditable === 'false') {
                const index = selected.closest('li').id;
                const updatedDate = new Date();
                //double check
                if (index) {
                    addToSavedList('text', selected.innerText, index);
                    addToSavedList('date', updatedDate.toJSON(), index);
                    await setPersistent(API_KEY, savedList);
                    selected = null;
                }
            }
        }
    });

    // Creating an add task function for code modularity
    function addTask(task, priority,givenDate) {
        //list item to append to ul
        const item = document.createElement('li');
        //
        item.id = counter;
        //formatDate is declared as let to reduce unnecessary code variables and lines. RETURN HERE AND MODULATE
        let formatDate;
        if (givenDate) {
             formatDate = new Date(givenDate);
        } else {
            formatDate = new Date();
            //
            formatDate.setHours(formatDate.getHours() + 2);
        }
        // create task container
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');
        //Enter comments here about code below
        savedList['my-todo'][counter] = {};
        //
        addElement('todo-priority', priority, todoContainer, 'div');
        addElement('todo-created-at', formatDate, todoContainer, 'div');
        addElement('todo-text', task, todoContainer, 'div');
        addElement('delete-button', 'Delete', todoContainer, 'img');
        // append task to list in view
        view.firstElementChild.appendChild(item);
        item.appendChild(todoContainer);
    }
    //creating a function to modulate sections added to a task 
    function addElement(name, innerContent, parentDiv, element) {
        const todoDiv = document.createElement(element);
        if (element ==='img') {
            todoDiv.id = name;
            todoDiv.src='./assets/x icon 2.png'
        } else {
            todoDiv.classList.add(name);
        }
        //change database property names to match mock tests
        if (name === 'todo-created-at') {
            addToSavedList('date', innerContent.toJSON());
            //
            innerContent = convertJSONDate(innerContent.toJSON());
        } else if (name === 'todo-text') {
            addToSavedList('text', innerContent);
        } else if (name === 'todo-priority') {
            addToSavedList('priority', innerContent);
        }

        todoDiv.innerHTML = `${innerContent}`;
        parentDiv.appendChild(todoDiv);
    }
    // function to convert JSON date to requested format
    function convertJSONDate(date) {
        let returnDate = '';
        for (let i = 0; i < date.length; i++) {
            if (date[i] === 'T') {
                returnDate += "<br>"; //for V1
                // returnDate += " "; for V2
            } else if (date[i] === '.') {
                return returnDate;
            } else returnDate += date[i];
        
        }
    }
    //simple switch case for counter
    function countDisplay(counter) {
        switch (counter) {
            case 0: count.innerHTML = 0;
                countText.innerHTML = 'Zen Mode';
                break;
            case 1: count.innerHTML = counter;
            countText.innerHTML= `more headache...`;
                break;
            default: {
                count.innerHTML = counter;
                countText.innerHTML= `more headaches...`;
            }
        }
    }
    // sorts a priority list from 1-5
    function sortPriorityList(list) {
        if (list !== null && list !== undefined) {
            for (let i = 5; i > 0; i--) {
                list.forEach(item => {
                    if (item.innerHTML == i) {
                        view.firstElementChild.appendChild(item.closest('li'));
                    }
                });
            }
        
        }
    }
    //
    function addToSavedList(propertyName, propertyValue, index) {
        if (index) {
            savedList["my-todo"][index][propertyName] = propertyValue; 
        } else {
            savedList["my-todo"][counter][propertyName] = propertyValue;  
    }
    }
    function printPage(data) {
        if (data) {
            savedList["my-todo"]=data ;
            for (let task of data) {
                addTask(task["text"], task["priority"], task["date"]);
                counter++;
            }
            countDisplay(counter);
        }
    }
    
} 
main();