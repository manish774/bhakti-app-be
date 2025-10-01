/**
 * OtpEmailTemplate.ts
 * -------------------
 * Contains the OTP email template for Bhakti App.
 * Usage: generateOtpEmailHtml('123456')
 */

export const OTP_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bhakti App OTP</title>
  <style>
    body {
      font-family: 'Helvetica', Arial, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      padding: 30px;
      text-align: center;
    }
    .header {
      font-size: 24px;
      font-weight: bold;
      color: #4A148C;
      margin-bottom: 20px;
    }
    .subheader {
      font-size: 16px;
      color: #555555;
      margin-bottom: 30px;
    }
    .otp {
      display: inline-block;
      font-size: 28px;
      letter-spacing: 4px;
      padding: 15px 25px;
      background-color: #EDE7F6;
      border-radius: 6px;
      font-weight: bold;
      color: #4A148C;
      margin-bottom: 30px;
    }
    .footer {
      font-size: 12px;
      color: #999999;
      margin-top: 40px;
    }
    .btn {
      display: inline-block;
      text-decoration: none;
      background-color: #4A148C;
      color: #ffffff;
      padding: 12px 25px;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Bhakti App</div>
    <div class="subheader">Your One-Time Password (OTP) is:</div>
    <div class="otp">{{OTP_CODE}}</div>
    <div class="subheader">Please use this code to complete your login. This code is valid for 10 minutes.</div>
    <a href="#" class="btn">Go to Bhakti App</a>
    <div class="footer">
      If you did not request this code, please ignore this email.<br/>
      &copy; 2025 Bhakti App. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export function generateOtpEmailHtml(otp: string): string {
  return OTP_EMAIL_TEMPLATE.replace("{{OTP_CODE}}", otp);
}
