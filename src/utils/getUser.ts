import { iUserData } from "./models";
export const getUser = (): iUserData => {
  const loggedInUser = localStorage.getItem("userData");
  let foundUser;
  if (loggedInUser) {
    foundUser = JSON.parse(loggedInUser);
  }
  return foundUser;
};
