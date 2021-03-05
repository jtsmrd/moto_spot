import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

const Header: React.FC<{}> = () => {
  const displayDesktop = () => {
    return <Toolbar>MotoSpot</Toolbar>;
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
};

export default Header;
