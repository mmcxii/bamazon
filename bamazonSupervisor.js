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
                choices: ['View Product Sales by Department', 'Create New Department'],
                name: 'func',
                type: 'list',
            },
        ])
        .then((res) => {
            switch (res.func) {
                case 'View Product Sales by Department':
                    viewSalesByDept();
                    break;

                case 'Create New Department':
                    createNewDept();
                    break;
            }
        });
}

function viewSalesByDept() {
    const sql = 'SELECT * FROM departments';

    db.query(sql, (err, res) => {
        if (err) throw err;

        res.forEach((dept) => {
            const deptData = {};
            deptData.ID = dept.department_id;
            deptData.Department = dept.department_name;
            deptData['Overhead Costs'] = dept.over_head_costs;
            deptData['Product Sales'] = dept.product_sales;
            deptData['Total Profit'] = deptData['Product Sales'] - deptData['Overhead Costs'];

            console.table(deptData);
        });

        db.end();
    });
}

function createNewDept() {
    inquirer
        .prompt([
            {
                message: "What is the new department's name?",
                name: 'department_name',
                type: 'input',
            },
            {
                message: "What is the department's Overhead Cost?",
                default: '3000',
                name: 'over_head_costs',
                type: 'input',
            },
        ])
        .then((res) => {
            const { department_name, over_head_costs } = res;

            const sql = `INSERT INTO departments SET ?`;
            const dept = { department_name, over_head_costs: parseInt(over_head_costs) };

            db.query(sql, dept, (err, res) => {
                if (err) throw err;

                console.log(`${department_name} successfully added.`);

                db.end();
            });
        });
}
