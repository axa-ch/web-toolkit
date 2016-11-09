import testDefinitions from './test-definitions'
import snapshotPage from './snapshot-page'
import compare from './compare'
import resultPage from './result-page'

const pages = testDefinitions()

for (const page of pages) {
  snapshotPage(page)
    .then((p) => {
      compare(p)
    })
}

resultPage.createResultPage(pages)
