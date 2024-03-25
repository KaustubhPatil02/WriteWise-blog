// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircle  } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

import Modal from "../../../utility/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { auth, db, provider } from "../../../Firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {toast} from "react-toastify";
import { signInWithPopup } from "firebase/auth";

const Button = ({ icon, text, click }) => {
    return (
      <button
        onClick={click}
        className="flex items-center gap-10 sm:w-[20rem] border border-black
        px-3 py-2 rounded-full">
        {icon} {text}
      </button>
    );
};

Button.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

const Auth = ({modal, setModal}) => {
    const [createUser, setCreateUser] = useState(false);
    const [sigReq, setSigReq] = useState("");

    const navigate = useNavigate();

    const googleAuth = async () => {
      try {
        const createUser = await signInWithPopup(auth, provider);
        const newUser = createUser.user;
  
        const ref = doc(db, "users", newUser.uid);
        const userDoc = await getDoc(ref);
  
        if (!userDoc.exists()) {
          await setDoc(ref, {
            userId: newUser.uid,
            username: newUser.displayName,
            email: newUser.email,
            userImg: newUser.photoURL,
            bio: "",
          });
          navigate("/");
          toast.success("User have been Signed in");
          setModal(false);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const hidden = modal ? "visible opacity-100" : "invisible opacity-0";

    const closeModal = () => {
      setModal(false);
    }

    return (
      <Modal modal={modal} setModal={setModal} hidden={hidden}>
        <section
          className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-blue-400 shadows transition-all duration-500 ${hidden}`}
        >
          <button onClick={closeModal} className="absolute top-8 right-8 text-3xl hover:opacity-50">
            <IoIosCloseCircle />
          </button>
          <div className="flex flex-col justify-center items-center gap-[3rem]">
            <>
              {sigReq === "" ? (
                <>
                  <h2 className="text-2xl pt-[5rem] ">{createUser ? "Join " : "Welcome Again!!!"}</h2>
                  <div className="flex flex-col gap-4 w-fit mx:auto">
                    <Button
                      click={googleAuth}
                      icon={<FcGoogle className="text-2xl" />}
                      text={"Continue with Google"} />
                    <Button
                      click={() => setSigReq(createUser ? "sign-up" : "sign-in")}
                      icon={<MdEmail className="text-2xl text-white" />}
                      text={"Continue with EmailPassword"} />
                  </div>
                  <p>
                    {createUser ? "Already have an account " : "No Account yet?"}
                    <button
                      onClick={() => setCreateUser(!createUser)}
                      className="font-bold text-green-800 ml-1 hover:text-black">
                      {createUser ? " Continue " : "Let's create one"}
                    </button>
                  </p>
                </>
              ) : sigReq === "sign-in" ? (
                <SignIn  setModal={setModal} setSigReq={setSigReq} />
              ) : sigReq  === "sign-up" ? (
                <SignUp setModal={setModal} setSigReq={setSigReq} />
              ) : null}
            </>
          </div>
        </section>
      </Modal>
    );
};

Auth.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default Auth;