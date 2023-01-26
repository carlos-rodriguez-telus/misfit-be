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
    .getUser(db, req.body)
    .then((result) => {
      if (result) {
        res.status(200).send({ message: "VALID", userData:result });
      } else {
        res.status(200).send({ message: "INVALID LOGIN" });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "INVALID LOGIN" });
    });
});

/************************* Users *************************/

app.post("/user", (req, res) => {
  users
    .createUser(db, req.body.values)
    .then((result) => {
      res.send({ message: "User Created", status:"OK"});
    })
    .catch((error) => {
      res.send({ error: "User can not be created, already have an account?", status:"ERROR" });
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
      res.send({ error: "User not available" });
    });
});

app.get("/user/:user_id", (req, res) => {
  users
    .getSingle(db, req.params.user_id)
    .then((result) => {
      res.send({ message: result });
    })
    .catch((error) => {
      res.send({ error: "User information not available" });
    });
});

app.delete("/user/:user_id", (req, res) => {
  users
    .deleteUser(db, req.params.user_id)
    .then((result) => {
      res.send({ message: "User Deleted" });
    })
    .catch((error) => {
      res.send({ error: "User can not be deleted" });
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
      res.send({ error: "Please check account information", status:"ERROR"});
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
      res.send({ error: "Account can not be updated", status:"ERROR" });
    });
});

/**Get all User Accounts */
app.get("/account/:transaction_user_id", (req, res) => {
  accounts
    .getAll(db, req.params.transaction_user_id)
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
      res.send({ error: "Account can not be deleted", status:"ERROR" });
    });
});

/************************* Accounts *************************/

/** Create Transaction */
app.post("/transaction", (req, res) => {
  console.log(req.body);
  transaction
    .createTransaction(db, req.body.data)
    .then((result) => {
      accounts.updateBalance(db, req.body.data).then(()=>{
        res.send({ message: "Transaction Stored!", status:"OK" });
      }).catch((error)=>{
        console.log(error);
        res.status(500).send({ error: error, status:"ERROR" });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: error, status:"ERROR" });
    });
});

/** Get all account transactions */
app.get("/transaction/:transaction_user_id", (req, res) => {
  transaction
    .getAll(db, req.params.transaction_user_id)
    .then((result) => {
      res.send({ message: result, status:"OK" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: error, status:"ERROR" });
    });
});

/************************* Filter *************************/
app.get("/filter/:transaction_user_id/:filter_category/:filter_value", (req, res) => {

let query = {}
query["transaction_user_id"] = req.params.transaction_user_id

if(req.params.filter_category=="date") query["date"] = req.params.filter_value;
if(req.params.filter_category=="category") query["category"] = req.params.filter_value;
if(req.params.filter_category=="account") query["account_id"] = req.params.filter_value;

transaction
    .getTransactions(db, query)
    .then((result) => {
      res.send({ message: result, status:"OK" });
    })
    .catch((error) => {
      res.status(500).send({ error: error, status:"ERROR" });
    });
});

/************************* Transfers *************************/

/** Create Transfer */
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

/************************* Dashboard *************************/

app.get("/dashboard/data/:user_id/:transaction_type", (req, res)=>{
  transaction
    .getIncomeOutcome(db, req.params.user_id, req.params.transaction_type)
    .then((response)=>{
      res.send({message:response});
    })
    .catch((error)=>{
      res.status(200).send({error:"No Information available"});
    });
});

app.get("/dashboard/graph/:user_id", (req, res)=>{
  transaction
    .getResume(db, req.params.user_id)
    .then((response)=>{
      res.send({message:response});
    })
    .catch((error)=>{
      res.status(200).send({error:"No Information available"});
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
