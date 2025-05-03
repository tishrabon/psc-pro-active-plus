import { useState, useEffect } from 'react';
import Modal from "./Modal";
import Volume from './Volume';
import { soundArray } from '../config/freesound';

import { FaSortDown } from "react-icons/fa";;
import { FaCircleCheck } from "react-icons/fa6";
import { ImRadioUnchecked } from "react-icons/im";
import { TbMetronome } from "react-icons/tb";
import { FaEarthAfrica } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { ImLoop2 } from "react-icons/im";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { setFORMATT, session1P, session1M, session3P, SelectDuration, selectAMBIENCE, setELEMENT, updateCYCLE, updateLABEL, uncheckAMBIENCE, setTICK } from '../redux/appDataSlice';
import { setBPM } from '../redux/appDataSlice';
import { useSelector } from 'react-redux';

import { timeHrMin, foucsVsBreak } from '../utils/display';


const Equalizer = () => {
  const elementArray = soundArray;
  const modalHeadStyles = `h-[40px] flex items-center justify-center px-5 bg-second rounded-[5px] text-[16px] place-item-center text-center`;
  const [pomodoroModal, setPomodoroModal ] = useState(false);
  const [ambienceModal, setAmbienceModal] = useState(false);
  const dispatch = useAppDispatch();
  const appData = useAppSelector(state => state.appData);
  const duration = useSelector(SelectDuration);

  const [focusTimeInput, setFocusTimeInput] = useState<number>(0);
  const [breakTimeInput, setBreakTimeInput] = useState<number>(0);

  const [focusNameInput, setFocusNameInput] = useState<string>("");
  const [breakNameInput, setBreakNameInput] = useState<string>("");

  useEffect(() => {
    dispatch(uncheckAMBIENCE());
  }, [])
 
  return (
    <div className="verticalS">
      {/* pomodoro & ambience */}
      <div className="m-2 verticalC">
        <div className="w-[300px] sm:w-[500px] grid grid-cols-[100px_1fr] sm:grid-cols-[1fr_1fr] gap-5 m-5 rounded-[5px] bg-second p-2">
          {/* pomodoro */}
          <div className="flex flex-col justify-start items-center flex-1">
            <button 
              onClick={() => setPomodoroModal(true)}
              className="verticalS border-b border-white w-full text-center text-[14px] pb-2 mb-2"
            >
              <p>Pomodoro</p>
              <FaSortDown className="text-white" />
            </button>

            <div className="verticalC gap-1">
              <div className="text-[12px]">Cycle: {appData.pomodoro.formatt}</div>
              <div className="text-[12px] horizontalC gap-1"><ImLoop2 size={10}/> Loop: {appData.pomodoro.sessions}</div>
              <div className="text-[12px] horizontalC gap-1"><MdOutlineTimer size={14}/> {(timeHrMin(duration))}</div>                      
            </div>              
          </div>

          {/* ambience */}
          <div className="flex flex-col justify-between items-center flex-1">
            <button 
            onClick={() => setAmbienceModal(true)}
            className="verticalS border-b border-white w-full text-center text-[14px] pb-2 mb-2">
              <p>Ambience</p>
              <FaSortDown className="text-white" />
            </button>

            {/* M E T R O N O M E */}
            <div className="w-full grid grid-cols-[20px_1fr] items-center gap-1 border-b border-white pb-2 mb-2">
              <button title="Check to play"
                onClick={() => {dispatch(selectAMBIENCE("metronome"))}}
              >
                {appData.ambience.metronome.selected ? <FaCircleCheck/> : <ImRadioUnchecked/>}
              </button>  
              <div>
                <div>
                  <div className="horizontalC gap-2 text-[12px]">
                    <TbMetronome />
                    <p>Metronome</p>
                  </div>
                  <div className="text-[12px]">Bpm: {appData.ambience.metronome.bpm}</div> 
                </div>   
                <Volume label="metronome" />            
              </div>            
            </div>

            {/* S E R E N I T Y  E L E M E N T S */}
            <div className="w-full grid grid-cols-[20px_1fr] items-center gap-1">
              <button title="Check to play"
                onClick={() => {dispatch(selectAMBIENCE("serenity"))}}
              >
                {appData.ambience.serenityElements.selected ? <FaCircleCheck/> : <ImRadioUnchecked/>}
              </button>  
              <div>
                <div>
                  <div className="horizontalC gap-2 text-[12px]">
                    <FaEarthAfrica />
                    <p>Serenity Elements</p>
                  </div>
                  <div className="text-[12px]">{appData.ambience.serenityElements.element ? appData.ambience.serenityElements.element : "Pls Select Element"}</div>
                </div>
                <Volume label="serenity" />            
              </div>  
              
            </div>
            
          </div>
        </div>          

      </div>   

      {/* pomodoro modal  */}
      <Modal       
      open={pomodoroModal} exeClose={() => setPomodoroModal(false)}>
        <div className="verticalS gap-5">
          
          <h1 className={modalHeadStyles} >Customize Pomodoro</h1>
          {/* formatt */}
          <p className="text-[12px]">Formatt: {appData.pomodoro.formatt}, Session: {appData.pomodoro.sessions}, Duration: {duration ? (timeHrMin(duration)) : "Not Set"}</p>
          <p className="text-[12px] mt-[-10px] border-b border-gray-300 pb-2 mb-1">{appData.pomodoro.formatt ? (foucsVsBreak(appData.pomodoro.formatt, appData.pomodoro.focusName, appData.pomodoro.breakName)) : "Check The Settings Please"}</p>

          <div className="verticalC">
            <p className="w-[200px] border border-gray-400 p-1 my-1 rounded-[5px] text-[14px]">Cycle: {appData?.pomodoro?.formatt ? appData.pomodoro.formatt : "Select Formatt"}</p>

            <select 
            className="bg-second p-1 rounded-[5px] mt-1 text-[14px]"
            onChange={(e) => {dispatch(setFORMATT(e.target.value))}}
            value={appData.pomodoro.formatt}>
              <option value="">Select Cycle</option>
              <option value="25/5">25/5</option>
              <option value="50/10">50/10</option>
              <option value="55/5">55/5</option>
              <option value="3/1">3/1 demo</option>
              {/* <option value=".3/.2">.3/.2 demo</option> */}

            </select>

          </div>

          <div  className="verticalC">
            <p className="w-[200px] border border-gray-400 p-1 text-[14px] my-1 rounded-[5px]">Session Count: {appData?.pomodoro?.sessions ?? "Set"}</p>   

            <div className="flex flex-wrap gap-5 mt-2">
              <button className="w-[35px] h-[35px] text-[12px] p-1 rounded-[5px] bg-second active:bg-gray-300"
              onClick={() => dispatch(session1P())}
              >
                +1
              </button>

              <button className="w-[35px] h-[35px] text-[12px] p-1 rounded-[5px] bg-second active:bg-gray-300"
              onClick={() => dispatch(session1M())}
              >
                -1
              </button>

              <button className="w-[35px] h-[35px] text-[12px] p-1 rounded-[5px] bg-second active:bg-gray-300"
              onClick={() => dispatch(session3P())}
              >
                +3
              </button>                    

            </div> 

          </div>

          <div className="verticalC gap-1">
            <p className="w-[200px] border border-gray-400 p-1 text-[14px] my-1 rounded-[5px]">Customize Cycle</p> 
            <p className="text-[12px] text-gray-400">Time limit 1 - 60 min</p>

            <form action="" className="horizontalC gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                  dispatch(updateCYCLE({focusTimeInput, breakTimeInput}));
                  setFocusTimeInput(0);
                  setBreakTimeInput(0);                
              }}
            >             
              <input type="number" required placeholder="min" min={1} max={60} 
                value={focusTimeInput === 0 ? "" : focusTimeInput}
                className="p-1 border border-gray-300 h-[30px] w-[60px] rounded-[5px] text-center text-[14px]"
                onChange={(e) => {setFocusTimeInput(Number(e.target.value))}}
              />
              <p>/</p>
              <input type="number" required placeholder="min" min={1} max={60}
                value={breakTimeInput === 0 ? "" : breakTimeInput}
                className="p-1 border border-gray-300 h-[30px] w-[60px] rounded-[5px] text-center text-[14px]"
                onChange={(e) => {setBreakTimeInput(Number(e.target.value))}}
              />
              <button type="submit" className="h-[30px] w-[60px] rounded-[5px] bg-second text-[14px]">Update</button>
                            
            </form>
          </div>

          <div className="verticalC gap-3">
            <p className="w-[200px] border border-gray-400 p-1 text-[14px] my-1 rounded-[5px]">Customize Labels</p> 
            
            <div className="verticalC gap-1">
              <p className="text-[12px] text-gray-400">Update Focus Label</p>

              <div className="horizontalC gap-2">
                <input type="text" required placeholder="Focus" minLength={3}
                  value={focusNameInput === "" ? "" : focusNameInput}
                  className="block p-1 border border-gray-300 h-[30px] w-[130px] rounded-[5px] text-center text-[14px]"
                  onChange={(e) => {setFocusNameInput(e.target.value)}}
                />
                <button 
                  className="h-[30px] w-[60px] rounded-[5px] bg-second text-[14px]"
                  onClick={() => {
                    if (focusNameInput !== "") {
                      if (focusNameInput.length >= 3) {
                        dispatch(updateLABEL({cmd: "focus", label: focusNameInput}));
                        setFocusNameInput("");
                      } else {
                        alert("Label must be at least 3 characters long.");
                      }
                    }
                  }}
                >Update</button>
              </div>
            </div> 

            <div className="verticalC gap-1">
              <p className="text-[12px] text-gray-400">Update Break Label</p>

              <div className="horizontalC gap-2">
                <input type="text" required placeholder="Break" minLength={3}
                  value={breakNameInput === "" ? "" : breakNameInput}
                  className="block p-1 border border-gray-300 h-[30px] w-[130px] rounded-[5px] text-center text-[14px]"
                  onChange={(e) => {setBreakNameInput(e.target.value)}}
                />
                <button 
                  className="h-[30px] w-[60px] rounded-[5px] bg-second text-[14px]"
                  onClick={() => {
                    if (breakNameInput !== "") {
                      if (breakNameInput.length >= 3) {
                        dispatch(updateLABEL({cmd: "break", label: breakNameInput}));
                        setBreakNameInput("");
                      } else {
                        alert("Label must be at least 3 characters long.");
                      }
                    }
                  }}
                >Update</button>
              </div>
            </div>             
                                   
          </div>

          
        </div>
      </Modal>        

      {/* ambience modal */}
      <Modal open={ambienceModal} exeClose={() => setAmbienceModal(false)}>
        <p className={`${modalHeadStyles} mb-3`} >Ambience</p>

        {/* metronome */}
        <div className="border-b border-gray-300 pb-5 mb-5 verticalS gap-3">

          <div className="horizontalC text-sm gap-2">
            <TbMetronome /> <span>Metronome</span>
          </div>

          <div>
            <p className="w-[200px] border border-gray-400 p-1 my-1 rounded-[5px] text-[14px]">Bpm: {appData.ambience.metronome.bpm ? appData.ambience.metronome.bpm : appData.ambience.metronome.bpm}</p>   
            <select 
              className="bg-second p-1 rounded-[5px] mt-1 text-[14px]"
              onChange={(e) => {dispatch(setBPM(Number(e.target.value)))}}
              value={appData.ambience.metronome.bpm}
            >
              <option value={50}>Select Bpm</option>
              <option value={40}>40</option>
              <option value={46}>46 +pro</option>
              <option value={50}>50</option>
              <option value={56}>56</option>
              <option value={60}>60</option>
              <option value={62}>62</option>
              <option value={120}>120</option>
              <option value={150}>150</option>
            </select>                     
          </div>

          <div>
            <p className="w-[200px] border border-gray-400 p-1 my-1 rounded-[5px] text-[14px]">{"Tick: "}
              {appData.ambience.metronome.sound === "tick.mp3" && "Default"}
              {appData.ambience.metronome.sound === "tick-classic.wav" && "Classic"}
              {appData.ambience.metronome.sound === "tick-drum.wav" && "Smooth Drum"}
            </p>   
            <select 
              className="bg-second p-1 rounded-[5px] mt-1 text-[14px]"
              onChange={(e) => {dispatch(setTICK(e.target.value))}}
              value={appData.ambience.metronome.sound}
            >              
              <option value="tick.mp3">Default</option>
              <option value="tick-classic.wav">Classic</option>
              <option value="tick-drum.wav">Smooth Drum</option>

            </select>                     
          </div>          

        </div>

        {/* serenity elements */}
        <div className="pb-5 mb-5 verticalS gap-3">

          <div className="horizontalC text-sm gap-2">
            <FaEarthAfrica /> <span>Serenity Elements</span>
          </div>

          <div>
            <p className="w-[200px] border border-gray-400 p-1 my-1 rounded-[5px] text-[14px]">Sound Element: {appData.ambience.serenityElements.element ? appData.ambience.serenityElements.element : "Not Selected"}</p> 

            <select 
              className="bg-second p-1 rounded-[5px] mt-1 text-[14px]"
              onChange={(e) => {dispatch(setELEMENT(e.target.value))}}
              value={appData.ambience.serenityElements.element}
            >
              {elementArray.map((item, index) => (
                <option key={index} value={item.title}>{item.title}</option>
              ))}
            </select> 
          </div>

        </div>
      </Modal>          
    </div>
  )
}

export default Equalizer