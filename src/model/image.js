const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/db.connect')


const Image = sequelize.define(
  'Image',
  {
    // Model attributes are defined here
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'Images',
  }
)

// `sequelize.define` also returns the model
console.log(Image === sequelize.models.Image) // true

module.exports = Image
