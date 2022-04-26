const { TrestleRoute } = require('@whiskeedev/trestle')
const fs = require('fs')
const titleCard = '[Router]'

let routes = []

let potentialRoutes = fs.readdirSync('./routes', { withFileTypes: true })
potentialRoutes = potentialRoutes.filter(dirent => dirent.isDirectory())

potentialRoutes.forEach(dirent => {
  const indexFile = `./routes/${dirent.name}/index.js`
  if (fs.existsSync(indexFile)) {
    console.log(`${titleCard} Loading routes from ${indexFile}`.yellow)
    routes = routes.concat(require(`./${dirent.name}`))
  } else if (fs.existsSync(indexFile + '.disabled')) {
    console.log(`${titleCard} Skipping routes from ${indexFile}`.red)
  } else {
    console.log(`${titleCard} No routes found in ${indexFile}`.red)
  }
})

exports.routes = routes.map(route => {
  const trestleRoute = new TrestleRoute(route.path, route.options)
  trestleRoute.on('route_match', route.handler)
  return trestleRoute
})