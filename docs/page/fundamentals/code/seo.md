---
title: SEO
order: 6
template: page.jade
draft: true
---

This page will give you some simple SEO best practices. Be aware that this
page is not exhaustive and you may need further optimization.

# HTTP status codes

Use the HTTP status code as interpreted by Search Robots.

Code | Meaning
--- | ---
`200` | Success
`301` | Permanent Redirect
`302` | Temporary Redirect
`404` | Not Found
`410` | Permanently removed
`500` | Server error
`503` | Unavailable (retry later)

See [An SEO's Guide to HTTP Status Codes (An Infographic) - Moz](https://moz.com/blog/an-seos-guide-to-http-status-codes)
for further explanation.

# Webmaster Tools

Use the relevant webmaster tools

- [Google Webmaster Tools](https://www.google.com/webmasters/tools/)
- [Bing Webmaster Tools](http://www.bing.com/toolbox/webmaster) (Note: This is also used by _Yahoo!_)

See [Liberating Your Data from Google Webmaster Tools](https://moz.com/ugc/liberating-your-data-from-google-webmaster-tools-a-step-by-step-guide)
for a solution on how to access a large data base in Google Webmaster Tools.

# URL

- Choose short, human-readable URLs with descriptive keywords
- Exclude dynamic (query) parameters when possible
- Place content on the same subdomain to preserve authority (example.com/blog instead of blog.example.com)

## Canonicalization

- Mark duplicate content with `<link rel="canonical" ... />`

See [Canonical URL Tag - The Most Important Advancement in SEO Practices Since Sitemaps - Moz](https://moz.com/blog/canonical-url-tag-the-most-important-advancement-in-seo-practices-since-sitemaps)
for further explanation.

# Important HTML Elements

## `<title>...</title>`

- 50-70 characters
- Important keywords near the beginning
- each title should be unique

## `<meta name="description" content="..." >`

- max. 155 charcaters
- each description should be unique
- well written descriptions influence click-through rate

## `<img src="..." alt="..." >`

- use a meaningful image name in the same language as the page it is used for
- use a meaningful alt tag in the same language as the page it is used for
- do not keyword stuff the alt tag (e.g. `ford mustang buy now cheap best price`)
- do not use an alt tag on purely decorative images
- alt tags should be unique
- use responsive images to minimize file size
- use image site maps in Webmaster Tools

## `<a href="..." >...</a>`

- prefer HTML links over JavaScript
- use `rel="nofollow"` for paid links and untrusted content

# Targeting multiple languages

## `<html lang="..">`

Declare language attribute in the HTML element.

## Proper URL structure

### cctLDs (Country Level Only)

`example.ch`

### Subdirectories with gTLDS

`example.com/ch`

### Subdomains with gTLDS

`ch.example.com`

## `<link rel="alternate" hreflang="..." href="..." />`

- Annotate alternate language & region versions of content
- Each version must identify all versions, including itself

https://support.google.com/webmasters/answer/189077

# Mobile Web Development

## Responsive websites

Using the `<meta name="viewport" content="width=device-width,..." >` tag is enough.

## Adaptive websites

- Use the HTTP `Vary` header to identify dynamic serving.

E.g. `Vary: User-Agent`

- Identify mobile and desktop versions using `rel="alternative"` and `rel="canoncal"`

Desktop page: http://example.com/
`<link rel="alternate" media="only screen and (maxwidth:
640px)"
href="https://m.example.com/"/>`
Mobile page: http://m.example.com/
`<link rel="canonical" href="https://example.com/"/>`

# Pagination

Use `rel="next"` and `rel="prev"` in the head section
to indicate the relationship between paginated URLs.

For example:

```html
<link rel="prev" href="https://example.com/article">
<link rel="next" href="https://example.com/article?page=3">
```

- If you page contains session parameters (e.g. sessionId)
  add the same value in the `href="..."` attribute.
  (e.g. `href="ehttp://www.example.com/article?story=abc&page=1&sessionid=123"`)

See [Inhalt mit nummerierten Seiten angeben - Search Console-Hilfe](https://support.google.com/webmasters/answer/1663744)
for further information.

# Sitemap

Provide an xml sitemap at `http://example.com/sitemap.xml`.

- max. 50'000 URLs
- max. 50 MB
- use a [Sitemap-Index](https://support.google.com/webmasters/answer/75712?rd=1) if you exceed the limits above
- UTF-8 encoding
- list pages with a unique URL for every language available
- add image, video and movile extensions to your sitemap if you need this
  media indexed

See [Sitemap erstellen - Search Console-Hilfe](https://support.google.com/webmasters/answer/183668?hl=de&ref_topic=6080646&rd=1)
for further information.

# Robot exclusion

## robots.txt

- Don't block CSS or JavaScript files with robots.txt

See [The Web Robots Pages - robots.txt](http://www.robotstxt.org/robotstxt.html)
for further information.

## X-Robots and meta robots

You can use the `X-Robots` HTTP header and the
`<meta name="robots" content="..." >` HTML tag to pass following arguments
to search robots.

Argument | Meaning
--- | ---
`[no]follow `| do (not) follow links
`[no]index` | do (not) index this page
`[no]archive` | do (not) archive this page
`[no]odp` | do (not) show Open Directory Project description
combined (`noindex,nofollow`) |

The arguments default to `index,follow`

See [The Web Robots Pages - <META> tag](http://www.robotstxt.org/meta.html)
for further information.

# Rich snippets and structured data

Enhance search results and help machines to understand your content.

See [Microdata, JSON-LD & Schema: Rich Snippets Guide](http://builtvisible.com/micro-data-schema-org-guide-generating-rich-snippets/)

<!--- Copyright AXA Versicherungen AG 2015 -->
