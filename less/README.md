# Attention

In order to compile the `style.less` file, additional less files
need to be generated.

At the moment this is `./less/style/blocks/icon.less`.

That's why the build process `gulp styles` moves all those files
to `./dist/less`, generates the necessary files and then compiles
everything.

<!--- Copyright AXA Versicherungen AG 2015 -->
