module.exports.init = (sequelize, { DataTypes, Model }) => {
  class Property extends Model { }
  Property.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['garage', 'apartment', 'house', 'office', 'business'],
      allowNull: false
    },
    slug: {
      type: DataTypes.ENUM,
      values: process.datastore.properties.map(p => p.slug),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Property'
  })

  return Property
}

module.exports.associate = (models) => {
  models.Property.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'owner'
  })

  models.Property.hasMany(models.Vehicle, {
    foreignKey: 'garageId',
    as: 'vehicles'
  })
}