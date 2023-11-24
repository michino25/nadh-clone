import { useEffect } from "react";
import UsersList from "../components/Table/UsersList";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser";

export default function Dashboard() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = queryClient.getQueriesData({ queryKey: ["userData"] });
  //   console.log(token);
  // }, [queryClient]);

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      console.log(loggedInUser);
    } else navigate("/login");
  }, []);

  return (
    <div className="flex w-full p-5">
      <UsersList />
    </div>
  );
}
