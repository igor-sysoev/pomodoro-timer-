let sessionEnd = false
let sessionTime = 10
let breakTime = 10
let sessionCounter = 0
let timerOn = false

const display = document.querySelector('#display');
const description = document.querySelector('#description')
const button = document.querySelector('#startButton');

function timer(seconds){setInterval(function() {
		if(seconds >= 0){
			timerConvert(seconds)
			seconds--
		}else{
			clearInterval(timer);
		}		
	}, 1000)
}

function timerBreak(){
	description.textContent = "Time for a break!"
	timer(breakTime);
	sessionEnd = false;
}

function timerWork(){
	sessionCounter > 0 ? description.textContent = "Back to work!" : description.textContent = "Time for work!";
	timer(sessionTime)
	sessionEnd = true;
	sessionCounter++
}

function timerTrack(){
	sessionEnd ? timerBreak() : timerWork();
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


button.addEventListener('click', () => {
	timerTrack();
})