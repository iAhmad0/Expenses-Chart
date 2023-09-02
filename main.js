// Obtaining today's date and determining the day
const date = new Date();
const getDay = date.toDateString().slice(0, 3);


// Fetching the data from the json file
const getData = async () => {
    const response = await fetch('./data.json');
    const info = await response.json();
    
    determineHeight(info);
    displayAmount(info);
    specifyToday();
}


// Calculating and displaying the height of the bars compared to the biggest amount bar
function determineHeight(obj) {
    const biggest = obj.reduce((a, b) => Math.max(a, b.amount), Number.NEGATIVE_INFINITY);
    obj.forEach((day) => {
        const height = day.amount*160 / biggest; // assuming the height of the biggest bar to be 160px
        document.querySelector(`.${day.day} .bar`).style.height = `${height}px`;
    });
}


// Display the amount of each bar
function displayAmount(obj) {
    obj.forEach((day) => {
        document.querySelector(`.${day.day} .amount`).textContent = "$" + day.amount;
    });
}


// Highlight the bar of today's date
function specifyToday() {
    const today = getDay.toLowerCase();
    document.querySelector(`.${today} .bar`).classList.add('today');
}


// Calling the function
getData();