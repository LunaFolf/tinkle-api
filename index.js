const { TrestleAPI } = require('@whiskeedev/trestle');

require('./prelaunch')
require('colors')

const titleCard = '[index.js]'.magenta

const secureMode = false // Whether the API should be secured or not

const properties = require('./data/properties.json')
process.datastore = {
  properties
}

require('./database/init.js').then(() => {
  console.log(titleCard, 'Database successfully initialized'.green);

  const { routes } = require('./routes')
  const api = new TrestleAPI({ port: process.env.PORT || 8081 })
  api.secureMode = secureMode

  if (!secureMode && (process.env.SSL_KEY && process.env.SSL_CERT)) {
    const key = fs.readFileSync(process.env.SSL_KEY).toString()
    const cert = fs.readFileSync(process.env.SSL_CERT).toString()

    api.setSSL(key, cert)
  } else if (secureMode) throw new Error('SSL Creds missing')

  api.init()

  routes.forEach(route => api.addRoute(route))
})