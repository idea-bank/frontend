import useMediaQuery from "@mui/material/useMediaQuery"
import MobileNav from "./MobileNav";
import SideNav from "./side-nav";

export default function Navbar() {
    const isMobile = useMediaQuery('(max-width:800px)');
    return(
        <>
            { isMobile ? <MobileNav/> : <SideNav/>}
        </>
    )
}