/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_session', {
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expired: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    data: {
      type: "BLOB",
      allowNull: true
    }
  }, {
    tableName: 'admin_session'
  });
};
