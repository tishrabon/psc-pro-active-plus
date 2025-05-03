import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { clearStopwatchRESUME } from "../redux/appDataSlice";

const Stopwatch = () => {
  const dispatch = useAppDispatch();
  const clockData = useAppSelector(state => state.appData.clock);

  const isRunning = useAppSelector(state => state.appData.clock.swRunning);
  const startTime = useAppSelector(state => state.appData.clock.swStartTime);
  const ETBP = useAppSelector(state => state.appData.clock.swElapsedTimeBeforePaused);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // basic ticking
    if (isRunning && startTime !== null) {
      if (clockData.occupied &&
        !clockData.completed &&
        !clockData.paused && 
        (clockData.running === "work" || clockData.running === "break")
      ) {
        setElapsedTime(Date.now() - startTime);
        intervalRef.current = setInterval(() => {          
          setElapsedTime(Date.now() - startTime);
        }, 1000)
      }

      if (ETBP !== null) {
        dispatch(clearStopwatchRESUME());
      }
    }

    if ((isRunning === null && startTime === null) || clockData.completed) {
      if(intervalRef.current) {
        if (isRunning === null && startTime === null) {
          clearInterval(intervalRef.current);
          setElapsedTime(0);
        } 
        if (clockData.completed) {
          clearInterval(intervalRef.current);
        }
        
      }            
    }

    return () => {
      if(intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

  }, [isRunning, startTime, ETBP, clockData.completed]);



  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60));
    const padded = (num: number) => num.toString().padStart(2, "0");
    return `${padded(minutes)}:${padded(seconds)}`;
  };

  return (
    <div className="">{formatTime(elapsedTime)}</div>
  )
}

export default Stopwatch;


