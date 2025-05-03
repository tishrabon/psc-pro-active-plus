import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { signoutUSER, loggedSTATUS, fetchUSERDATA } from "../redux/userDataSlice";
import { NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";


const Header = () => {
  const dispatch = useAppDispatch();
  const loggedIn: boolean = useAppSelector(state => state.userData.loggedIn);
  // const [status, setStatus] = useState<boolean | null>(null);

  const exeSignout: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await signOut(auth);
    dispatch(signoutUSER());
    window.location.href = "/";
  }    

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("loggedIn", user);
        // setStatus(true);
        dispatch(fetchUSERDATA(user.uid));
        dispatch(loggedSTATUS(true));
      } else {
        // console.log("logged out");
        // setStatus(false);
        dispatch(loggedSTATUS(false));
      }
    });

    return () => unsubscribe();
  }, []);
  

  return (
    <div className="w-full bg-material px-5 py-2 horizontalC">
      <div className="w-full max-w-[1200px] horizontalBet">   
        {loggedIn ? 
        <button onClick={exeSignout}>
          Sign Out
        </button> : (
          <NavLink to="/login">Login</NavLink>
        )}             

        <NavLink to="/">+proActive beta</NavLink>


        <NavLink to="/doc">Doc</NavLink>

      </div>
      
    </div>
  );
};

export default Header;
