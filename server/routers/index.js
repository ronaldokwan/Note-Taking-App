const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const errHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);
router.get("/", Controller.home);
router.get("/archived", Controller.archived);
router.post("/add-note", Controller.addNote);
router.put("/update-note", Controller.updateNote);
router.delete("/delete-note", Controller.deleteNote);
router.patch("/update-archived", Controller.updateArchived);

router.use(errHandler);
module.exports = router;
