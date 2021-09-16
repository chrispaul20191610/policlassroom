import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";
import AuthMenu from "./AuthMenu";

const Header = () => {
  let styleBar = {
    display: "flex",
    justifyContent: "space-between",
  };
  return (
    <AppBar position="static">
      <Toolbar style={styleBar}>
        <Title>POLICLASSROOM</Title>
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const Title = styled.h3`
  flex-grow: 1;
`;
