import testDefinitions from './test-definitions'
import snapshotPage from './snapshot-page'

const pages = testDefinitions()

for (const page of pages) {
  snapshotPage(page)
}
