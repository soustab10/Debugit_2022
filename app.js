import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8vvwBB_c5QFUrO_S0Ucd2BIzG-HHNb7A",
    authDomain: "numericledb.firebaseapp.com",
    databaseURL: "https://numericledb-default-rtdb.firebaseio.com",
    projectId: "numericledb",
    storageBucket: "numericledb.appspot.com",
    messagingSenderId: "741070315125",
    appId: "1:741070315125:web:120b7f6f5d6c9bf857623c",
    measurementId: "G-6NC57K3B1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

const db = getDatabase();


//light-dark mode Toggle
var themeStatus = sessionStorage.getItem('Theme');
//console.log(themeStatus);
var checkbox = document.querySelector('input[name=theme]');
if (themeStatus == 'dark') {
    checkbox.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
}


if (checkbox.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    sessionStorage.setItem('Theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    sessionStorage.setItem('Theme', 'light')
}

if (checkbox.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    sessionStorage.setItem('Theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    sessionStorage.setItem('Theme', 'light');
}

checkbox.addEventListener('change', function() {
    if (this.checked) {
        trans();
        document.documentElement.setAttribute('data-theme', 'dark');
        sessionStorage.setItem('Theme', 'dark');
    } else {
        trans();
        document.documentElement.setAttribute('data-theme', 'light');
        sessionStorage.setItem('Theme', 'light');
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

$('.message a').click(function() {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});

//references 
const name = document.getElementById('nameInp');
const email = document.getElementById('emailInp');
const password = document.getElementById('passInp');
const username = document.getElementById('userNameInp');
const userInpLogin = document.getElementById('userInpLogin');
const passInpLogin = document.getElementById('passInpLogin');
const createUserBtn = document.getElementById('createUser');
const loginUserBtn = document.getElementById('loginUser');


function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) != null;
}

function validation() {

    let nameregex = /^[a-zA-Z\s]+$/;
    let nameregex2 = /^[a-zA-Z0-9]+$/;
    let mailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook|itbhu|iitbhu)\.com$/;

    if (isEmptyOrSpaces(name.value) || isEmptyOrSpaces(email.value) || isEmptyOrSpaces(username.value) || isEmptyOrSpaces(password.value)) {
        alert("You cannot leave any field empty");
        return false;
    }
    if (!nameregex.test(name.value)) {
        alert("Please enter a valid name!");
        return false;
    }
    if (!nameregex2.test(username.value)) {
        alert("Username should only be alphanumeric.");
        return false;
    }

    if (!mailregex.test(email.value)) {
        alert("Please enter a valid email!");
        return false;
    }
    if (password.value.length < 6) {
        alert("Password must have atleast 6 characters!");
        return false;
    }
    return true;
}


function registerUser() {
    if (validation()) {
        const dbRef = ref(db);
        get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
            if (snapshot.exists()) {
                alert("User Already in Use!");
            } else {
                set(ref(db, "UsersList/" + username.value), {
                        fullname: name.value,
                        username: username.value,
                        email: email.value,
                        password: password.value
                    })
                    .then(() => {
                        alert("User Added succesfully. Please Sign In to Continue!");
                        username.value = "";
                        password.value = "";
                        email.value = "";
                        name.value = "";
                    })
                    .catch((error) => {
                        alert("Error occured:" + error);
                    })
            }
        });
    } else {
        //validation();
    }
}

function loginUser() {
    const dbRef = ref(db);
    //console.log(passInpLogin.value);
    //console.log(userInpLogin.value);
    get(child(dbRef, "UsersList/" + userInpLogin.value)).then((snapshot) => {
        //console.log(snapshot);
        if (snapshot.exists()) {
            let dbPass = snapshot.val().password;
            console.log(dbPass);
            //console.log("dbpass:" + dbPass);
            if (dbPass == passInpLogin.value) {

                sessionStorage.setItem('Username', userInpLogin.value);
                //sessionStorage.setItem('Name',snapshot.val().fullname);
                window.location = "Alphanumericle/index.html";
            } else {
                alert("Wrong Password. Please try again!");
            }


        } else {
            alert("Wrong Credentials, Please Try Again");
        }
    });

}

createUserBtn.addEventListener('click', registerUser);
loginUserBtn.addEventListener('click', loginUser);