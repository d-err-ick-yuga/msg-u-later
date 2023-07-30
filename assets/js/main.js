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
    const form = document.createElement('form');
    for(let iType of inputTypes) {
        let input = document.createElement('input');
        input.setAttribute('type', iType);
        form.appendChild(input);
    }
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
