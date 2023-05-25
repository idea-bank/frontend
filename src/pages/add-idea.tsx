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

import { Alert, AlertColor } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface AddIdeaData {
  username: string;
  ideaTitle: string;
  ideaDescription: string;
  linkedIdea?: string;
}
type AlertInfo = {
  alert: AlertColor;
  message: String;
};
export default function AddIdea() {
  const [post, setPost] = useState({} as PostModel);
  const [hideLinkedIdea, setHideLinkedIdea] = useState<boolean>(true);
  const [base64Image, setBase64Image] = useState("");
  const [status, setStatus] = useState<AlertInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, setValue, handleSubmit } = useForm<AddIdeaData>();
  const [fileName, setFileName] = useState<string>("");

  const onPost = async (data: AddIdeaData) => {
    setLoading(true);
    const requestBody = {
      author: data.username,
      title: data.ideaTitle,
      description: data.ideaDescription,
      thumbnail: base64Image.replace(/^data:image\/[a-z]+;base64,/, ""),
      diagram: {},
    };

    // Send the POST request

    try {
      const response = await fetch(
        "https://7a2e7443-17af-48cc-83d0-cc4606e9b555.mock.pstmn.io/concepts/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      // Handle the response
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error();
      }

      if (data.linkedIdea) {
        try {
          const response2 = await fetch(
            "https://concepts-service-n5ey5.ondigitalocean.app/concepts/link",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ancestor: data.linkedIdea,
                descendant: `${data.username}/${data.ideaTitle}`,
              }),
            }
          );
          const responseData2 = await response2.json();
          if (!response2.ok) {
            throw new Error();
          }

          setStatus({
            alert: "success",
            message: `Success. Post ${responseData.created.author}/${responseData.created.title} has been created and linked successfully.`,
          });
        } catch (error: any) {
          setStatus({
            alert: "error",
            message: "Failed to Link Idea",
          });
        }
      } else {
        setStatus({
          alert: "success",
          message: `Success. Post ${responseData.created.author}/${responseData.created.title} has been created.`,
        });
      }
    } catch (error: any) {
      setStatus({
        alert: "error",
        message: "Failed to Post Idea",
      });
    } finally {
      setLoading(false);
    }
  };

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
    setValue("ideaTitle", idea.split("/")[1]);
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      setFileName(file.name);
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setBase64Image(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const search = router.asPath.split("?")[1];
    const params = new URLSearchParams(search);
    const idea = params.get("idea");
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
        <form
          className={styles["add-idea-form"]}
          onSubmit={handleSubmit(onPost)}
        >
          <TextField
            label="Display Name"
            variant="outlined"
            helperText="Username"
            sx={{ marginBottom: 1 }}
            {...register("username")}
          />
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

          <div
            id="image-upload"
            style={{ marginBottom: 15, display: "flex", alignItems: "center" }}
          >
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <PhotoCamera />
            </IconButton>
            <div>{fileName}</div>
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
          {/* <Button variant="outlined" type="submit" sx={{ marginBottom: 1 }}>
            Preview
          </Button> */}
          {loading ? (
            <LoadingButton loading variant="contained">
              <span>Add Idea</span>
            </LoadingButton>
          ) : (
            <Button variant="contained" type="submit">
              Add Idea
            </Button>
          )}
          {status ? (
            <Alert severity={status.alert} sx={{ marginTop: 1 }}>
              {status.message}
            </Alert>
          ) : (
            <></>
          )}
        </form>
      </Paper>
    </div>
  );
}
