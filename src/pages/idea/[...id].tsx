import Post from "@/components/post";
import { Idea, fetchExact } from "@/data/idea-handler";
import { useIsSmall } from "@/hooks/media-queries";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailedPost() {
  const [idea, setIdea] = useState<Idea>();
  const isMobile = useIsSmall();
  const fetchData = async () => {
    try {
      const id = window.location.href.split("/idea/")[1].split("/");

      const ideaData = await fetchExact(id[0], id[1]);
      setIdea(ideaData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "425px",
        marginTop: isMobile ? "" : 20,
      }}
    >
      {idea === undefined ? (
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
        <Post idea={idea!}></Post>
      )}
    </div>
  );
}
