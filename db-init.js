const Database = require('better-sqlite3');
const db = new Database('mydb.sqlite', { verbose: console.log });

const dropShipmentsTable = 'DROP TABLE IF EXISTS shipments;';
db.exec(dropShipmentsTable);

const dropUsersTable = 'DROP TABLE IF EXISTS users;';
db.exec(dropUsersTable);

const dropBlogTable = 'DROP TABLE IF EXISTS posts;';
db.exec(dropBlogTable);

const usersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE
);`;

db.exec(usersTable);

// Add more table definitions and seed data as needed
const shipmentsTable = `
CREATE TABLE IF NOT EXISTS shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shippingDate TEXT,
    recipientName TEXT,
    recipientCountry TEXT,
    recipientAddress TEXT,
    status TEXT,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
);`;

db.exec(shipmentsTable);

// insert to usersTable
const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
insertUser.run('Frodo Baggins', 'frodo@theshire');
insertUser.run('Sam Gamgee', 'samwise@theshire');
insertUser.run('Bilbo Baggins', 'bilbo@theshire');

// insert to shipmentsTable for user Sam Gamgee
const insertShipment = db.prepare('INSERT INTO shipments (shippingDate, recipientName, recipientCountry, recipientAddress, status, userId) VALUES (?, ?, ?, ?, ?, ?)');
insertShipment.run('2023-11-01', 'Pippin Took', 'United States', '123 Main St, New York, NY 10001', 'Delivered', 2);
insertShipment.run('2023-11-02', 'Merry Brandybuck', 'Canada', '123 Main St, Toronto, ON M5V 1A1', 'Delivered', 2);
insertShipment.run('2023-11-03', 'Merry Brandybuck', 'United States', '123 Main St, New York, NY 10001', 'Delivered', 2);
insertShipment.run('2023-11-03', 'Frodo Baggins', 'Canada', '123 Main St, Toronto, ON M5V 1A1', 'Delivered', 2);
insertShipment.run('2023-11-03', 'Pippin Took', 'United States', '123 Main St, New York, NY 10001', 'In Transit', 2);
insertShipment.run('2023-11-06', 'Pippin Took', 'Canada', '123 Main St, Toronto, ON M5V 1A1', 'Delivered', 2);
insertShipment.run('2023-11-07', 'Merry Brandybuck', 'United States', '123 Main St, New York, NY 10001', 'In Transit', 2);
insertShipment.run('2023-11-08', 'Frodo Baggins', 'Canada', '123 Main St, Toronto, ON M5V', 'Delivered', 2);
insertShipment.run('2023-11-09', 'Pippin Took', 'United States', '123 Main St, New York, NY 10001', 'In Transit', 2);
insertShipment.run('2023-11-10', 'Pippin Took', 'Canada', '123 Main St, Toronto, ON M5V 1A1', 'Delivered', 2);
insertShipment.run('2023-11-15', 'Frodo Baggins', 'United States', '123 Main St, New York, NY 10001', 'Pending Collection', 2);
insertShipment.run('2023-11-15', 'Frodo Baggins', 'Canada', '123 Main St, Toronto, ON M5V 1A1', 'Pending Collection', 2);

// add some shipments for user Frodo Baggins too
insertShipment.run('2023-11-03', 'Sam Gamgee', 'United States', '123 Main St, New York, NY 10001', 'In Transit', 1);
insertShipment.run('2023-11-12', 'Sam Gamgee', 'Canada', '123 Main St, Toronto, ON M5V 1A1', 'Delivered', 1);



// Create blog post table
const blogTable = `
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    slug TEXT UNIQUE,
    content TEXT,
    author TEXT,
    date TEXT
);`;

db.exec(blogTable);

// insert to blogTable
const insertBlog = db.prepare('INSERT INTO posts (title, slug, content, author, date) VALUES (?, ?, ?, ?, ?)');
insertBlog.run('My First Blog Post', 'my-first-blog-post', 'This is my first blog post. I hope you like it. This is some content to increase the word count.', 'Frodo Baggins', '2023-11-01');
insertBlog.run('My Second Blog Post', 'my-second-blog-post', 'This is my second blog post. I hope you like it.', 'Sam Gamgee', '2023-11-02');
insertBlog.run('My Third Blog Post', 'my-third-blog-post', 'This is my third blog post. I hope you like it.', 'Merry Brandybuck', '2023-11-03');
insertBlog.run('My Fourth Blog Post', 'my-fourth-blog-post', 'This is my fourth blog post. I hope you like it.', 'Pippin Took', '2023-11-04');


db.close();