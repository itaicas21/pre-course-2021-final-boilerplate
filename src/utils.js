const API_KEY = '601684a00ba5ca5799d18446'; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const spinner = document.getElementById("spinner");
    // Gets data from persistent storage by the given key and returns it
    function showSpinner() {
        spinner.hidden = false;
        console.log('weeeeed');
        
}
function hideSpinner() {
        spinner.hidden=true;
    }
      
function getPersistent(key) {
        showSpinner();
        const resPromise = fetch(`https://api.jsonbin.io/v3/b/${key}/latest`);
    return resPromise.then(res => {
        hideSpinner();
        return res.json();
    });
    }

    
    // Saves the given data into persistent storage by the given key.
    // Returns 'true' on success.
function setPersistent(key, savedList) {
        showSpinner();
        fetch(`https://api.jsonbin.io/v3/b/${key}`, { method: "put", headers: { "Content-Type": "application/json", }, body: JSON.stringify(savedList) }).then(hideSpinner);
}
