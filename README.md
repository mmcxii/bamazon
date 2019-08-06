# bamazon

A first attempt using MySQL, a CLI for a storefront.

---

## Using bamazon as a Customer

```bash
    node bamazonCustomer
```

```bash
┌─────────────────┬──────────────┐
│     (index)     │    Values    │
├─────────────────┼──────────────┤
│     item_id     │      12      │
│  product_name   │  'Keyboard'  │
│      price      │      79      │
│ stock_quantity  │      28      │
│  product_sales  │      0       │
│     dept_id     │      2       │
│ department_name │ 'Technology' │
└─────────────────┴──────────────┘
┌─────────────────┬─────────────┐
│     (index)     │   Values    │
├─────────────────┼─────────────┤
│     item_id     │     13      │
│  product_name   │ 'Textbook'  │
│      price      │     300     │
│ stock_quantity  │     17      │
│  product_sales  │     900     │
│     dept_id     │      5      │
│ department_name │ 'Education' │
└─────────────────┴─────────────┘
? What is the ID of the product you wish to purchase? (1-13) 12
? How many would you like to buy? 5
Keyboard: (5 at $79) = $395
```

When using bamazon as a Customer, you will be asked first for the id of the product you wish to purchase, which can be found in the tables displayed above the prompt, as well as the number of that item you wish to purchase. Then, the system will check the database to confirm that bamazon has sufficient resources avaialable to complete your request. Once that has been confirmed a reciept will be displayed listing the name of the product, the quantity you have requested, the price per item, and finally the total sum of your order.

## Using bamazon as a Manager

```bash
    node bamazonManager
```

```bash
? Please select a task: (Use arrow keys)
> View Products for Sale
  View Low Inventory
  Add to Inventory
  Add New Product
```

After first opening bamazon as a Manager you will be presented with a simple dashboard. From there you can select with task you wish to perform.

### View Products for Sale

```bash
┌─────────────────┬────────────┐
│     (index)     │   Values   │
├─────────────────┼────────────┤
│     item_id     │     11     │
│  product_name   │ 'Bandages' │
│      price      │     10     │
│ stock_quantity  │    100     │
│  product_sales  │     0      │
│     dept_id     │     4      │
│ department_name │ 'Medical'  │
└─────────────────┴────────────┘
┌─────────────────┬──────────────┐
│     (index)     │    Values    │
├─────────────────┼──────────────┤
│     item_id     │      12      │
│  product_name   │  'Keyboard'  │
│      price      │      79      │
│ stock_quantity  │      23      │
│  product_sales  │     395      │
│     dept_id     │      2       │
│ department_name │ 'Technology' │
└─────────────────┴──────────────┘
┌─────────────────┬─────────────┐
│     (index)     │   Values    │
├─────────────────┼─────────────┤
│     item_id     │     13      │
│  product_name   │ 'Textbook'  │
│      price      │     300     │
│ stock_quantity  │     17      │
│  product_sales  │     900     │
│     dept_id     │      5      │
│ department_name │ 'Education' │
└─────────────────┴─────────────┘
```

Selecting View Products for Sale will present you with a list of all of the current products avaialable for purchase on bamazon. Included in these tables are the item's ID, as well as its name, price, current avaialable stock, and the department in which it resides, as well as other information.

### View Low Inventory

```bash
? Please select a task: View Low Inventory
Coffee is running low! Only 2 remaining!
Shirts is running low! Only 3 remaining!
```

Selecting View Low Inventory will display all items in the store with a current avaialable quantity of 5 or less.

### Add to Inventory

```bash
? Which product would you like to update? (Use arrow keys)
  1: Bourbon (12)
> 2: Coffee (2)
  3: Laptop (87)
  4: Tablet (37)
  5: Phone (83)
  6: Jeans (30)
  7: Shorts (24)
(Move up and down to reveal more choices)
```

When restocking items to your inventory, first select the item from the list.

```bash
? Which product would you like to update? 2: Coffee (2)
? How many would you like to add? 20
Successfully added 20 to stock of Coffee
```

Then simply enter the number you wish to add to the items stock, and the database will be updated.

### Add New Product

```bash
? Please select a task: Add New Product
? What is the name of the new product? Hot Pockets
? Which department is this product to be sold in? 1: Food/ Drink
? What is the cost of the new product? 3
? What is the initial stock? 40
Hot Pockets successfully added added to Food/ Drink's store. Initial quantity: 40
```

When adding new products, simply follow the instructions given in the prompt. First enter the name of the product, then select its intended department from the list. Finally enter its cost and initial stock and the database will be updated with the new item.

## Using bamazon as a Supervisor

```bash
    node bamazonSupervisor
```

```bash
? Please select a task: (Use arrow keys)
> View Product Sales by Department
  Create New Department
```

Bamazon Supervisors are only required to perform two tasks, select one to begin.

### View Product Sales by Department

```bash
? Please select a task: View Product Sales by Department
┌────────────────┬───────────────┐
│    (index)     │    Values     │
├────────────────┼───────────────┤
│       ID       │       1       │
│   Department   │ 'Food/ Drink' │
│ Overhead Costs │     3000      │
│ Product Sales  │      520      │
│  Total Profit  │     -2480     │
└────────────────┴───────────────┘
┌────────────────┬──────────────┐
│    (index)     │    Values    │
├────────────────┼──────────────┤
│       ID       │      2       │
│   Department   │ 'Technology' │
│ Overhead Costs │     3000     │
│ Product Sales  │    13595     │
│  Total Profit  │    10595     │
└────────────────┴──────────────┘
```

Selecting the first option will display a table for each department currently operating within bamazon, as well as data about that department's current sales record.

### Create New Department

```bash
? Please select a task: Create New Department
? What is the new department's name? Home/ Garden
? What is the department's Overhead Cost? 3000
Home/ Garden successfully added.
```

To create a new department, simply give it a name and determine its Overhead Cost (the default is 3000).
