import React from "react";
import classnames from "classnames";

import TestDemo1 from "@/TestDemo1";
import css from "./style.scss";

export default function TestDemo2() {
  return (
    <div className={classnames(css.container)}>
      <TestDemo1></TestDemo1>
      <div>wellcome to use cyber-es6-lib</div>
    </div>
)}
