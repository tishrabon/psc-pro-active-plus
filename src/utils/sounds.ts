// for alerting user befor going to break time
export const alertCall = (volume: number) => {
  const alert = new Audio("alert.mp3");
  for (let i = 1; i < 2; i++) {
    setTimeout(() => {
      alert.currentTime = 0;
      alert.play();
      alert.volume = volume;
    }, i * 600);
  }
};

// single session done
export const doneCall = (volume: number) => {
  const alert = new Audio("done.mp3");
  for (let i = 1; i < 2; i++) {
    setTimeout(() => {
      alert.currentTime = 0;
      alert.play();
      alert.volume = volume;
    }, i * 600);
  }
};

// whole session done
export const congratsCall = (volume: number) => {
  const alert = new Audio("congrats.mp3");
  for (let i = 1; i < 2; i++) {
    setTimeout(() => {
      alert.currentTime = 0;
      alert.play();
      alert.volume = volume;
    }, i * 600);
  }
};
