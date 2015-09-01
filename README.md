[![Build Status](https://travis-ci.org/axa-ch/style-guide.svg?branch=develop)](https://travis-ci.org/axa-ch/style-guide)
[![Thinking](https://badge.waffle.io/axa-ch/style-guide.svg?label=thinking&title=Thinking)](http://waffle.io/axa-ch/style-guide)
[![Adding Sparkles](https://badge.waffle.io/axa-ch/style-guide.svg?label=adding%20sparkles&title=Adding%20Sparkles)](http://waffle.io/axa-ch/style-guide)
[![Hacking](https://badge.waffle.io/axa-ch/style-guide.svg?label=hacking&title=Hacking)](http://waffle.io/axa-ch/style-guide)

# AXA Switzerland Web Style Guide

> Guides you through our design principles and helps you build web apps faster!

## Intro

This project guides you on how to design and build web apps @ AXA Switzerland.
Here you get all the CSS, icons, JS and additional assets to simplify the development of our web apps.

## Use it!

Want to use the Web Style Guide in your web app? There are different ways of integration,
but the preferred one is to add it as an npm dependency:

```sh
$ npm install @axa-ch/style-guide
```

After that, include the styles from the `dist` folder into your less file:

```less
// app.less
@import 'less/normalize';
@import 'less/style';
```

Or just consume the precompiled css files, also from the `dist` folder:

```html
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/style.css">
```

If you don't want to reimplement the interactivity of our components,
just use our jQuery plugins:

```html
<script src="jquery/axa-wsg.jquery.all.js"></script>
```

You'll additionally need to copy the `images` folder into your project.

If you don't want to use npm to include the style guide, you might download the
latests release package from our GitHub releases page. We're also working
on a bower distribution.

## Build it!

You'll need Node with npm installed on your system, whether
it's Windows, Linux or Mac OS X. With Git installed you'll be able to deploy
a new version of the docs.

After you've successfully cloned the project and stepped into it, download
the dependencies.

```sh
# Install the dependencies
$ npm install
```

With the dependencies in place, you're now able to run one of the many
build tasks we provide for you. Using the `dev` task you can build the
assets, run the docs server and let it refresh your browser on each change
in the file system.

```sh
# Start development mode (afterwards check http://localhost:3000)
$ gulp dev
```

### But but but.... Enterprise Proxy?
If you're working on a heavily guarded machine as used by many enterprises, follow our [Guide](https://github.com/axa-ch/style-guide/wiki/Sitting-behind-a-corporate-proxy%3F).

## What do we build it with?

In order to make changes as easy as possible and simplify our build process,
we make use of many different technologies. It's great to have an understanding
for what these do, when you decide to dive deeper into the code.

* [LessCSS](http://lesscss.org) for mixins, variables and other fancy styling helpers
* [CoffeeScript](http://coffeescript.org) for readable and extended scripts
* [SVG](http://www.w3.org/TR/SVG2/) for colorful and sometimes animated icons
* [Gulp](http://gulpjs.com) on which our whole build process is based
* [Metalsmith](http://metalsmith.io) for our static site documentation
* [Jade](http://jade-lang.com) which simplifies how we write markup
* [Markdown](http://daringfireball.net/projects/markdown/) for text-heavy documentation pages

## Feedback

We love feedback! File an issue and we'll reach out to you.

## Contributing

Do not hesitate, we appreciate every contribution. Do not fear non-perfect Pull Requests, nobody is perfect.

When contributing please stick to the following guides:

### Branching

Please add every feature/bugfix in a separate branch and create a pull request to the master branch.

We stick to the following naming conventions for branches:

- `feature/...` for new features
- `bugfix/...` for bugfixes
- `improvement/...` for improvements on existing features

### Commit messages

- Begin you commit message with a verb in the imperative. (E.g. ```introduce foo bar```, ```fix baz```, ...)
- Try to have small, atomic commits.
- First line of a commit message should sum up your changes and should not be longer than 50 characters.
- Second line should be empty
- Third and following lines can optionally contain a longer description

### Code Style Guidelines

Rule number one: Consistency is key; So when you contribute follow the code style
patterns you see in the code you're changing.

For LESS code, we stick to the guidelines formulated by [@mdo](https://twitter.com/mdo).
Take a look at http://codeguide.co/#css.

## Who's behind it?

The project is developed by UX, design and IT people at AXA Switzerland.
Check the collaborators list for the people behind it.

## License

Copyright 2015 AXA Versicherungen AG. All rights reserved.

<!--- Copyright AXA Versicherungen AG 2015 -->
