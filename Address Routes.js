// Add this to your server/index.js file.

// POST /api/customers/:id/addresses: Add an address for a customer
app.post('/api/customers/:id/addresses', (req, res) => {
    const { id } = req.params;
    const { address_details, city, state, pin_code } = req.body;
    if (!address_details || !city || !state || !pin_code) {
        return res.status(400).json({ error: "All address fields are required." });
    }

    const sql = `INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [id, address_details, city, state, pin_code], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ 
            message: "Address added successfully", 
            addressId: this.lastID 
        });
    });
});

// GET /api/customers/:id/addresses: Get addresses for a specific customer
app.get('/api/customers/:id/addresses', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM addresses WHERE customer_id = ?`;
    db.all(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// PUT /api/addresses/:addressId: Update an address
app.put('/api/addresses/:addressId', (req, res) => {
    const { addressId } = req.params;
    const { address_details, city, state, pin_code } = req.body;
    const sql = `UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ? WHERE id = ?`;
    db.run(sql, [address_details, city, state, pin_code, addressId], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "Address updated successfully" });
    });
});

// DELETE /api/addresses/:addressId: Delete an address
app.delete('/api/addresses/:addressId', (req, res) => {
    const { addressId } = req.params;
    const sql = `DELETE FROM addresses WHERE id = ?`;
    db.run(sql, [addressId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Address deleted successfully" });
    });
});
