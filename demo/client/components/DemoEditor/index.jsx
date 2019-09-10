import { convertFromRaw, EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createPrismPlugin from "draft-js-prism-plugin";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-swift";
import React from "react";
import createMarkdownPlugin from "../../../../src";
import initialState from "./initial-state";
import styles from "./styles.css";

const prismPlugin = createPrismPlugin({
  prism: Prism,
});

const renderLanguageSelect = ({
  options,
  onChange,
  selectedValue,
  selectedLabel,
}) => (
  <div className={styles.switcherContainer}>
    <div className={styles.switcher}>
      <select
        className={styles.switcherSelect}
        value={selectedValue}
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className={styles.switcherLabel}>
        {selectedLabel}
        {String.fromCharCode(9662)}
      </div>
    </div>
  </div>
);

const languages = {
  js: "JavaScript",
  kotlin: "Kotlin",
  mathml: "MathML",
};

const plugins = [
  prismPlugin,
  createMarkdownPlugin({
    renderLanguageSelect,
  }),
];

const initialEditorState = EditorState.createWithContent(
  convertFromRaw(initialState)
);

function DemoEditor(props) {
  const [editorState, setEditorState] = React.useState(initialEditorState);
  const editorRef = React.createRef();

  function onChange(editorState) {
    setEditorState(editorState);
  }

  function focus() {
    editorRef.current.focus();
  }

  return (
    <div className={styles.root}>
      <div className={styles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          spellCheck
          autoFocus
          placeholder="Write something here..."
          ref={editorRef}
        />
      </div>
    </div>
  );
}

export default DemoEditor;
