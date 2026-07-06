const express = require('express');
const cors = require('cors');
const app = express();
const ApiError = require('./app/api-error');
const contactRoutes = require('./app/routes/contact.route');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});
app.use('/api/contacts', contactRoutes);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// handle error response
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    })
})

module.exports = app;