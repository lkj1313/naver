import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const emailCheck = (username) => {
    return emailRegEx.test(username); //형식에 맞을 경우, true 리턴
  };
  const inputUserName = (e) => {
    setUserName(e.target.value);
    emailCheck(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      //형식에 맞지 않을 경우 아래 콘솔 출력
      console.log("비밀번호 형식을 확인해주세요");
      return;
    } else {
      // 맞을 경우 출력
      console.log("비밀번호 형식이 맞아요");
    }
  };
  const passwordDoubleCheck = (password, passwordChk) => {
    if (password !== passwordChk) {
      console.log("비밀번호가 다릅니다.");
      return;
    } else {
      console.log("비밀번호가 동일합니다");
    }
  };
  const signup = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userName, password);
  };

  return (
    <div>
      <div>
        <input type="email" value={userName} onChange={inputUserName}></input>
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={inputPassword}
        ></input>
      </div>
      <div>
        <button onClick={signup} type="submit">
          회원가입 하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
