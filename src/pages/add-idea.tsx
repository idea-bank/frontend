import { PostModel } from "@/models/PostModel";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../styles/add-idea.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AddIdeaData } from "@/data/add-idea-handler";


export default function AddIdea() {
  const [post, setPost] = useState({} as PostModel);
  const [hideLinkedIdea, setHideLinkedIdea] = useState<boolean>(true);


  const { register, setValue, handleSubmit } = useForm<AddIdeaData>();


  const onPreview = (event: any) => {
    event.preventDefault();
    const postToPreview: PostModel = {
      post_id: "1",
      author_id: "AuthorizedUser",
      contributors: [],
      title: event.target.title.value,
      description: event.target.description.value,
      media_links: "http://dummyimage.com/400x600.png/5fa2dd/ffffff",
    };
    setPost(postToPreview);
    router.push("add-idea/preview", "add-idea");
  };

  const handleLinkCheckBox = () => {
    setHideLinkedIdea(!hideLinkedIdea);
  };
  const setExistingIdea = (idea: string) => {
    setHideLinkedIdea(false);
    setValue("ideaTitle", `${idea} -- Copy`);
    setValue("linkedIdea", idea);

  };

  const router = useRouter();
  const matches = useMediaQuery("(min-width:600px)");

  const getMinHeight = () => {
    return matches ? "" : "100vh";
  };
  const getTopMargin = () => {
    return matches ? "2%" : "";
  };

  useEffect(() => {
    const search = router.asPath.split('?')[1];
    const params = new URLSearchParams(search);
    const idea = params.get('idea');    
    if (idea) {
      setExistingIdea(idea);
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: getTopMargin(),
      }}
    >
      <Paper
        sx={{ height: 1, maxWidth: 625, width: 1, minHeight: getMinHeight() }}
        id="form-container"
      >
        <Typography variant="h3" sx={{ paddingLeft: 2, paddingTop: 2 }}>
          Add an Idea
        </Typography>
        <form className={styles["add-idea-form"]} onSubmit={onPreview}>
          <TextField
            label="Title"
            variant="outlined"
            helperText="Title of your Idea"
            sx={{ marginBottom: 1 }}
            {...register("ideaTitle")}
          />
          <TextField
            label="Description"
            variant="outlined"
            helperText="Description of your Idea"
            multiline
            sx={{ marginBottom: 1 }}
            {...register("ideaDescription")}
          ></TextField>

          <div id="image-upload" style={{ marginBottom: 15 }}>
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <PhotoCamera />
            </IconButton>
          </div>
          <FormControlLabel
            control={<Checkbox />}
            label="Link to an Existing Idea?"
            onChange={handleLinkCheckBox}
            checked={!hideLinkedIdea}
            sx={{ marginBottom: 1 }}
          />
          {hideLinkedIdea ? (
            <></>
          ) : (
            <TextField
              label="Linked Idea"
              variant="outlined"
              helperText="Link to an Idea (Optional)"
              sx={{ marginBottom: 1 }}
              {...register("linkedIdea")}
            />
          )}
          <Button variant="outlined" type="submit" sx={{ marginBottom: 1 }}>
            Preview
          </Button>
          <Button variant="contained">Add Idea</Button>
        </form>
      </Paper>
    </div>
  );
}
