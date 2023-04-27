import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { NavLink } from "./navbar";

export default function MobileNav(props: { navLinks: NavLink[] }) {
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const currentRouteIndex = props.navLinks.findIndex(
      (page) => page.route === router.pathname
    );
    setValue(currentRouteIndex);
  }, [router.pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: "0%", right: "0%" }}
      elevation={1}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          router.push(props.navLinks[newValue].route);
        }}
      >
        {props.navLinks.map((page, index) => (
          <BottomNavigationAction
            key={index}
            label={page.label}
            icon={page.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
