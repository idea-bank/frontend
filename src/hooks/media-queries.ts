import { useMediaQuery } from "@mui/material";

const useIsLarge = () => {
  return useMediaQuery("(min-width: 1200px)");
};

const useIsMedium = () => {
  return useMediaQuery("(min-width: 799px)");
};

const useIsSmall = () => {
  return useMediaQuery("(max-width: 800px)");
};

export { useIsLarge,  useIsMedium, useIsSmall };
