import Post from "@/components/post";
import { PostModel } from "@/models/PostModel";
import { useRouter } from "next/router";

const post: PostModel = {
  post_id: "2",
  author_id: "bcomford1",
  contributors: [],
  title: "Light Bulb",
  description: "This is my idea for a",
  media_links: "http://dummyimage.com/400x600.png/5fa2dd/ffffff",
};
export default function DetailedPost() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div style={{ margin: "0 auto", marginTop: "3%", maxWidth: "425px" }}>
      <Post post={post} />
    </div>
  );
}
