import React, { PureComponent } from "react";
import { Map } from "immutable";
import { EditorState, EditorBlock, Modifier } from "draft-js";
import OutsideClickHandler from "react-outside-click-handler";

const alias = {
  javascript: "js",
  jsx: "js",
};

function CodeSwitchContainer(props) {
  function handleClickOutside() {
    props.onClickOutside();
  }

  return (
    <OutsideClickHandler onOutsideClick={() => handleClickOutside()}>
      <div contentEditable={false} onClick={props.onClick}>
        {props.children}
      </div>
    </OutsideClickHandler>
  );
}

function CodeBlock(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  function onChange(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const blockKey = props.block.getKey();
    const { getEditorState, setReadOnly, setEditorState } = props.blockProps;

    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const language = ev.currentTarget.value;
    const blockSelection = selection.merge({
      anchorKey: blockKey,
      focusKey: blockKey,
    });

    setIsOpen(false);

    let content = editorState.getCurrentContent();
    content = Modifier.mergeBlockData(
      content,
      blockSelection,
      Map({
        language,
      })
    );
    setReadOnly(false);

    const newEditorState = EditorState.push(
      editorState,
      content,
      "change-block-data"
    );

    setEditorState(EditorState.forceSelection(newEditorState, selection));
  }

  function cancelClicks(event) {
    return event.preventDefault();
  }

  function onSelectClick(event) {
    setIsOpen(true);
    const { setReadOnly } = props.blockProps;
    event.stopPropagation();
    setReadOnly(true);
    setIsOpen(true);
  }

  function onClickOutside() {
    if (isOpen === false) return;
    setIsOpen(false);
    const { getEditorState, setReadOnly, setEditorState } = props.blockProps;

    setReadOnly(false);
    setIsOpen(false);

    const editorState = getEditorState();
    const selection = editorState.getSelection();

    setEditorState(EditorState.forceSelection(editorState, selection));
  }

  const {
    languages,
    renderLanguageSelect,
    getReadOnly,
    language: _language,
  } = props.blockProps;

  const language = alias[_language] || _language;
  const selectedLabel = languages[language];
  const selectedValue = language;

  const options = Object.keys(languages).reduce(
    (acc, val) => [
      ...acc,
      {
        label: languages[val],
        value: val,
      },
    ],
    []
  );

  return (
    <div>
      <EditorBlock {...props} />
      <CodeSwitchContainer
        onClickOutside={onClickOutside}
        onClick={onSelectClick}
      >
        {!getReadOnly() &&
          renderLanguageSelect({
            selectedLabel,
            selectedValue,
            onChange,
            options,
          })}
      </CodeSwitchContainer>
    </div>
  );
}

export default CodeBlock;
