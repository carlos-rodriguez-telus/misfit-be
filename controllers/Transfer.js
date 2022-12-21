const createTransfer = (db, data) => {
    return db.Transfer.create({
      amount: data.amount,
      currency: data.account_id,
      origin_account_id: data.origin_account_id,
      target_account_id: data.target_account_id
    });
  };
  
  const getAll = (db, origin_account_id) => {
    return db.Transfer.findAll({
      where: { origin_account_id: origin_account_id },
    });
  };
  
  module.exports = { createTransfer, getAll };
  