var nodemailer = require("nodemailer");


function sendMail(senderEmail, data) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lmaogreninja@gmail.com",
            pass: "GE11!!re",
        },
    });    
	var mailOptions = {
		from: "lmaogreninja@gmail.com",
		to: senderEmail,
		subject: "Sending Email using Node.js",
		text: data,
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

sendMail("nandagopal.nsb@gmail.com","LMAO");
