import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LinkIcon from "@mui/icons-material/Link";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import useWindowHeight from "@/hooks/window-height";
import { useRouter } from "next/router";
import { useIsSmall } from "@/hooks/media-queries";
import ParkIcon from "@mui/icons-material/Park";
import { Idea } from "@/data/idea-handler";

const getImageHeight = (matches700: boolean, matches800: boolean) => {
  if (matches800) {
    return 540;
  } else if (matches700) {
    return 440;
  }
  return 350;
};

const getCardHeight = (isMobile: boolean, height: number) => {
  return isMobile ? 721 : Math.min(height - 56, 850);
};

const getMarginBottom = (isMobile: boolean, height: number) => {
  return isMobile ? (height - 721) / 8 : 8;
};

export default function Post(props: { idea: Idea }) {
  const height = useWindowHeight();

  const router = useRouter();
  const routeToDetailedView = () => {
    router.push(`/idea/${props.idea.author}/${props.idea.title}`);
  };
  const routeToLineage = () => {
    router.push(`/lineage/${props.idea.author}/${props.idea.title}`);
  };
  const routeToGraph = () => {
    router.push(`/component-graph/${props.idea.author}/${props.idea.title}`);
  };
  const linkIdea = () => {
    router.push({
      pathname: "/add-idea",
      query: { idea: props.idea.title },
    });
  };

  const [liked, setLiked] = useState(false);
  const likeIdea = () => {
    setLiked(!liked);
  };
  const matches800 = useMediaQuery("(min-height: 800px)");
  const matches700 = useMediaQuery("(min-height: 700px)");
  const isMobile = useIsSmall();

  const postStyle = () => {
    return isMobile
      ? {
          height: getCardHeight(!isMobile, height),
          scrollSnapAlign: "start",
          marginBottom: getMarginBottom(!isMobile, height),
        }
      : { marginBottom: 5 };
  };

  return (
    <Card sx={postStyle}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            I
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={props.idea.title}
        subheader={`@${props.idea.author}`}
      />
      <Box
        sx={{
          height: getImageHeight(matches700, matches800),
          bgcolor: "rgb(248 250 252)",
        }}
      >
        <CardMedia
          sx={{
            height: 1,
          }}
          component="img"
          image={props.idea.image_url}
          onClick={routeToDetailedView}
        />
      </Box>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.idea.description + " " + props.idea.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={likeIdea}>
          {liked ? (
            <FavoriteIcon sx={{ color: "#e62723" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        <IconButton aria-label="link" onClick={linkIdea}>
          <LinkIcon />
        </IconButton>
        <IconButton aria-label="tree" onClick={routeToLineage}>
          <ParkIcon />
        </IconButton>
        <IconButton aria-label="graph" onClick={routeToGraph}>
          <AccountTreeIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
