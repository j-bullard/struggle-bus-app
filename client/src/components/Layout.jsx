import { Box, Button, Container, Stack, Image } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { RxDashboard, RxMagnifyingGlass, RxRocket } from "react-icons/rx";

const Layout = () => {
  return (
    <Box>
      {/* <Image
        borderRadius="full"
        boxSize="100px"
        // src="../image/GovV-logo.png"
        src="https://files.oaiusercontent.com/file-NQk1gOELxtHzKcl8fbZqOGZ2?se=2024-07-15T19%3A39%3A23Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D848b0145-f1ea-428f-add4-ee95c82e46f3.webp&sig=5F58d4phycQXjX9U8XdHtRJRDlOXYxfNI%2BFhKpTXUVU%3D"
        alt="Gov V"
      /> */}
      <Stack
        sx={{
          width: "16rem",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          borderWidth: 1,
          borderColor: "gray.200",
          padding: "1.75rem 1.5rem",
        }}
      >
        <Button
          as={NavLink}
          to="/"
          variant="ghost"
          leftIcon={<RxDashboard fontSize={20} />}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          Fleet
        </Button>
        <Button
          as={NavLink}
          to="/avl"
          variant="ghost"
          leftIcon={<RxMagnifyingGlass fontSize={20} />}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          AVL
        </Button>
        <Button
          as={NavLink}
          to="/news"
          variant="ghost"
          leftIcon={<RxRocket fontSize={20} />}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          News
        </Button>
      </Stack>

      <Box sx={{ pl: "16rem" }}>
        <Container maxW="8xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export { Layout };
export default Layout;
