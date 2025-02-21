const express = require("express");
const cors = require("cors"); // Import CORS middleware

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ If you want to allow only your frontend (Recommended)
app.use(
    cors({
        origin: "https://bajaj-fauftse4j-rahuls-projects-86c992ca.vercel.app", // Allow only frontend
        methods: ["GET", "POST"], // Allowed methods
        allowedHeaders: ["Content-Type"], // Allowed headers
    })
);

app.use(express.json());

app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid JSON format" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && item.length === 1);
    const highest_alphabet =
        alphabets.length > 0 ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))] : [];

    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_alphabet,
    });
});

app.get("/bfhl", (req, res) => {
    res.json({
        operation_code: 1,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
