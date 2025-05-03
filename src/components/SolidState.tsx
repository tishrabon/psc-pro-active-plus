// !!! CURRENTLY ITS NOT BEING USED !!!

import { useEffect } from "react";
import { resetAPPDATA } from "../redux/appDataSlice";
import { resetUSERDATA } from "../redux/userDataSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"; 


const SolidState = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.userData);
  const appData = useAppSelector(state => state.appData);

  // receiving data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      dispatch(resetUSERDATA(JSON.parse(storedUserData)));
    }

    const storedAppData = localStorage.getItem("appData");
    if (storedAppData) {
      dispatch(resetAPPDATA(JSON.parse(storedAppData)));
    }    
  }, [dispatch]);

  // updating data to localStorage
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData))
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("appData" ,JSON.stringify(appData));
  }, [appData]); 

  return null;
}

export default SolidState;