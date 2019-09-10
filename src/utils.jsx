import { EditorState, Modifier } from "draft-js";
import React from "react";

export const getCurrentLine = editorState => {
  const { anchorOffset } = editorState.getSelection();
  const selection = editorState.getSelection().merge({
    anchorOffset,
  });
  const key = editorState.getSelection().getStartKey();

  return editorState
    .getCurrentContent()
    .getBlockForKey(key)
    .getText()
    .slice(0, selection.getFocusOffset());
};

export function addText(editorState, bufferText) {
  const contentState = Modifier.insertText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    bufferText
  );
  return EditorState.push(editorState, contentState, "insert-characters");
}

export function replaceText(editorState, bufferText) {
  const contentState = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    bufferText
  );
  return EditorState.push(editorState, contentState, "insert-characters");
}

export const defaultRenderSelect = ({ options, onChange, selectedValue }) => (
  <select value={selectedValue} onChange={onChange}>
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);
