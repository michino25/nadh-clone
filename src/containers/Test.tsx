import { useState } from "react";
import { getUser } from "../utils/getUser";

export default function Test() {
  const [token, setToken] = useState("");

  const changeToken = () => {
    const user = getUser();
    if (user) {
      user.token = token;
      localStorage.setItem("userData", JSON.stringify(user));
      alert("success");
      window.location.href = "/";
    } else {
      alert("failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex-col w-[600px]">
        <div className="flex flex-col gap-1 mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Token
          </label>

          <textarea
            id="message"
            rows={4}
            className="bg-wdatete border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Write your thoughts here..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          onClick={changeToken}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
