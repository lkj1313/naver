import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{6,}$/;

  const emailCheck = (username) => {
    return emailRegEx.test(username); //형식에 맞을 경우, true 리턴 이메일 형식체크 함수
  };

  const passwordCheck = (password) => {
    return passwordRegEx.test(password);
  };

  const inputUserName = (e) => {
    setUserName(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const signup = async () => {
    if (emailCheck(userName) && passwordCheck(password)) {
      try {
        console.log(userName);
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, userName, password);
        alert("가입이 완료되었습니다.");
        navigate("/");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("이미 사용 중인 이메일 주소입니다.");
        } else {
          alert("가입 중 오류가 발생했습니다:", error.message);
        }
      }
    } else {
      if (!emailCheck(userName)) {
        console.log(userName);
        alert("이메일 형식이 맞지 않습니다.");
      }

      if (!passwordCheck(password)) {
        alert("비밀번호가 6자리는 넘어야합니다.");
      }
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="아이디를 입력해주세요"
          type="email"
          value={userName}
          onChange={inputUserName}
        ></input>
      </div>
      <div>
        <input
          placeholder="비밀번호를 입력해주세요"
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
