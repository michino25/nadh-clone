import { iUserData } from "./models";
export const getUser = (): iUserData | undefined => {
  const loggedInUser = localStorage.getItem("userData");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  } else null;
};
