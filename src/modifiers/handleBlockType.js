import { RichUtils } from "draft-js";
import changeCurrentBlockType from "./changeCurrentBlockType";

const sharps = len => {
  let ret = "";
  while (ret.length < len) {
    ret += "#";
  }
  return ret;
};

const blockTypes = {
  "#": "header-one",
  "##": "header-two",
  "###": "header-three",
  "####": "header-four",
  "#####": "header-five",
  "######": "header-six",
};

const headerReg = /^(#+)\s+/;

const handleBlockType = (whiteList, editorState, character) => {
  const currentSelection = editorState.getSelection();
  const key = currentSelection.getStartKey();
  const text = editorState
    .getCurrentContent()
    .getBlockForKey(key)
    .getText();
  const position = currentSelection.getAnchorOffset();
  const line = [text.slice(0, position), character, text.slice(position)].join(
    ""
  );
  const blockType = RichUtils.getCurrentBlockType(editorState);

  const headerMatch = line.match(headerReg);

  if (blockType === "unstyled" || blockType === "paragraph") {
    if (
      headerMatch !== null &&
      blockTypes[headerMatch[1]] !== null &&
      whiteList.includes(blockTypes[headerMatch[1]])
    ) {
      return changeCurrentBlockType(
        editorState,
        blockTypes[headerMatch[1]],
        line.replace(/^#+\s/, "")
      );
    }

    let matchArr = line.match(/^[*-] (.*)$/);
    if (matchArr && whiteList.includes("unordered-list-item")) {
      return changeCurrentBlockType(
        editorState,
        "unordered-list-item",
        matchArr[1]
      );
    }

    matchArr = line.match(/^[\d]\. (.*)$/);
    if (matchArr && whiteList.includes("ordered-list-item")) {
      return changeCurrentBlockType(
        editorState,
        "ordered-list-item",
        matchArr[1]
      );
    }
    matchArr = line.match(/^> (.*)$/);
    if (matchArr) {
      return changeCurrentBlockType(editorState, "blockquote", matchArr[1]);
    }
  }

  return editorState;
};

export default handleBlockType;
