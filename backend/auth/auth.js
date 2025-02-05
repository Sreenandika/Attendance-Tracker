/*
	This file handles the authentication side of things, for all three users.
 */

const session = require("express-session");
const express = require("express");
const pgSession = require('connect-pg-simple')(session);
const router = express.Router();
const bodyParser = require("body-parser");
const { Pool } = require("pg");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const funcs = require("../db-helpers/main.js");
const db = require("../db-helpers/const-local.js");

const pool = new Pool({
	user: db.user,
	host: db.host,
	database: db.database,
	password: db.password,
	port: db.port,
	ssl: db.ssl,
});

router.use(
	session({
		store: new pgSession({
			pool: pool, 
			tableName: "session",
		}),
		secret: "THE KEY",
		resave: false,
		saveUninitialized: false,
	})
);

router.post("/login", async (req, res) => {
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
						req.session.isAuth = true;
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
router.get("/logout", async (req, res) => {
	req.session.destroy((err)=>{
		if(err) console.log(err);
	});
	res.send("OK");
});
module.exports = router;
