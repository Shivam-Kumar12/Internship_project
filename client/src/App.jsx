import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  Admin,
  EditJob,
  

} from "./pages";
import { action as registeraction } from "./pages/Register";
import { action as loginaction } from "./pages/Login";
import { loader as DashlayoutLoader } from "./pages/DashboardLayout";
import { action as addjobAction } from "./pages/AddJob";
import { loader as alljobloader } from "./pages/AllJobs";
import { loader as editJobLoader } from './pages/EditJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from "./pages/Admin";
import {action as Profileaction} from "./pages/Profile"
import {loader as StatsLoader} from "./pages/Stats"




export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("dark-theme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "register",
        element: <Register />,
        action: registeraction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginaction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: DashlayoutLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobAction,
          },
          { path: "stats", 
          element: <Stats />,
          loader:StatsLoader,
        },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: alljobloader,
          },

          {
            path: "profile",
            element: <Profile />,
            action:Profileaction
          },
          {
            path: "admin",
            element: <Admin />,
            loader:adminLoader
          },
      
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action:deleteJobAction,
          },
        ],
      },
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/about",
    element: (
      <div>
        <h1>About us</h1>
      </div>
    ),
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
