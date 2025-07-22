const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'abhishek.v1808@gmail.com',
        pass: 'aqdw oaaj eqhn unbx'
    },
    tls: {
        rejectUnauthorized: false,
        ciphers:'SSLv3'
    }
});

// Function to send contact form email
const sendContactFormEmail = async (formData) => {
    const { firstName, lastName, email, mobile, inquiryType, location, message, referenceNumber } = formData;

    const mailOptions = {
        from: 'abhishek.v1808@gmail.com',
        to: 'itbizonetechnologies@gmail.com',
        subject: `New Inquiry: ${inquiryType} - Krushiyuga Farms [Ref: ${referenceNumber}]`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f6f9fc;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 30px 0; text-align: center; background-color: #16a34a;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Customer Inquiry</h1>
                        <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Reference Number: ${referenceNumber}</p>
                    </td>
                </tr>
            </table>
            
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: -20px;">
                <tr>
                    <td style="padding: 30px;">
                        <table role="presentation" style="width: 100%;">
                            <tr>
                                <td>
                                    <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                                        <h2 style="margin: 0 0 10px; color: #16a34a; font-size: 20px;">Customer Information</h2>
                                        <p style="margin: 0; color: #374151; font-size: 16px;">
                                            <strong>${firstName} ${lastName}</strong><br>
                                            📍 ${location}
                                        </p>
                                    </div>

                                    <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                                        <tr>
                                            <td style="padding: 15px; background-color: #f8fafc; border-radius: 8px;">
                                                <p style="margin: 0 0 5px; color: #6b7280; font-size: 14px;">Contact Details:</p>
                                                <p style="margin: 0; color: #374151; font-size: 16px;">
                                                    📧 <a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a><br>
                                                    📱 <a href="tel:${mobile}" style="color: #16a34a; text-decoration: none;">${mobile}</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                                        <tr>
                                            <td style="padding: 20px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
                                                <h3 style="margin: 0 0 10px; color: #16a34a; font-size: 18px;">Inquiry Type</h3>
                                                <p style="margin: 0; color: #374151; font-size: 16px;">${inquiryType}</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <table role="presentation" style="width: 100%;">
                                        <tr>
                                            <td style="padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                                                <h3 style="margin: 0 0 10px; color: #374151; font-size: 18px;">Message</h3>
                                                <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 1.6;">${message}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto;">
                <tr>
                    <td style="padding: 30px; text-align: center;">
                        <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                            This is an automated message from Krushiyuga Farms Contact System
                        </p>
                        <p style="margin: 0; color: #6b7280; font-size: 14px;">
                            © ${new Date().getFullYear()} Krushiyuga Farms. All rights reserved.
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
    };

    try {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Verifying email connection...');
        }
        
        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.error('Email verification error:', error);
                    }
                    reject(error);
                } else {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log('Email server is ready');
                    }
                    resolve(success);
                }
            });
        });

        if (process.env.NODE_ENV !== 'production') {
            console.log('Sending email...');
        }
        
        const info = await transporter.sendMail(mailOptions);
        
        if (process.env.NODE_ENV !== 'production') {
            console.log('Email sent successfully:', info.response);
        }
        
        return { success: true, messageId: info.messageId };
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Email sending failed:', error);
        }
        
        return { 
            success: false, 
            error: error.message
        };
    }
};

module.exports = {
    sendContactFormEmail
};
