import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNav from "./mobile-nav";
import SideNav from "./side-nav";
import { ReactNode } from "react";
import FeedIcon from "@mui/icons-material/Feed";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

export interface NavLink {
  label: string;
  icon: ReactNode;
  route: string;
}

const navLinks: NavLink[] = [
  {
    label: "Feed",
    icon: <FeedIcon />,
    route: "/feed",
  },
  {
    label: "Add Idea",
    icon: <AddIcon />,
    route: "/add-idea",
  },
  {
    label: "Profile",
    icon: <PersonIcon />,
    route: "/profile/Jackson",
  },
];

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width:800px)");
  return (
    <>
      {isMobile ? (
        <MobileNav navLinks={navLinks} />
      ) : (
        <SideNav navLinks={navLinks} />
      )}
    </>
  );
}
