import styles from "./InputBox.module.css";
import logo from "../../../assets/naverLogo.png";
import readingGlasses from "../../../assets/readingGlasses.jpg";

import { useState } from "react";
import SearchResult from "./SearchResult";
const InputBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [searchValue, setSearchValue] = useState();
  const [searching, setSearching] = useState(false);
  const handleQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const onQuerySubmit = (e) => {
    e.preventDefault();
    setSearching(true);

    // 검색 로직을 구현하고 결과를 setSearchResults로 설정
    // 여기에서 서버로 요청하여 결과를 가져올 수 있습니다.

    // 예시: 검색 결과를 가져오는 코드
    fetch(`http://localhost:3000/search/blog?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 검색 결과를 콘솔에 출력
        setSearchResults(data); // 검색 결과를 state에 설정
        setSearchValue(searchQuery);
      })
      .catch((error) => {
        console.error("Error during search:", error);
        // 에러가 발생했을 때 처리할 코드를 추가할 수 있습니다.
      })
      .finally(() => {
        // 1초 후에 searching 상태를 false로 설정하여 결과를 표시
        setTimeout(() => {
          setSearching(false);
        }, 1000);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onQuerySubmit(e);
    }
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
            onKeyPress={handleKeyPress}
          ></input>

          <img
            onClick={() => {
              setSearchQuery("");
              setSearchResults(null);
            }}
            src={logo}
            alt="naverLogo"
            className={styles.Logo}
          />

          <button type="submit" className={styles.searchButton}>
            <img
              src={readingGlasses}
              alt="readingGlassesLogo"
              className={styles.readingGlasses}
            />
          </button>
        </form>
      </div>

      {searching ? (
        <div className={styles.spinnerDiv}>
          <div className={styles.spinner}></div>
          <div>Loading...</div>
        </div>
      ) : (
        searchResults && (
          <SearchResult searchValue={searchValue} items={searchResults.items} />
        )
      )}
    </div>
  );
};

export default InputBox;
