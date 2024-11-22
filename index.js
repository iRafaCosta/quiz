const options = document.querySelector('.answer-btn')
const questions = document.querySelector('.question')
const score = document.getElementById('correct-score')
const totalquestion = document.getElementById('total-question')
const checkBtn = document.querySelector('.check-answer')
const playAgain = document.querySelector('.next-btn')
const result = document.querySelector('.results')

let correctAnswer = '', correctScore = askedCount = 0, totalQuestion = 10

async function getQuestions(){
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=21')
    const data = await res.json()
    result.innerHTML = ''
    showQuestions(data.results[0])
}

function eventListener(){
    checkBtn.addEventListener('click', checkAnswer)
    playAgain.addEventListener('click', restartQuiz)
}

document.addEventListener('DOMContentLoaded', () => {
    eventListener()
    getQuestions()
    totalquestion.textContent = totalQuestion;
    score.textContent = correctScore;
})



function showQuestions(data){
    checkBtn.disabled = false
    correctAnswer = data.correct_answer
    let incorrectAswers = data.incorrect_answers
    let optionsList = incorrectAswers
    optionsList.splice(Math.floor(Math.random() * (incorrectAswers.lenght + 1)), 0 , correctAnswer)
    
    questions.innerHTML = data.question
    options.innerHTML =  `
    ${optionsList.map((option, index) => `
        <li> ${index + 1}. <span>${option}</span> </li>
    `).join('')}
`

    selectOption()
}

function selectOption(){
    options.querySelectorAll('li').forEach((option) =>{
        option.addEventListener('click', () =>{
            if(options.querySelector('.selected')){
                const activeOption = options.querySelector('.selected')
                activeOption.classList.remove('selected')
            }
            option.classList.add('selected')
        })
    })
}

function checkAnswer(){
    checkBtn.disabled = true
    if(options.querySelector('.selected')){
        let selectedOption = options.querySelector('.selected span').textContent
        console.log(selectedOption)
        if(selectedOption === correctAnswer){
            correctScore++
            result.innerHTML = `<p> <i class = "fas fa-check"></i>Correct Answer!</p> `
        }
        else{
            result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`
        }
        checkCount()
    }else{
        result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        checkBtn.disabled = false;
    }
}


function checkCount(){
    askedCount++
    setCount()
    if(askedCount === totalQuestion){
        setTimeout(()=>{
            console.log('')
        },5000)

        result.innerHTML += `<p>Your score is ${correctScore}.</p>`
        playAgain.style.display = 'block'
        checkBtn.style.display = 'none'
    }else{
        setTimeout(()=>{
            getQuestions()
        },1000)
    }
}

function setCount(){
    totalquestion.textContent = totalQuestion;
    score.textContent = correctScore;
}

function restartQuiz(){
    correctScore = askedCount = 0;
    playAgain.style.display = "none";
    checkBtn.style.display = "block";
    checkBtn.disabled = false;
    setCount();
    getQuestions();
}
