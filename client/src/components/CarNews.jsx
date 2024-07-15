import React, { useEffect, useState } from "react";
import { List, UnorderedList, ListItem, Heading, Box } from "@chakra-ui/react";

const cleanCarNews = (articles) => {
  const unwantedKeyWords = [
    "drug",
    "death",
    "kill",
    "dead",
    "murder",
    "violence",
    "gun",
    "violence",
    "jail",
    "prison",
    "shots",
    "weapon",
    "beer",
    "alcohol",
    "dies",
    "stolen",
    "bad words",
    // "[Removed]",
  ];

  const containsUnwantedKeywords = (text) => {
    if (!text) return false;
    return unwantedKeyWords.some((keyword) =>
      text.toLowerCase().includes(keyword),
    );
  };

  //filter the car data to ignore [Removed];
  return articles.filter(
    (article) =>
      article.title !== "[Removed]" &&
      article.description !== "[Removed]" &&
      !containsUnwantedKeywords(article.title) &&
      !containsUnwantedKeywords(article.description),
  );
};

const CarNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/everything?q=car&apiKey=878c3a81e62c4f409d7e1605b6068ca7",
        );
        if (!res.ok) {
          throw new Error("Network response failed");
        }
        const data = await res.json();
        const cleanedData = cleanCarNews(data.articles);
        setNews(cleanedData);
        console.log(cleanedData);
      } catch (error) {
        console.error("error", error);
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
    <Box>
      <Heading>Car Related News</Heading>
      <List>
        <UnorderedList className="newsList">
          {news.map((article, index) => (
            <ListItem className="newsArticle" key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </ListItem>
          ))}
        </UnorderedList>
      </List>
    </Box>
  );
};

export default CarNews;
