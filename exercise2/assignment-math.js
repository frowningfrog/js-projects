function areaOfCircle(radius) {
    return Math.PI * radius * radius; // Area = πr²
}

function roll(chars) {
    return chars.charAt(Math.floor(Math.random() * chars.length)); // make password
}

function password(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let wip = '';

    for(let i=0; i < length; i++) {
        wip += roll(chars);
    }

    let requiredChar = chars.charAt(Math.floor(Math.random() * chars.length)); // dice roll for char

    for(let i=0; i < length; i++) {
        if(wip[i] === requiredChar) {
            break; // found the char, exit loop
        }
        else if(i===length-1) {
            wip = ''; // reset password
            for(let c=0; c < length; c++) {
                wip += roll(chars);
            }
            i = -1; // restart loop
        }
    }
    return [requiredChar, wip];
}

function taxCalc(price, taxRate) {
    return +price + (price * (taxRate / 100)); // + sign forces number type
}

const radius = prompt('Enter the radius of the circle:');

alert('The area of the circle is: ' + areaOfCircle(radius));

const genPass = prompt('Enter the length for a random password:');

password(genPass);

const [requiredChar, generatedPassword] = password(genPass);

alert(`The required char: ${requiredChar} \nGenerated password: ${generatedPassword}`);

const price = prompt('Enter the price of the item:');
const taxRate = prompt('Enter the tax rate (in %):');

alert('The total price including tax is: ' + taxCalc(price, taxRate));