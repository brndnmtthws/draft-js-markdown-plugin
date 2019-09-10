draft-js-markdown-plugin-es6
==================================

[![Build Status](https://travis-ci.org/brndnmtthws/draft-js-markdown-plugin-es6.svg?branch=master)](https://travis-ci.org/brndnmtthws/draft-js-markdown-plugin-es6)
[![npm](https://img.shields.io/npm/v/draft-js-markdown-plugin-es6.svg)][npm]

An opinionated [DraftJS] plugin for supporting Markdown syntax shortcuts in DraftJS. This plugin works with [DraftJS Plugins], and is a fork of the excellent [`draft-js-markdown-plugin`](https://github.com/withspectrum/draft-js-markdown-plugin).  This version supports the latest Draft.js 0.11.0 and ES6.

![screen](screen.gif).

[View Demo][Demo]

## Installation

```sh
npm i --save draft-js-markdown-plugin-es6
```

```sh
yarn add draft-js-markdown-plugin-es6
```

## Usage

```js
import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import { EditorState } from 'draft-js';

export default class DemoEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    plugins: [createMarkdownPlugin()]
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={this.state.plugins}
      />
    );
  }
}
```

### Add code block syntax highlighting

Using the [`draft-js-prism-plugin`](https://github.com/withspectrum/draft-js-prism-plugin) you can easily add syntax highlighting support to your code blocks!

```JS
// Install prismjs and draft-js-prism-plugin
import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';

class Editor extends Component {
  state = {
    plugins: [
      // Add the Prism plugin to the plugins array 
      createPrismPlugin({
        prism: Prism
      }),
      createMarkdownPlugin()
    ]
  }
}
```

## Options

The `draft-js-markdown-plugin-es6` is configurable. Just pass a config object. Here are the available options:

### `renderLanguageSelect`

```js
renderLanguageSelect = ({
  // Array of language options
  options: Array<{ label, value }>,
  // Callback to select an option
  onChange: (selectedValue: string) => void,
  // Value of selected option
  selectedValue: string,
  // Label of selected option
  selectedLabel: string
}) => React.Node
```

Code blocks render a select to switch syntax highlighting - `renderLanguageSelect` is a render function that lets you override how this is rendered. 

#### Example:

```
import createMarkdownPlugin from 'draft-js-markdown-plugin-es6';

const renderLanguageSelect = ({ options, onChange, selectedValue }) => (
  <select value={selectedValue} onChange={onChange}>
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const markdownPlugin = createMarkdownPlugin({ renderLanguageSelect })
```

### `languages`

Dictionary for languages available to code block switcher

#### Example:

```js
const languages = {
  js: 'JavaScript'
}

const markdownPlugin = createMarkdownPlugin({ languages })
```

### `features`

A list of enabled features, by default all features are turned on.

```js
features = {
  block: Array<string>,
  inline: Array<string>,
}
```

#### Example:

```js
// this will only enable BOLD for inline and CODE
// as well as header-one for blocks
const features = {
  inline: ['BOLD'],
  block: ['CODE', 'header-one'],
}
const plugin = createMarkdownPlugin({ features })
```

*Available Inline features*:

```js
[
  'BOLD',
  'ITALIC',
  'CODE',
  'STRIKETHROUGH',
  'LINK',
  'IMAGE'
]
```

*Available Block features*:

```js
[
  'CODE',
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'ordered-list-item',
  'unordered-list-item',
  'blockquote',
]
```

### `entityType`

To interoperate this plugin with other DraftJS plugins, i.e. [`draft-js-plugins`](https://github.com/draft-js-plugins/draft-js-plugins), you might need to customize the `LINK` and `IMAGE` entity type created by `draft-js-markdown-plugin`.

#### Example:

```js
import createMarkdownPlugin from "draft-js-markdown-plugin-es6";
import createFocusPlugin from "draft-js-focus-plugin";
import createImagePlugin from "draft-js-image-plugin";

const entityType = {
  IMAGE: "IMAGE",
};

const focusPlugin = createFocusPlugin();
const imagePlugin = createImagePlugin({
  decorator: focusPlugin.decorator,
});
// For `draft-js-image-plugin` to work, the entity type of an image must be `IMAGE`.
const markdownPlugin = createMarkdownPlugin({ entityType });

const editorPlugins = [focusPlugin, imagePlugin, markdownPlugin];
```

## Support

[![Contact Brenden 😎 on Umpyre](https://api.umpyre.com/badge/634c76f3513240a4bec1eda7fb5db7ea/badge.svg?width=211.275&height=68.04&name=Brenden%20%F0%9F%98%8E&font_size=18&style=light)](https://umpyre.com/u/634c76f3513240a4bec1eda7fb5db7ea)

_Want to offer support? Add yourself above._

## License

Licensed under the MIT license, Copyright Ⓒ 2017 Space Program Inc.

See [LICENSE] for the full license text.

[DraftJS]: https://facebook.github.io/draft-js/
[DraftJS Plugins]: https://github.com/draft-js-plugins/draft-js-plugins
[LICENSE]: ./LICENSE
[npm]: https://www.npmjs.com/package/draft-js-markdown-plugin
