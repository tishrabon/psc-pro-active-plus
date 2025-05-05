import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUSER, loggedSTATUS } from "../../redux/userDataSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { db, auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Notice from "./Notice";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [psw, setPsw] = useState("");
  const [confirmPsw, setConfirmPsw] = useState("");

  const exeSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, mail, psw)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const newUserData = {
          uid: user.uid,
          name,
          mail,
          complete: false,
        };
        setDoc(doc(db, "userData", user.uid), newUserData);
        dispatch(signupUSER(newUserData));
        dispatch(loggedSTATUS(true));
        setName("");
        setMail("");
        setPsw("");
        setConfirmPsw("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  return (
    <div className="otherpage-container verticalS mt-[32px] gap-5">
      <div className="w-full verticalC px-10">
        <Notice />
      </div>

      <div className="authboard text-white verticalS gap-2">
        <p className="text-[18px] mt-5">Hey You!</p>
        <p className="">Ready to level up? Join the pro-active crew!</p>
        <p className="mb-5">Sign up below and let's make it happen!</p>
      </div>

      <div className="verticalS authbox">
        <form onSubmit={exeSignup} action="" className="verticalC gap-5 py-5">
          <input
            type="text"
            placeholder="What should we call you?"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border border-gray-300 rounded-sm p-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={mail}
            required
            onChange={(e) => {
              setMail(e.target.value);
            }}
            className="border border-gray-300 rounded-sm p-2 text-sm"
          />
          <input
            type="password"
            placeholder="New Password"
            value={psw}
            required
            onChange={(e) => {
              setPsw(e.target.value);
            }}
            className="border border-gray-300 rounded-sm p-2 text-sm"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPsw}
            required
            onChange={(e) => {
              setConfirmPsw(e.target.value);
            }}
            className="border border-gray-300 rounded-sm p-2 text-sm"
          />

          <button
            type="submit"
            className="py-2 px-5 rounded-sm bg-material text-white"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="p-5 text-center">
        <div className="border-b border-gray-300 mb-3 pb-3">
          Go to{" "}
          <Link to="/Login" className="text-green-600 hover:underline">
            Login
          </Link>{" "}
          Page
        </div>
      </div>
    </div>
  );
};

export default Register;
