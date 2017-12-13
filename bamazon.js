var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "barton34",
  database: "bamazon"
});



// connect to mysql
connection.connect(function(err) {
  if (err) throw err;
  console.log("___________________________________________");
  showProducts();
  shoppingPrompt();
});



// display products (id, product name, department, price)
function showProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    console.log("AVAILABLE PRODUCTS");
    if (err) throw err;

    else for(var i = 0; i < results.length; i++){
      console.log("-----------------------------------------");
      
      console.log(results[i].product_name + " | " + results[i].department_name + " | " + "$" + results[i].price);
    }

  });
}



// Prompt and shopping functions
function shoppingPrompt() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What Item Would You Like To Purchase?"
        },
        {
          name: "bid",
          type: "input",
          message: "How many?"
        }
      ])

      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock_quantity > parseInt(answer.bid)) {
          console.log("Congradulations on your purchase!");
          console.log(chosenItem.item_id);

          // I am able to update the MySQL database values when I have actual values entered for set and where conditions
          connection.query(

            // "UPDATE products SET stock_quantity = 50 WHERE item_id = 2"), function(err, results){
            //     if(err) throw err;

            //   console.log("Total Sale -- $" + chosenItem.price * answer.bid);
            //   }

          // However, when I try to make it dynamic and add variable, I get an error message
              "UPDATE products SET stock_quantity = " + (this.chosenItem.stock_quantity - this.answer.bid) + "WHERE item_id =" + this.chosenItem.item_id), function(err, results){

              if(err) throw err;

              console.log("Total Sale -- $" + chosenItem.price * answer.bid);
            }     
          
        }
        else {
          console.log("Sorry, Insufficient Stock. Only " + chosenItem.stock_quantity + " Available in Stock");
          
        }
      });
  });
}






// display total sale