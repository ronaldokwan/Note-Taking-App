const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const errHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/", Controller.home);
router.get("/archived", Controller.archived);
router.post("/add-note", Controller.addNote);

router.put("/update-note/:id", authorization, Controller.updateNote);
router.delete("/delete-note/:id", authorization, Controller.deleteNote);
router.patch("/update-archived/:id", authorization, Controller.updateArchived);

router.use(errHandler);
module.exports = router;
