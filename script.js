
//user can increase break length, decrease break length, increase session length, decrease session length, pause clock, start clock

const clock = (() => {
  let clockBreak = 5,
      session = 25,
      clockTime = 25 * 60,
      ticking = false,
      ticker = null

  const incBreak = () => {
    clockBreak++
  }

  const decBreak = () => {
    clockBreak--
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

  const startClock = () => {
    ticker = setInterval(() => { tick(); console.log(clockTime); }, 1000)
  }

  const tick = () => {
    ticking = true
    clockTime -= 1
  }

  return {
    incBreak: incBreak,
    decBreak: decBreak,
    incSession: incSession,
    decSession: decSession,
    pauseClock: pauseClock,
    startClock: startClock,
  }
})()
