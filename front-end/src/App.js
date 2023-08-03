import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Link
import "bootstrap/dist/css/bootstrap.min.css";

// CSS
import "./App.css";

import Main from "./pages/Main/index";
// import MainSecond from "./pages/MainSecond/index";
import Connect from "./pages/Connect/index";
import Guide from "./pages/Guide/index";
import Books from "./pages/Books/index";
import Check from "./pages/Check/index";
import SoundCheck from "./pages/Check/SoundCheck";
import MotionCheck from "./pages/Check/MotionCheck";
import CaptureCheck from "./pages/Check/CaptureCheck";
import DistanceCheck from "./pages/Check/DistanceCheck";
import CombineCheck from "./pages/Check/CombineCheck";
import Ready from "./pages/Ready";
import Play from "./pages/Play/index";
import Profile from "./pages/Profile/index";
import Code from "./pages/Code/index";
import NotFound from "./pages/NotFound/index";
import Login from "./pages/Main/Login/index";
import Signup from "./pages/Main/Signup/index";
import Choose from "./pages/Main/Choose/index";
import ProtectedRoute from "./pages/ProtectedRoute/index";
import Device from './pages/Device/index';
import DeviceOTP from './pages/DeviceOTP/index';
///////////////////////////////////

const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/", // 첫화면은 로그인
    element: <Main />,
    children: [
      { index: 'default', element: <Login /> },
      { path: "signup", element: <Signup /> },
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          { path: "main", element: <Choose /> },
        ]
      },
      {
        path: "/connect",
        element: <Connect />,
      },
      {
        path: "/guide",
        element: <Guide />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/check",
        element: <Check />,
        children: [
          { path: "capture", element: <CaptureCheck /> },
          { path: "distance", element: <DistanceCheck /> },
          { path: "motion", element: <MotionCheck /> },
          { path: "sound", element: <SoundCheck /> },
          { path: "combine", element: <CombineCheck /> },
        ],
      },
      {
        path: "/ready",
        element: <Ready />,
      },
      {
        path: "/play",
        element: <Play />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/code",
        element: <Code />,
      },
      {
        path: "/device",
        element: <Device />,
      },
      {
        path: "/deviceOTP",
        element: <DeviceOTP />,
      },
    ]
  },

]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
