import { theme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";

const proTheme = extendTheme(theme);
const extension = {
  colors: { ...proTheme.colors, brand: proTheme.colors.blue },
};

export default extendTheme(extension);
