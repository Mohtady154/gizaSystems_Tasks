function modify() {
    let str = document.getElementById('inputString').value;
    if (str.length >= 3) {
        let lastThreeChars = str.slice(-3);
        let newString = lastThreeChars + str + lastThreeChars;

        document.getElementById('result').textContent = newString;
    } else {
        document.getElementById('result').textContent = 'String length must be 3 or more.';
    }
}