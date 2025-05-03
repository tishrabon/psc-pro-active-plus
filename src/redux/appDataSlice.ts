import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; 
import { soundArray } from '../config/freesound';

interface TAppData {
  checked: boolean;   

  clock: {
    activeFormatt: string | null;
    running: string,
    occupied: boolean,
    startTime: number | null,
    remaining: number | null,
    workTime: number | null,
    breakTime: number | null,
    time: number | null,
    volume: number,

    sessionsTotal: number | null,
    sessionsLeft: number | null,
    sessionsDone: number | null,
    completed: boolean,
    paused: boolean, 
    resumed: boolean,  
    resetSess: boolean, 

    swStartTime: number | null,
    swRunning: boolean | null,
    swElapsedTimeBeforePaused: number | null,
  };

  pomodoro: {
    formatt: string,
    focusName: string,
    breakName: string,
    sessions: number,
    duration: number,
    status: string,
  };
  
  ambience: {
    current: string,
    active: boolean,

    metronome: {
      selected: boolean,
      bpm: number,
      volume: number,
      sound: string,
    };      
    serenityElements: {
      selected: boolean,
      element: string,
      elementId: string,
      volume: number,
    }
  };
  
}

const initialState: TAppData = {
  checked: false,

  clock: {
    activeFormatt: null,
    running: "no", // no/work/break
    occupied: false,
    startTime: null,
    remaining: null,
    workTime: null,
    breakTime: null,    
    time: null,
    volume: .6,

    sessionsTotal: null,
    sessionsLeft: null,
    sessionsDone: null,
    completed: false,
    paused: false,
    resumed: false,
    resetSess: false,

    swStartTime: null,
    swRunning: null,
    swElapsedTimeBeforePaused: null,
  },

  pomodoro: {
    formatt: "25/5",
    focusName: "Focus",
    breakName: "Break",
    sessions: 2,
    status: "",
    duration: 1,
  },
  
  ambience: {
    current: "",
    active: false,

    metronome: {
      selected: true,
      bpm: 50,
      volume: .3,
      sound: "tick.mp3",
    },  

    serenityElements: {
      selected: false,
      element: "Rainfalls",  
      elementId:"537558",
      volume: .4,    
    }
  }  
};

export const SelectDuration = (state: RootState) => {
  const { formatt, sessions } = state.appData.pomodoro;
  const [workTime, breakTime] = formatt.split("/").map(Number);
  return ((workTime+breakTime) * sessions);
}

export const SelectWorkDuration = (state: RootState) => {
  const { activeFormatt } = state.appData.clock;
  if (activeFormatt) {
    const [workTime] = activeFormatt.split("/").map(Number);
    return workTime;
  }

}

export const SelectBreakDuration = (state: RootState) => {
  const { activeFormatt } = state.appData.clock;
  if (activeFormatt) {
    const [, breakTime] = activeFormatt.split("/").map(Number);
    return breakTime;
  }
}


const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    HOLLA: (state) => { 
      if (state.checked) {
        state.checked = false;        
      } else {
        state.checked = true;        
      }
    },
    // NOT SURE WHETHER IS NEEDED OR NOT - BELOW
    resetAPPDATA: (_state, action: PayloadAction<TAppData>) => {
      return action.payload;
    },

    // M E T R O N O M E SETTINGS
    setFORMATT: (state, action: PayloadAction<string>) => {
      state.pomodoro.formatt = action.payload;
    },
    session1P: (state) => {
      if (state.pomodoro.sessions < 11) {
        state.pomodoro.sessions += 1;
      }      
    }, 
    session1M: (state) => {
      if (state.pomodoro.sessions > 1 ) {
        state.pomodoro.sessions -= 1;
      }      
    }, 
    session3P: (state) => {
      if (state.pomodoro.sessions < 11) {
        state.pomodoro.sessions += 3;
      }
    }, 
    setBPM: (state, action: PayloadAction<number>) => {
      state.ambience.metronome.bpm = action.payload;
    },

    // P O M O D O R O  C L O C K
    initiate: (state) => {
      const [workTime, breakTime] = state.pomodoro.formatt.split("/").map(Number);
      state.clock.activeFormatt = state.pomodoro.formatt;
      state.clock.workTime = workTime;
      state.clock.breakTime = breakTime;

      state.clock.occupied = true;
      state.clock.running = "work";

      state.clock.sessionsTotal = state.pomodoro.sessions;
      state.clock.startTime = new Date().getTime();
      state.clock.sessionsLeft = state.pomodoro.sessions - 1;
      state.clock.sessionsDone = 0;

      state.clock.remaining = workTime;

      state.clock.swStartTime = Date.now();
      state.clock.swRunning = true;      

    },
    resetCLOCK: (state) => {
      state.clock.running = "no";
      state.clock.occupied = false;
      state.clock.startTime = null;
      state.clock.remaining = null;
      state.clock.workTime = null;
      state.clock.breakTime = null;
      state.clock.time = null;

      state.clock.sessionsTotal = null;
      state.clock.sessionsLeft = null;
      state.clock.sessionsDone = null;
      state.clock.paused = false;
      state.clock.completed = false;
      state.clock.resumed = false;
      state.clock.resetSess = false;

      state.clock.swRunning = null;
      state.clock.swStartTime = null;
      state.clock.swElapsedTimeBeforePaused = null;

      state.clock.activeFormatt = null;
    },
    
    timerDONE: (state) => {
      if (state.clock.running === "work") {
        state.clock.running = "break";
        state.clock.startTime = Date.now();
        state.clock.remaining = state.clock.breakTime;
        // console.log("timeDone call - work");       
      }
      else if (state.clock.sessionsLeft !== null && state.clock.sessionsLeft >= 0 && state.clock.sessionsDone != null && state.clock.sessionsDone >= 0 && state.clock.running === "break") {

        state.clock.running = "work";
        state.clock.startTime = Date.now();
        state.clock.remaining = state.clock.workTime;
        state.clock.sessionsLeft -= 1;
        state.clock.sessionsDone += 1;           
        // console.log("timeDone call - break");        
      }
    },
    completedSESSION: (state) => {
      state.clock.completed = true;
      state.clock.sessionsDone = state.clock.sessionsTotal;    
    },

    pauseTIME: (state) => {
      state.clock.paused = true;
      state.clock.resumed = false;
      if (state.clock.startTime && state.clock.workTime && state.clock.breakTime && state.clock.swStartTime) {
        const now = Date.now();
        const timeGone = now - state.clock.startTime;      
        
        let tempRem: number = 0;
        if (state.clock.running === "work") {
          tempRem = ((state.clock.workTime) * 60 * 1000) - timeGone;        
        }
        if (state.clock.running === "break") {
          tempRem = ((state.clock.breakTime) * 60 * 1000) - timeGone;        
        }
        state.clock.remaining = tempRem;      
        
        // stopwatch executions
        state.clock.swElapsedTimeBeforePaused = Date.now() - state.clock.swStartTime;
        state.clock.swRunning = false;         
      }
     
    },

    resumeTIMER: (state) => {
      state.clock.paused = false;
      state.clock.resumed = true;

      if (state.clock.running === "work" && state.clock.workTime && state.clock.remaining) {
        state.clock.startTime = Date.now() - ((state.clock.workTime * 60 * 1000) - state.clock.remaining);        
      }  
      if (state.clock.running === "break" && state.clock.breakTime && state.clock.remaining) {
        state.clock.startTime = Date.now() - ((state.clock.breakTime * 60 * 1000) - state.clock.remaining);        
      }        
      
      if (state.clock.swElapsedTimeBeforePaused) {
        state.clock.swStartTime = Date.now() - state.clock.swElapsedTimeBeforePaused;
        state.clock.swRunning = true;
      }

    },

    clearStopwatchRESUME: (state) => {
      state.clock.swElapsedTimeBeforePaused = null;
    },

    clearRESUME: (state) => {
      state.clock.resumed = false;
      // console.log("clearRESUME & remTime:", state.clock.remaining);
      // console.log("clearRESUME & startTime:", state.clock.startTime);
    },
    resetCURRENTSESSION: (state) => {
      state.clock.running = "work";
      state.clock.resetSess = true;
      state.clock.startTime = Date.now();
      state.clock.paused = false;
      state.clock.resumed = false;
      if (state.clock.workTime) {
        state.clock.remaining = (state.clock.workTime) * 60 * 1000;
      }

    },
    clearRESETCURRENT: (state) => {
      state.clock.resetSess = false;
    },

    // A M B I E N C E EXECUTIONS
    selectAMBIENCE: (state, action: PayloadAction<string>) => {
      const arg: string = action.payload;
      if (arg === "metronome") {
        state.ambience.metronome.selected = !state.ambience.metronome.selected;
      }
      else if (arg === "serenity") {
        state.ambience.serenityElements.selected = !state.ambience.serenityElements.selected;
      }
    },

    increaseVOLUME: (state, action: PayloadAction<string>) => {
      const arg: string = action.payload;
      if(arg === "metronome") {
        if (state.ambience.metronome.volume <= .9 && state.ambience.metronome.volume >= .1) {
          state.ambience.metronome.volume = parseFloat((state.ambience.metronome.volume + .1).toFixed(1)); 
        }
      }
      if (arg === "serenity") {
        if (state.ambience.serenityElements.volume <= .9 && state.ambience.serenityElements.volume >= .1) {
          state.ambience.serenityElements.volume = parseFloat((state.ambience.serenityElements.volume + .1).toFixed(1));
        }
      }
      if (arg === "clock") {
        if (state.clock.volume <= .9 && state.clock.volume >= 0) {
          state.clock.volume = parseFloat((state.clock.volume + .1).toFixed(1));
        }
      }      

    },

    decreaseVOLUME: (state, action: PayloadAction<string>) => {
      const arg: string = action.payload;
      if(arg === "metronome") {
        if (state.ambience.metronome.volume <= 1 && state.ambience.metronome.volume > .1) {
          state.ambience.metronome.volume = parseFloat((state.ambience.metronome.volume - .1).toFixed(1));
        }
      }
      if (arg === "serenity") {
        if (state.ambience.serenityElements.volume <= 1 && state.ambience.serenityElements.volume > .1) {
          state.ambience.serenityElements.volume = parseFloat((state.ambience.serenityElements.volume - .1).toFixed(1)); 
        }
      }
      if (arg === "clock") {
        if (state.clock.volume <= 1 && state.clock.volume >= .1) {
          state.clock.volume = parseFloat((state.clock.volume - .1).toFixed(1)); 
        }
      }      
    },

    setELEMENT: (state, action: PayloadAction<string>) => {
      const element: string = action.payload;
      const elementObj = soundArray.find(item => item.title === element);
      if (elementObj) {
        state.ambience.serenityElements.element = element;
        state.ambience.serenityElements.elementId = elementObj.id;        
      }
    },

    updateCYCLE: (state, action: PayloadAction<{focusTimeInput: number; breakTimeInput: number}>) => {
      const {focusTimeInput, breakTimeInput} = action.payload;
      state.pomodoro.formatt = `${focusTimeInput}/${breakTimeInput}`;
    },

    updateLABEL: (state, action: PayloadAction<{cmd: string; label: string}>) => {
      const {cmd, label} = action.payload;
      if (cmd === "focus") {
        state.pomodoro.focusName = label;
      }
      if (cmd === "break") {
        state.pomodoro.breakName = label;
      }
    },

    uncheckAMBIENCE: (state) => {
      if (state.clock.occupied) {
        state.ambience.metronome.selected = false;
        state.ambience.serenityElements.selected = false;
      }
    },

    setTICK: (state, action: PayloadAction<string>) => {
      state.ambience.metronome.sound = action.payload;
    }
    
  }  
});

export const { HOLLA, resetAPPDATA, setFORMATT, session1P, session1M, session3P, setBPM, initiate, resetCLOCK, timerDONE, completedSESSION, pauseTIME, resumeTIMER, clearRESUME, resetCURRENTSESSION, clearRESETCURRENT, selectAMBIENCE, increaseVOLUME, decreaseVOLUME, setELEMENT, clearStopwatchRESUME, updateCYCLE, updateLABEL, uncheckAMBIENCE, setTICK } = appDataSlice.actions;
export default appDataSlice.reducer;

