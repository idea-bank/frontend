import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import FeedIcon from '@mui/icons-material/Feed';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from "next/router";

const navPages = [
  {
    label: 'Feed',
    icon: <FeedIcon />,
    route: '/feed',
  },
  {
    label: 'Add Idea',
    icon: <AddIcon />,
    route: '/add-idea',
  },
  {
    label: 'Profile',
    icon: <PersonIcon />,
    route: '/profile',
  },
];

export default function MobileNav() {
    const [value, setValue] = React.useState(0);
    const router = useRouter();

    useEffect(() => {
      const currentRouteIndex = navPages.findIndex(
        (page) => page.route === router.pathname
      );
      setValue(currentRouteIndex);
    }, [router.pathname]);
    
    return(
        <Paper sx={{ position: 'fixed', bottom: 0, left: "0%", right: "0%"}} elevation={1}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            router.push(navPages[newValue].route)
          }}
        >
          {
            navPages.map((page, index) => (
              <BottomNavigationAction
                key={index}
                label={page.label}
                icon={page.icon}
              />
            ))
          }
        </BottomNavigation>
      </Paper>
    )
 
}

