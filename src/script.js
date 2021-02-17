
    // todo Understand usage of utils file
    // Initalizing variables for later use
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
    //Printing page using promises
    getPersistent(API_KEY).then(data => {
        printPage(data.record['my-todo']);
    });
    // "Listening" for click on button
    //todo specific event listners per element LATER
    document.addEventListener('click', event => {
        
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
            
            setPersistent(API_KEY, savedList);
        }
        if (event.target.id === 'sort-button') {
            priorityList = document.querySelectorAll('.todo-priority');
            sortPriorityList(priorityList);
        }
        if (event.target.id === 'delete-button') {
            // todo update ids in array with for loop and index number 
            const listItem = event.target.closest('li');
            //
            savedList["my-todo"].splice(listItem.id, 1);
            //
            listItem.remove();
            //
            priorityList = document.querySelectorAll('.todo-priority');
            counter--;
            countDisplay(counter);
            //
            setPersistent(API_KEY, savedList);
        }
        //edit a task
        if (event.target.classList.contains('todo-text')) {
            selected = event.target;
            selected.contentEditable = true;
        } else if (selected!==null){
            selected.contentEditable = false;
        }
        //todo simplify control flow and combine ifs with and
            if (selected !== null&&selected.contentEditable === 'false') {
               //
                // const listObject = selected.closest('li');
                const index = selected.closest('li').id;
                let updatedDate = new Date();
                updatedDate.setHours(updatedDate.getHours() + 2);

                addToSavedList('text', selected.innerText, index);
                addToSavedList('date', updatedDate.toJSON(), index);
                setPersistent(API_KEY, savedList);
                selected = null;
                
            }
        
    });

    // Creating an add task function for code modularity
    function addTask(task, priority,givenDate) {
        //list item to append to ul
        const item = document.createElement('li');
        //BUG - Id needs to be unique
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
        //todo NEVER USE innerText UNLESS NECCESSARY
        todoDiv.innerText = `${innerContent}`;
        parentDiv.appendChild(todoDiv);
    }
    // function to convert JSON date to requested format
    function convertJSONDate(date) {
        let returnDate = '';
        for (let i = 0; i < date.length; i++) {
            if (date[i] === 'T') {
                // todo fix long date display
                // returnDate += "\n"; //for V1
                returnDate += " "; //for V2
            } else if (date[i] === '.') {
                return returnDate;
            } else returnDate += date[i];
        
        }
    }
    //simple switch case for counter
    function countDisplay(counter) {
        switch (counter) {
            case 0: count.innerText = 0;
                countText.innerText = 'Zen Mode';
                break;
            case 1: count.innerText = counter;
            countText.innerText= `more headache...`;
                break;
            default: {
                count.innerText = counter;
                countText.innerText= `more headaches...`;
            }
        }
    }
    // sorts a priority list from 1-5
    function sortPriorityList(list) {
        if (list != null) {
            for (let i = 5; i > 0; i--) {
                list.forEach(item => {
                    if (Number(item.innerText) == i) {
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
    