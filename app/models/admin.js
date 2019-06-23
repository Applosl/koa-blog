/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'admin',
    freezeTableName: true,
    timestamps: false
  });
};
