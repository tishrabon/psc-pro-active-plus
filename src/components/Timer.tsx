import { useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useSelector } from 'react-redux';
import { SelectBreakDuration, SelectWorkDuration, timerDONE, completedSESSION, clearRESUME, clearRESETCURRENT } from '../redux/appDataSlice';
import { alertCall, congratsCall, doneCall } from '../utils/sounds';

const Timer = () => {
  // const pmdData = useAppSelector(state => state.appData.pomodoro);
  const clockData = useAppSelector(state => state.appData.clock);
  const clockVolume = useAppSelector(state => state.appData.clock.volume)

  const durationWork = (useSelector(SelectWorkDuration) ?? 0) * 60 * 1000;
  const durationBreak = (useSelector(SelectBreakDuration) ?? 0) * 60 * 1000;

  const dispatch = useAppDispatch(); 


  const getDuration = () => {
    if (clockData.resumed && !clockData.paused) {
      return clockData.remaining;
    }
    else if (clockData.startTime && !clockData.paused) {
      const now = Date.now();
      const timeSpent = (now - clockData.startTime) - 1000;
      if (clockData.running === "work") return (durationWork - timeSpent);
      if (clockData.running === "break") return (durationBreak - timeSpent);
    } 
    else {
      return clockData.remaining;
    }
    return 0;
  }

  const [timeLeft, setTimeLeft] = useState(getDuration());

  useEffect(() => {
    setTimeLeft(getDuration());
  }, []);

  useEffect(() => {
    if (clockData.paused) {
      setTimeLeft(clockData.remaining);
    }

    setTimeLeft(getDuration());

    if (clockData.resetSess) {
      dispatch(clearRESETCURRENT());
    }
  }, [clockData.running, clockData.sessionsLeft, clockData.paused, clockData.remaining, clockData.resetSess]);

  // T I M E R R
  useEffect(() => {
    if (!clockData.paused && timeLeft !== null) {
      if (clockData.resumed) {
        dispatch(clearRESUME());
      }

      if (timeLeft <= 0) {
        if (clockData.sessionsLeft === 0 && clockData.running === "break") {
          congratsCall(clockVolume);
          dispatch(completedSESSION());
          // console.log("all done")
          return;
        }
        else {
          if (clockData.running === "work") {
            dispatch(timerDONE());      
          // console.log("work done")

          } else if (clockData.running === "break") {
            dispatch(timerDONE());
            // console.log("break over")

          }
        }      
      }

      // for timer alert
      if (clockData.sessionsLeft !== null && clockData.sessionsLeft >= 0 && timeLeft < 6010 && timeLeft > 5000) {
        if (clockData.running === "work") {
          doneCall(clockVolume);       
        } else if (clockData.sessionsLeft > 0 && clockData.running === "break") {
          alertCall(clockVolume);
        }
      }      
  
      const interval = setInterval(() => {
        const updatedLeft = getDuration();
        const safeTimeLeft = Math.max(updatedLeft ?? 0, 0);
        setTimeLeft(safeTimeLeft);
        // console.log("timeleft:", safeTimeLeft);
      }, 1000);

      return () => clearInterval(interval); 
    }   
  }, [timeLeft, clockData.resumed]);

  const displayTime = (tms: number) => {
    const totalSec = Math.floor(tms/1000);

    const mins = String(Math.floor(totalSec/60)).padStart(2, "0");
    const secs = String(Math.floor(totalSec%60)).padStart(2, "0");
    return `${mins}:${secs}`
  }



  return <div>{timeLeft !== null ? displayTime(timeLeft) : null}</div>
}

export default Timer;