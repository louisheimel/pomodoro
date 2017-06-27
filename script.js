
//user can increase break length, decrease break length, increase session length, decrease session length, pause clock, start clock

const clock = (() => {
  let clockBreak = 5,
      session = 25,
      clockTime = 25 * 60,
      ticking = false,
      sessionMode = true,
      ticker = null

  const incBreak = () => {
    if (!ticking && !sessionMode) {
      clockBreak++
      clockTime = clockBreak * 60
    } else if (!ticking) {
      clockBreak ++
    }
  }

  const decBreak = () => {
    if (!ticking && !sessionMode) {
      clockBreak--
      clockTime = clockBreak * 60
    } else if (!ticking) {
      clockBreak --
    }
  }

  const incSession = () => {
    if (!ticking) { 
      session++
      clockTime = session * 60
    }
  }

  const decSession = () => {
    if (!ticking) {
      session--
      clockTime = session * 60
    }
  }

  const pauseClock = () => {
    ticking = false
    clearInterval(ticker)
  }

  const clockFormat = () => Math.floor(clockTime / 60) + ':' + ((clockTime % 60).toString().length === 2 ? clockTime % 60 : '0' + (clockTime % 60))

  const startClock = () => {
    ticking = true
    ticker = setInterval(() => { tick(); 
      document.getElementById('clock').innerHTML = clockFormat(clockTime)
    }, 1000)
  }

  const tick = () => {
    if (sessionMode) {
      if (clockTime === 1) { 
        clockTime = clockBreak * 60 
        document.getElementById('showClockMode').innerHTML = 'Break Time!'
      }
      else { clockTime -= 1 }
    } else {
      if (clockTime === 1) { clockTime = session * 60 }
      document.getElementById('showClockMode').innerHTML = 'Session Time!'
    }
  }

  const isSessionMode = () => sessionMode

  const getBreakLength = () => clockBreak
  const getSessionLength = () => session
  const setClockTime = () => { document.getElementById('clock').innerHTML = clockFormat(clockTime) }
  const isTicking = () => ticking
  return {
    incBreak: incBreak,
    decBreak: decBreak,
    incSession: incSession,
    decSession: decSession,
    pause: pauseClock,
    start: startClock,
    isSessionMode: isSessionMode,
    getBreakLength: getBreakLength,
    getSessionLength: getSessionLength,
    setClockTime: setClockTime,
    isTicking: isTicking, 
  }
})()

clock.setClockTime()

const clockElement = document.getElementById('clock')

const incSession = document.getElementById('incSession'),
      decSession = document.getElementById('decSession'),
      incBreak = document.getElementById('incBreak'),
      decBreak = document.getElementById('decBreak')


const showBreakTime = document.getElementById('showBreakTime'),
      showSessionTime = document.getElementById('showSessionTime')
      clockMode = document.getElementById('showClockMode')

showBreakTime.innerHTML = clock.getBreakLength()
showSessionTime.innerHTML = clock.getSessionLength()

incSession.addEventListener('click', () => {
  clock.incSession()
  showSessionTime.innerHTML = clock.getSessionLength()
})

decSession.addEventListener('click', () => {
  clock.decSession()
  showSessionTime.innerHTML = clock.getSessionLength()
})

incBreak.addEventListener('click', () => {
  clock.incBreak()
  showBreakTime.innerHTML = clock.getBreakLength()
})

decBreak.addEventListener('click', () => {
  clock.decBreak()
  showBreakTime.innerHTML = clock.getBreakLength()
})

clockElement.addEventListener('click', (e) => {
  if (!clock.isTicking()) {
    clock.start()
    e.target.style.background = 'green'
  } else {
    clock.pause()
    e.target.style.background = 'red'
  }
})
