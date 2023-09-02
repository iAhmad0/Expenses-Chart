const date = new Date();
const getDay = date.toDateString().slice(0, 3);


const getData = async () => {
    const response = await fetch('./data.json');
    const info = await response.json();
    
    determineHeight(info);
    displayAmount(info);
    specifyToday();
}

function determineHeight(obj) {
    const greater = obj.reduce((a, b) => Math.max(a, b.amount), Number.NEGATIVE_INFINITY);
    obj.forEach((day) => {
        const height = day.amount*160 / greater;
        document.querySelector(`.${day.day} .bar`).style.height = `${height}px`;
    });
}

function displayAmount(obj) {
    obj.forEach((day) => {
        document.querySelector(`.${day.day} .amount`).textContent = "$" + day.amount;
    });
}

function specifyToday() {
    const today = getDay.toLowerCase();
    document.querySelector(`.${today} .bar`).classList.add('today');
}

getData();