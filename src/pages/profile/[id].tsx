import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import PROFILE_DATA from "@/data/PROFILE_IMAGES.json";

import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/* 
  [Delete]
  Updated this page to use dynamic routing
  /profile/Jackson is an example of a valid route and /profile is no longer valid
  Extract username from query with useRouter() done below
  https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
*/

const url = 'https://accounts-service-fvmy8.ondigitalocean.app';

interface Profile {
  preferred_name: string;
  biography: string;
  avatar_url: string;
}

interface Concept {
  title: string;
  image_url: string;
  author: string;
  description: string;
  diagram: {};
}

interface BaseResponse {
  status_code: number;
  msg: string;
}

interface ProfileReponse extends BaseResponse {
  info: Profile;
}

interface ConceptsResponse extends BaseResponse {
  items: Concept[];
}

// https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
export default function Profile(username: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [thumbnails, setThumbnails] = useState<Concept[]>();

  const fetchProfileData = (username: string) => {
    // TODO: Implement data fetching
    // Fetch from profile endpoint
    // Fetch from concepts for title and thumbnails
    // There isn't a clean way to do ^^^ in v1.
    setProfile(fetch(
        `${url}/accounts/${username}/profile`
    ).then(response => {
        if (response.ok) {
            response.json().then(body =>{
                console.log(body);
                return {
                    preferred_name: body.info.preferred_name,
                    biography: body.info.biography,
                    avatar_url: body.info.avatar_url
                };
            })
        }
        else {
            console.log("Default");
            return {
                preferred_name: "???",
                biography: "Somebody that I used to know...",
                avatar_url: ""
            };
        }
    })
    
    );
    setIsLoading(false);
  };

  useEffect(() => {
    // Extracted username from the route
    const user = router.query.id;
    fetchProfileData(user as string);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  // TODO: Integrate data with profile and thumbnails state
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
            </Typography>
            <Button variant="contained" sx={{ marginLeft: "auto" }}>
              Connect
            </Button>
          </Box>

          <Box sx={{}}>
            <Typography>
              <b> { profile.preferred_name } </b>
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
            <b>Connections</b>
            <br />
            500
          </Typography>
        </Box>

        <ImageList
          sx={{ maxWidth: 600, marginTop: 0, marginBottom: 7, gap: 3 / 8 }}
          cols={3}
        >
          {PROFILE_DATA.map((item) => (
            <ImageListItem key={item.post_id}>
              <img
                src={`${item.media_links}`}
                style={{}}
                loading="lazy"
                onClick={() => {
                  router.push("/idea/Jackson/Skateboard");
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
