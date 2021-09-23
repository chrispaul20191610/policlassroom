import React from "react";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../contexts/auth";
import Login from "./Login";
import Register from "./Register";

const AuthMenu = () => {
  const { user } = useAuth();

  if (user === null) {
    return (
      <div>
        <h3>Cargando ...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <Login />
          <Register />
        </div>
      </>
    );
  }

  return <ProfileMenu />;
};

export default AuthMenu;
