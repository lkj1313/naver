import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = ({ setUserId, loginId, setLoginId }) => {
  const navigate = useNavigate();
  const [LoginPassword, setLoginPassword] = useState();
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{6,}$/;

  const emailCheck = (username) => {
    return emailRegEx.test(username);
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

  const Login = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지

    if (emailCheck(loginId) && passwordCheck(LoginPassword)) {
      setUserId(loginId);
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, loginId, LoginPassword);
        alert("로그인이 완료되었습니다.");
        navigate("/home");
      } catch (error) {
        alert("로그인 중 오류가 발생했습니다:", error.message);
      }
    }
  };

  return (
    <form onSubmit={Login}>
      <input
        type="email"
        value={loginId}
        onChange={inputLoginId}
        placeholder="아이디를 입력해주세요"
      />
      <br />
      <input
        value={LoginPassword}
        type="password"
        onChange={inputLoginPassword}
        placeholder="비밀번호를 입력해주세요"
      />
      <br />
      <button type="submit">로그인</button>
      <button>
        <Link to="/signup">회원가입 페이지로 이동</Link>
      </button>
    </form>
  );
};

export default Login;
