const express = require("express");
const { getUsers, getUserById } = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth"); // <-- make sure this line is present

const router = express.Router();

// Protected route
router.get("/me", requireAuth, async (req, res) => {
    res.json({ id: req.user.id, role: req.user.role });
});

router.get("/", getUsers);
router.get("/:id", getUserById);


module.exports = router;
