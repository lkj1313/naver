import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [LoginId, setLoginId] = useState("");
  const [LoginPassword, setLoginPassword] = useState();
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{6,}$/;

  const emailCheck = (username) => {
    return emailRegEx.test(username); //형식에 맞을 경우, true 리턴 이메일 형식체크 함수
  };

  const passwordCheck = (password) => {
    return passwordRegEx.test(password);
  };
  const inputLoginId = (e) => {
    setLoginId(e.target.value);
  };
  const inputLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };
  const Login = async () => {
    if (emailCheck(LoginId) && passwordCheck(LoginPassword)) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, LoginId, LoginPassword);
        alert("로그인이 완료되었습니다.");
        navigate("/home");
      } catch (error) {
        alert("로그인 중 오류가 발생했습니다:", error.message);
      }
    }
  };

  return (
    <div>
      <input
        type="email"
        value={LoginId}
        onChange={inputLoginId}
        placeholder="아이디를 입력해주세요"
      ></input>
      <br></br>
      <input
        value={LoginPassword}
        type="password"
        onChange={inputLoginPassword}
        placeholder="비밀번호를 입력해주세요"
      />
      <br></br>
      <button onClick={Login} type="submit">
        로그인
      </button>

      <button>
        <Link to="/signup">회원가입 페이지로 이동</Link>
      </button>
    </div>
  );
};

export default Login;
