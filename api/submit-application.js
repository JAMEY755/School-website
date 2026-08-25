const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function getClassLabel(classLevel) {
  const map = {
    S1: 'Senior One (S1)',
    S2: 'Senior Two (S2)',
    S3: 'Senior Three (S3)',
    S4: 'Senior Four (S4)',
  };

  return map[classLevel] || classLevel;
}

function generateEmailTemplate(applicantData) {
  const {
    studentName,
    gender,
    classLevel,
    enrollmentType,
    parentName,
    phone,
    previousSchool,
    submissionTime,
  } = applicantData;

  const enrollmentLabel = enrollmentType === 'boarding' ? 'Full Boarding Student' : 'Day Student';
  const genderDisplay = gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : gender;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Admission Application - Yope International High School</title>
      </head>
      <body style="margin:0; padding:0; background:#f5f7fb; font-family: Arial, sans-serif; color:#1f2937;">
        <div style="max-width:640px; margin:24px auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(135deg, #193071 0%, #0B3C49 100%); color:#ffffff; padding:28px 24px; text-align:center;">
            <h1 style="margin:0; font-size:24px;">🎓 New Admission Application</h1>
            <p style="margin:8px 0 0; font-size:13px; opacity:0.95;">Yope International High School - Admissions Portal</p>
          </div>

          <div style="padding:28px 24px;">
            <p style="margin:0 0 18px; font-size:14px; color:#4b5563; font-style:italic;">
              Good day! A new student application has been submitted to the admissions system.
            </p>

            <div style="background:#f0f9fa; border-left:4px solid #193071; padding:16px 18px; border-radius:6px; margin-bottom:20px;">
              <h2 style="margin:0 0 4px; font-size:16px; color:#193071;">Application Summary</h2>
              <p style="margin:0; font-size:12px; color:#4b5563;">Submitted on: <strong>${submissionTime}</strong></p>
            </div>

            <div style="background:#fafafa; border:1px solid #e5e7eb; border-radius:10px; padding:20px; margin-bottom:20px;">
              <h3 style="margin:0 0 16px; font-size:14px; color:#193071; font-weight:700;">📋 Applicant Information</h3>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; font-size:13px;">
                <tr>
                  <td style="padding:0 8px 12px 0; width:50%; vertical-align:top;">
                    <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:6px; padding:12px;">
                      <div style="font-size:10px; font-weight:700; color:#193071; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:6px;">Student's Full Name</div>
                      <div style="font-size:14px; font-weight:600; color:#111827;">${studentName}</div>
                    </div>
                  </td>
                  <td style="padding:0 0 12px 8px; width:50%; vertical-align:top;">
                    <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:6px; padding:12px;">
                      <div style="font-size:10px; font-weight:700; color:#193071; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:6px;">Gender</div>
                      <div style="font-size:14px; font-weight:600; color:#111827;">${genderDisplay}</div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 8px 12px 0; width:50%; vertical-align:top;">
                    <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:6px; padding:12px;">
                      <div style="font-size:10px; font-weight:700; color:#193071; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:6px;">Target Class Level</div>
                      <div style="font-size:14px; font-weight:600; color:#111827;">${getClassLabel(classLevel)}</div>
                    </div>
                  </td>
                  <td style="padding:0 0 12px 8px; width:50%; vertical-align:top;">
                    <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:6px; padding:12px;">
                      <div style="font-size:10px; font-weight:700; color:#193071; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:6px;">Enrollment Type</div>
                      <div style="font-size:14px; font-weight:600; color:#111827;">${enrollmentLabel}</div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colspan="2" style="padding:0 0 12px 0;">
                    <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:6px; padding:12px;">
                      <div style="font-size:10px; font-weight:700; color:#193071; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:6px;">Parent / Guardian Name</div>
                      <div style="font-size:14px; font-weight:600; color:#111827;">${parentName}</div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colspan="2" style="padding:0;">
                    <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:6px; padding:12px;">
                      <div style="font-size:10px; font-weight:700; color:#193071; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:6px;">Contact Phone Number</div>
                      <div style="font-size:14px; font-weight:600; color:#4b5563;">${phone}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background:#e0f2f4; border-radius:8px; padding:16px 18px; margin-bottom:18px;">
              <h3 style="margin:0 0 10px; font-size:13px; color:#0B3C49;">📞 Contact & Follow-up</h3>
              <div style="font-size:13px; color:#1f2937; margin-bottom:8px;">
                <strong>Next Step:</strong> Review this application and contact the family at <strong>${phone}</strong>.
              </div>
              <div style="font-size:13px; color:#1f2937;">
                <strong>Recommended Timeline:</strong> Reply within 24–48 hours.
              </div>
            </div>

            ${previousSchool ? `
              <div style="background:#fff9e6; border-left:4px solid #D4AF37; padding:12px 14px; border-radius:6px; margin-bottom:18px;">
                <h3 style="margin:0 0 8px; font-size:12px; font-weight:700; color:#7f6f2f; text-transform:uppercase; letter-spacing:0.3px;">Previous School & Additional Notes</h3>
                <p style="margin:0; font-size:13px; color:#1f2937; line-height:1.5;">${previousSchool}</p>
              </div>
            ` : ''}
          </div>

          <div style="background:#f8fafc; border-top:1px solid #e5e7eb; padding:20px; text-align:center; font-size:12px; color:#6b7280;">
            <p style="margin:0 0 4px; font-weight:700; color:#111827;">Yope International High School</p>
            <p style="margin:0;">Juba-Nimule Highway, Nesitu, South Sudan</p>
            <p style="margin:10px 0 0; font-style:italic; color:#9ca3af;">This is an automated email from the admissions portal.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const {
      studentName,
      gender,
      classLevel,
      enrollmentType,
      parentName,
      phone,
      previousSchool,
    } = body;

    if (!studentName || !gender || !classLevel || !enrollmentType || !parentName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const submissionTime = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Africa/Juba',
    });

    const applicantData = {
      studentName,
      gender,
      classLevel,
      enrollmentType,
      parentName,
      phone,
      previousSchool: previousSchool || 'Not provided',
      submissionTime,
    };

    const adminRecipient = process.env.ADMISSIONS_EMAIL || process.env.SMTP_USER;
    const adminCc = process.env.ADMIN_EMAIL || '';

    if (!adminRecipient || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured yet. Add your SMTP environment variables in Vercel.',
      });
    }

    await transporter.verify();

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Yope International High School'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: adminRecipient,
      cc: adminCc || undefined,
      subject: `New Admission Application - ${studentName} for ${classLevel}`,
      html: generateEmailTemplate(applicantData),
      replyTo: `${parentName} <${phone}>`,
    });

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Our team will contact you shortly.',
      submissionTime,
    });
  } catch (error) {
    console.error('Submit application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit application. Please try again or contact us directly at +211 928 170 000.',
    });
  }
};
