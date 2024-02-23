import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const client_id = "12N7s5caCx4M60sHs_KJ";
const client_secret = "sz4AopeLSX";
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
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
