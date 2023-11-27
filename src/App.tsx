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
import CandidatesDetail from "./pages/CandidatesDetail";
import CandidateAdd from "./pages/CandidateAdd";

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
        <Route path="/candidate-detail/:id" element={<CandidatesDetail />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/group-user" element={<GroupUser />} />
      </Route>
    </Routes>
  );
}
