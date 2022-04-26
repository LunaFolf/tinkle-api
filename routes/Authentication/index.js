const { User } = process.database.models

module.exports = [
  {
    path: '/authenticate',
    options: {
      method: 'POST',
      public: true
    },
    async handler ({ response, bodyData }) {
      const { license, username, xbl, live, discord, fivem, license2 } = bodyData // Always gonna use license, unless FiveM decide it's no longer good

      const [user, created] = await User.findOrCreate({
        where: { license },
        defaults: { license, username }
      })

      user.set({
        username,
        xbl,
        live,
        discord,
        fivem,
        license2
      })

      await user.save()

      response.json(user)
    }
  }
]