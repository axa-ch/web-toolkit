// See \"https://github.com/chjj/marked\" for possible hooks

import marked from 'marked';
let renderer = new marked.Renderer();

renderer._slugify = function(text) {
  let lower = text.toLowerCase();
  return lower.replace(/[^\w]+/g, '-');
};

renderer._relative = function(link) {
  if (this.options.relative) { return this.options.relative(link); } else { return link; }
};

renderer.heading = function(text, level) {
  let slug = this._slugify(text);
  let l = 1 + parseInt(level);
  let classes = [];
  if (l === 2) { classes.push("heading", "heading--secondary"); }
  if (l === 3) { classes.push("heading", "heading--tertiary"); }
  let joinedClasses = classes.join(' ');

  return [
    `<h${l} id=\"${slug}\" class=\"${joinedClasses}\">\n`,
      `${text}\n`,
    `</h${l}>\n`
  ].join("");
};

renderer.hr = () => "<hr class=\"hr\" />";

renderer.image = function(href, title, text) {
  return [
    "<img",
      ` alt=\"${text}\"`,
      ` src=\"${this._relative(href)}\"`,
      ` title=\"${title}\"`,
      " class=\"image image--responsive image--docs\" />\n"
  ].join("");
};

renderer.link = function(href, title, text) {
  let isLocal = href.match(/^https?:\/\//i === null);
  let url = isLocal ? this._relative(href) : href;

  return [
    "<a",
      ` href=\"${url}\"`,
      " class=\"link\"",
      ` title=\"${title}\">`,
      `${text}`,
    "</a>\n"
  ].join("");
};

renderer.blockquote = quote =>
  [
    "<blockquote class=\"blockquote\">\n",
      `${quote}`,
    "</blockquote>\n"
  ].join("")
;

renderer.table = (header, body) =>
  [
    "<table class=\"table table--docs\">\n",
      "<thead>\n",
        `${header}`,
      "</thead>\n",
      "<tbody class=\"table__content\">\n",
        `${body}`,
      "</tbody>\n",
    "</table>\n"
  ].join("")
;

renderer.tablerow = function(content, flags) {
  let tagType = flags.header ? "header" : "row";

  return [
    `<tr class=\"table__${tagType}\">\n`,
      `${content}`,
    "</tr>\n"
  ].join("");
};

renderer.tablecell = function(content, flags) {
  // Attention: We ignore \"flags.align\"

  if (flags.header) {
    return [
      "<th class=\"table__header__item\">",
        `${content}`,
      "</th>"
    ].join("");
  } else {
    return [
      "<td class=\"table__row__item\">",
        "<div class=\"table__row__item__content\">",
          `${content}`,
        "</div>",
      "</td>"
    ].join("");
  }
};

renderer.paragraph = text => `<p class=\"paragraph\">${text}</p>`;

renderer.list = function(body, ordered) {
  let type = ordered ? "ol" : "ul";
  let cls = ordered ? "ordered" : "unordered";

  return [
    `<${type} class=\"list list--${cls}\">\n`,
      `${body}`,
    `</${type}>\n`
  ].join("");
};

renderer.listitem = text =>
  [
    "<li class=\"list__item\">",
      `${text}`,
    "</li>\n"
  ].join("")
;

renderer.code = function(code, lang) {
  if (!lang) {
    [
      "<pre class=\"highlight\">",
        "<code class=\"highlight__listing hljs\">",
          `${code}\n`,
        "</code>",
      "</pre>"
    ].join("");
  }

  if  (this.options.highlight) {
    let out = this.options.highlight(code, lang);
    if (out !== null && out !== code) {
      code = out;
    }
  }

  return [
    "<pre class=\"highlight\">",
      `<code class=\"highlight__listing hljs ${this.options.langPrefix}${lang}\">`,
        `${code}\n`,
      "</code>",
    "</pre>\n"
  ].join("");
};

renderer.codespan = code =>
  [
    "<code class=\"code\">",
      `${code}`,
    "</code>\n"
  ].join("")
;

export default renderer;

//! Copyright AXA Versicherungen AG 2015
