// See "https://github.com/chjj/marked" for possible hooks

import marked from 'marked'

const renderer = new marked.Renderer()

/* eslint-disable no-underscore-dangle */
renderer._slugify = function (text) {
  const lower = text.toLowerCase()
  return lower.replace(/[^\w]+/g, '-')
}

renderer._relative = function (link) {
  return this.options.relative ?
    this.options.relative(link) :
    link
}

renderer.heading = function (text, level) {
  const slug = this._slugify(text)
  const l = 1 + parseInt(level, 10)
  const classes = []

  if (l === 2) {
    classes.push('heading', 'heading--secondary')
  }
  if (l === 3) {
    classes.push('heading', 'heading--tertiary')
  }

  const joinedClasses = classes.join(' ')

  return `<h${l} id="${slug}" class="${joinedClasses}">
      ${text}
    </h${l}>`
}

renderer.hr = function () {
  return '<hr class="hr" />'
}

renderer.image = function (href, title, text) {
  return `<img
  alt="${text}"
  src="${this._relative(href)}"
  title="${title}"
  class="image image--responsive image--docs" />`
}

renderer.link = function (href, title, text) {
  const isLocal = href.match(/^https?:\/\//i) === null
  const url = isLocal ? this._relative(href) : href

  return `<a
      href="${url}"
      class="link"
      title="${title}">
      ${text}
    </a>`
}

renderer.blockquote = function (quote) {
  return `<blockquote class="blockquote">
    ${quote}
  </blockquote>`
}

renderer.table = function (header, body) {
  return `<table class="table table--docs">
    <thead>
      ${header}
    </thead>
    <tbody class="table__content">
      ${body}
    </tbody>
  </table>`
}

renderer.tablerow = function (content, flags) {
  const tagType = flags.header ? 'header' : 'row'

  return `<tr class="table__${tagType}">
      ${content}
    </tr>`
}

renderer.tablecell = function (content, flags) {
  // Attention: We ignore "flags.align"

  if (flags.header) {
    return `<th class="table__header__item">
        ${content}
      </th>`
  }

  return `<td class="table__row__item">
      <div class="table__row__item__content">
        ${content}
      </div>
    </td>`
}

renderer.paragraph = function (text) {
  return `<p class="paragraph">${text}</p>`
}

renderer.list = function (body, ordered) {
  const type = ordered ? 'ol' : 'ul'
  const cls = ordered ? 'ordered' : 'unordered'

  return `<${type} class="list list--${cls}">
      ${body}
    </${type}>`
}

renderer.listitem = function (text) {
  return `<li class="list__item">
    ${text}
  </li>`
}

renderer.code = function (code, lang) {
  const highlight = this.options.highlight

  let out = highlight(code, lang)

  if (!lang || !out) {
    out = code

    return `<pre class="highlight"><code class="highlight__listing hljs">${out}</code></pre>`
  }

  return `<pre class="highlight"><code class="highlight__listing hljs ${this.options.langPrefix}${lang}">${out}</code></pre>`
}

renderer.codespan = function (code) {
  return `<code class="code">${code}</code>`
}


export default renderer

//! Copyright AXA Versicherungen AG 2015
