import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import RootLayout from "./pages/layout/Layout";
import { NotFound } from "./pages/notfound/NotFound";
import Upcoming from "./pages/upcoming/Upcoming";
import TopRated from "./pages/top-rated/TopRated";
import Recommend from "./pages/recommend/Recommend";
import DragDrop from "./pages/draganddrop/DragDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { getKey } from "./redux/apiRequest";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/detail", element: <Detail /> },
      { path: "/upcoming", element: <Upcoming /> },
      { path: "/top-rated", element: <TopRated /> },
      { path: "/recommend", element: <Recommend /> },
      { path: "/select-song", element: <DragDrop /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
        </ThemeProvider>
      </RouterProvider>
    </DndProvider>
  );
}

export default App;
