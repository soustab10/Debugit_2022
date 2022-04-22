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






//html elements
const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
const todoForm = document.querySelector('.form-todo');
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector('.todo-list');
let userBtn = document.querySelector('.user-btn');
let refreshBtn = document.querySelector('.refresh-btn');
let buttonTournament = document.querySelector('.lvl-btn-tournament');
let showLeaderboard = document.getElementById('btn-leaderboard');
let showLeaderboardTop = document.getElementById('btn-leaderboard-1');
let score = document.getElementById('score');
let startLevelButton = document.getElementById('lvl-btn-start');
let startLevelButton2 = document.getElementById('lvl-btn-start-2');
let scoreContainer = document.querySelector('.score-container');
let tableContent = document.getElementById('dvTable');
let homeButton = document.querySelector('.fa');
let creatorAttribute = document.querySelector('.attr');
let rowTile = [];
let guessRows = [];
let successfulGame = false;
let isGameOver = false;
let userName = "";
let totalScore = 0;

//initially nextlevel buttons are hidden
startLevelButton.style.display = 'none';
startLevelButton2.style.display = 'none';
showLeaderboard.style.display = 'none';
scoreContainer.style.display = 'none';
tableContent.style.display = 'none';

//buttons and event listeners
buttonTournament.addEventListener('click', startEasyLevel);
showLeaderboardTop.addEventListener('click', leader);
showLeaderboard.addEventListener('click', leader);
startLevelButton.addEventListener('click', startMediumLevel);
startLevelButton2.addEventListener('click', startHardLevel);

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


function getNumericle() {
    return Math.floor(Math.random() * 99999999).toString();
};

function hideButtons() {
    todoForm.style.display = 'none';
    startLevelButton.style.display = 'none';
    startLevelButton2.style.display = 'none';
    showLeaderboardTop.style.display = 'none';
    scoreContainer.style.display = 'inline-block';
    tableContent.style.display = 'none';
    //homeButton.style.display = 'none';
    creatorAttribute.style.display = 'none';
};



function startLevel(digits, rows, guessRows) {
    hideButtons();
    let currentRow = 0;
    let currentTile = 0;
    let isGameOver = false;
    let numericle;
    const getWordle = () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
                'X-RapidAPI-Key': '85c907195dmsh78557169b96af7cp1f201djsnf256865a68e2'
            }
        };

        fetch(`https://random-words5.p.rapidapi.com/getMultipleRandom?count=5&wordLength=${digits}`, options)
            .then(response => response.json())
            .then(response => numericle = response[0])
            .catch(err => console.log(err));
    }

    getWordle();


    const keys = [
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'ENTER',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M',
        '<<',
    ]








    guessRows.forEach((guessRow, guessRowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
        guessRow.forEach((_guess, guessIndex) => { //guess imp comment
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
            tileElement.classList.add('tile');
            rowElement.append(tileElement);
        });
        tileDisplay.append(rowElement);
    });

    keys.forEach(key => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = key;
        buttonElement.setAttribute('id', key);
        keyboard.append(buttonElement);

        buttonElement.addEventListener('click', () => handleClick(key));

    });
    const handleClick = (letter) => {

        if (!isGameOver) {
            if (letter === '<<') {
                deleteLetter();
                return;
            }
            if (letter === 'ENTER') {
                if (currentTile >= digits)
                    checkRow();
                return
            }
            addLetter(letter);
        }
    };




    const addLetter = (letter) => {
        if (currentTile < digits && currentRow <= rows) {
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
            tile.textContent = letter;
            guessRows[currentRow][currentTile] = letter;
            tile.setAttribute('data', letter);
            currentTile++;
        }
    };

    const deleteLetter = () => {
        if (currentTile > 0) {
            currentTile--;
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
            tile.textContent = '';
            guessRows[currentRow][currentTile] = '';
            tile.setAttribute('data', '');
        }
    };

    const calculateScore = (row, digits) => {
        if (digits == 5)
            return (100 - row * 10);
        else if (digits == 6)
            return (175 - row * 15);
        else if (digits == 7)
            return (225 - row * 20);
    }

    function checkRow() {
        numericle = numericle.toUpperCase();

        //console.log(numericle);
        const guess = guessRows[currentRow].join('');
        //console.log(guess);


        if (currentTile >= (digits - 1)) {

            function checkWord() {
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
                        'X-RapidAPI-Key': '85c907195dmsh78557169b96af7cp1f201djsnf256865a68e2'
                    }
                };

                fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${guess}`, options)
                    .then(response => response.json())
                    .then(response => {
                        //console.log(response.list.length);
                        if (response.list.length <= 1 && numericle != guess) {
                            showMessage('Enter a Valid Word');
                            console.log("invalid word");
                            return;
                        } else {
                            //console.log(response.list.length);
                            //console.log(numericle);
                            flipTile();
                            if (numericle == guess) {
                                if (digits == 7) {
                                    showMessage('Congratulations!You cleared all the levels');
                                    showLeaderboard.classList.add("button-pulse");
                                    userBtn.style.display = "none";
                                    refreshBtn.innerHTML = "Return to Home";
                                    refreshBtn.classList.add("button-pulse");

                                } else {
                                    showMessage('Magnificent! Level Cleared. Redirecting to next level in a few sconds.');
                                }
                                isGameOver = true;
                                successfulGame = true;
                                totalScore = totalScore + calculateScore(currentRow, digits);
                                score.innerHTML = `${totalScore}`;
                                //console.log('Score:', totalScore);

                                //**** */
                                setTimeout(() => {
                                    guessRows.forEach((guessRow, guessRowIndex) => {
                                        const rowElement = document.getElementById(`guessRow-${guessRowIndex}`);
                                        rowElement.remove();
                                    });
                                    keys.forEach(key => {
                                            const keyElement = document.getElementById(`${key}`);
                                            keyElement.remove();
                                        })
                                        // tileDisplay.remove();
                                        // keyboard.remove();
                                    if (digits == 5) {
                                        startLevelButton.style.display = 'inline-block';
                                    } else if (digits == 6) {
                                        startLevelButton2.style.display = 'inline-block';
                                    } else if (digits == 7) {
                                        showLeaderboard.style.display = 'inline-block';
                                    }
                                }, 4200);
                                // guessRows = [];

                                //**** */
                                return
                            } else {
                                if (currentRow >= (rows - 1)) {
                                    isGameOver = true;
                                    showMessage('Game Over!! Better luck next time!');
                                    setTimeout(() => {
                                        location.reload();
                                    }, 4000);
                                    return
                                }
                                if (currentRow < (rows - 1)) {
                                    currentRow++;
                                    currentTile = 0;
                                }
                            }
                        }
                    }).catch(err => console.log(err))
            }
            checkWord();
        }
    }



    const showMessage = (message) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageDisplay.append(messageElement);
        setTimeout(() => messageDisplay.removeChild(messageElement), 4000);
    };

    const addColorToKey = (keyLetter, color) => {
        const key = document.getElementById(keyLetter);
        key.classList.add(color);
    };

    const flipTile = () => {
        const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
        let checknumericle = numericle;
        const guess = [];

        rowTiles.forEach(tile => {
            guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
        });
        guess.forEach((guess, index) => {
            if (guess.letter == numericle[index]) {
                guess.color = 'green-overlay';
                checknumericle = checknumericle.replace(guess.letter, '');
            }
        })
        guess.forEach((guess, index) => {
            if (checknumericle.includes(guess.letter) && guess.letter != numericle[index]) {
                guess.color = 'yellow-overlay';
                checknumericle = checknumericle.replace(guess.letter, '');
            }
        })

        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('flip')
                tile.classList.add(guess[index].color)
                addColorToKey(guess[index].letter, guess[index].color)
            }, 500 * index)
        })
    }


};

function startEasyLevel() {
    guessRows = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    startLevel(5, 6, guessRows);
}

function startMediumLevel() {

    guessRows = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ];
    startLevel(6, 7, guessRows);
}

function startHardLevel() {
    guessRows = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ];
    startLevel(7, 8, guessRows);
}


function leader() {

    homeButton.style.display = 'inline-block';
    creatorAttribute.style.display = 'none';

    function showMessageDb(message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.color = 'white';
        messageDisplay.append(messageElement);
        setTimeout(() => messageDisplay.removeChild(messageElement), 1000);
    }
    showMessageDb('Please wait a while....Loading LeaderBoard in a moment...');


    updateData();

    function updateData() {
        //var customers = new Array();
        var nameDbMin;
        var scoreDbMin;
        var scoreMin = 550;
        var nameMin;
        let counter = 0;
        const dbRef = ref(db);
        get(child(dbRef, "IndexWordle/")).then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                counter++;
                nameDbMin = childSnapshot.val().NameOfPlayer;
                scoreDbMin = childSnapshot.val().Score;
                if (scoreDbMin < scoreMin) {
                    scoreMin = scoreDbMin;
                    nameMin = nameDbMin;
                }
            })
            if (counter > 25) {
                function deleteData() {
                    remove(ref(db, "IndexWordle/" + nameMin))
                        .then(() => {
                            //alert("Data removed!")
                        })
                        .catch((error) => {
                            alert("Error:" + error + ". Please try again in a moment");
                        })
                }
                deleteData();

            }

        })
    }



    //customers.push(["Name", "Score"]);
    //customers.push(["koala","10"]);

    function InsertData() {
        set(ref(db, "IndexWordle/" + userName), {
                Score: totalScore,
                NameOfPlayer: userName

            })
            .then(() => {
                //alert("data stored succesfully");
            })
            .catch((error) => {
                alert("Error:" + error + ". Please try again in a moment");
            })
    }
    if (successfulGame) {
        InsertData();
    }

    function SelectData() {

        var customers = new Array();
        const dbRef = ref(db);
        get(child(dbRef, "IndexWordle/")).then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    var nameDb = childSnapshot.val().NameOfPlayer;
                    var scoreDb = childSnapshot.val().Score;

                    var arrayDb = [nameDb, scoreDb];
                    customers.push(arrayDb);
                })

                // sorting array in descending order
                customers.sort(sortFunction);

                function sortFunction(a, b) {
                    if (a[1] === b[1]) {
                        return 0;
                    } else {
                        return (a[1] < b[1]) ? 1 : -1;
                    }
                }


                // ***** 
                var table = document.createElement("TABLE");
                table.border = "1";

                //Get the count of columns.
                var columnCount = customers[0].length;

                //Add the header row.
                var row = table.insertRow(-1);
                for (var i = 0; i < columnCount; i++) {
                    var headerCell = document.createElement("TH");
                    headerCell.innerHTML = customers[0][i];
                    row.appendChild(headerCell);
                }

                //Add the data rows.
                for (var i = 1; i < customers.length; i++) {
                    row = table.insertRow(-1);
                    for (var j = 0; j < columnCount; j++) {
                        var cell = row.insertCell(-1);
                        cell.innerHTML = customers[i][j];
                    }
                }
                tableContent.style.display = 'inline-block';
                var dvTable = document.getElementById("dvTable");

                dvTable.innerHTML = "";
                dvTable.appendChild(table);
            })
            .catch((error) => {
                alert("Error:" + error + ". Please try again in a moment");
            })
    }


    SelectData();


    // //Create a HTML Table element.
    // var table = document.createElement("TABLE");
    // table.border = "1";

    // //Get the count of columns.
    // var columnCount = customers[0].length;

    // //Add the header row.
    // var row = table.insertRow(-1);
    // for (var i = 0; i < columnCount; i++) {
    //     var headerCell = document.createElement("TH");
    //     headerCell.innerHTML = customers[0][i];
    //     row.appendChild(headerCell);
    // }

    // //Add the data rows.
    // for (var i = 1; i < customers.length; i++) {
    //     row = table.insertRow(-1);
    //     for (var j = 0; j < columnCount; j++) {
    //         var cell = row.insertCell(-1);
    //         cell.innerHTML = customers[i][j];
    //     }
    // }

    // var dvTable = document.getElementById("dvTable");
    // dvTable.innerHTML = "";
    // dvTable.appendChild(table);

}


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}


todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (todoInput.value.length > 0) {
        userName = todoInput.value;

    } else {
        userName = sessionStorage.getItem("Username");
    }
    //console.log(userName);
});