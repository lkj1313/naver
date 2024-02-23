import styles from "./InputBox.module.css";
import logo from "../../../assets/naverLogo.png";
import readingGlasses from "../../../assets/readingGlasses.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchResult from "./SearchResult";
const InputBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const onQuerySubmit = (e) => {
    e.preventDefault();
    // 검색 로직을 구현하고 결과를 setSearchResults로 설정
    // 여기에서 서버로 요청하여 결과를 가져올 수 있습니다.

    // 예시: 검색 결과를 가져오는 코드
    fetch(`http://localhost:3000/search/blog?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 검색 결과를 콘솔에 출력
        setSearchResults(data); // 검색 결과를 state에 설정
      })
      .catch((error) => {
        console.error("Error during search:", error);
        // 에러가 발생했을 때 처리할 코드를 추가할 수 있습니다.
      });
  };

  return (
    <div className={styles.div}>
      <div className={styles.inputDiv}>
        <form className={styles.form} onSubmit={onQuerySubmit}>
          <input
            value={searchQuery}
            onChange={handleQuery}
            className={styles.input}
            placeholder="검색어를 입력해주세요"
          ></input>
          <Link to="/home">
            <img src={logo} alt="naverLogo" className={styles.Logo} />
          </Link>
          <button type="submit" className={styles.searchButton}>
            <img
              src={readingGlasses}
              alt="readingGlassesLogo"
              className={styles.readingGlasses}
            />
          </button>
        </form>
      </div>
      <SearchResult results={searchResults} />
    </div>
  );
};

export default InputBox;
