import useMediaQuery from "@mui/material/useMediaQuery"
import MobileNav from "./MobileNav";

export default function Navbar() {
    const isMobile = useMediaQuery('(max-width:425px)');
    return(
        <>
            { isMobile ? <MobileNav/> : <></>}
        </>
    )
}