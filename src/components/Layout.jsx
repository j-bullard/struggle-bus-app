import {
  Box,
  Button,
  Container,
  Stack,
  Image,
  Heading,
  Divider,
  Text,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { RxDashboard, RxMagnifyingGlass, RxRocket } from "react-icons/rx";

const Layout = () => {
  return (
    <Box>
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
        <Stack spacing={4} mb={8} alignItems="center">
          <Image
            borderRadius="full"
            boxSize="100px"
            src="/images/strugg-bus-logo.jpg"
            alt="Struggle Bus"
          />
          <Heading
            fontStyle="italic"
            border="2px solid black"
            background="black"
            color="white"
            p={2}
            borderRadius="lg"
          >
            Struggle
          </Heading>
          <Text fontStyle="italic">is real</Text>
        </Stack>

        <Divider />

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
