const { sendContactFormEmail } = require('./utils/emailUtils');

async function testEmailConnection() {
    try {
        const testData = {
            firstName: "Test",
            lastName: "User",
            email: "test@test.com",
            mobile: "1234567890",
            inquiryType: "Test",
            location: "Test Location",
            message: "This is a test email to verify the email configuration"
        };

        console.log('Testing email configuration...');
        const result = await sendContactFormEmail(testData);
        
        if (result.success) {
            console.log('Email configuration is working correctly!');
            console.log('Message ID:', result.messageId);
        } else {
            console.error('Email test failed:', result.error);
            console.error('Details:', result.details);
        }
    } catch (error) {
        console.error('Email test failed with exception:', error);
    }
}

testEmailConnection();
