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