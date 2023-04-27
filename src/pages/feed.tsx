import styles from "../styles/feed.module.css";
import { PostModel } from "@/models/PostModel";
import MOCK_DATA from "@/data/MOCK_DATA.json";
import Post from "@/components/post";
import useWindowHeight from "@/hooks/window-height";
import { useIsSmall } from "@/hooks/media-queries";

const getPosts = (): PostModel[] => {
  const postArr: PostModel[] = MOCK_DATA;

  return postArr;
};
export default function Feed() {
  const height = useWindowHeight();
  const isMobile = useIsSmall();
  return (
    <div
      className={styles.feed}
      style={{
        height: isMobile ? height : "auto",
        marginTop: !isMobile ? "3%" : 0,
        scrollSnapType: isMobile ? "y mandatory" : "inherit",
      }}
    >
      {getPosts().map((post: PostModel, index) => {
        return <Post post={post} key={index} />;
      })}
    </div>
  );
}
