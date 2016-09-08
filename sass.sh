#!/bin/bash
echo 'git checkout'
git checkout -- .

echo 'delete sass files'
find . -name "*.scss" -exec rm {} \;

echo 'fix mixin arguments that are separated by ; (-> ,)'
for FOO in {1..10}
do
  find less -name "*.less" -type f -exec perl -i -0777 -pe 's/(.[a-zA-Z0-9\-_]*\([^\)\{;]*);([^\)]*\))/$1,$2/gs' {} \;
done

echo 'fix dangling commas'
find less -name "*.less" -type f -exec perl -i -0777 -pe 's/(.[a-zA-Z0-9\-_]*\([^\)]*),(\s*\))/$1$2/gs' {} \;

less2sass less

echo 'remove unused scss'
rm less/style/utils.scss
perl -i -0777 -pe "s/\@import '.\/style\/utils';\n\n//g" less/style.scss

echo 'fix &:extend (-> @extend)'
find less -name "*.scss" -type f -exec perl -i -0777 -pe 's/&:extend\(\.([^ ]*) all\);?/\@extend .$1;/g' {} \;

echo 'fix .respond usages'
find less -name "*.scss" -type f -exec perl -i -0777 -pe 's/\.respond\(([^,;]*)[,;]\s*{(.*?)}\);?/\@include respond($1) {$2}/gs' {} \;

echo 'drop $charset delcaration from style.scss'
perl -i -0777 -pe 's/\$charset "UTF-8";\n\n//g' less/style.scss

echo 'fix lost mixin declarations that do not have any arguments'
find less -name "*.scss" -type f -exec perl -i -0777 -pe 's/\.(.*)\(\) {/\@mixin $1 {/g' {} \;

echo 'fix lost mixin calls with a single number argument'
find less -name "*.scss" -type f -exec perl -i -0777 -pe 's/\.([a-zA-Z0-9\-_]*)\(([0-9]*)\);?/\@include $1($2);/g' {} \;

echo 'fix mixin call that was transformed to mixin declaration'
find less -name "*.scss" -type f -exec perl -i -0777 -pe 's/\@mixin ([a-zA-Z0-9\-_]*\(\);)/\@include $1/g' {} \;

echo 'fix respond mixin definition'
cat > less/style/mixins/respond.scss << EOL
@import '../variables';

@mixin respond(\$condition) {
  \$media: "";

  @if \$condition == print {
    \$media: "print";
  } @else if \$condition == medium {
    \$media: "min-width: #{\$respond-medium-min-width}";
  } @else if \$condition == large {
    \$media: "min-width: #{\$respond-large-min-width}";
  } @else {
    \$media: "min-width: #{\$condition}";
  }

  @media (\$media) {
    @content;
  }
}

EOL

echo 'Fix column.scss'
cat > less/style/blocks/column.scss << EOL
@import '../mixins/make-column';
@import '../mixins/make-column-span';
@import '../mixins/make-column-offset';

.column {
  @include make-column();

  width: 100%;
}

@for \$i from 1 through 12 {
  .column--#{\$i} {
    @include make-column-span(\$size: \$i);
  }
  .column--offset-#{\$i} {
    @include make-column-offset(\$size: \$i);
  }
  .column--md-#{\$i} {
    @include respond(medium) {
      @include make-column-span(\$size: \$i);
    }
  }
  .column--md-offset-#{\$i} {
    @include respond(medium) {
      @include make-column-offset(\$size: \$i);
    }
  }
  .column--lg-#{\$i} {
    @include respond(large) {
      @include make-column-span(\$size: \$i);
    }
  }
  .column--lg-offset-#{\$i} {
    @include respond(large) {
      @include make-column-offset(\$size: \$i);
    }
  }
}
EOL

node-sass less/style.scss
