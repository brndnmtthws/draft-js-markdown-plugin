import React from "react";
import GitHubCorner from "react-github-corner";
import DemoEditor from "./components/DemoEditor";
import "./components/DemoEditor/styles.css";
import "../public/base.css";
import "../public/Draft.css";
import "../public/normalize.css";
import "../public/prism.css";

export default function App(props) {
  return (
    <div style={{ height: "100%" }}>
      <DemoEditor />
      <GitHubCorner
        href="https://github.com/brndnmtthws/draft-js-markdown-plugin-es6"
        target="_blank"
        direction="right"
      >
        Fork me on GitHub
      </GitHubCorner>
    </div>
  );
}
