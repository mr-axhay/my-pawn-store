import twilio from "twilio";

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsAppMessage = async (to, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: `whatsapp:${to}`,
    });

    console.log("Message sent:", res.sid);
  } catch (err) {
    console.error("Twilio Error:", err.message);
  }
};

export default sendWhatsAppMessage;