function areaOfCircle(radius) {
    return Math.PI * radius * radius;
}

function password(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let wip = '';
    for(let i=0; i < length; i++) {
        wip += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return wip;
}

function taxCalc(price, taxRate) {
    return +price + (price * (taxRate / 100));
}

const radius = prompt('Enter the radius of the circle:');

alert('The area of the circle is: ' + areaOfCircle(radius));

const genPass = prompt('Enter the length for a random password:');

alert('Generated password: ' + password(genPass));

const price = prompt('Enter the price of the item:');
const taxRate = prompt('Enter the tax rate (in %):');

alert('The total price including tax is: ' + taxCalc(price, taxRate));