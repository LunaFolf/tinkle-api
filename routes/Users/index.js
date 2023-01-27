const { User } = process.database.models

module.exports = [
  {
    path: '/users/:id/lastLocation',
    options: {
      method: 'POST',
      public: true
    },
    async handler ({ response, bodyData, params }) {
      const { id } = params
      const { position } = bodyData

      const user = await User.findOne({ where: { id } })

      user.set({ lastLocation: position })

      await user.save()

      response.json(user)
    }
  }
]