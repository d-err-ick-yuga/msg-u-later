/*
    Login and Sign Up Button events that produce modal divs.
*/
const loginButton = document.querySelector('#login');
const registerButton = document.querySelector('#register');
const signoutButton = document.querySelector('#signout');

if(loginButton && registerButton) {
    loginButton.addEventListener('click', loginModal);

    registerButton.addEventListener('click', registerModal);
}

if(signoutButton) {
    signoutButton.addEventListener('click', signOut);
}

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
            input.addEventListener('click', (e)=>{
                e.preventDefault();
                console.log('fetch logic here');
                console.log(e.target.parentElement.length);
                if(e.target.parentElement.length > 3) {
                    console.log('running register function');
                    // register
                    let userEmail = e.target.parentElement[0].value;
                    let userName = e.target.parentElement[1].value;
                    let userPsw = e.target.parentElement[2].value;
                    clearInput(e, 3);

                    registerUser(userEmail, userName, userPsw);
                }
                else {
                    console.log('running login function');
                    // login
                    let userName = e.target.parentElement[0].value;
                    let userPsw = e.target.parentElement[1].value;
                    clearInput(e, 2);

                    loginUser(userName, userPsw);
                }
            })
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

/*
    Login and Register asynchronous functions.
*/

async function loginUser(user, psw) {
    if(user === '' || psw === '') {
        alert('Enter your username AND password, please.');
        return;
    }
    const loginURL = 'http://localhost:80/msg-u-later/login.php';
    const userName = user;
    const userPsw = psw;

    const optionsObj = {
        method: 'POST',
        body: JSON.stringify({
            username: userName,
            password: userPsw
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    let response = await fetch(loginURL, optionsObj);
    let result = await response.json();
    if(result) {
        //Redirect to dashboard upon successful login.
        location.href = 'http://localhost:80/msg-u-later/dashboard.php';
    }
    else {
        alert('Wrong username or password.');
    }
}

async function registerUser(email, user, psw) {
    if(email === '' || user === '' || psw === '') {
        alert('Enter your email, username AND password, please.');
        return;
    }
    const registerURL = 'http://localhost:80/msg-u-later/register.php'
    const userEmail = email;
    const userName = user;
    const userPsw = psw;

    const optionsObj = {
        method: 'POST',
        body: JSON.stringify({
            username: userName,
            password: userPsw,
            email: userEmail
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    let response = await fetch(registerURL, optionsObj);
    let result = await response.json();

    console.log(result);
    
    if(result['message'] === 'username taken')  {
        console.log('User name taken');
        alert('User name has been taken already.');
    }
    else if (result['message'] === 'email already used') {
        console.log('Email taken');
        alert('Email already in use.');
    }
    else if (result['message'] === 'wrong request') {
        alert('You sent the wrong kind of request.');
    }
    else {
        location.href = 'http://localhost:80/msg-u-later/dashboard.php';
    }
}

/* Sign out function */

async function signOut() {
    let signoutURL = 'http://localhost:80/msg-u-later/signout.php';

    let optionsObj = {
        method: "POST",
        body: JSON.stringify({
            'signout': 'true'
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    let response = await fetch(signoutURL, optionsObj);
    let result = await response.json();
    if(result)
    {
        location.reload();
    }
    else {
        alert('Signout logic error or bad POST request.');
    }
}

/* Form functions */

function clearInput(theEvent, numOfInput) {
    for(let i = 0; i < numOfInput; i++) {
        theEvent.target.parentElement[i].value = '';
    }
}