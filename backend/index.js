const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");

const funcs = require("./db-helpers/main.js");
const db = require("./db-helpers/const-local.js");
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

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/students", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../public/pages/students", "students.html")
	);
});

app.get("/admin/:admin_id", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/pages/admin", "admin.html"));
});
app.get("/admin/:admin_id/student_manager", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/pages/admin", "admin.html"));
});
app.get("/admin/:admin_id/teacher_manager", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/pages/admin", "admin.html"));
});
app.get("/admin/:admin_id/class_manager", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../public/pages/admin", "classHandler.html")
	);
});
app.get("/admin/:admin_id/subject_manager", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../public/pages/admin", "subjectHandler.html")
	);
});
app.get("/admin/:admin_id/department_manager", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../public/pages/admin", "departmentHandler.html")
	);
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
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
