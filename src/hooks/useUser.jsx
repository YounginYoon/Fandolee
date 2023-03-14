import React from "react";

const useUser = () => {
  const user = window.sessionStorage.getItem("user");
  return JSON.parse(user);
};

export default useUser;
