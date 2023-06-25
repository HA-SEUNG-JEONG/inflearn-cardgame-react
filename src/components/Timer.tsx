import { useEffect, useState } from "react";

const Timer = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countDown = setTimeout(() => {
      if (seconds > 0) setSeconds(seconds - 1);
      if (seconds === 0) {
        if (minutes === 0) {
          alert("시간 종료");
          clearTimeout(countDown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  }, [minutes, seconds]);
  return (
    <h2 className="timer">
      남은 시간: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </h2>
  );
};

export default Timer;
