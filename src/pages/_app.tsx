import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "@/components/navbar";
import { Box } from "@mui/material";
import { useIsLarge, useIsMedium, useIsSmall } from "@/hooks/media-queries";

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useIsSmall();
  const isMedium = useIsMedium();
  const isLarge = useIsLarge();

  const getLeftPadding = () => {
    if (isLarge) {
      return 30;
    } else if (isMedium) {
      return 65 / 8;
    }
    return 0;
  };
  return (
    <Box sx={{ paddingLeft: getLeftPadding() }}>
      <Component {...pageProps} />
      <Navbar />
    </Box>
  );
}
