const express = require('express');
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/admin/:admin_id", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/pages/admin", "admin.html"));
});


router.get("/admin/:admin_id/student_manager", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/pages/admin", "studentHandler.html")
    );
});

router.get("/admin/:admin_id/teacher_manager", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/pages/admin", "teacherHandler.html")
    );
});

router.get("/admin/:admin_id/class_manager", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/pages/admin", "classHandler.html")
    );
});

router.get("/admin/:admin_id/subject_manager", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/pages/admin", "subjectHandler.html")
    );
});

router.get("/admin/:admin_id/department_manager", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/pages/admin", "departmentHandler.html")
    );
});
module.exports = router;