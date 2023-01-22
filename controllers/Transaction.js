const { sequelize } = require("../models/Database");
const { Op } = (Sequelize = require("sequelize"));

const createTransaction = (db, data) => {
  return db.Transaction.create({
    account_id: data.account_id,
    transaction_user_id: data.transaction_user_id,
    transaction_type: data.transaction_type,
    category: data.category,
    amount: data.amount,
    date: data.date,
  });
};

const getAll = (db, transaction_user_id) => {
  return db.Transaction.findAll({
    attributes: [
      "transaction_id",
      "transaction_type",
      "category",
      "date",
      "amount",
    ],
    where: { transaction_user_id: transaction_user_id },
  });
};

const getTransactions = (db, query) => {
  return db.Transaction.findAll({
    attributes: [
      "transaction_id",
      "transaction_type",
      "category",
      "date",
      "amount",
    ],
    include: { model: db.Account, attributes: ["bank_name", "account_number"] },
    where: query,
  });
};

const getIncomeOutcome = (db, userID, tType) => {
  return db.Transaction.findAll({
    attributes:["amount","date"],
    where:{
      transaction_user_id:userID,
      transaction_type:tType,
    }
  });    
};

const getResume = (db, userID) =>{
  return db.Transaction.findAll({
    attributes:["category", [sequelize.fn("sum", sequelize.col("`Transactions`.`amount`")), "total"]],
    where:{transaction_user_id: userID, transaction_type:1},
    group:["`Transactions`.`category`"],
    order: sequelize.literal("`Transactions`.`category` ASC")
  });  
}

module.exports = {
  createTransaction,
  getAll,
  getTransactions,
  getIncomeOutcome,
  getResume
};
