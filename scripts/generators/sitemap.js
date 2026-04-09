const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://sdframe.caldis.me'

module.exports = function generateSitemap(data, categories) {
  const urls = [
    '/', '/map', '/compare', '/selector', '/paths', '/insights', '/timeline', '/agent',
  ]

  categories.forEach(c => urls.push(`/category/${c.slug}`))
  data.forEach(f => urls.push(`/frameworks/${f.slug}`))

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${BASE_URL}${u}</loc></url>`).join('\n')}
</urlset>`

  fs.writeFileSync(path.join(__dirname, '..', '..', 'public', 'sitemap.xml'), sitemap)
  console.log(`  sitemap: ${urls.length} URLs`)
}
