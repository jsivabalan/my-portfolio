import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const requests = new Map();

const RATE_LIMIT_MS = 30 * 1000;

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    // Get client IP
    const ip =
      event.headers["x-forwarded-for"] ||
      event.headers["client-ip"] ||
      "unknown";

    const now = Date.now();

    // Check last request
    const lastRequest = requests.get(ip);

    if (lastRequest && now - lastRequest < RATE_LIMIT_MS) {
      const seconds = Math.ceil((RATE_LIMIT_MS - (now - lastRequest)) / 1000);

      return {
        statusCode: 429,
        body: JSON.stringify({
          error: `Too many requests. Please wait ${seconds} seconds.`,
        }),
      };
    }

    // Save current request time
    requests.set(ip, now);

    const { name, email, title, message } = JSON.parse(event.body);

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "sivabalanjayaraman23@gmail.com",
      subject: `New message from ${name}`,
      reply_to: email,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Title:</b> ${title}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
