import styles from "../styles/feed.module.css";
import Post from "@/components/post";
import useWindowHeight from "@/hooks/window-height";
import { useIsSmall } from "@/hooks/media-queries";
import {
  Idea,
  PagedItem,
  fetchBulk,
  fetchFeed as getFeed,
} from "@/data/idea-handler";
import { useEffect, useState, useRef, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function Feed() {
  const height = useWindowHeight();
  const isMobile = useIsSmall();

  const initialNumberOfIdeas = 2;
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [ideaPointer, setPointer] = useState(initialNumberOfIdeas);
  const [pagedItems, setPagedItems] = useState<PagedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getNext = () => {
    const amountToGet = 2;
    setLoading(true);

    try {
      fetchBulk(pagedItems.slice(ideaPointer, ideaPointer + amountToGet)).then(
        (data) => {
          setIdeas([...ideas, ...data]);
          setPointer(ideaPointer + amountToGet);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Get initial posts
    getFeed().then((data) => {
      setPagedItems(data.paged_items);
      fetchBulk(data.paged_items.slice(0, initialNumberOfIdeas)).then(
        (data) => {
          setIdeas(data);
          setLoading(false);
        }
      );
    });
  }, []);

  const observerTarget = useRef<any>(null);

  const lastIdea = useCallback(
    (node) => {
      if (!node) return;
      if (loading) return;
      if (observerTarget.current) observerTarget.current.disconnect();
      if (ideas.length >= pagedItems.length) return;
      observerTarget.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            getNext();
          }
        },
        { threshold: 0.6 }
      );
      observerTarget.current.observe(node);
    },
    [loading, ideas]
  );
  return (
    <div
      className={styles.feed}
      style={{
        height: isMobile ? height : "auto",
        marginTop: !isMobile ? "3%" : 0,
        scrollSnapType: isMobile ? "y mandatory" : "inherit",
      }}
    >
      {ideas.map((idea, index) => {
        if (index === ideas.length - 1) {
          return (
            <div ref={lastIdea} key={index}>
              <Post idea={idea} />
            </div>
          );
        }
        return (
          <div key={index}>
            <Post idea={idea} />
          </div>
        );
      })}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 2,
            paddingBottom: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}
