module.exports.init = (sequelize, { DataTypes, Model }) => {
  class Character extends Model {}
  Character.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['f', 'm'],
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // Appearance (hair, eyes, etc)
      // Will have to come back to this, it's different depending on the gender
    // Upperbody is the skin, not a clothing option (but still grouped with clothes because it changes with clothing)
    // See clothShirt and/or clothJacket for torso clothing.
    upperbody: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 168
      }
    },
    // Clothes
    clothMask: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 148
      }
    },
    clothLowerbody: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 115
      }
    },
    clothBackpack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 81
      }
    },
    clothShoes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 91
      }
    },
    clothNeck: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 132
      }
    },
    clothShirt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 144
      }
    },
    clothArmor: { // Only visual, doesn't affect gameplay
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 38
      }
    },
    clothJacket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 290
      }
    }
  }, {
    sequelize,
    modelName: 'Character'
  })

  return Character
}

module.exports.associate = (models) => {
  models.Character.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  })
}