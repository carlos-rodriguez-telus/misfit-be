const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/Database");
const users = require("./controllers/User");
const accounts = require("./controllers/Accounts");
const transaction = require("./controllers/Transaction");
const transfer = require("./controllers/Transfer");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

/************************* Login *************************/
app.post("/login", (req, res) => {
  users
    .getSingle(db, req.body)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).send({ message: "VALID" });
      } else {
        res.status(403).send({ message: "INVALID" });
      }
    })
    .catch((error) => {});
});

/************************* Users *************************/

app.post("/user", (req, res) => {
  users
    .createUser(db, req.body.values)
    .then((result) => {
      res.send({ message: "User Created", status:"OK"});
    })
    .catch((error) => {
      res.send({ error: error, status:"ERROR" });
    });
});

app.put("/user", (req, res) => {
  users
    .updateUser(db, req.body)
    .then((result) => {
      res.send({ message: "User Updated" });
    })
    .catch((error) => {
      res.send({ error: error });
    });
});

app.get("/user", (req, res) => {
  users
    .getAll(db)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.send({ error: error });
    });
});

app.get("/user/:user_id", (req, res) => {
  users
    .getSingle(db, req.params.user_id)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.send({ error: error });
    });
});

app.delete("/user/:user_id", (req, res) => {
  users
    .deleteUser(db, req.params.user_id)
    .then((result) => {
      res.send({ message: "User Deleted" });
    })
    .catch((error) => {
      res.send({ error: error });
    });
});

/************************* Accounts *************************/

/* Create account */
app.post("/account", (req, res) => {
  accounts
    .createAccount(db, req.body.values)
    .then((result) => {
      res.send({ message: "Account Created", status:"OK"});
    })
    .catch((error) => {
      res.send({ error: error, status:"ERROR"});
    });
});

/**Update Account */
app.put("/account", (req, res) => {
  accounts
    .updateAccount(db, req.body.values)
    .then((result) => {
      res.send({ message: "Account Updated", status:"OK" });
    })
    .catch((error) => {
      res.send({ error: error, status:"ERROR" });
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
      res.send({ error: error });
    });
});

/** Delete user account */
app.delete("/account/:account_user_id/:account_number", (req, res) => {
  accounts
    .deleteAccount(db, req.params.account_user_id, req.params.account_number)
    .then((result) => {
      res.send({ message: "Account Deleted", status:"OK"});
    })
    .catch((error) => {
      res.send({ error: error, status:"ERROR" });
    });
});

/************************* Accounts *************************/

/** Create Transaction */
app.post("/transaction", (req, res) => {
  transaction
    .createTransaction(db, req.body)
    .then((result) => {
      res.send({ message: "Transaction Stored!" });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
});

/** Get all account transactions */
app.get("/transaction/:account_id", (req, res) => {
  transaction
    .getAll(db, req.params.account_id)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
});

/************************* Filter *************************/
app.get("/filter/:account_id/:transaction_type/:date", (req, res) => {
  let data = {
    account_id: req.params.account_id,
    transaction_type: req.params.transaction_type,
    date: req.params.date,
  };

  transaction
    .getTransactions(db, data)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
});

/************************* Transfers *************************/

/** Create Transaction */
app.post("/transfer", (req, res) => {
  transfer
    .createTransfer(db, req.body)
    .then((result) => {
      res.send({ message: "Money transfer done!" });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
});

/** Get all account transactions */
app.get("/transfer/:account_id", (req, res) => {
  transfer
    .getAll(db, req.params.account_id)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
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
      console.log(`Server listening on port ${port}`);
    });
});
