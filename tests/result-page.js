import handlebars from 'handlebars'
import fs from 'fs'

function resultPage(pages) {
  handlebars.registerHelper('gt', function gtHelper(a, b, opts) {
    if (a > b) {
      return opts.fn(this)
    }

    return opts.inverse(this)
  })

  const numberOfPages = pages.length
  let numberOfTests = 0
  let numberOfFailedTests = 0
  let numberOfFailedPages = 0

  for (const page of pages) {
    page.ok = true
    numberOfTests += page.tests.length

    for (const test of page.tests) {
      if (test.misMatchPercentage > 0) {
        page.ok = false
        numberOfFailedTests += 1
      }
    }

    if (!page.ok) {
      numberOfFailedPages += 1
    }
  }

  const template = handlebars.compile(fs.readFileSync('template.hbs', 'utf-8'))

  const output = template({
    pages,
    numberOfFailedPages,
    numberOfFailedTests,
    numberOfPages,
    numberOfTests,
    env: process.env,
  })

  fs.writeFileSync('tests/results.html', output)
}

export default resultPage
