import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

function Example() {
  const token =
    "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlNmI2ZDZkLWI5NGUtNDVhNC05YWFhLTIyNDY3ZDlmNTgwOSIsInVzZXJfaWQiOjYzLCJpYXQiOjE3MDA0Njk2MjEsImV4cCI6MTcwMTA3NDQyMX0.2AmZhoF87197qEbx-0tvc192SWfKK2uxlUKsFLbWre-YuyGU7eBRLYY_68OYaiK6lw6BeT97nDirfiX46SNMZw";

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(
          "https://lubrytics.com:8443/nadh-api-crm/api/users?page=1&perPage=10",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // console.log(data.data[0]);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default Example;
