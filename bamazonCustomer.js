const mysql = require('mysql');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nich',
    password: '123456',
    database: 'bamazon',
});

//* Calls purchaseProcess and begins procedures
purchaseProcess();

//* Functionality *//

//* Begins the Purchase Procedures
function purchaseProcess() {
    // Connects to database
    db.connect((err) => {
        if (err) throw err;
    });

    // Calls displayItems
    displayItems();
}

//* Displays each item in the products table
function displayItems() {
    const sql = 'SELECT * FROM products';

    db.query(sql, (err, res) => {
        if (err) throw err;

        res.forEach((item) => {
            console.table(item);
        });

        // Calls purchasePrompt
        // @param passes in the total number of items in the table
        purchasePrompt(res[res.length - 1].item_id);
    });
}

//* Prompts the user for the ID of the product and the desired amount
function purchasePrompt(numItems) {
    inquirer
        .prompt([
            {
                message: `What is the ID of the product you wish to purchase? (1-${numItems})`,
                name: 'id',
                type: 'input',
            },
            {
                message: 'How many would you like to buy?',
                name: 'qty',
                type: 'input',
            },
        ])
        .then((res) => {
            const { id, qty } = res;

            // Calls checkStock
            // @param passes along id and quantity from prompt
            checkStock(id, qty);
        });
}

//* Checks available stock of desired item
function checkStock(id, qty) {
    const sql = `SELECT * FROM products WHERE item_id = ${id}`;

    db.query(sql, (err, res) => {
        if (err) throw err;

        // If avaialable stock is greater than or equal to desired amount
        // calls handlePurchse
        // else sends the user an error and breaks the process
        res[0].stock_quantity >= qty ? handlePurchase(id, qty) : console.log('Error: Insufficient Quantity');
    });
}

//* Reduces quantity of desired item in database and updates product_sales
function handlePurchase(id, qty) {
    const sql = `UPDATE products, departments
                 SET products.stock_quantity = products.stock_quantity - ${qty},
                     products.product_sales = products.product_sales + ${qty} * products.price,
                     departments.product_sales = departments.product_sales + ${qty} * products.price
                 WHERE products.item_id = ${id}
                 AND products.dept_id = departments.department_id`;

    db.query(sql, (err, res) => {
        if (err) throw err;

        // Calls displayReceipt
        displayReceipt(id, qty);
    });
}

//* Displays purchase information to user
function displayReceipt(id, qty) {
    const sql = `SELECT * FROM products WHERE item_id = ${id}`;

    db.query(sql, (err, res) => {
        if (err) throw err;

        const productName = res[0].product_name;
        const price = res[0].price;
        const total = price * qty;

        // Example: Coffee: (5 at $10) = $50
        console.log(`${productName}: (${qty} at $${price}) = $${total}`);

        // Ends the database connection
        db.end();
    });
}
