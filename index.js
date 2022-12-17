const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/Database");
const users = require("./controllers/User");
const accounts = require("./controllers/Accounts");

const app = express();
const port = 3000;

app.use(bodyParser.json());

/*  User Routes */

app.post("/user", (req, res) => {
  users
    .createUser(db, req.body)
    .then((result) => {
      res.send({ message: "User Created" });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

app.put("/user", (req, res) => {
  users
    .updateUser(db, req.body)
    .then((result) => {
      res.send({ message: "User Updated" });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

app.get("/user", (req, res) => {
  users
    .getAll(db)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

app.get("/user/:user_id", (req, res) => {
  users
    .getSingle(db, req.params.user_id)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

app.delete("/user/:user_id", (req, res) => {
  users
    .deleteUser(db, req.params.user_id)
    .then((result) => {
      res.send({ message: "User Deleted" });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

/* Account Routes */

/* Create account */
app.post("/account", (req, res) => {
  accounts
    .createAccount(db, req.body)
    .then((result) => {
      res.send({ message: "Account Created" });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

/**Update Account */
app.put("/account", (req, res) => {
  accounts
    .updateAccount(db, req.body)
    .then((result) => {
      res.send({ message: "Account Updated" });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

/**Get all User Accounts */
app.get("/account/:account_user_id", (req, res) => {
  accounts
    .getAll(db, req.params.account_user_id)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

/** Delete user account */
app.delete("/account/:account_user_id/:account_number", (req, res) => {
  accounts
    .deleteAccount(db, req.params.account_user_id, req.params.account_number)
    .then((result) => {
      res.send({ message: "Account Deleted" });
    })
    .catch((error) => {
      res.send({ error: JSON.stringify(error) });
    });
});

/* Server Start */

app.listen(port, () => {
  db.sequelize
    .sync()
    .then((result) => {
      console.log("Database initiated!");
    })
    .then((result) => {
      console.log(`Example app listening on port ${port}`);
    });
});
