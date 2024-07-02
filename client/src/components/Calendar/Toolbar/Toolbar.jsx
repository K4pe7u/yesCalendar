import React from "react";
import css from "./Toolbar.module.css";

import MonthDate from "./MonthDate/MonthDate";
import Buttons from "./Buttons/Buttons";

const Toolbar = () => {
  return (
    <>
      <MonthDate />
      <Buttons />
    </>
  );
};
export default Toolbar;
