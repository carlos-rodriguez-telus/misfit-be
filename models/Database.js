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

const Transaction = sequelize.define(
  "Transactions",
  {
    transaction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    transaction_type: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL
  },
  {
    tableName: "Transactions",
  }
);

const Transfer = sequelize.define(
  "Transfers",
  {
    transfer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: DataTypes.DECIMAL,
    currency: DataTypes.STRING
  },
  {
    tableName: "Transfers",
  }
);

User.hasMany(Account, {
  foreignKey: 'account_user_id'
});

Account.hasMany(Transaction, {
  foreignKey: 'account_id'
});

Account.hasMany(Transfer, { foreignKey: 'origin_account_id'});
Account.hasMany(Transfer, { foreignKey: 'target_account_id'});

module.exports = { sequelize, User, Account, Transaction, Transfer };