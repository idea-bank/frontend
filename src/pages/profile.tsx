import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import PROFILE_DATA from "@/data/PROFILE_IMAGES.json";

import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";

export default function Profile() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 600 }}>
        <Box
          sx={{
            padding: 2,
            backgroundColor: "white",
            borderBottom: 1,
            borderColor: "#D3D3D3",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
              paddingBottom: 2,
            }}
          >
            <Avatar alt="Profile Image" src="" sx={{ width: 60, height: 60 }}>
              J
            </Avatar>
            <Typography variant="h5" gutterBottom>
              @jdoe
            </Typography>
            <Button variant="contained" sx={{ marginLeft: "auto" }}>
              Follow
            </Button>
          </Box>

          <Box sx={{}}>
            <Typography>
              <b>John Doe</b>
            </Typography>
            <Typography gutterBottom>Idea Developer</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Typography>
            <b>Ideas</b>
            <br />
            25
          </Typography>
          <Typography>
            <b>Followers</b>
            <br />
            500
          </Typography>
          <Typography>
            <b>Following</b>
            <br />
            250
          </Typography>
        </Box>

        <ImageList
          sx={{ maxWidth: 600, marginTop: 0, marginBottom: 7, gap: 3 / 8 }}
          cols={3}
        >
          {PROFILE_DATA.map((item) => (
            <ImageListItem key={item.post_id}>
              <img src={`${item.media_links}`} style={{}} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
