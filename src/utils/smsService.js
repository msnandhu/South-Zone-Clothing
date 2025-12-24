/**
 * Simulates sending an SMS message.
 * In a real application, this would call an API like Twilio, MessageBird, or Fast2SMS.
 * 
 * @param {Object} params - The parameters for the SMS.
 * @param {string} params.to - The recipient's phone number.
 * @param {string} params.message - The message body.
 * @returns {Promise<boolean>} - Resolves to true if sent successfully.
 */
export const sendSMS = async ({ to, message }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Log to console for verification (essential for our simulation)
    console.log(`%c[SMS SIMULATION] To: ${to}`, 'color: #4caf50; font-weight: bold; font-size: 12px;');
    console.log(`%cMessage: "${message}"`, 'color: #2196f3; font-style: italic; font-size: 12px;');

    // In a real app, this would be the API response check
    return true;
};
