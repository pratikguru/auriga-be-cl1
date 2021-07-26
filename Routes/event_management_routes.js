const router = require("express").Router();
const authVerify = require("../Auth/verifyToken");
const User = require("../Models/user");
const { request } = require("express");
const nodemailer = require("nodemailer");
const mustache = require("mustache");
const mjml = require("mjml");

async function EmailHandler(templateData, template, emailConfig) {
  const renderedMJML = mustache.render(template, templateData);
  const html = mjml(renderedMJML).html;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass,
    },
  });

  let info = await transporter.sendMail(
    {
      from: emailConfig.from, // sender address
      to: emailConfig.to, // list of receivers
      subject: emailConfig.subject, // Subject line
      html: html,
    },
    (error, info) => {
      console.log(error, info);
    }
  );
}

router.post("/send_test_email", authVerify, async (req, res) => {
  console.log(req);
  await EmailHandler(
    req.body.templateData,
    req.body.temaplate,
    req.body.emailConfig
  );
  res.status(200).send({ message: "Email has been sent!" });
});
module.exports = router;
