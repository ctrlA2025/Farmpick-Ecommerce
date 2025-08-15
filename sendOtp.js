import emailjs from 'emailjs-com';

// Function to generate a random OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

// Function to send OTP to the user's email
export async function sendOtpToUser(userEmail) {
    const otp = generateOtp();

    const emailParams = {
        to_email: userEmail, // User's email address
        otp: otp,            // OTP to be sent
    };

    try {
        const serviceId = 'your_service_id'; // Replace with your EmailJS service ID
        const templateId = 'your_template_id'; // Replace with your EmailJS template ID
        const userId = 'your_user_id'; // Replace with your EmailJS user ID

        await emailjs.send(serviceId, templateId, emailParams, userId);
        console.log(`OTP sent to ${userEmail}: ${otp}`);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
}
