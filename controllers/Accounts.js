const createAccount = (db, data) => {
  return db.Account.create({
    account_number: data.account_number,
    account_user_id: data.account_user_id,
    bank_name: data.bank_name,
    balance: data.balance,
  });
};

const updateAccount = (db, data) => {
  return db.Account.update(
    {
      bank_name: data.bank_name,
      balance: data.balance,
    },
    {
      where: { user_id: data.user_id, account_number: data.account_number },
    }
  );
};

const getAll = (db, account_user_id) => {
  return db.Account.findAll({ where: { account_user_id: account_user_id } });
};

const deleteAccount = (db, account_user_id, account_number) => {
  return db.Account.destroy({
    where: { account_user_id: account_user_id, account_number: account_number },
  });
};

const updateBalance = (db, data) => {
  console.log(data);
  if (data.transaction_type == "0") {
    return db.Account.increment(
      { balance: +data.amount },
      {
        where: { account_user_id: data.transaction_user_id, account_id: data.account_id },
      }
    );
  }else{
    return db.Account.increment(
      { balance: -data.amount },
      {
        where: { account_user_id: data.transaction_user_id, account_id: data.account_id },
      }
    );
  }
};

module.exports = {
  createAccount,
  updateAccount,
  getAll,
  deleteAccount,
  updateBalance,
};
