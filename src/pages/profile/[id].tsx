import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import PROFILE_DATA from "@/data/PROFILE_IMAGES.json";

import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deepOrange } from "@mui/material/colors";

const url = "https://accounts-service-fvmy8.ondigitalocean.app";
const conceptsUrl = "https://concepts-service-n5ey5.ondigitalocean.app";
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

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [thumbnails, setThumbnails] = useState<Concept[]>();
  const [connected, setConnected] = useState(false);

  const fetchProfileData = async (username: string) => {
    const profileResponse = await fetch(`${url}/accounts/${username}/profile`);
    if (profileResponse.status !== 200) {
      console.log("Error fetching profile data");
      setIsLoading(false);
      return;
    }
    const profileData: ProfileReponse = await profileResponse.json();
    setProfile(profileData.info);

    const conceptsResponse = await fetch(`${conceptsUrl}/concepts/${username}`);
    if (conceptsResponse.status !== 200) {
      console.log("Error fetching concepts data");
    }
    const conceptsData: ConceptsResponse = await conceptsResponse.json();
    setThumbnails(conceptsData.items);
    setIsLoading(false);
  };

  useEffect(() => {
    // Extracted username from the route

    const user = router.query.id;
    if (user) fetchProfileData(user as string);
  }, [router]);

  if (isLoading) return <p>Loading...</p>;

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
            <Avatar
              alt="Profile Image"
              src=""
              sx={{ width: 60, height: 60, bgcolor: deepOrange[500] }}
            >
              {profile.preferred_name[0]}
            </Avatar>
            <Typography variant="h5" gutterBottom></Typography>
            {connected ? (
              <Button
                variant="outlined"
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  setConnected(false);
                }}
              >
                Connected
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  setConnected(true);
                }}
              >
                Connect
              </Button>
            )}
          </Box>

          <Box sx={{}}>
            <Typography>
              <b> {profile.preferred_name} </b>
            </Typography>
            <Typography gutterBottom>{profile.biography}</Typography>
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
            {thumbnails?.length}
          </Typography>
          <Typography>
            <b>Connections</b>
            <br />
            34
          </Typography>
        </Box>

        <ImageList
          sx={{ maxWidth: 600, marginTop: 0, marginBottom: 7, gap: 3 / 8 }}
          cols={3}
        >
          {thumbnails!.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`${item.image_url}`}
                style={{ border: "1px solid #D3D3D3" }}
                loading="lazy"
                onClick={() => {
                  router.push(`/idea/${item.author}/${item.title}`);
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
