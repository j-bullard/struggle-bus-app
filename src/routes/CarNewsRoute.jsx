import React, { useEffect, useState } from "react";
import {
  List,
  UnorderedList,
  ListItem,
  Heading,
  Box,
  Image,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";

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
    "401",
    "police",
    "firefighter",
    "boat",
    "yacht",
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

const CarNewsRoute = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "News | Struggle Bus";
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/everything?q=car&apiKey=[]}",
        );
        if (!res.ok) {
          throw new Error("Network response failed");
        }
        const data = await res.json();
        const cleanedData = cleanCarNews(data.articles);
        setNews(cleanedData);
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
    <>
      <Box>
        <Stack mb={10} mt={15}>
          <Heading>Car Related News</Heading>
        </Stack>
        <Stack mb={5}>
          {/* <List> */}
          <Grid className="newsList" templateColumns="repeat(3, 1fr)" gap={6}>
            {/* <UnorderedList className="newsList"> */}
            {news.map((article, index) => (
              <GridItem className="newsArticle" key={index}>
                <Card
                  as={"a"}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardBody>
                    <Image
                      borderRadius="lg"
                      // boxSize="300px"
                      // boxShadow="6px 6px 3px grey"
                      // objectFit="scale-down"
                      // border
                      src={
                        article.urlToImage
                          ? article.urlToImage
                          : "/images/mater.jpg"
                      }
                      alt="Car Image"
                    />
                    <Text>{article.title}</Text>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

export { CarNewsRoute };
export default CarNewsRoute;
