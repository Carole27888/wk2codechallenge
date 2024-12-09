const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const shoppingListContainer = document.getElementById("shoppingList");
const clearListButton = document.getElementById("clearListButton");

// Style the Add button (red)
addButton.style.backgroundColor = "red";
addButton.style.color = "white";
addButton.style.border = "none";
addButton.style.padding = "10px 15px";
addButton.style.borderRadius = "5px";
addButton.style.marginLeft = "10px";
addButton.style.cursor = "pointer";

// Style the Clear List button
clearListButton.style.backgroundColor = "gray";
clearListButton.style.color = "white";
clearListButton.style.border = "none";
clearListButton.style.padding = "10px 15px";
clearListButton.style.borderRadius = "5px";
clearListButton.style.cursor = "pointer";
clearListButton.style.marginTop = "10px"; // Adds space below the list

// Array to store shopping list items
let shoppingList = [];

// Function to render the shopping list
function renderList() {
  shoppingListContainer.innerHTML = ""; // Clear the current list
  shoppingList.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.style.marginBottom = "10px"; // Space between list items

    // Item name
    const itemName = document.createElement("span");
    itemName.textContent = item.name;
    if (item.purchased) {
      itemName.textContent += " ✓"; // Add tick for purchased items
    }

    // Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.backgroundColor = "blue";
    editButton.style.color = "white";
    editButton.style.border = "none";
    editButton.style.padding = "5px 10px";
    editButton.style.margin = "0 10px"; // Adds space between buttons
    editButton.style.borderRadius = "5px";
    editButton.style.cursor = "pointer";
    editButton.onclick = () => editItem(index);

    // Purchased Button
    const purchasedButton = document.createElement("button");
    purchasedButton.textContent = "Purchased";
    purchasedButton.style.backgroundColor = "green";
    purchasedButton.style.color = "white";
    purchasedButton.style.border = "none";
    purchasedButton.style.padding = "5px 10px";
    purchasedButton.style.margin = "0 10px"; // Adds space between buttons
    purchasedButton.style.borderRadius = "5px";
    purchasedButton.style.cursor = "pointer";
    purchasedButton.onclick = () => togglePurchased(index);

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "gray";
    deleteButton.style.color = "white";
    deleteButton.style.border = "none";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.margin = "0 10px"; // Adds space between buttons
    deleteButton.style.borderRadius = "5px";
    deleteButton.style.cursor = "pointer";
    deleteButton.onclick = () => deleteItem(index);

    // Append all elements to listItem
    listItem.appendChild(itemName);
    listItem.appendChild(editButton);
    listItem.appendChild(purchasedButton);
    listItem.appendChild(deleteButton);

    // Add listItem to shoppingListContainer
    shoppingListContainer.appendChild(listItem);
  });
}

// Function to add an item
function addItem() {
  const itemName = itemInput.value.trim();
  if (itemName) {
    shoppingList.push({ name: itemName, purchased: false }); // Add new item
    itemInput.value = ""; // Clear input field
    renderList(); // Update the list
  }
}

// Function to edit an item
function editItem(index) {
  const newName = prompt("Edit item name:", shoppingList[index].name);
  if (newName) {
    shoppingList[index].name = newName.trim(); // Update item name
    renderList();
  }
}

// Function to toggle purchased status
function togglePurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased; // Toggle status
  renderList();
}

// Function to delete an item
function deleteItem(index) {
  shoppingList.splice(index, 1); // Remove item from array
  renderList();
}

// Function to clear the entire list
function clearList() {
  shoppingList = []; // Reset array
  renderList(); // Clear the list display
}

// Event listeners for buttons
addButton.addEventListener("click", addItem);
clearListButton.addEventListener("click", clearList);
