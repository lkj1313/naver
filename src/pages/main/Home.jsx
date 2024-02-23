import styles from "./Home.module.css";
import InputBox from "./components/InputBox";
const Home = () => {
  return (
    <div className={styles.firstDiv}>
      <InputBox />
    </div>
  );
};

export default Home;
