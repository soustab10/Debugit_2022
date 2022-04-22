//dependencies
let listWords;
let homeButton = document.querySelector('.refresh-btn');
let userButton = document.querySelector('.user-btn');
const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
let buttonEasy = document.getElementById('lvl-btn-easy');
//let buttonMedium = document.getElementById('lvl-btn-med');
//let buttonHard = document.getElementById('lvl-btn-hard');
let buttonTournament = document.getElementById('lvl-btn-tournament');
let buttonTournamentWordle = document.getElementById('lvl-btn-tournament-2');
let lvlButtonClass = document.querySelector('.lvl-buttons');
//let tournamentIcon = document.querySelector('.tournament-icon');
let creatorAttribute = document.querySelector('.attr');
let casualNumericleBtn = document.querySelector('#caz-num-btn');
let casualWordleBtn = document.querySelector('#caz-wordle-btn');
let numberSlider = document.querySelector('#number-slider');
let emojiContainer = document.querySelector('.emoji-container');
let rangeSlider = document.querySelector('#range-slider');
//btns display style
buttonEasy.style.display = "none";
//buttonMedium.style.display = "none";
//buttonHard.style.display = "none";
homeButton.style.display = "none";
userButton.style.display = "none";
numberSlider.style.display = "none";
rangeSlider.value = "5";
var Username = sessionStorage.getItem('Username');
// document.querySelector('.username-div').innerHTML = `${Username}`;


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

//profile icon
function logoutDialog() {
    document.querySelector('.dropdown-content').style.display = 'inline';
}
document.querySelector('.dropbtn').addEventListener('click', logoutDialog);
//sliders
// var rangeSlider = function(){
//     var slider = $('.range-slider'),
//         range = $('.range-slider__range'),
//         value = $('.range-slider__value');

//     slider.each(function(){

//       value.each(function(){
//         var value = $(this).prev().attr('value');
//         $(this).html(value);
//       });

//       range.on('input', function(){
//         $(this).next(value).html(this.value);
//       });
//     });
//   };

//   rangeSlider();
const hideButtons = () => {
    //hide caz and tournamentIcon
    homeButton.style.display = "inline-block";
    userButton.style.display = "inline-block";
    buttonEasy.style.display = "inline-block";
    //buttonMedium.style.display = "inline-block";
    //buttonHard.style.display = "inline-block";
    numberSlider.style.display = "inline-block";
    buttonTournament.style.display = "none";
    buttonTournamentWordle.style.display = "none";
    //lvlButtonClass.style.display = "none";
    //tournamentIcon.style.display = "none";
    creatorAttribute.style.display = "none";
    casualNumericleBtn.style.display = "none";
    casualWordleBtn.style.display = "none";
    emojiContainer.style.display = "none";

};

const startCasualNumericle = () => {

        //first child


        hideButtons();
        let rowTile = [];
        let guessRows = [];
        let successfulGame = false;
        let isGameOver = false;

        const getNumericle = () => {
            return Math.floor(Math.random() * 99999999).toString();
        };


        calculateScore = (rows) => {
            return (100 - rows * 10);
        };

        startLevel = (digits, rows) => {

            if (isNaN(parseFloat(digits)))
                digits = 5;
            if (isNaN(parseFloat(rows)))
                rows = 6;
            let numericle = (getNumericle()).substring(0, digits) + ''; //123456789
            //console.log(numericle);
            const keys = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'ENTER',
                '<<'
            ];

            for (let i = 0; i < digits; i++) {
                rowTile.push('');
            }
            for (let i = 0; i < rows; i++) {
                guessRows.push(rowTile);
            }
            let currentRow = 0;
            let currentTile = 0;


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
            let enterKey = document.getElementById("ENTER")
            enterKey.style.width = "8rem";
            let bkSpace = document.getElementById("<<");
            bkSpace.style.width = "8rem";



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

            const checkRow = () => {
                const guess = guessRows[currentRow].join('');
                if (currentTile >= (digits - 1)) {
                    flipTile();
                    if (numericle == guess) {
                        showMessage('Magnificent! You solved in ' + (currentRow + 1) + ' tries!');
                        isGameOver = true;

                        //opoup modal dialog
                        homeButton.classList.add("button-pulse");
                        homeButton.innerHTML = "Return to Home!"
                        homeButton.style.width = "8rem";

                        userButton.style.display = "none";
                        successfulGame = true;
                        return;
                    } else {
                        if (currentRow >= (rows - 1)) {
                            isGameOver = true;
                            showMessage('Game Over. You were close!! The answer was:' + numericle);
                            return
                        }
                        if (currentRow < (rows - 1)) {
                            currentRow++;
                            currentTile = 0;
                        }
                    }
                }
            };


            const showMessage = (message) => {
                const messageElement = document.createElement('p');
                messageElement.textContent = message;
                messageDisplay.append(messageElement);
                setTimeout(() => messageDisplay.removeChild(messageElement), 3000);
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
        };
        hideLevelButtons = () => {
                buttonEasy.style.display = "none";
                numberSlider.style.display = "none";
                lvlButtonClass.style.padding = "0px";
                messageDisplay.style.display = "inline-block";
                document.getElementById("header-span").style.fontSize = "1.75rem";
                // document.getElementById("user-btn").style.fontSize = "1rem";

            }
            //beginning of solo levels
        startEasyLevel = () => {


            hideLevelButtons();
            let levelDigits = parseInt(document.querySelector('.output').textContent);
            if (levelDigits.length == 0)
                levelDigits = 5;
            //buttonMedium.style.display = "none";
            //buttonHard.style.display = "none";
            startLevel(levelDigits, levelDigits + 1);
        }
        buttonEasy.addEventListener('click', startEasyLevel);
    }
    // startMediumLevel = () => {
    //     hideLevelButtons();
    //     startLevel(7, 7);
    // }
    // startHardLevel = () => {
    //     hideLevelButtons();
    //     startLevel(8, 7);
    // }



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



const startCasualWordle = async() => {


    hideButtons();
    let rowTile = [];
    let guessRows = [];
    let successfulGame = false;
    let isGameOver = false;


    let numericle;
    const startLevel = (digits, rows) => {
        if (isNaN(parseFloat(digits)))
            digits = 5;
        if (isNaN(parseFloat(rows)))
            rows = 6;

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

        for (let i = 0; i < digits; i++) {
            rowTile.push('');
        }
        for (let i = 0; i < rows; i++) {
            guessRows.push(rowTile);
        }
        let currentRow = 0;
        let currentTile = 0;


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


        function checkRow() {
            numericle = numericle.toUpperCase();

            const guess = guessRows[currentRow].join('');



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
                            if (response.list.length <= 1) {
                                showMessage('Enter a Valid Word');
                                //console.log("invalid word");
                                return;
                            } else {
                                //console.log(response.list.length);
                                //console.log(numericle);
                                flipTile();
                                if (numericle == guess) {
                                    showMessage('Magnificent! You solved in ' + (currentRow + 1) + ' tries!');
                                    homeButton.innerHTML = "Return to Home!"
                                    homeButton.style.width = "8rem";
                                    homeButton.classList.add("button-pulse");
                                    homeButton.innerHTML = "Return to Home!"
                                    homeButton.style.width = "8rem";

                                    userButton.style.display = "none";
                                    isGameOver = true;
                                    successfulGame = true;
                                    return;
                                } else {
                                    if (currentRow >= (rows - 1)) {
                                        isGameOver = true;
                                        showMessage('Game Over. You were close!! The answer was:' + numericle);
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
            setTimeout(() => messageDisplay.removeChild(messageElement), 3000);
        };

        const addColorToKey = (keyLetter, color) => {
            const key = document.getElementById(keyLetter);
            key.classList.add(color);
        };

        const flipTile = () => {
            //console.log('flip tile');
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
        const handleClick = (letter) => {
            if (!isGameOver) {
                if (letter === '<<') {

                    deleteLetter();
                    return;
                }
                if (letter === 'ENTER') {


                    function submitPoll() {
                        document.getElementById("ENTER").disabled = true;
                        setTimeout(function() { document.getElementById("ENTER").disabled = false; }, 1000);
                    }
                    submitPoll();
                    if (currentTile >= digits) {
                        //currentTile = 0;
                        checkRow();
                    }
                    return;
                }
                addLetter(letter);
            }
        };
    };
    const hideLevelButtons = () => {
            buttonEasy.style.display = "none";
            numberSlider.style.display = "none";
            lvlButtonClass.style.padding = "0px";
            messageDisplay.style.display = "inline-block";
            document.getElementById("header-span").style.fontSize = "1.75rem";

        }
        //beginning of solo levels
    const startEasyLevel = () => {


        hideLevelButtons();
        let levelDigits = parseInt(document.querySelector('.output').textContent);
        if (levelDigits == undefined || levelDigits == NaN) {
            levelDigits = 5;
        }

        //buttonMedium.style.display = "none";
        //buttonHard.style.display = "none";
        startLevel(levelDigits, levelDigits + 1);
    }
    buttonEasy.addEventListener('click', startEasyLevel);

}
casualWordleBtn.addEventListener('click', startCasualWordle);
casualNumericleBtn.addEventListener('click', startCasualNumericle);