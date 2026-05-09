const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://sdframe.caldis.me'

module.exports = function generateSitemap(data, categories) {
  const urls = [
    '/', '/docs/', '/developers/', '/api/', '/getting-started/', '/pricing/',
    '/about/', '/contact/', '/privacy/', '/alternatives/', '/compare-framework-catalogs/', '/status/',
    '/map', '/compare', '/selector', '/paths', '/insights', '/timeline', '/agent',
    '/index.md', '/pricing.md', '/AGENTS.md', '/SKILL.md', '/llms.txt', '/llms-full.txt',
    '/openapi.json', '/api/frameworks.index.json', '/api/categories.json',
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
