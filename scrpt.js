// Get DOM elements
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const shoppingListContainer = document.getElementById('shoppingList');
const clearListButton = document.getElementById('clearListButton');

// Load shopping list from localStorage or initialize as empty
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the shopping list
function renderList() {
    shoppingListContainer.innerHTML = ''; // Clear current list
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');

        // Checkbox for marking purchased
        const checkbox = document.createElement('input'); //adds a checkbox
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.onchange = () => togglePurchased(index);

        // Item name
        const itemName = document.createElement('span');//adds the item name
        itemName.textContent = item.name;

        // Mark Purchased button
        const markPurchasedButton = document.createElement('button'); //adds a mark purchased button
        markPurchasedButton.textContent = "Mark Purchased";
        markPurchasedButton.onclick = () => togglePurchased(index);

        // Delete button
        const deleteButton = document.createElement('button'); // adds a delete button
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteItem(index);

        // Append elements to the list item
        listItem.appendChild(checkbox); // Adds the checkbox to the <li>
        listItem.appendChild(itemName); // Adds the item name to the <li>
        listItem.appendChild(markPurchasedButton); // Adds the mark as purchased to the <li>
        listItem.appendChild(deleteButton); // Adds delete button <li> to the <ul>

        // Add tick icon if purchased
        if (item.purchased) {
            const tickIcon = document.createElement('span');
            tickIcon.textContent = '✔️'; // Small tick mark
            tickIcon.style.marginLeft = '10px';
            tickIcon.style.color = 'green';
            listItem.appendChild(tickIcon);
        }

        shoppingListContainer.appendChild(listItem);
    });
}

// Function to add an item to the shopping list
function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        shoppingList.push({ name: itemName, purchased: false });
        itemInput.value = '';
        saveToLocalStorage();
        renderList();
    }
}

// Function to toggle the "purchased" status of an item
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased; //When you click the checkbox, it flips the purchased value , likr from true to false
    saveToLocalStorage();
    renderList(); // Updates the list display.
}

// Function to delete an item from the shopping list
function deleteItem(index) {
    shoppingList.splice(index, 1); // Removes the item from the array using its index.
    saveToLocalStorage();
    renderList();
}

// Function to clear the shopping list
function clearList() {
    shoppingList = []; // Empties the shopping list array.
    saveToLocalStorage();
    renderList(); // Clears the list display.
}

// Function to save the shopping list to localStorage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); //Saves the current list to the browser’s storage.
}

// Event listeners
addButton.addEventListener('click', addItem);
clearListButton.addEventListener('click', clearList);

// Initial render of the shopping list
renderList();
