import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "containers/Dashboard/Dashboard";
import Candidates from "containers/Candidate/Candidates";
import Clients from "containers/Client/Clients";
import Login from "containers/Login";
import BlankLayout from "layouts/BlankLayout";
import MainLayout from "layouts/MainLayout";
import Test from "containers/Test";
import CandidateDetail from "containers/Candidate/CandidateDetail";
import CandidateAdd from "containers/Candidate/CandidateAdd";
import ClientAdd from "containers/Client/ClientAdd";
import ClientDetail from "containers/Client/ClientDetail";
import Page404 from "containers/Page404";
import Page500 from "containers/Page500";
import Jobs from "containers/Job/Jobs";
import JobAdd from "containers/Job/JobAdd";
import JobDetail from "containers/Job/JobDetail";

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
  { path: "/job-detail/:id", element: <JobDetail /> },
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BlankLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />

        {routesConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="/500-error" element={<Page500 />} />
        <Route path="/404-error" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404-error" />} />
      </Route>
    </Routes>
  );
}
