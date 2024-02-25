import styles from "./SearchResult.module.css";
const SearchResult = ({ items, searchValue }) => {
  return (
    <div className={styles.firstDiv}>
      {items.length > 1 ? (
        <div>
          {items.map((item, key) => {
            return (
              <a
                key={key}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={styles.itemsDiv}
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
              </a>
            );
          })}
        </div>
      ) : (
        <p>
          <em style={{ color: "blue" }}>'{searchValue}'</em> 에 대한 검색결과가
          없습니다.
          <ul>
            <li>단어의 철자가 정확한지 확인해 보세요.</li>
            <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>
            <li>
              검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해
              보세요.
            </li>
            <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
          </ul>
        </p>
      )}
    </div>
  );
};

export default SearchResult;
