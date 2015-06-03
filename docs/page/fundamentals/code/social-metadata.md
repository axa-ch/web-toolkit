---
title: Social metadata
order: 7
collection: nav__fundamentals__code
template: page.jade
draft: true
---

This page covers social metadata best practices. We recommend using at least
Open Graph and Twitter card tags. Add Schema.org markup to cover Google+.

# Validation process

## Twitter

Before your cards show on Twitter, you must first have your domain approved.
Fortunately, it's a super-easy process. After you implement your cards, simply
enter your sample URL into the <a class="link" href="https://dev.twitter.com/docs/cards/validation/validator">validation tool</a>.
After checking your markup, select the "Submit for Approval" button.

## Facebook, Google+

No approval required.

# Open Graph data

Open Graph data is used by facebook and other (minor) social media platforms.

Find below a minimal recommended markup. See <a href="http://ogp.me/" class="link">ogp.me</a> for a complete documentation.
Also have a look at <a href="https://developers.facebook.com/docs/sharing/best-practices" class="link">facebooks best practices</a>,
 especially when it comes to choosing an appropriate image size.

Minimal recommended markup:

```html
<!-- Open Graph data -->
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article:
http://ogp.me/ns/article#">
<meta property="og:title" content="Your Title Here" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:description" content="Your Description Here" />
<meta property="og:site_name" content="Your Site Name, i.e. Moz" />
<meta property="fb:admins" content="Facebook numeric ID" />
```

# Twitter card

Find below a minimal markup for a summary card. See <a class="link" href"https://dev.twitter.com/cards/types">Card Types | Twitter Developers</a>
for a list of available card types and how to use them.

```html
<!-- Twitter Card data -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="Your @publisher_handle">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="Your Page description
less than 200 characters">
<meta name="twitter:creator" content="Your @author_handle">
<!-- Twitter summary card image must be at least 120x120px and less than 1MB -->
<!-- See the twitter reference on how the image is cropped -->
<meta name="twitter:image:src" content="https://example.com/image.jpg">
```

To display a card with a large image replace the `twitter:image` and `twitter:card` tags
with the following tags.

```html
<meta name="twitter:card" content="summary_large">
<!-- Twitter summary card with large image must be at least 280x150px and less than 1MB -->
<meta name="twitter:image:src" content="https://example.com/image.jpg">
```

# Schema.org

Schema.org markup is used by Google+. Note that Google+ falls back to Open Graph data
if not Schema.org data is present.

Find below a minimal example markup or see <a class="link" href"https://developers.google.com/+/web/snippet/?hl=de">Snippet - Google+ Platform — Google Developers</a> for additional information.

```html
<!-- Update your html tag to include the itemscope and itemtype attributes. -->
<html itemscope itemtype="http://schema.org/Article">
```

```html
<meta itemprop="name" content="The Name or Title Here">
<meta itemprop="description" content="This is the page description">
<meta itemprop="image" content="http://www.example.com/image.jpg">
```

or

```html
<span itemprop="name">The Name or Title Here</span>
<span itemprop="description">This is the page description</span>
<img itemprop="image" src="http://www.example.com/image.jpg">
```

# Tips and best practices

See [Must-Have Social Meta Tags for Twitter, Google+, Facebook and More - Moz](https://moz.com/blog/meta-data-templates-123)
for Tips and best practices.

# Tools

- [Twitter Validation Tool](https://dev.twitter.com/docs/cards/validation/validator)
- [Facebook Debugger](https://developers.facebook.com/tools/debug)
- [Google Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets)
