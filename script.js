
let sessionTime = 1500
let secondsLeft = sessionTime
let breakTime = 300
let sessionCounter = 0
let timerId = 0
let timerRunning = false
let currentStatus = 'work'

const reset = true;
const display = document.querySelector('#display');
const description = document.querySelector('#description')
const button = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const sessionUp = document.querySelector('#session-counter-up')
const sessionDown = document.querySelector('#session-counter-down')
const breakUp = document.querySelector('#break-counter-up')
const breakDown = document.querySelector('#break-counter-down')
const sessionTimeDisplay = document.querySelector('#session-counter')
const breakTimeDisplay = document.querySelector('#break-counter')
const bleepSound = document.querySelector('#bleep')
const bloopSound = document.querySelector('#bloop')

const faqButton = document.querySelector('#faq')
const faqDiv = document.querySelector('#modal')
const closeButton = document.querySelector('#close')

const playIcon = document.createElement('i')
playIcon.classList.add("fas", "fa-play");

const resetIcon = document.createElement('i')
resetIcon.classList.add("fas", "fa-undo");

const pauseIcon = document.createElement('i')
pauseIcon.classList.add("fas", "fa-pause")

function updateMessage(string){
	description.textContent = string
}

function timerConvert(seconds){
	if(seconds > 3600) seconds = 300
	let minutes = parseInt(seconds / 60)
	seconds = seconds % 60
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
			clearInterval(timerId);
			toggleSession();
		}		
	}, 1000)
}

function changeIcons(add, remove){
		startButton.removeChild(remove)
		startButton.appendChild(add)
}

function toggleClock(reset){
	if(reset){
		clearInterval(timerId)
		timerConvert(sessionTime);
		secondsLeft = sessionTime	
		currentStatus = 'work'
		updateMessage("Tomato Timer")				//reset
		timerRunning = false
		changeIcons(playIcon, pauseIcon)		
	}else{
		if(timerRunning == true){
			clearInterval(timerId)					//pause
			timerRunning = false
			changeIcons(playIcon, pauseIcon)

		}else{
			timer(secondsLeft)						//unpause
			timerRunning = true;
			changeIcons(pauseIcon, playIcon)
		}
	}
}

function toggleSession(){
	if(secondsLeft == 0){
			switch(currentStatus){
				case 'break':
				currentStatus = 'work'
				timerConvert(sessionTime)
				timer(sessionTime);
				updateMessage('Time to work!')
				bleepSound.play()
				break;

				case 'work':
				currentStatus = 'break';
				timerConvert(breakTime)
				timer(breakTime);
				updateMessage('Time for a break!')
				bloopSound.play()
				break;
			}
		}
}

function stepUp(time, display){
		let sessionNum = time / 60
		sessionNum += 1
		if(sessionNum == 61) sessionNum = 1
		display.innerText = sessionNum
		return sessionNum
}

function stepDown(time, display){
		let sessionNum = time / 60
		sessionNum -= 1
		if(sessionNum == 0) sessionNum = 60
		display.innerText = sessionNum
		return sessionNum
}





breakUp.addEventListener('click', () => {
	if(!timerRunning){
		let sessionNum = stepUp(breakTime, breakTimeDisplay)
		breakTime = sessionNum * 60
		toggleClock(reset)
	}
})

breakDown.addEventListener('click', () => {
	if(!timerRunning){
		let sessionNum = stepDown(breakTime, breakTimeDisplay)
		breakTime = sessionNum * 60
		toggleClock(reset)
	}

})

sessionUp.addEventListener('click', () => {
	if(!timerRunning){
		let sessionNum = stepUp(sessionTime, sessionTimeDisplay);
		sessionTime = sessionNum * 60
		toggleClock(reset)
	}

})

sessionDown.addEventListener('click',() => {
		if(!timerRunning){
		let sessionNum = stepDown(sessionTime, sessionTimeDisplay);
		sessionTime = sessionNum * 60
		toggleClock(reset)
	}


})

button.addEventListener('click', () => {
	toggleClock();
})

resetButton.addEventListener('click', () => {
	toggleClock(reset);
})

faqButton.addEventListener('click', () => {
	modal.style.display = 'block'
})

closeButton.addEventListener('click', () => {
	modal.style.display = 'none'
});


timerConvert(sessionTime);  /// initialize the timer
startButton.appendChild(playIcon) // set the icons
resetButton.appendChild(resetIcon)
breakTimeDisplay.innerText = breakTime / 60
sessionTimeDisplay.innerText = sessionTime / 60