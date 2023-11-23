import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Clients from "./pages/Clients";
// import Jobs from "./pages/Jobs";
// import Users from "./pages/Users";
// import Notify from "./pages/Notify";
// import GroupUser from "./pages/GroupUser";
import Login from "./pages/Login";
import BlankLayout from "./layouts/BlankLayout";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BlankLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/clients" element={<Clients />} />
        {/* <Route path="/jobs" element={<Jobs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/group-user" element={<GroupUser />} /> */}
      </Route>
    </Routes>
  );
}
