const createTransaction = (db, data) => {
  return db.Transaction.create({
    transaction_type: data.transaction_type,
    amount: data.amount,
    date: data.date,
    account_id: data.account_id
  });
};

const getAll = (db, account_id) => {
  return db.Transaction.findAll({
    where: { account_id: account_id },
  });
};

const getTransactions = (db, data) => {
  return db.Transaction.findAll({
    where: { 
      account_id: data.account_id,
      transaction_type:data.transaction_type,
      date: data.date
    }
  });
};

module.exports = { createTransaction, getAll, getTransactions };
