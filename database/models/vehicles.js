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
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        max: 8
      },
      get() {
        const rawValue = this.getDataValue('licensePlate')
        if (rawValue) return rawValue.toUpperCase()
        const id = this.getDataValue('id')
        const idSplit = id.split('-')[0]
        return idSplit.substring(0, 8).toUpperCase()
      }
    },
    customWheels: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    bulletProofTyres: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    turbo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    windowTint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    extras: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
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