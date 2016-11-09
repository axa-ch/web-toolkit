import testDefinitions from './test-definitions'
import snapshotPage from './snapshot-page'
import compare from './compare'
import resultPage from './result-page'

const pages = testDefinitions()
const promises = []

for (const page of pages) {
  const promise = snapshotPage(page)
    .then((p) => {
      compare(p)
    })
  promises.push(promise)
}

Promise.all(promises).then(() => {
  resultPage.createResultPage(pages)
})
