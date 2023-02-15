import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import React from "react";
import FeedIcon from '@mui/icons-material/Feed';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
export default function MobileNav() {
    const [value, setValue] = React.useState(0);
    return(
        <Paper sx={{ position: 'fixed', bottom: 0, left: "0%", right: "0%"}} elevation={1}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Feed" icon={<FeedIcon/>} />
          <BottomNavigationAction label="Add Post" icon={<AddIcon/>} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon/>} />
        </BottomNavigation>
      </Paper>
    )
 
}

function setValue(newValue: any) {
    throw new Error("Function not implemented.");
}
