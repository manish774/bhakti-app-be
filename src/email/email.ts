import nodemailer, { Transporter } from "nodemailer";

export class EmailService {
  private static instance: EmailService;
  private transporter: Transporter;
  private _fromName: string;
  private _user: string;

  // 👇 private constructor so only one instance can exist
  private constructor() {
    // You can load credentials from env variables
    this._user = process.env.EMAIL_USER || "your_email@gmail.com";
    const pass = process.env.EMAIL_PASS || "your_app_password";
    this._fromName = process.env.EMAIL_FROM_NAME || "My App";

    // Nodemailer transporter setup
    this.transporter = nodemailer.createTransport({
      service: "gmail", // or use custom SMTP
      auth: {
        user: "bhaktiapp2025@gmail.com", //thi._user
        pass: "gofv asma ouwh ggyc",
      },
    });
  }

  // ✅ Singleton instance getter
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // ✅ Send email
  public async sendMail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }): Promise<void> {
    const mailOptions = {
      from: `"${this._fromName}" <${this._user}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", info.messageId);
    } catch (error) {
      console.error("❌ Email failed:", error);
      throw error;
    }
  }
}
