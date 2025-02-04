/*
	This file handles the authentication side of things, for all three users.
 */


const express = require("express");
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
module.exports = router;
