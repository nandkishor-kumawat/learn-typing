let blockDivContainer = document.querySelector('#blockDivContainer'),
    inpbtns = document.getElementById('btns'),
    blockLine = document.querySelector('#blockLine'),
    goBtn = document.querySelector('#go'),
    lessons = document.querySelectorAll('.lessons'),
    timevalue = document.querySelector('.time'),
    speed = document.querySelector('.speed'),
    accuracyValue = document.querySelector('.acc'),
    flag = mistake = 0,
    time = 60,
    timeLimit = time,
    timer, accuracy, wpm;

//adding function to print lessons
lessons.forEach(e => {
    e.onclick = () => printkeys(e.textContent);
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

//funtion for printing letters
function printkeys(keybtns) {
    blockDivContainer.removeEventListener('keydown', checkValue);
    blockDivContainer.addEventListener('keydown', checkValue);
    clearInterval(timer);
    timevalue.innerText = time;
    accuracyValue.innerText = '100';
    speed.innerText = 00;
    flag = mistake = 0;

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
    let b = Math.floor(Math.random() * keybtns.length);
    blockLine.innerHTML = `<span class="nxtLetter">${keybtns[b]}</span>`;
    
    let i = 1;
    while (i < 200) {
        let d = randomValueFromArray(["1", "2", "3", "4", "5", "0", "6"]);
        if (d == 0) {
            blockLine.innerHTML += `<span class="plainText space"> </span>`;
        } else {
            b = Math.floor(Math.random() * keybtns.length);
            blockLine.innerHTML += `<span class="plainText">${keybtns[b]}</span>`;
        }
        i++;
    }
}

printkeys('fj');

// check letter is correct/incorrect
function checkValue(e) {
    e.preventDefault();
    let nxtLetter = document.querySelector('.nxtLetter');
    let nxtLetterPre = nxtLetter.previousElementSibling;
    let text = nxtLetter.textContent;
    //backspace
    if (e.keyCode == 8) {
        if (nxtLetterPre) {
            nxtLetterPre.classList.replace('bad_Space', 'plainText');
            nxtLetterPre.classList.replace('bad_Entry', 'plainText');
            nxtLetterPre.classList.add('nxtLetter');
            nxtLetter.classList.replace('nxtLetter', 'plainText');
            if (!nxtLetterPre.classList.contains('goodEntry')) {
                mistake--;
            }
            nxtLetterPre.classList.remove('goodEntry');
        }
    }
    else {
        if (flag == 0) {
            timeLimit = time;
            timer = setInterval(timerUpdate, 1000);
            flag = 1;
        }

        if (text == e.key)
            nxtLetter.classList.replace('nxtLetter', 'goodEntry');
        else {
            nxtLetter.classList.replace('nxtLetter', text == " " ? 'bad_Space' : 'bad_Entry');
            mistake++;
        }
        if (nxtLetter.nextElementSibling) {
            nxtLetter.nextElementSibling.classList.replace('plainText', 'nxtLetter');
        } else {
            clearInterval(timer);
            blockDivContainer.removeEventListener('keydown', checkValue);
        }
    }
    let char = document.querySelectorAll('#blockLine span');
    let charIndex = char.length;
    accuracy = Math.floor(((charIndex - mistake) / charIndex) * 100);
    wpm = Math.round(((((charIndex - mistake) / 5) / (time - timeLimit)) * 60));
    wpm = wpn = 0 || wpm === Infinity || !wpm ? 0 : wpm;
    accuracyValue.innerText = accuracy;
    speed.innerText = wpm;
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
        blockDivContainer.removeEventListener('keydown', checkValue);
    }
}