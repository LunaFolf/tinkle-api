module.exports.init = (sequelize, { DataTypes, Model }) => {
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    defaultCharacterId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    license: {
      type: DataTypes.STRING,
      allowNull: false
    },
    xbl: { // Xbox Live... I think
      type: DataTypes.STRING,
      allowNull: true
    },
    live: { // Microsoft Live... again no idea
      type: DataTypes.STRING,
      allowNull: true
    },
    discord: { // Discord, self explanatory
      type: DataTypes.STRING,
      allowNull: true
    },
    fivem: { // Thought license was for FiveM, but not sure now...
      type: DataTypes.STRING,
      allowNull: true
    },
    license2: { // Electric Boogaloo?
      type: DataTypes.STRING,
      allowNull: true
    },
    lastLocation: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User'
  })

  return User
}

module.exports.associate = (models) => {
  models.User.hasMany(models.Character, {
    foreignKey: 'userId',
    as: 'characters'
  })

  models.User.hasMany(models.Vehicle, {
    foreignKey: 'userId',
    as: 'vehicles'
  })

  models.User.hasMany(models.Property, {
    foreignKey: 'userId',
    as: 'properties'
  })
}