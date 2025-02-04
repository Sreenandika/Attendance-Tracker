const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");

const funcs = require("./db-helpers/main.js");
const db = require("./db-helpers/const.js");
const adminPaths = require("./htmlHandlers/admin.js")
const app = express();
const port = 3000;

const pool = new Pool({
	user: db.user,
	host: db.host,
	database: db.database,
	password: db.password,
	port: db.port,
	ssl: db.ssl,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('',adminPaths);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.post("/login", async (req, res) => {
	const client = await pool.connect();
	if (req.body.userType === "admin") {
		const dataToSend = {
			user_id: "no_user_found",
			loginStatus: false,
		};
		funcs
			.getAdminUsers(client)
			.then((result) => {
				console.log(result.rows);
				for (let i = 0; i < result.rows.length; i++) {
					if (
						req.body.username === result.rows[i].username &&
						req.body.password === result.rows[i].password
					) {
						dataToSend.user_id = result.rows[i].user_id;
						dataToSend.loginStatus = true;
						break;
					}
				}
				res.send(dataToSend);
			})
			.catch((e) => {
				console.error("Error getting admin users", e);
				res.send("Error getting admin users");
			});
	}
	client.release();
});

app.get("/getClass", async (req, res) => {
	const client = await pool.connect();
	funcs.getClass(client).then((result) => {
		res.send(result.rows);
	});
	client.release();
});

app.post("/addClass", async (req, res) => {
	const client = await pool.connect();
	funcs
		.addClasses(client, req.body.className, req.body.classId)
		.then((result) => {
			console.log(result.rows);
		});
	client.release();
});
app.post("/editClass", async (req, res) => {
	const client = await pool.connect();
	funcs
		.editClass(
			client,
			req.body.oldClass,
			req.body.className,
			req.body.oldClassId,
			req.body.classId
		)
		.then((result) => {
			console.log(result.rows);
		});
	client.release();
});

app.post("/addDepartment", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addDepartments(client, req.body.departmentId, req.body.departmentName)
		.then((result) => {
			res.send("OK");
		});
	client.release();
});
app.get("/getDepartments", async (req, res) => {
	const client = await pool.connect();
	funcs.getDepartments(client).then((result) => {
		res.send(result.rows);
	});
	client.release();
});
app.post("/addSubject", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addSubjects(
			client,
			req.body.department_id,
			req.body.subject_name,
			req.body.subject_id,
			req.body.subject_type
		)
		.then((result) => {
			res.send("OK");
		});
	client.release();
});
app.post("/addTeacher", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addTeachers(
			client,
			req.body.department_id,
			req.body.teacher_name,
			req.body.teacher_id
		)
		.then((result) => {
			res.send("OK");
		});
	client.release();
});
app.get("/getTeachers", async (req, res) => {
	const client = await pool.connect();
	funcs.getTeachers(client).then((result) => {
		res.send(result.rows);
	});
	client.release();
});
app.get("/getSubjects", async (req, res) => {
	const client = await pool.connect();
	funcs.getSubjects(client).then((result) => {
		res.send(result.rows);
	});
	client.release();
});
app.post("/addAssignment", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addAssignment(
			client,
			req.body.class_id,
			req.body.teacher_id,
			req.body.subject_id
		)
		.then((result) => {
			res.send("OK");
		});
	client.release();
});
app.post("/addStudent", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addStudents(
			client,
			req.body.department_id,
			req.body.student_name,
			req.body.student_id
		)
		.then((result) => {
			res.send("OK");
		});
	client.release();
});
app.get("/getStudents", async (req, res) => {
	const client = await pool.connect();
	funcs.getStudents(client).then((result) => {
		console.log(result.rows);
		res.send(result.rows);
	});
	client.release();
});
app.post("/addEnrollment", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addEnrollment(
			client,
			req.body.class_id,
			req.body.student_id
		)
		.then((result) => {
			res.send("OK");
		});
	client.release();
});
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
