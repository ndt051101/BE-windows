const nodemailer = require("nodemailer");
require("dotenv").config();

const getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (true) {
        result = `
      <h3>Xin chào ${dataSend.customerName} !</h3>
      <p>Bạn nhận được email để xác nhận.</p>
      <p>Thông tin: </p>
      <p>${dataSend.receiverEmail}</p>
      <p>${dataSend.description}</p>
      <p>Xin chân thành cảm ơn!</p>
    `;
    }

    return result;
};
const getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    console.log(dataSend.language);
    if (dataSend.language === "vi") {
        result = `
      <h3>Xin chào ${dataSend.patientName} !</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care thành công.</p>
      <p>Xin chân thành cảm ơn!</p>
    `;
    }

    if (dataSend.language === "en") {
        result = `
      <h3>Dear ${dataSend.patientName} !</h3>
      <p>You received this email because you booked an online medical appointment on Booking Care success.</p>
      <p>Sincerely thank!</p>
    `;
    }

    return result;
};

const sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Up Only 👻" <mrtienproduction2k1@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin liên hệ ✔", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
};

const sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Up Only 👻" <mrtienproduction2k1@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${
                    dataSend.patientId
                }-${new Date().getTime()}.png`,
                content: dataSend.imageBase64.split("base64,")[1],
                encoding: "base64",
            },
        ],
    });
};

module.exports = {
    sendSimpleEmail,
    sendAttachment,
};
