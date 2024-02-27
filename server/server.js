import express from "express";
import axios from "axios";
import { config } from "dotenv"; // dotenv의 config 함수를 가져오기

config(); // .env 파일 로드

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 다른 필요한 CORS 헤더도 설정할 수 있습니다.
  next();
});
app.get("/search/blog", async (req, res) => {
  try {
    const api_url = `https://openapi.naver.com/v1/search/blog?query=${encodeURI(
      req.query.query
    )}`;

    const response = await axios.get(api_url, {
      headers: {
        "X-Naver-Client-Id": process.env.CLIENT_ID, // process.env 사용
        "X-Naver-Client-Secret": process.env.CLIENT_SECRET, // process.env 사용
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ error: "No response received" });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ error: error.message });
    }
    console.error("Error:", error.message);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running at http://127.0.0.1:${PORT}/search/blog?query=검색어`
  );
});
