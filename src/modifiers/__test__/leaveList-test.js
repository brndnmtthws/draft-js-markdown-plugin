import Draft, { EditorState, SelectionState } from "draft-js";
import sinon from "sinon";
import leaveList from "../leaveList";

describe("leaveList", () => {
  beforeAll(() => {
    sinon.stub(Draft, "genKey").returns("item2");
  });
  afterAll(() => {
    Draft.genKey.restore();
  });
  ["unordered-list-item", "ordered-list-item"].forEach(type => {
    const beforeRawContentState = {
      entityMap: {},
      blocks: [
        {
          key: "item1",
          text: "piyo",
          type,
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    };
    const afterRawContentState = {
      entityMap: {},
      blocks: [
        {
          key: "item1",
          text: "piyo",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    };
    const selection = new SelectionState({
      anchorKey: "item1",
      anchorOffset: 6,
      focusKey: "item1",
      focusOffset: 6,
      isBackward: false,
      hasFocus: true,
    });
    const contentState = Draft.convertFromRaw(beforeRawContentState);
    const editorState = EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
    it("converts block type", () => {
      const newEditorState = leaveList(editorState);
      expect(newEditorState).not.toEqual(editorState);
      expect(Draft.convertToRaw(newEditorState.getCurrentContent())).toEqual(
        afterRawContentState
      );
    });
  });
});
