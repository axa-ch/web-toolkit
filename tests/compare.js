import resemble from 'node-resemble'
import fs from 'fs'

function compareTestResults(page) {
  for (const test of page.tests) {
    resemble(`data:image/png;base64,${test.snapshotBase64}`)
      .compareTo(test.expected)
      .onComplete((result) => {
        test.misMatchPercentage = result.misMatchPercentage
        if (result.misMatchPercentage > 0) {
          test.diff = `tests/diff/${test.name}.png`

          const imgDataUrl = result.getImageDataUrl()
          const base64Data = imgDataUrl.replace(/^data:image\/png;base64,/, '')

          fs.writeFile(test.diff, base64Data, 'base64', (err) => {
            console.log(err)
          })
          fs.writeFile(test.screenshot, test.snapshotBase64, 'base64', (err) => {
            console.log(err)
          })
        }
      })
  }
}

export default compareTestResults
