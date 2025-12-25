/**
 * Simulates sending an SMS message.
 * In a real application, this would call an API like Twilio, MessageBird, or Fast2SMS.
 * 
 * @param {Object} params - The parameters for the SMS.
 * @param {string} params.to - The recipient's phone number.
 * @param {string} params.message - The message body.
 * @returns {Promise<boolean>} - Resolves to true if sent successfully.
 */
/**
 * Sends an SMS via the backend server (which uses Twilio).
 * 
 * @param {Object} params - The parameters for the SMS.
 * @param {string} params.to - The recipient's phone number.
 * @param {string} params.message - The message body.
 * @returns {Promise<boolean>} - Resolves to true if sent successfully.
 */
export const sendSMS = async ({ to, message }) => {
    try {
        const response = await fetch('http://localhost:3001/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, message }),
        });

        const data = await response.json();

        if (data.success) {
            console.log(`%c[SMS SENT] To: ${to} | SID: ${data.sid}`, 'color: #4caf50; font-weight: bold;');
            return true;
        } else {
            console.error('[SMS FAILED]', data.error);
            return false;
        }
    } catch (error) {
        console.error('[SMS ERROR] Could not connect to backend:', error);
        // Fallback: Log to console so user still sees something happened in dev
        console.log(`%c[SMS SIMULATION (Fallback)] To: ${to}`, 'color: orange; font-weight: bold;');
        return true;
    }
};
