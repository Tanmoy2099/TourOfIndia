const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');


// need to fix
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Tanmoy Nath <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: process.env.GOOGLE_USERNAME,
          pass: process.env.GOOGLE_PASSWORD
        }
      });
    // }

    // return nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD
    //   }
    // });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject
    // });
    let text = '';
    if (template === 'welcome'){
      text = subject
    }
    if (template === 'password reset') {
    text = `This is reset your password by clicking this link ${url}. Ignore this email if you have not initiated the password reset`;
    }

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to TourIndia!');
  }

  async sendPasswordReset() {
    await this.send(
      'password reset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
