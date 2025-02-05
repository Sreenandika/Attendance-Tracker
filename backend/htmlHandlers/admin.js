/**
 * @file admin.js
 * @description This file contains the handlers for admin-related HTML requests.
 * It uses the body-parser middleware to parse incoming request bodies.
 * 
 * @requires body-parser
 */

const express = require('express');
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const login = require("../auth/auth.js");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use('',login);

router.get("/admin/:admin_id", (req, res) => {
	if(req.session.isAuth){
        console.log(req.session.isAuth);
		res.sendFile(path.join(__dirname, "../../public/pages/admin", "admin.html"));
	}
	else{
		res.redirect("/");
	}
});

router.get("/admin/:admin_id/student_manager",  (req, res) => {
    if(req.session.isAuth){
        console.log(req.session.isAuth);
		res.sendFile(path.join(__dirname, "../../public/pages/admin", "studentHandler.html"));
	}
	else{
		res.redirect("/");
	}
});

router.get("/admin/:admin_id/teacher_manager",  (req, res) => {
    if(req.session.isAuth){
        console.log(req.session.isAuth);
		res.sendFile(path.join(__dirname, "../../public/pages/admin", "teacherHandler.html"));
	}
	else{
		res.redirect("/");
	}
});

router.get("/admin/:admin_id/class_manager",  (req, res) => {
    if(req.session.isAuth){
        console.log(req.session.isAuth);
		res.sendFile(path.join(__dirname, "../../public/pages/admin", "classHandler.html"));
	}
	else{
		res.redirect("/");
	}
});

router.get("/admin/:admin_id/subject_manager",  (req, res) => {
    if(req.session.isAuth){
        console.log(req.session.isAuth);
		res.sendFile(path.join(__dirname, "../../public/pages/admin", "subjectHandler.html"));
	}
	else{
		res.redirect("/");
	}
});

router.get("/admin/:admin_id/department_manager",  (req, res) => {
    if(req.session.isAuth){
        console.log(req.session.isAuth);
		res.sendFile(path.join(__dirname, "../../public/pages/admin", "departmentHandler.html"));
	}
	else{
		res.redirect("/");
	}
});
module.exports = router;