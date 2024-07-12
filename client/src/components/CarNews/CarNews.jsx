import React, { useEffect, useState } from "react";

const CarNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/everything?q=car&apiKey=878c3a81e62c4f409d7e1605b6068ca7"
        );
        if (!res.ok) {
          throw new Error("Network response failed");
        }
        const data = await res.json();
        setNews(data.articles);
      } catch {
        // console.error('error', error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <ul className="newsList">
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="blank" rel="article">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarNews;
