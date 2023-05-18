import styles from "../styles/feed.module.css";
import Post from "@/components/post";
import useWindowHeight from "@/hooks/window-height";
import { useIsSmall } from "@/hooks/media-queries";
import { Idea, fetchFeed } from "@/data/idea-handler";
import { useEffect, useState } from "react";

export default function Feed() {
  const height = useWindowHeight();
  const isMobile = useIsSmall();

  const [data, setData] = useState<Idea[]>([]);
  const fetchData = async () => {
    try {
      const feedData = await fetchFeed();
      setData(feedData);
      // Access the data and perform operations
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={styles.feed}
      style={{
        height: isMobile ? height : "auto",
        marginTop: !isMobile ? "3%" : 0,
        scrollSnapType: isMobile ? "y mandatory" : "inherit",
      }}
    >
      {data.map((idea, index) => {
        return <Post idea={idea} key={index} />;
      })}
    </div>
  );
}
