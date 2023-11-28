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
import { useEffect } from "react";
import CandidateDetail from "./pages/CandidateDetail";
import CandidateAdd from "./pages/CandidateAdd";
import ClientAdd from "./pages/ClientAdd";
import JobAdd from "./pages/JobAdd";
import UserAdd from "./pages/UserAdd";
import UserDetail from "./pages/UserDetail";
import ClientDetail from "./pages/ClientDetail";

export default function App() {
  useEffect(() => {
    const head = document.querySelector("head");
    if (head) {
      const tailWindStyleTag = [...head.querySelectorAll("style")].find(
        (style) => style.innerHTML.includes("tailwind")
      );
      head.insertAdjacentElement("afterbegin", tailWindStyleTag as Element);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<BlankLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate-add" element={<CandidateAdd />} />
        <Route path="/candidate-detail/:id" element={<CandidateDetail />} />

        <Route path="/clients" element={<Clients />} />
        <Route path="/client-add" element={<ClientAdd />} />
        <Route path="/client-detail/:id" element={<ClientDetail />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job-add" element={<JobAdd />} />

        <Route path="/users" element={<Users />} />
        <Route path="/user-add" element={<UserAdd />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />

        <Route path="/notify" element={<Notify />} />
        <Route path="/group-user" element={<GroupUser />} />
      </Route>
    </Routes>
  );
}
