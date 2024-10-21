
let itemsArray = [];
function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemValue = itemInput.value; 

    if (itemValue) {
        itemsArray.push(itemValue);
        itemInput.value = ''; 
    } else {
        alert("Please enter a valid item!");
    }
}

function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; 

    itemsArray.forEach((item, index) => {
        const listItem = document.createElement('li'); 
        listItem.textContent = `Element ${index} = ${item}`; 
        itemList.append(listItem); 
    });
}
