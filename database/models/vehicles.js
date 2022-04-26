module.exports.init = (sequelize, { DataTypes, Model }) => {
  class Vehicle extends Model { }
  Vehicle.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    mods: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
    },
    colors: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [0, 0]
    }
  }, {
    sequelize,
    modelName: 'Vehicle',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'name']
      }
    ]
  })

  return Vehicle
}

module.exports.associate = (models) => {
  models.Vehicle.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'owner'
  })
}