let sessionEnd = false
let sessionTime = 10
let secondsLeft = sessionTime
let breakTime = 10
let sessionCounter = 0
let timerFinished = true
let timerId = 0
let pause = true;
let currentStatus = ''
const display = document.querySelector('#display');
const description = document.querySelector('#description')
const button = document.querySelector('#startButton');

function timer(seconds){
		timerId = setInterval(function() {
		if(seconds >= 0){
			timerConvert(seconds)
			seconds--
			secondsLeft = seconds
		}else{
			clearInterval(timer);
		}		
	}, 1000)
}

function timerBreak(){
	description.textContent = "Time for a break!"
	timer(secondsLeft);
	sessionEnd = false;
	currentStatus = ''
}

function timerWork(){
	sessionCounter > 0 ? description.textContent = "Back to work!" : description.textContent = "Time for work!";
	timer(secondsLeft)
	sessionEnd = true;
	sessionCounter++
	currentStatus = 'work'
}

function timerTrack(){
	sessionEnd && secondsLeft > 0 ? timerBreak() : timerWork();
}

function timerConvert(seconds){
	if(seconds > 60){
	let minutes = parseInt(seconds / 60)
		seconds = seconds % 60}
	else minutes = 0
	let formatedMinutes = ("0" + minutes).slice(-2);
	let formatedSeconds = ("0" + seconds).slice(-2);
	display.textContent = formatedMinutes + ":" + formatedSeconds
}

function automaticTimer(){

}

function pauseTimer(){
	if(pause){
	timerTrack()
	button.textContent = 'pause'
	pause = false
	}else{
		clearInterval(timerId)
		pause = true
		button.textContent = 'unpause'
	}
}
button.addEventListener('click', () => {
	pauseTimer();
})

timerConvert(sessionTime);