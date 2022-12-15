const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail').setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// need to fix
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Tanmoy <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {

    // Sendgrid
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }




  // Send the actual email
  async send(requested, subject) {

    let text = '';
    
    if (requested === 'welcome') {
      text = subject
    }
    if (requested === 'password reset') {
      text = `Reset your password by applying the code in the website

      ${ this.url}

      Ignore this email if you have not initiated the password reset`;
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
