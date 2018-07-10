const questions = [
    {question: 'Enter your first name'},
    { question: 'Enter your last name' },
    { question: 'Enter your email', pattern: /\S+@\S+\.\S/, type: 'email'},
    { question: 'Create a password', type: 'password', pattern: /^(?=.*\d)[A-Za-z\d]{6,}$/m, tooltip: '6 or more character with 1 or more number' }
]

const shakeTime = 100
const switchTime = 200

let position = 0

const formBox = document.querySelector('#form-box'),
    nextBtn = document.querySelector('#next-btn'),
    prevBtn = document.querySelector('#prev-btn'),
    inputGroup = document.querySelector('#input-group'),
    inputField = document.querySelector('#input-field'),
    inputLabel = document.querySelector('#input-label'),
    inputProgress = document.querySelector('#input-progress'),
    progress = document.querySelector('#progress-bar')

document.addEventListener('DOMContentLoaded', getQuestion)

nextBtn.addEventListener('click', validate)

prevBtn.addEventListener('click', ()=> {
    if(position > 0){
        position--
        formBox.className = ''
        setTimeout(transform, shakeTime * 0, 0, -10)
        setTimeout(transform, shakeTime * 1, 0, 0)
        hideQuestion()
        getQuestion()
    }
})

inputField.addEventListener('keyup', e=> e.keyCode == 13 && nextBtn.click())


function getQuestion() {
    inputLabel.innerHTML = questions[position].question
    inputField.type = questions[position].type || 'text'
    // !!questions[position].pattern ? inputField.pattern = questions[position].pattern : null
    inputField.value = questions[position].answer || ''
    setTimeout(() => inputField.focus(), 1500)
    progress.style.width = (position * 100) / questions.length + '%'
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user'
    questions[position].tooltip ? document.querySelector('#input-group span').innerText = questions[position].tooltip : document.querySelector('#input-group span').innerText = ''
    questions[position].tooltip ? document.querySelector('#input-group span').className = 'tooltip' : document.querySelector('#input-group span').className = ''
    showQuestion()
}

function showQuestion() {
    inputGroup.style.opacity = 1
    inputProgress.style.transition = ''
    inputProgress.style.width = '100%'
}

function hideQuestion() {
    inputGroup.style.opacity = 0
    inputLabel.style.marginLeft = 0
    inputProgress.style.width = 0
    inputProgress.style.transition = 'none'
    inputGroup.style.border = null
}

function transform(x, y, fn) {
    formBox.style.transform = `translate(${x}px, ${y}px)`
}

function validate(){
    if(!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail()
    } else {
        inputPass()
    }
}

function inputFail() {
    formBox.className = 'error'
    for(let i = 0; i < 6; i++){
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0)
        setTimeout(transform, shakeTime * 6, 0, 0)
        inputField.focus()
    }
}

function inputPass(){
    formBox.className = ''
    setTimeout(transform, shakeTime * 0, 0, 10)
    setTimeout(transform, shakeTime * 1, 0, 0)
    questions[position].answer = inputField.value
    position++
    if(questions[position]){
        hideQuestion()
        getQuestion()
    } else {
        hideQuestion()
        progress.style.width = '100%'
        setTimeout(() => formBox.className = 'close', 1000)
        formComplete()
    }
}

function formComplete(){
    const h1 = document.createElement('h1')
    // h1.addClass('end')
    h1.classList.add('end')
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email shortly`))
    setTimeout(()=>{
        formBox.parentElement.appendChild(h1)
        setTimeout(()=> h1.style.opacity = 1, 50)
    }, 1000)
}