module.exports = [
  {
    path: '/datastore',
    options: {
      method: 'GET',
      public: true
    },
    async handler ({ response }) {
      response.json(process.datastore)
    }
  },
  {
    path: '/datastore/:model',
    options: {
      method: 'GET',
      public: true
    },
    async handler ({ response, params }) {
      const { model } = params
      response.json(process.datastore[model])
    }
  }
]