import perfy from 'perfy'

import saveResult from './saveResult'
import getPreviousResults from './getPreviousResults'

function test(suit) {
  perfy.start('measuring')

  suit(async () => {
    const result = perfy.end('measuring')
    const previousResults = await getPreviousResults()
    const lastResult = previousResults[0] || { time: 0 }
    const difference = ((result.time / lastResult.time - 1) * 100).toFixed(2)

    result.timestamp = Date.now()

    // eslint-disable-next-line no-console
    console.log(
      `Last result (ms): ${lastResult.time}`,
      `\nCurrent result (ms): ${result.time}`,
      `\nDifference (ms): ${difference} %`,
    )

    saveResult(result)
  })
}

export default test
