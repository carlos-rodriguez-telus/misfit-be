const createTransaction = (db, data) => {
  return db.Transaction.create({
    transaction_type: data.transaction_type,
    amount: data.amount,
    account_id: data.account_id
  });
};

const getAll = (db, account_id) => {
  return db.Transaction.findAll({
    where: { account_id: account_id },
  });
};

module.exports = { createTransaction, getAll };
