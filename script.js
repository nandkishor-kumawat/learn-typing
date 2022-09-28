let blockDivContainer = document.querySelector('#blockDivContainer'),
    inpbtns = document.getElementById('btns'),
    character = document.querySelectorAll('#blockLine span'),
    goBtn = document.querySelector('#go'),
    lessons = document.querySelectorAll('.lessons'),
    timevalue = document.querySelector('.time'),
    accuracyValue = document.querySelector('.acc'),
    pCompleteValue = document.querySelector('.pCompleteValue'),
    resetBtn = document.querySelector('#resetBtn'),
    inputField = document.querySelector('#inputField'),
    resultContainer = document.querySelector('#resultContainer'),

    accuracy = document.querySelector('#accuracy'),
    speed = document.querySelector('#speed'),
    correctLetters = document.querySelector('#correctLetters'),
    inCorrectLetters = document.querySelector('#inCorrectLetters'),
    fixedLetters = document.querySelector('#fixedLetters'),
    totalLetters = document.querySelector('#totalLetters'),
    flag = mistake = charIndex = typedLetters = 0,
    time = 120,
    timeLimit = time,
    timer, wpm, completedLetters, inCorrectLetterN  = 0;



//adding function to print lessons
lessons.forEach(element => {
    element.onclick = () => printkeys(element.textContent);
});

inpbtns.value = 'fj';
//hide/show GO button
inpbtns.oninput = () => {
    let msg = inpbtns.value.split(' ').join('');
    goBtn.style.display = msg ? 'block' : 'none';
};

//inserting value from custom lesson
goBtn.addEventListener('click', () => {
    var keybtns = inpbtns.value.split(' ').join('');
    keybtns = keybtns.split('').filter(function (allItems, i, p) {
        return i == p.indexOf(allItems);
    }).join('');
    printkeys(keybtns);
});

function randomPara(letters) {
    var alreadyDone = [];
    randomValueFromArray = (myArray) => {
        if (alreadyDone.length === 0) {
            for (var i = 0; i < myArray.length; i++)
                alreadyDone.push(i);
        }
        var randomValueIndex = Math.floor(Math.random() * alreadyDone.length);
        var indexOfItemInMyArray = alreadyDone[randomValueIndex];
        alreadyDone.splice(randomValueIndex, 1);
        return myArray[indexOfItemInMyArray];
    };
    //inserting first letter
    let b = Math.floor(Math.random() * letters.length);
    let para = letters[b];

    let i = 1;
    while (i < 200) {
        let d = randomValueFromArray(["1", "2", "3", "4", "5", "0", "6"]);
        if (d == 0) {
            para += ' ';
        } else {
            b = Math.floor(Math.random() * letters.length);
            para += letters[b];
        }
        i++;
    }
    return para;
}
//funtion for printing letters
function printkeys(keybtns) {
    resetBtn.setAttribute('onclick', `printkeys("${keybtns}")`);
    reset();


    let paragraph = randomPara(keybtns);
    paragraph.split("  ").join("").split("").forEach(element => {
        blockLine.innerHTML += `<span>${element}</span>`;
    });
    let char = blockLine.querySelectorAll('span');
    char[0].classList.add('active');
    char.forEach(element => {
        if (element.innerText == ' ') element.classList.add('space');
    });
    // inputField.setAttribute("maxlength",char.length);
    correctLetters.innerText = char.length;
    totalLetters.innerText = char.length;
}

printkeys('fj');

// check letter is correct/incorrect
function checkValue(e) {
    e.preventDefault();
    let inputCharacter = inputField.value.split('')[charIndex];
    let character = blockLine.querySelectorAll('span');
    //backspace

    if (inputCharacter == null) {
        charIndex--;

        if (!character[charIndex].classList.contains('correct'))
            mistake--;
        character[charIndex].classList.remove('incorrect', 'correct');
        completedLetters--;

    }
    else {
        if (flag == 0) {
            timeLimit = time;
            timer = setInterval(timerUpdate, 1000);
            flag = 1;
        }

        if (character[charIndex].innerText == inputCharacter || (character[charIndex].innerHTML == ' ' && inputCharacter == ' '))
            character[charIndex].classList.add('correct');

        else {
            character[charIndex].classList.add('incorrect');
            mistake++;
            inCorrectLetterN++;
        }

    typedLetters++;
    completedLetters++;
        charIndex++;
    }
    character.forEach(element => { element.classList.remove('active') });
    if (character[charIndex]) {
        character[charIndex].classList.add('active');
    } else {
        // inputField.disabled = true;
        clearInterval(timer);
        inputField.removeEventListener('input', checkValue);
        resultContainer.style.height = 'auto';
        resultContainer.style.display = 'block';
    }
    let totalLetter = character.length;
    let accuracyc = (((totalLetter - mistake) / totalLetter) * 100).toFixed(1);
    wpm = ((typedLetters/5 - mistake) / (time - timeLimit)*60);
    wpm = (wpn = 0 || wpm === Infinity || !wpm) ? 0 : wpm;
    pComplete = (completedLetters / totalLetter * 100).toFixed(1);
    pCompleteValue.innerText = pComplete + '%';
    accuracyValue.innerText = accuracyc + '%';

    accuracy.innerText = accuracyc + '%';
    // speed.innerText = wpm + ' wpm';
    correctLetters.innerText = totalLetter - mistake;
    inCorrectLetters.innerText = inCorrectLetterN;
    fixedLetters.innerText = inCorrectLetterN - mistake;
}

//timer
function timerUpdate() {
    if (timeLimit > 0) {
        timeLimit--;
        timevalue.innerText = timeLimit;
        // console.log(timeLimit);
        if (timeLimit == 1) {
            // alert("Hello! Time Out Try Agin");
            // window.location.reload();
        }
    }
    else {
        clearInterval(timer);
        resultContainer.style.height = 'auto';
        resultContainer.style.display = "block";
        inputField.removeEventListener('input', checkValue);
    }
}

function reset() {
    blockLine.innerHTML = '';
    inputField.value = '';
    inputField.removeEventListener('input', checkValue);
    inputField.addEventListener('input', checkValue);
    clearInterval(timer);
    timevalue.innerText = time;
    accuracyValue.innerText = '100.0%';
    pCompleteValue.innerText = '0%';
    accuracy.innerText = '100 %';
    // speed.innerText = '0 wpm';
    correctLetters.innerText = 200;
    inCorrectLetters.innerText = 0;
    fixedLetters.innerText = 0;
    flag = mistake = completedLetters = charIndex =typedLetters= 0;
    resultContainer.style.height = 0;
    resultContainer.style.display = "none";
}

blockDivContainer.addEventListener("click", () => inputField.focus());

