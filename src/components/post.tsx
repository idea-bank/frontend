import { PostModel } from "@/models/PostModel";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import styles from "../styles/post.module.css"
import useWindowHeight from "@/hooks/window-height";


const getImageHeight = (matches700 : boolean, matches800 : boolean) => {
  if(matches800){
    return 540;
  }
  else if(matches700){
    return 440;
  }
  return 350;
}

const getCardHeight = (isMobile : boolean, height : number) => {
  return isMobile ? 721 : height-56;
}

const getMarginBottom = (isMobile : boolean, height : number) => {
  return isMobile ? (height-721) / 8 : 8;
}

function Post(props: { post: PostModel }) {
  const height = useWindowHeight();

  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 200) + 100);
  }, []);


  const matches800 = useMediaQuery('(min-height: 800px)');
  const matches700 = useMediaQuery('(min-height: 700px)');
  const isMobile = useMediaQuery('(min-width: 425px');
  return (
  <Card sx={{ maxWidth: 425, height: getCardHeight(isMobile, height),  scrollSnapAlign : "start", marginBottom: getMarginBottom(isMobile, height)}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            I
          </Avatar>
        }
        action={<IconButton aria-label="settings">
            
        </IconButton>}
        title={props.post.title}
        subheader={`@${props.post.author_id}`}
      />
      <CardMedia
        sx={{maxHeight: getImageHeight(matches700, matches800)}}
        component="img"
        image={props.post.media_links}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {props.post.description + " " + props.post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="upvote">
            <ArrowCircleUpIcon/>
        </IconButton>
        <Typography id="vote-count">
            {randomNumber}
        </Typography>
        <IconButton aria-label="downvote">
            <ArrowCircleDownIcon/>
        </IconButton>
      </CardActions>
    </Card>
  
  );
}


export default Post;
