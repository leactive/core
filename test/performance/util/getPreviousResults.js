import fs from 'fs'
import util from 'util'
import path from 'path'

async function getPreviousResults() {
  const directory = path.join(__dirname, '..', '/results')
  const readdir = util.promisify(fs.readdir)
  const readFile = util.promisify(fs.readFile)

  if (!fs.existsSync(directory)) {
    return []
  }

  try {
    const filenames = await readdir(directory)

    const files = await Promise.all(
      filenames.map(filename => readFile(`${directory}/${filename}`, 'utf-8')),
    )

    return files
      .map(file => JSON.parse(file))
      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
  } catch (err) {
    throw err
  }
}

export default getPreviousResults
