/*
    Login and Sign Up Button events that produce modal divs.
*/
const loginButton = document.querySelector('#login');
const registerButton = document.querySelector('#register');

loginButton.addEventListener('click', loginModal);

registerButton.addEventListener('click', registerModal);

function loginModal(){
    modal(['text', 'password', 'submit']);
}
function registerModal(){
    modal(['email', 'text', 'password', 'submit']);
}

function modal(types) {
    const modal = document.createElement('div');
    const modalForm = createForm(types);

    modal.appendChild(modalForm);

    // Background modal; make the background of modal dark.
    const modalBG = document.createElement('div');
    modalBG.classList.add('modalBackground');

    // Style modal and position it.
    modal.classList.add('modal');

    // Button to exit modal.
    const exitModalButton = createExitButton();
    modal.appendChild(exitModalButton);

    // Add modal and modal background to body.
    document.body.appendChild(modal);
    document.body.appendChild(modalBG);
}

function createForm(inputTypes) {
    let placeholders = [];
    let submitValue = '';
    const form = document.createElement('form');
    if(inputTypes.length > 3) {
        placeholders.push(...['Email', 'Username', 'Password']);
        submitValue = 'Sign Up';
    }
    else {
        placeholders.push(...['Username', 'Password']);
        submitValue = 'Log In';
    }
    for(let iType of inputTypes) {
        let input = document.createElement('input');
        input.setAttribute('type', iType);
        if(placeholders.length > 0) {
            input.setAttribute('placeholder', placeholders.shift());
            input.setAttribute('required', 'true');
        }
        else {
            input.setAttribute('value', submitValue);
        }
        form.appendChild(input);
    }
    form.classList.add('modalForm');
    return form;
}

function createExitButton() {
    const exitButton = document.createElement('div');
    exitButton.innerText = '🗙';
    exitButton.classList.add('exitButton');

    exitButton.addEventListener('click', ()=>{
        exitButton.parentElement.nextSibling.remove();
        exitButton.parentElement.remove();
    })

    return exitButton;
}

async function checkUser(url) {
    let optionsObj = {
        method: 'POST',
        body: JSON.stringify({
            username: 'dthor',
            password: '123432325'
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    let response = await fetch(url, optionsObj);
    console.log(response);

    let checkValue = await response.json();
    console.log(checkValue);
}

checkUser('http://localhost:80/msg-u-later/login.php');