const socket = io();


const userName = document.getElementById('userEmail')
const submitSession = document.getElementById('submitSession')
submitSession.addEventListener('submit',(e) => {
    e.preventDefault()
})

const goToLogInBtn = document.querySelector('#goToLogIn');

goToLogInBtn.addEventListener('click',() => {
    window.location.assign('/');
})