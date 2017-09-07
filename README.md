# AXA Web Toolkit

> The CSS, JS and HTML framework for building responsive AXA web apps!

## Intro

Here you get all the CSS, icons, JS and additional assets
to simplify and accelerate the development of AXA web apps.

## Use it!

Want to use the Web Toolkit in your web app?
There are different ways of integration,
but the preferred one is to add it as an npm dependency:

```sh
$ npm install @axa/web-toolkit
```

After that, include the styles from the `dist` folder into your less file:

```less
@import 'scss/style';
```

Or just consume the precompiled css files, also from the `dist` folder:

```html
<link rel="stylesheet" href="dist/bundles/all.css">
```

If you don't want to reimplement the interactivity of our components,
just use our jQuery plugins:

```html
<script src="dist/bundles/all.js"></script>
```

If you don't want to use npm to include the Web Toolkit, you might download the
latests release package from our GitHub releases page.

## Versioning

As a project that is depended on from several apps, we take versioning seriously!

We do versioning using the
[Semantic Versioning 2.0.0](http://semver.org/spec/v2.0.0.html) specification.
A typical version number has the format of `MAJOR.MINOR.PATCH`.

* `MAJOR` changes when we make incompatible API changes
* `MINOR` changes when we add functionality in a backwards-compatible manner
* `PATCH` changes when we make backwards-compatible bug fixes

## Build it yourself!

Do you want to add an exciting new feature or fix a bug? For that you'll need
to build the Web Toolkit yourself, so you can make sure things work.
In order to do that, it's required that you have
node with npm installed on your system, whether
it's Windows, Linux or Mac OS X. With Git installed you'll be able to deploy
a new version of the docs.

After you've successfully cloned the project and stepped into it, download
the dependencies.

```sh
# Install the dependencies
$ npm install
```

With the dependencies in place, you're now able to run one of the many
npm scripts we provide for you. Using the `dev` script you can build the
assets, run the showcase and let it refresh your browser on each change
in the file system.

```sh
$ npm run dev
```

### But but but.... Enterprise Proxy?

If you're working on a heavily guarded machine as used by many enterprises, follow our [Enterprise Proxy Guide](https://github.com/axa-ch/style-guide/wiki/solve-proxy-problems).

## What do we build it with?

In order to make changes as easy as possible and simplify our build process,
we make use of many different technologies. It's great to have an understanding
for what these do, when you decide to dive deeper into the code.

* [Sass](http://sass-lang.com) for mixins, variables and other fancy styling helpers
* [Babel](https://babeljs.io) for readable and extended scripts based on cutting edge standards (ES6)
* [SVG](http://www.w3.org/TR/SVG2/) for colorful and sometimes animated icons
* [Metalsmith](http://metalsmith.io) for our static site documentation
* [Webpack](http://webpack.github.io) for bundling JS, CSS and SVG icons
* [Handlebars](http://handlebarsjs.com) which simplifies how we write markup
* [Markdown](http://daringfireball.net/projects/markdown/) for text-heavy documentation pages

## Feedback

We love feedback! File an issue and we'll reach out to you.

## Contributing

Do not hesitate, we appreciate every contribution.

When contributing please stick to the following guides:

### Branching

Please add every feature/bugfix in a separate branch and create a pull request to the master branch.

We stick to the following naming conventions for branches:

- `feature/...` for new features
- `bugfix/...` for bugfixes
- `improvement/...` for improvements on existing features

### Commit messages

- Begin you commit message with a verb in the imperative. (e.g. `Introduce foo bar`, `Fix baz`, ...)
- Try to have small, atomic commits.
- First line of a commit message should sum up your changes and should not be longer than 50 characters.
- Second line should be empty
- Third and following lines can optionally contain a longer description

### Code Style Guidelines

Rule number one: Consistency is key; So when you contribute follow the code style
patterns you see in the code you're changing.

## Who's behind it?

The project is developed by UX, design and IT people at AXA.
Check the collaborators list for the people behind it.

## License

Copyright AXA 2017. All rights reserved.
