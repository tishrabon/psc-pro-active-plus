import { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { loggedSTATUS } from "../../redux/userDataSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const dispatch = useAppDispatch();
  const [mail, setMail] = useState("");
  const [psw, setPsw] = useState("");

  const exeLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Logged In Successfully`);
    signInWithEmailAndPassword(auth, mail, psw)
    .then(() => {
      dispatch(loggedSTATUS(true));
      window.location.href = "/";
      setMail("");
      setPsw("");
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  return (
    <div className="otherpage-container verticalS mt-[32px] gap-5">
      <div className="authboard text-white verticalS gap-2">
        <IoSunnyOutline size={50} className="mt-5"/>
        <p className="text-[18px]">Good Morning!</p>
        <p className="mb-5">Login and keep your momentum going!</p>
      </div >

      <div className="verticalS authbox">

        <form onSubmit={exeLogin} action="" className="verticalC gap-5 py-5">
          <input 
            type="email" placeholder="Email" value={mail} required            
            onChange={(e) => { setMail(e.target.value) }}
            className="border border-gray-300 rounded-sm p-2 text-sm"
          />
          <input 
            type="password" placeholder="Password" value={psw} required            
            onChange={(e) => { setPsw(e.target.value) }}
            className="border border-gray-300 rounded-sm p-2 text-sm"
          />    

          <button type="submit" className="py-2 px-5 rounded-sm bg-material text-white">Login</button>   
        </form>
      </div>
      <div className="p-5 text-center">
        <div>New Enthusiast? Don't have account?</div>
        <div className="border-b border-gray-300 mb-3 pb-3"> <Link to="/register" className="text-green-600 hover:underline">Sign Up</Link> now!</div>
        <div>Forgot Password?</div>
        <div className="border-b border-gray-300 mb-3 pb-3"> <Link to="/reset" className="text-red-400 hover:underline">Reset</Link> Password.</div>
      </div>   


    </div>
  )
};

export default Login;
