import { RichUtils } from "draft-js";

const adjustBlockDepth = (editorState, ev) => {
  return RichUtils.onTab(ev, editorState, 4);
};

export default adjustBlockDepth;
