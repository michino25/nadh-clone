import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Clients from "./pages/Clients";
import Jobs from "./pages/Jobs";
import Users from "./pages/Users";
import Notify from "./pages/Notify";
import GroupUser from "./pages/GroupUser";
import Login from "./pages/Login";
import BlankLayout from "./layouts/BlankLayout";
import MainLayout from "./layouts/MainLayout";
import Test from "./pages/Test";
import CandidateDetail from "./pages/CandidateDetail";
import CandidateAdd from "./pages/CandidateAdd";
import ClientAdd from "./pages/ClientAdd";
import JobAdd from "./pages/JobAdd";
import UserAdd from "./pages/UserAdd";
import UserDetail from "./pages/UserDetail";
import ClientDetail from "./pages/ClientDetail";

const routesConfig = [
  { path: "/dashboard", element: <Dashboard /> },

  { path: "/candidates", element: <Candidates /> },
  { path: "/candidate-add", element: <CandidateAdd /> },
  { path: "/candidate-detail/:id", element: <CandidateDetail /> },

  { path: "/clients", element: <Clients /> },
  { path: "/client-add", element: <ClientAdd /> },
  { path: "/client-detail/:id", element: <ClientDetail /> },

  { path: "/jobs", element: <Jobs /> },
  { path: "/job-add", element: <JobAdd /> },

  { path: "/users", element: <Users /> },
  { path: "/user-add", element: <UserAdd /> },
  { path: "/user-detail/:id", element: <UserDetail /> },

  { path: "/notify", element: <Notify /> },
  { path: "/group-user", element: <GroupUser /> },
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BlankLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        {routesConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}
