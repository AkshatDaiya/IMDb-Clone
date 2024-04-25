const Reg = require('../model/reg');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

function RandomNum(min, max) {
    const minCeiling = Math.ceil(min)
    const maxFlooring = Math.floor(max)

    return Math.floor(Math.random() * (maxFlooring - minCeiling + 1) + minCeiling)
}
let randomNumber = RandomNum(1001, 9999)

exports.registration = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const userCheck = await Reg.findOne({ email: email })

        if (userCheck === null) {
            const record = new Reg({ firstName: firstName, lastName: lastName, email: email, pass: password })
            record.save()
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: 'santoshdaiya811@gmail.com',
                    pass: 'adkhillhhnuwabur'
                }
            });
            console.log('connected to gmail SMTP server');

            const info = await transporter.sendMail({
                from: 'santoshdaiya811@gmail.com', // sender address
                to: record.email, // list of receivers
                subject: "Varification Mail From Minia", // Subject line
                text: "Please click the link below to verfiy your account....", // plain text body
                html: `<h1>${randomNumber}</h1>`, // html body
            });
            console.log('mail sent....');
            res.status(201).json({
                status: 201,
                apidata: record._id
            })
        } else {
            res.status(400).json({
                message: 'This email id is already in use...'
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.emailActivation = async (req, res) => {
    try {
        const { OTP } = req.body;
        const id = req.params.id;

        if (OTP == randomNumber) {
            await Reg.findByIdAndUpdate(id, { status: 'Active' });
            res.status(200).json({
                status: 200,
                message: "Account Registered Successfully"
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, pass } = req.body
        const record = await Reg.findOne({ email: email })
        const activeStatusC = await Reg.find({ status: 'Active' })
        if (activeStatusC) {
            if (record !== null) {
                if (record.pass === pass) {
                    const token = jwt.sign({ id: record._id, email: record.email }, process.env.SESSION_SECRET, { expiresIn: "30d" })

                    res.cookie('token', token);

                    res.status(200).json({
                        status: 200,
                        apidata: record.firstName
                    })
                } else {
                    res.status(400).json({
                        status: 400,
                        message: "Wrong Credntails"
                    })
                }
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Wrong Credntails"
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: "This email is not Active..."
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}