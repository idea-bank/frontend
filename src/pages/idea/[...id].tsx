import Post from "@/components/post";
import { Idea, fetchExact } from "@/data/idea-handler";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailedPost() {
  const router = useRouter();
  const { id } = router.query;
  const [idea, setIdea] = useState<Idea>();

  const fetchData = async () => {
    try {
      if (id !== undefined) {
        const ideaData = await fetchExact(id[0], id[1]);
        setIdea(ideaData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ margin: "0 auto", maxWidth: "425px" }}>
      {idea === undefined ? "loading" : <Post idea={idea!}></Post>}
    </div>
  );
}
