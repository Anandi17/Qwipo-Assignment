// Add this to your server/index.js file after the initial setup.

// POST /api/customers: Create a new customer
app.post('/api/customers', (req, res) => {
    const { first_name, last_name, phone_number } = req.body;
    if (!first_name || !last_name || !phone_number) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`;
    db.run(sql, [first_name, last_name, phone_number], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ 
            message: "Customer created successfully", 
            customerId: this.lastID 
        });
    });
});

// GET /api/customers: Get all customers with search, sort, and pagination
app.get('/api/customers', (req, res) => {
    const { search = '', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM customers WHERE first_name LIKE ? OR last_name LIKE ? ORDER BY first_name LIMIT ? OFFSET ?`;
    const params = [`%${search}%`, `%${search}%`, limit, offset];

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// GET /api/customers/:id: Get a single customer
app.get('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM customers WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: "Customer not found." });
        }
        res.json({ data: row });
    });
});

// PUT /api/customers/:id: Update a customer
app.put('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone_number } = req.body;
    const sql = `UPDATE customers SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?`;
    db.run(sql, [first_name, last_name, phone_number, id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "Customer updated successfully" });
    });
});

// DELETE /api/customers/:id: Delete a customer
app.delete('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM customers WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Customer deleted successfully" });
    });
});
