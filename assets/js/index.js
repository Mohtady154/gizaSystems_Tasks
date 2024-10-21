document.querySelectorAll('.edit').forEach(editButton => {
    editButton.addEventListener('click', function() {
        const row = this.closest('tr'); 
        const nameCell = row.querySelector('.name');
        const companyCell = row.querySelector('.company');
        const cartCell = row.querySelector('.cart');

        makeEditable(nameCell);
        makeEditable(companyCell);
        makeEditable(cartCell);
    });
});

function makeEditable(cell) {
    
    if (cell.isContentEditable) return;

    cell.contentEditable = true;
    cell.classList.add('editing'); 

    cell.addEventListener('blur', function() {
        cell.contentEditable = false;
        cell.classList.remove('editing'); 
    }, { once: true });
}
