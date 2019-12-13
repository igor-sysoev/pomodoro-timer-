
let sessionTime = 10
let secondsLeft = sessionTime
let breakTime = 10
let sessionCounter = 0
let timerId = 0
let reset = true;
let timerRunning = false

let currentStatus = 'work'

const display = document.querySelector('#display');
const description = document.querySelector('#description')
const button = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');

function timerConvert(seconds){
	if(seconds > 60){
	let minutes = parseInt(seconds / 60)
		seconds = seconds % 60}
	else minutes = 0
	let formatedMinutes = ("0" + minutes).slice(-2);
	let formatedSeconds = ("0" + seconds).slice(-2);
	display.textContent = formatedMinutes + ":" + formatedSeconds
}

function timer(seconds){
		timerId = setInterval(function() {
		if(seconds > 0){
			seconds--
			secondsLeft = seconds
			timerConvert(seconds)
		}else{
			clearInterval(timer);
		}		
	}, 1000)
}



function toggleClock(reset){
	if(reset){
		clearInterval(timerId)
		timerConvert(sessionTime);
		secondsLeft = sessionTime	
		button.textContent = 'Start Work'					//reset
	}else{
		if(timerRunning == true){
			clearInterval(timerId)						//pause
			timerRunning = false
			button.textContent = 'unpause'

		}else{
			timer(secondsLeft)							//unpause
			timerRunning = true;
			button.textContent = 'pause'
		}
	}
}

function toggleSession(){
	if(secondsLeft == 0){
			switch(currentStatus){
				case 'break':
				currentStatus = 'work'
				timer(sessionTime);
				description.textContent = 'Work Time!'
				break;

				case 'work':
				currentStatus = 'break';
				timer(breakTime);
				description.textContent = 'Time for a break!'
				break;
			}
		}
}


button.addEventListener('click', () => {
	toggleClock();
})

resetButton.addEventListener('click', () => {
	toggleClock(reset);
})

timerConvert(sessionTime);  /// initialize the timer
