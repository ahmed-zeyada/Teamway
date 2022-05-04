import { Outlet } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Typography,
  Toolbar,
  Button,
  GlobalStyles,
  Link,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { store } from "./features/store";
import { Provider } from "react-redux";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const onAdminClicked = () => {
    if (!isAdmin) navigate("admin");
  };

  return (
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#e7e7e7",
          },
        }}
      />
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            href="/"
            variant="h6"
            underline="none"
            sx={{ fontWeight: "bold", fontFamily: "Georgia", color: "inherit" }}
          >
            Teamway
          </Link>

          {/* <Typography
            sx={{ fontWeight: "bold", fontFamily: "Georgia" }}
            variant="h5"
          >
            Teamway
          </Typography> */}
          <Typography variant="h6">Personality Test</Typography>
          {isAdmin ? (
            <Typography variant="h6">Admin</Typography>
          ) : (
            <Button
              variant="contained"
              size="large"
              color="warning"
              onClick={() => onAdminClicked()}
            >
              Admin
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Provider>
  );
}

export default App;
