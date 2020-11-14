import fs from 'fs'
import axios from 'axios'

const fetchFeed = async () => {
  const feedRequest = await axios('https://www.harrisgeo.me/feed.json')
  return feedRequest.data.items.splice(0, 5)
}

const updateFeed = async () => {
  try {
    const readme = fs.readFileSync('./README.md', 'utf8')

    const feed = await fetchFeed()
    const articlesTitle = '## Recent articles:'
    let updatedReadme = readme.split(articlesTitle)[0] + articlesTitle

    feed.forEach((item) => {
      updatedReadme += `\n- [${item.title}](${item.url})`
    })

    fs.writeFileSync('./README.md', updatedReadme)
  } catch (error) {
    console.error(error)
  }
}

updateFeed()
