[![Build Status](https://api.shippable.com/projects/544e872d44927f89db3df031/badge?branchName=master)](https://app.shippable.com/projects/544e872d44927f89db3df031/builds/latest)

# AXA Switzerland Web Style Guide

> The mobile-ready style guide for internal and external
> web apps!

## Introduction

This project explains how to design our internal and external
corporate web apps. It provides you with the necessary CSS, JavaScript
and additional assets to simplify the implementation of our digital
corporate appearance.

## How does it work?

The assets are written in Less, CoffeeScript, Jade, Markdown and SVG.
A build system based on Node and Gulp transforms these assets into
CSS, JavaScript, HTML and an icon font.

## Run it!

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

## Feedback

We love feedback! File an issue and we'll reach out to you.

## Who's behind it?

The project is developed by UX, design and IT people at AXA Switzerland.
Check the collaborators list for the people behind it.

## License

Copyright 2014 AXA Versicherungen AG. All rights reserved.
