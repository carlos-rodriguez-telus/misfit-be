const createUser = (db, data) => {
  return db.User.create({
    email: data.email,
    name: data.name,
    lastname: data.lastname,
    address: data.address,
    phone: data.phone,
    password: data.password,
  });
};

const updateUser = (db, data) => {
  return db.User.update({
    name: data.name,
    lastname: data.lastname,
    address: data.address,
    phone: data.phone,
    password: data.password,
  },{
    where:{ user_id: data.user_id }
  });
};

const getAll = (db) => {
  return db.User.findAll();
};

const getSingle = (db, data) => {
  return db.User.findOne({ where:{ user_id: data } });
};

const deleteUser = (db, data) => {
  return db.User.destroy({ where:{ user_id: data } });
};

module.exports = { createUser, updateUser, getAll, getSingle, deleteUser };
