import express from "express";
import dbConnect from "../lib/dbConnect";
import bodyParser from "body-parser";
// import cors from "cors";
require("dotenv").config();
import crypto from "crypto";
import User from "../models/User";
import Test1User from "../models/Test1User";
import JioUsers from "../models/JioUsers";
import axios from "axios";
import nodemailer from "nodemailer";
import SMTPPool from "nodemailer/lib/smtp-pool";

const app = express();
app.use(bodyParser.json());
// app.use(cors());

const PORT: number = 3000;

const salt_key = process.env.SALT_KEY;
const merchant_id = process.env.MERCHANT_ID;
const pg_uri = process.env.PG_URI;
const redirect_uri = process.env.REDIRECT_URI;
const frontend_uri = process.env.FRONTEND_URI;
const frontend_uri_shellten = process.env.FRONTEND_URI_SHELLTEN;

const godaddyEmail = "kpmgcareers@acquisitionportal.com";
const godaddyPassword = "acquisition@A1";

const mailTransport = nodemailer.createTransport({
  port: 465,
  host: "smtpout.secureserver.net",
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,

  debug: true,
  auth: {
    user: godaddyEmail,
    pass: godaddyPassword,
  },
} as SMTPPool.MailOptions);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/checkEmail", async (req, res) => {
  await dbConnect();
  const { email } = req.body;
  const user = await JioUsers.findOne({ email });
  if (user) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
});

app.post("/registerJioUser", async (req, res) => {
  await dbConnect();
  const user = new JioUsers(req.body);
  user.createdAt = new Date(new Date().toLocaleString("en-IN", { 
    timeZone: "Asia/Kolkata", 
    hour12: true 
  }));
  user
    .save()
    .then(() => {
      const mailOptions = {
        from: `Jio Careers <kpmgcareers@acquisitionportal.com>`,
        to: req.body.email,
        subject: `Thank you for choosing Jio`,
        text: `Dear candidate,    
      
Thank you for your interest in Jio!

We have successfully received your submission to the Entry Level position.
We will work to review your application as quickly as we can and will share updates regarding your application status via this email. If your application is shortlisted, you will be participating in the next stage of our selection process, which involves an aptitude test.We will keep you updated on the status of your application and provide further details if you are selected to proceed to the next round.
Thank you for considering a career with Jio. We appreciate your patience during our review process and look forward to the possibility of working together.

Best regards,
Jio Talent Acquisition Team
        `,
        html: `<div dir="ltr"><p style="color:rgb(0,0,0)"></p><div style="text-align:center"></div><p style="color:rgb(0,0,0)"><br></p><p style="color:rgb(0,0,0)">Dear candidate,</p><p style="color:rgb(0,0,0)">Thank you for your interest in Jio!</p><p style="color:rgb(0,0,0)">We have successfully received your submission to the Entry Level position.
We will work to review your application as quickly as we can and will share updates regarding your application status via this email. If your application is shortlisted, you will be participating in the next stage of our selection process, which involves an aptitude test.We will keep you updated on the status of your application and provide further details if you are selected to proceed to the next round.
We appreciate your patience during our review process and look forward to the possibility of working together.
</p><p style="color:rgb(0,0,0)">Thank you once again for your participation, and we wish you the best of luck!</p><p dir="ltr" style="line-height:1.467816;margin-right:14pt;text-align:justify;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(0,0,0);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Regards,</span></p><p dir="ltr" style="line-height:1.467816;margin-right:14pt;text-align:justify;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(0,0,0);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Jio Talent Acquisition Team</span></p><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(11,83,148);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Power is a fundamental part of our world. That's why we're dedicated to improving people's lives and the environment with power management technologies that are more efficient, safe and reliable. Because that's what really matters. And we're here to make sure it works.</span></p><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:8pt;font-family:Arial,sans-serif;color:rgb(102,102,102);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Please note: This email is auto-generated and cannot accept replies.</span></p><p style="color:rgb(0,0,0)"><br></p></div>`,
      };
      mailTransport
        .sendMail(mailOptions)
        .then(() => {
          console.log("Email sent successfully");
          res.send("success");
        })
        .catch((err) => {
          console.log("Failed to send email");
          console.error(err);
          res.send("error");
        });
    })
    .catch((err: Error) => {
      console.error("Registration Error: ", err);
      res.status(500).send("User Registration Failed");
    });
});

app.post("/registerUser", async (req, res) => {
  await dbConnect();
  const user = new User(req.body);
  user.createdAt = new Date(Date.now());
  user
    .save()
    .then(() => {
      const mailOptions = {
        from: `KPMG Careers <kpmgcareers@acquisitionportal.com>`,
        to: req.body.email,
        subject: `Thank you for choosing KPMG`,
        text: `Dear candidate,    
      
Thank you for your interest in KPMG!

We have successfully received your submission to the Entry Level position.
We will work to review your application as quickly as we can and will share updates regarding your application status via this email. If your application is shortlisted, you will be participating in the next stage of our selection process, which involves an aptitude test.We will keep you updated on the status of your application and provide further details if you are selected to proceed to the next round.
Thank you for considering a career with KPMG. We appreciate your patience during our review process and look forward to the possibility of working together.

Best regards,
KPMG Talent Acquisition Team
        `,
        html: `<div dir="ltr"><p style="color:rgb(0,0,0)"></p><div style="text-align:center"></div><p style="color:rgb(0,0,0)"><br></p><p style="color:rgb(0,0,0)">Dear candidate,</p><p style="color:rgb(0,0,0)">Thank you for your interest in KPMG!</p><p style="color:rgb(0,0,0)">We have successfully received your submission to the Entry Level position.
We will work to review your application as quickly as we can and will share updates regarding your application status via this email. If your application is shortlisted, you will be participating in the next stage of our selection process, which involves an aptitude test.We will keep you updated on the status of your application and provide further details if you are selected to proceed to the next round.
We appreciate your patience during our review process and look forward to the possibility of working together.
</p><p style="color:rgb(0,0,0)">Thank you once again for your participation, and we wish you the best of luck!</p><p dir="ltr" style="line-height:1.467816;margin-right:14pt;text-align:justify;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(0,0,0);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Regards,</span></p><p dir="ltr" style="line-height:1.467816;margin-right:14pt;text-align:justify;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(0,0,0);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">KPMG Talent Acquisition Team</span></p><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(11,83,148);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Power is a fundamental part of our world. That's why we're dedicated to improving people's lives and the environment with power management technologies that are more efficient, safe and reliable. Because that's what really matters. And we're here to make sure it works.</span></p><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:8pt;font-family:Arial,sans-serif;color:rgb(102,102,102);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Please note: This email is auto-generated and cannot accept replies.</span></p><p style="color:rgb(0,0,0)"><br></p></div>`,
      };
      mailTransport
        .sendMail(mailOptions)
        .then(() => {
          console.log("Email sent successfully");
          res.send("success");
        })
        .catch((err) => {
          console.log("Failed to send email");
          console.error(err);
          res.send("error");
        });
    })
    .catch((err: Error) => {
      console.error("Registration Error: ", err);
      res.status(500).send("User Registration Failed");
    });
});

app.post("/submitTest1", async (req, res) => {
  await dbConnect();

  const user = new Test1User(req.body);

  user.createdAt = new Date(Date.now());
  user
    .save()
    .then(() => res.send("Test submitted successfully"))
    .then(() => {
      console.log("Test 1 Submitted");
    })
    .catch((err: Error) => res.status(500).send("Test Submission Failed"));
});

app.post("/submitTest2", async (req, res) => {
  await dbConnect();

  await Test1User.findOneAndUpdate(
    { email: req.body.email },
    { isTest2Submitted: true }
  );

  const mailOptions = {
    from: `KPMG Careers <kpmgcareers@acquisitionportal.com>`,
    to: req.body.email,
    subject: `Thank You for submitting your online technical test`,
    text: `Hi candidate,    
  
Your test is successfully submitted.
You will hear back from us in a few days
  
KPMG Careers
    `,
    html: `<div dir="ltr"><p style="color:rgb(0,0,0)"></p><div style="text-align:center"></div><p style="color:rgb(0,0,0)"><br></p><p style="color:rgb(0,0,0)">Hi candidate,</p><p style="color:rgb(0,0,0)">Thank you for successfully submitting your Online Technical Test. We appreciate the time and effort you have invested in this stage of the recruitment process.</p><p style="color:rgb(0,0,0)">Our team will now carefully review and evaluate your test performance. Please note that this process may take a little time, as we aim to ensure a thorough assessment for every candidate. We will be in touch with you shortly once the evaluation is complete, and we will inform you about the next steps in the process.</p><p style="color:rgb(0,0,0)">Thank you once again for your participation, and we wish you the best of luck!</p><p dir="ltr" style="line-height:1.467816;margin-right:14pt;text-align:justify;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(0,0,0);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Regards,</span></p><p dir="ltr" style="line-height:1.467816;margin-right:14pt;text-align:justify;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(0,0,0);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">KPMG Talent Acquisition Team</span></p><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial,sans-serif;color:rgb(11,83,148);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Power is a fundamental part of our world. That's why we're dedicated to improving people's lives and the environment with power management technologies that are more efficient, safe and reliable. Because that's what really matters. And we're here to make sure it works.</span></p><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:8pt;font-family:Arial,sans-serif;color:rgb(102,102,102);font-variant-ligatures:normal;font-variant-alternates:normal;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline;white-space:pre-wrap">Please note: This email is auto-generated and cannot accept replies.</span></p><p style="color:rgb(0,0,0)"><br></p></div>`,
  };
  mailTransport
    .sendMail(mailOptions)
    .then(() => {
      console.log("Email sent successfully");
      res.send("success");
    })
    .catch((err) => {
      console.log("Failed to send email");
      console.error(err);
      res.send("error");
    });
});

app.post("/payment", async (req, res) => {
  try {
    let { MUID, transactionId, amount, name, phone, email } = req.body;

    Test1User.findOne({ email: email })
      .then((docs) => {
        console.log("Res: ", docs);
        if (docs === null) {
          let user = new Test1User({
            name: name,
            email: email,
            mobile: phone,
          });
          user.createdAt = new Date(Date.now());
          user
            .save()
            .then(() => console.log("user created successfully"))
            .catch((err: Error) => console.error("user creation error: ", err));
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });

    //Payment
    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      name: name,
      amount: amount * 100,
      merchantUserId: MUID,
      redirectUrl: `${redirect_uri}/status?id=${transactionId}&email=${email}`,
      redirectMode: "POST",
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const keyIndex = 1;

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");

    const string = payloadMain + "/pg/v1/pay" + salt_key;

    const sha256 = crypto.createHash("sha256").update(string).digest("hex");

    const checksum = sha256 + "###" + keyIndex;

    const prodUrl = `${pg_uri}/pg/v1/pay`;

    const options = {
      method: "POST",
      url: prodUrl,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    await axios(options)
      .then((response) => {
        return res.json(response.data);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
});

app.post("/status", async (req, res) => {
  await dbConnect();
  const merchantTransactionId = req.query.id;
  const email = req.query.email;
  const merchantId = merchant_id;

  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: "GET",
    url: `${pg_uri}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  await axios
    .request(options)
    .then((response) => {
      console.log("Response Status: ", response.data);
      console.log("Email: ", email);
      if (
        response.data.success === true &&
        response.data.code === "PAYMENT_SUCCESS"
      ) {
        Test1User.findOneAndUpdate(
          { email: email },
          {
            isPaidUser: true,
            transactionId: merchantTransactionId,
            transactionDate: new Date(Date.now() + 19800000),
          }
        ).catch((err) => console.error("Payment update error: ", err));
        const URL = `${frontend_uri_shellten}/payment`;
        return res.redirect(URL);
      } else {
        const URL = `${frontend_uri}/payment-failed`;
        return res.redirect(URL);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/test1Status", async (req, res) => {
  await dbConnect();
  const email = req.query.email;
  await Test1User.findOne({ email: email }).then((docs) => {
    docs !== null
      ? res.send({ testSubmitted: true })
      : res.send({ testSubmitted: false });
  });
});

app.get("/verifyPayment", async (req, res) => {
  await dbConnect();
  const email = req.query.email;
  await Test1User.findOne({ email: email })
    .then((docs) => {
      docs
        ? res.send({
            status: docs.isPaidUser,
            testStatus: docs.isTest2Submitted,
          })
        : res.send({ status: false });
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, () => {
  console.log(`App service running on port ${PORT}`);
});
