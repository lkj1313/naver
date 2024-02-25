import styles from "./Home.module.css";
import InputBox from "./components/InputBox";
import { getAuth, signOut } from "firebase/auth";
const Home = ({ userId }) => {
  const auth = getAuth(); // auth 객체 가져오기
  const id = userId.slice(0, 2); // userId의 첫 두 글자를 추출
  console.log(userId);

  const handleLogout = async () => {
    const confirmed = window.confirm(`${userId}님 로그아웃 하시겠습니까?`);
    if (confirmed) {
      try {
        await signOut(auth);
        alert("로그아웃이 완료되었습니다.");
      } catch (error) {
        console.error("로그아웃 중 오류가 발생했습니다:", error.message);
      }
    }
  };
  return (
    <div className={styles.firstDiv}>
      <div className={styles.userIcon} onClick={handleLogout}>
        <p className={styles.logOutButton}>로그아웃</p>
      </div>

      <InputBox />
    </div>
  );
};

export default Home;
