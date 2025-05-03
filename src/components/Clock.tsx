import Timer from './Timer';
import Ambience from './Ambience';
import Stopwatch from './Stopwatch';
import Volume from './Volume';
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { initiate, resetCLOCK, pauseTIME, resumeTIMER, resetCURRENTSESSION } from '../redux/appDataSlice';

import { MdRestartAlt } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { IoPause } from "react-icons/io5";
import { CiStopwatch } from "react-icons/ci";
import { GrAchievement } from "react-icons/gr";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";


import { IoMdPlay } from "react-icons/io";


const Clock = () => {
  const containerW = `w-[300px] sm:w-[500px] box-shadow rounded-sm p-3 text-sm`;
  const data = useAppSelector(state => state.appData);
  const clockData = useAppSelector(state => state.appData.clock);
  const dispatch = useAppDispatch();
  
  const showTime = (format: string, callFor: string): string => {
    const [workTime, breakTime] = format.split("/");
    if (callFor === "work") {
      return `Focus: ${workTime} min`;
    }
    if (callFor === "break") {
      return `Break: ${breakTime} min`;
    }
    return `Issue...`
  }

  const initiateClock = () => {    
    dispatch(initiate());
  }

  return (
    <div className="mb-[200px]">
      <div className="verticalS gap-5">
      <Ambience />

        <div className={`${containerW} verticalS gap-2`}>
          <div className="w-full">
            <div className="w-full h-full">
              {!clockData.occupied ? 
                <div className="horizontalBet">

                  <div className="verticalLeft">
                    <div className="">Cycle: {data.pomodoro.formatt}</div>  
                    <div className="border-b border-gray-300 pb-1 mb-1 w-full text-left">Loop: {data.pomodoro.sessions}</div>                        
                    <div>{showTime(data.pomodoro.formatt, "work")}</div>
                    <div>{showTime(data.pomodoro.formatt, "break")}</div>
                  </div> 

                  <div className="h-full flex flex-col justify-end">                   
                    <Volume label="clock"/>
                  </div>                    
                </div> 
                : 
                <div className="horizontalBet">
                  <div className="verticalLeft gap-1">                    
                    <div className="border border-gray-300 py-1 px-3 rounded-[5px]">Sessions</div> 
                    <div className="pl-2 mt-1">Total: {clockData.sessionsTotal}</div>
                    {!clockData.completed && clockData.sessionsDone !== null ? <div className="pl-2">Current: {clockData.sessionsDone + 1}</div> : null}
                    <div className="pl-2">Left: {clockData.sessionsLeft}</div>
                  </div>

                  <div className="verticalLeft gap-2">
                    <div className="border border-gray-300 py-1 px-3 rounded-[5px]">
                      Mode: {clockData.activeFormatt}
                    </div> 
                    <div className="pl-2">{data.pomodoro.focusName}: {clockData.workTime} min</div>
                    <div className="pl-2">{data.pomodoro.breakName}: {clockData.breakTime} min</div>
                    {!clockData.completed ? 
                      <div className="pl-2 horizontalC gap-1"><CiStopwatch size={20}/> <Stopwatch /></div>
                    :
                      null
                    }        
                    <div className="pl-2">
                      <Volume label="clock"/>
                    </div>                                
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
      
        <div className="text-[18px]">
            {clockData.completed ? 
            // session completed
            <div className="verticalS gap-3">
              <GrAchievement size={36} className="text-material text-greent-600"/>
              <p className="py-1 px-3 bg-material rounded-[5px] text-white">Mission Accomplished!</p>
              <p className="text-[16px] p-2 rounded-[5px] box-shadow-in2">Another brick laid! Each session, a stronger legacy...</p>              
            </div>            
              : (
                clockData.running !== "no" ? (
                  clockData.running === "work" ? 
                  <div className="verticalC">
                    <RiLightbulbFlashFill size={36} className="text-material"/>
                    {data.pomodoro.focusName}
                  </div> : 
                  <div className="verticalC">
                    <MdEnergySavingsLeaf size={36} className="text-material"/>
                   {data.pomodoro.breakName}
                  </div>) : 
                  <div className="verticalC gap-4"> 
                    <IoSparkles size={46} className="text-material rotate1"/>
                    <div className="box-shadow-in2 py-2 px-4 rounded-[5px]">
                      Ignite your Momentum!  
                    </div>                    
                  </div>
              )
            }
          </div>        

        <div>
          <div             
            className="bg-material text-white rounded-[50%] w-[110px] h-[110px] grid place-items-center text-[22px]"
          >       
            {!clockData.occupied ? 
              <button
                onClick={() => initiateClock()}
              >
                Initiate
              </button> : (!clockData.completed ? 
              <Timer /> : 
              <button 
                onClick={() => {
                  dispatch(resetCLOCK())
                }}>
                  Revive
              </button>)
            }
          </div>
        </div>
        {/* <div>{clockData.running} - {clockData.sessionsLeft ? clockData.sessionsLeft : "nai"}</div> */}

        <div className={`w-[200px] box-shadow-in p-4 rounded-md horizontalBet px-5 text-[20px]`}>
          <LuTimerReset title="Reset" onClick={() => {dispatch(resetCLOCK())}}/>
          {!clockData.occupied? 
            <IoMdPlay title="Initiate" onClick={() => initiateClock()} /> 
            : 
            (!clockData.paused ? 
              <IoPause title="Pause" onClick={() => {!clockData.completed && dispatch(pauseTIME())}} /> 
              : 
              <IoMdPlay title="Resume" onClick={() => {!clockData.completed && dispatch(resumeTIMER())}} />)
          }         
          <MdRestartAlt title="Renew Current Session" onClick={() => {clockData.occupied && !clockData.completed && dispatch(resetCURRENTSESSION())}} />                     
        </div>

      </div>

    </div>
  )
}

export default Clock;