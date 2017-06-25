
//user can increase break length, decrease break length, increase session length, decrease session length, pause clock, start clock

const clock = (() => {
  let clockBreak = 5,
      session = 25,
      clockTime = 25,
      ticking = false

  const incBreak = () => {
    clockBreak++
  }

  const decBreak = () => {
    clockBreak--
  }

  const incSession = () => {
    if (!ticking) { 
      session++
      clockTime = session
    }
  }

  const decSession = () => {
    if (!ticking) {
      session--
      clockTime = session
    }
  }

  const pauseClock = () => {
    ticking = false
  }

  const startClock = () => {
    ticking = true
  }

  const isTicking = () => ticking

  return {
    incBreak: incBreak,
    decBreak: decBreak,
    incSession: incSession,
    decSession: decSession,
    pauseClock: pauseClock,
    startClock: startClock,
    isTicking: isTicking,
  }
})()
