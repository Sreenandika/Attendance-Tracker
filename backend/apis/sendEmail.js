

//code is from GFG, this feature is not implemented in the project

const nodemailer = require('nodemailer');
let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'xyz@gmail.com',
                pass: '*************'
            }
        }
    );

let mailDetails = {
    from: 'xyz@gmail.com',
    to: 'abc@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};

mailTransporter
    .sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
