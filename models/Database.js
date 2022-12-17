const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define(
  "Users",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    tableName: "Users",
  }
);

const Account = sequelize.define(
  "Accounts",
  {
    account_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bank_name: DataTypes.STRING,
    account_number: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
  },
  {
    tableName: "Accounts",
  }
);

User.hasMany(Account, {
  foreignKey: 'account_user_id'
});


module.exports = { sequelize, User, Account };