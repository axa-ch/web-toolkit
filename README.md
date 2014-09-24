# Style Guide

[![Build Status][status]][travis]

> The foundation for your next live style guide!

## Intro

Based on *Node* and the *Gulp* build system,
this project gives you a great foundation
for your next web style guide. Here is what it does for you:

* Compile Less to CSS with sourcemaps
* Compile CoffeScript to JS with sourcemaps
* Convert SVG icons to a web font and add CSS classes
* Build the docs with Metalsmith
* Serve your docs from a static web server
* Reload docs on every change with LiveReload

## Gulp tasks

- Icons

  ```sh
  $ gulp icons
  ```

  This command converts your SVG files from the `./icons` folder
  into web fonts. The web fonts are placed into the `./dist/fonts`
  folder. The command additionally creates a `./dist/icons.json`
  file, containing an array of all your glyphs with its name
  and codepoint.

- Styles

  ```sh
  $ gulp styles
  ```

  This command compiles the less from `./less` into CSS
  located in `./dist/css`. The resulting CSS comes with
  sourcemaps. Moreover it copies all Less files into
  `./dist/less` and generates the `style/blocks/icon.less`
  file which makes all your icons available as CSS classes.

- Scripts

  ```sh
  $ gulp scripts
  ```

  The scripts command reads all the CoffeScript from `./coffee`,
  compiles it into JS `./dist/js` and adds sourcemaps per file.
  It additionally combines all files into one and even provides
  sourcemaps for this file.

- Docs

  ```sh
  $ gulp docs
  ```

  This command builds the documentation, which is located in
  `./docs`. The result is a static web site which can be hosted
  on any web server. The pages are written to `./dist/docs`.

- Build

  ```sh
  $ gulp build
  ```

  Executes the `icons`, `styles`, `scripts` and `docs` tasks.

- Development

  ```sh
  $ gulp dev
  ```

  This task executes an initial `build`, starts a web server
  hosting the docs on `localhost:3000` (or on the port
  specified in `$PORT`) and a LiveReload server.
  The latter will refresh your browser whenever you change a
  source file (if you have the LiveReload plugin activated).

## License

MIT © David Knezić

[status]: https://travis-ci.org/davidknezic/style-guide.svg
[travis]: https://travis-ci.org/davidknezic/style-guide
