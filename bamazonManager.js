const mysql = require('mysql');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nich',
    password: '123456',
    database: 'bamazon',
});

db.connect((err) => {
    if (err) throw err;

    mainMenu();
});

function mainMenu() {
    inquirer
        .prompt([
            {
                message: 'Please select a task:',
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product',
                ],
                name: 'func',
                type: 'list',
            },
        ])
        .then((res) => {
            const { func } = res;

            switch (func) {
                case 'View Products for Sale':
                    viewProducts();
                    break;

                case 'View Low Inventory':
                    viewLowInv();
                    break;

                case 'Add to Inventory':
                    addToInv();
                    break;

                case 'Add New Product':
                    addNewProduct();
                    break;
            }
        });
}

function viewProducts() {
    const sql = 'SELECT * FROM products';

    db.query(sql, (err, res) => {
        if (err) throw err;

        res.forEach((item) => {
            console.table(item);
        });

        db.end();
    });
}

function viewLowInv() {
    const sql = 'SELECT * FROM products WHERE stock_quantity < 5';

    db.query(sql, (err, res) => {
        if (err) throw err;

        res.forEach((item) => {
            console.log(`${item.product_name} is running low! Only ${item.stock_quantity} remaining!`);
        });

        db.end();
    });
}

function addToInv() {
    const sql = 'SELECT * FROM products';
    const products = [];

    db.query(sql, (err, res) => {
        if (err) throw err;

        res.forEach((item) =>
            products.push(`${item.item_id}: ${item.product_name} (${item.stock_quantity})`)
        );

        inquirer
            .prompt([
                {
                    message: 'Which product would you like to update?',
                    choices: products,
                    name: 'choice',
                    type: 'list',
                },
                {
                    message: 'How many would you like to add?',
                    name: 'qty',
                    type: 'input',
                },
            ])
            .then((res) => {
                const id = parseInt(res.choice.split(' ')[0].slice(0, -1));
                const name = res.choice.split(' ')[1];
                const qty = parseInt(res.qty);

                const sql = `UPDATE products SET stock_quantity = stock_quantity + ${qty} WHERE item_id = ${id}`;

                db.query(sql, (err, res) => {
                    if (err) throw err;

                    console.log(`Successfully added ${qty} to stock of ${name}`);

                    db.end();
                });
            });
    });
}

function addNewProduct() {
    inquirer
        .prompt([
            {
                message: 'What is the name of the new product?',
                name: 'product_name',
                type: 'input',
            },
            {
                message: 'What is department is the product sold in?',
                name: 'department_name',
                type: 'input',
            },
            {
                message: 'What is the cost of the new product?',
                name: 'price',
                type: 'input',
            },
            {
                message: 'What is the initial stock?',
                name: 'stock_quantity',
                type: 'input',
            },
        ])
        .then((res) => {
            const { product_name, department_name, price, stock_quantity } = res;

            const sql = 'INSERT INTO products SET ?';
            const product = { product_name, department_name, price, stock_quantity };

            db.query(sql, product, (err, res) => {
                if (err) throw err;

                console.log('New product successfully added added');

                db.end();
            });
        });
}
