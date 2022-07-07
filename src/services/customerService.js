import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const buildUrlEmail = (token) => {
    const result = `${process.env.URL_REACT}/verify-booking?token=${token}`;

    return result;
};

const postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.fullName ||
                !data.phoneNumber ||
                !data.description
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!",
                });
            } else {
                const token = uuidv4();

                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    customerName: data.fullName,
                    description: data.description,
                    redirectLink: buildUrlEmail(token),
                });
                const user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R2",
                        firstName: data.fullName,
                        phoneNumber: data.phoneNumber,
                    },
                });
                //create booking customer
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { customerId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            customerId: user[0].id,
                            token: token,
                        },
                    });
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save infor customer successed",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!",
                });
            } else {
                const appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: "S1",
                    },
                    raw: false,
                });

                if (appointment) {
                    appointment.statusId = "S2";
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment successed!",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage:
                            "Appointment has been activated or does not exist!",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment,
};
