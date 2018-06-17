import fs from 'fs'
import path from 'path'

function saveResult(result) {
  let json = null

  try {
    json = JSON.stringify(result, null, 2)
  } catch (err) {
    throw err
  }

  const timestamp = Date.now()
  const filename = `result-${timestamp}.json`
  const directory = path.join(__dirname, '..', '/results')
  const filepath = `${directory}/${filename}`

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  fs.writeFile(filepath, json, err => {
    if (err) {
      throw err
    }
  })
}

export default saveResult
