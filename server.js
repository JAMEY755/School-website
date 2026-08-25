/**
 * Yope International High School - Admissions Portal
 * Backend Server with Email Notification System
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (index.html and assets)
app.use(express.static(path.join(__dirname, './')));

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.log('⚠️  Email Configuration Error:', error);
    } else {
        console.log('✅ Email Service Ready - Server is ready to send emails');
    }
});

/**
 * Generate Professional HTML Email Template
 */
function generateEmailTemplate(applicantData) {
    const {
        studentName,
        gender,
        classLevel,
        enrollmentType,
        parentName,
        phone,
        previousSchool,
        submissionTime
    } = applicantData;

    const enrollmentLabel = enrollmentType === 'boarding' ? 'Full Boarding Student' : 'Day Student';
    const classLevelLabel = {
        'S1': 'Senior One (S1)',
        'S2': 'Senior Two (S2)',
        'S3': 'Senior Three (S3)',
        'S4': 'Senior Four (S4)'
    }[classLevel] || classLevel;

    const genderDisplay = gender === 'male' ? 'Male' : 'Female';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Admission Application - Yope International High School</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
                background-color: #f8f9fa;
                color: #333;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .header {
                background: linear-gradient(135deg, #193071 0%, #0B3C49 100%);
                color: #ffffff;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 5px;
                letter-spacing: 0.5px;
            }
            .header p {
                font-size: 13px;
                opacity: 0.9;
                font-weight: 500;
            }
            .content {
                padding: 30px 20px;
            }
            .greeting {
                font-size: 14px;
                color: #666;
                margin-bottom: 20px;
                font-style: italic;
            }
            .application-title {
                background-color: #f0f9fa;
                border-left: 4px solid #193071;
                padding: 15px;
                margin-bottom: 25px;
                border-radius: 4px;
            }
            .application-title h2 {
                font-size: 16px;
                color: #193071;
                margin-bottom: 3px;
                font-weight: 700;
            }
            .application-title p {
                font-size: 12px;
                color: #666;
                margin: 0;
            }
            .applicant-details {
                background-color: #fafbfc;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
            }
            .detail-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-bottom: 15px;
            }
            .detail-row.full {
                grid-template-columns: 1fr;
            }
            .detail-item {
                background-color: #ffffff;
                padding: 12px;
                border-radius: 6px;
                border: 1px solid #e0e7ff;
            }
            .detail-label {
                font-size: 11px;
                font-weight: 700;
                color: #193071;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                margin-bottom: 5px;
                display: block;
            }
            .detail-value {
                font-size: 14px;
                font-weight: 600;
                color: #333;
            }
            .detail-value.secondary {
                color: #666;
                font-weight: 500;
            }
            .contact-section {
                background-color: #e0f2f4;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
            }
            .contact-section h3 {
                font-size: 13px;
                font-weight: 700;
                color: #0B3C49;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .contact-item {
                font-size: 13px;
                margin-bottom: 6px;
                color: #333;
            }
            .contact-item strong {
                color: #0B3C49;
                font-weight: 700;
            }
            .notes-section {
                background-color: #fff9e6;
                border-left: 4px solid #D4AF37;
                padding: 12px;
                border-radius: 4px;
                margin-bottom: 20px;
            }
            .notes-section h3 {
                font-size: 12px;
                font-weight: 700;
                color: #7f6f2f;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }
            .notes-section p {
                font-size: 13px;
                color: #333;
                line-height: 1.5;
            }
            .footer {
                background-color: #f8f9fa;
                border-top: 1px solid #e0e7ff;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            .footer p {
                margin: 5px 0;
            }
            .action-button {
                display: inline-block;
                background-color: #193071;
                color: #ffffff;
                padding: 12px 24px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 13px;
                margin-top: 10px;
            }
            .action-button:hover {
                background-color: #0B3C49;
            }
            .badge {
                display: inline-block;
                padding: 4px 12px;
                background-color: #193071;
                color: #ffffff;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                margin-right: 6px;
                margin-bottom: 6px;
            }
            .badge.secondary {
                background-color: #D4AF37;
                color: #193071;
            }
            @media (max-width: 600px) {
                .container {
                    margin: 0;
                    border-radius: 0;
                }
                .content {
                    padding: 20px 15px;
                }
                .detail-row {
                    grid-template-columns: 1fr;
                }
                .header {
                    padding: 20px 15px;
                }
                .header h1 {
                    font-size: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header Section -->
            <div class="header">
                <h1>🎓 New Admission Application</h1>
                <p>Yope International High School - Admissions Portal</p>
            </div>

            <!-- Content Section -->
            <div class="content">
                <p class="greeting">
                    Good day! A new student application has been submitted to the admissions system. Please review the details below:
                </p>

                <!-- Application Summary -->
                <div class="application-title">
                    <h2>Application Summary</h2>
                    <p>Submitted on: <strong>${submissionTime}</strong></p>
                </div>

                <!-- Applicant Details -->
                <div class="applicant-details">
                    <h3 style="font-size: 14px; color: #193071; margin-bottom: 12px; font-weight: 700;">📋 Applicant Information</h3>
                    
                    <div class="detail-row">
                        <div class="detail-item">
                            <span class="detail-label">Student's Full Name</span>
                            <span class="detail-value">${studentName}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Gender</span>
                            <span class="detail-value">${genderDisplay}</span>
                        </div>
                    </div>

                    <div class="detail-row">
                        <div class="detail-item">
                            <span class="detail-label">Target Class Level</span>
                            <span class="detail-value">${classLevelLabel}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Enrollment Type</span>
                            <span class="detail-value">${enrollmentLabel}</span>
                        </div>
                    </div>

                    <div class="detail-row full">
                        <div class="detail-item">
                            <span class="detail-label">Parent / Guardian Name</span>
                            <span class="detail-value">${parentName}</span>
                        </div>
                    </div>

                    <div class="detail-row full">
                        <div class="detail-item">
                            <span class="detail-label">Contact Phone Number</span>
                            <span class="detail-value secondary">${phone}</span>
                        </div>
                    </div>
                </div>

                <!-- Contact & Follow-up Section -->
                <div class="contact-section">
                    <h3>📞 Contact & Follow-up</h3>
                    <div class="contact-item">
                        <strong>Next Step:</strong> Review application and contact applicant at <strong>${phone}</strong> to confirm enrollment and discuss fees.
                    </div>
                    <div class="contact-item" style="margin-top: 10px;">
                        <strong>Recommended Timeline:</strong> Reply within 24-48 hours for best engagement.
                    </div>
                </div>

                <!-- Additional Notes Section -->
                ${previousSchool ? `
                <div class="notes-section">
                    <h3> Previous School & Additional Notes</h3>
                    <p>${previousSchool}</p>
                </div>
                ` : ''}

                <!-- Action Buttons -->
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://yope-school.com/admin/applications" class="action-button">
                         View All Applications
                    </a>
                </div>
            </div>

            <!-- Footer Section -->
            <div class="footer">
                <p><strong>Yope International High School</strong></p>
                <p>Juba-Nimule Highway, Nesitu (Near Mutala), South Sudan</p>
                <p style="margin-top: 10px; font-style: italic; color: #999;">
                    This is an automated email from the admissions portal. Please do not reply directly to this email.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
}

/**
 * Generate Applicant Confirmation Email
 */
function generateApplicantConfirmationEmail(applicantName, classLevel) {
    const classLevelLabel = {
        'S1': 'Senior One (S1)',
        'S2': 'Senior Two (S2)',
        'S3': 'Senior Three (S3)',
        'S4': 'Senior Four (S4)'
    }[classLevel] || classLevel;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Received - Yope International High School</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
                background-color: #f8f9fa;
                color: #333;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #193071 0%, #0B3C49 100%);
                color: #ffffff;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 5px;
            }
            .content {
                padding: 30px 20px;
            }
            .success-box {
                background-color: #e8f5e9;
                border-left: 4px solid #4caf50;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
            .success-box h2 {
                color: #2e7d32;
                font-size: 16px;
                margin-bottom: 5px;
            }
            .success-box p {
                color: #1b5e20;
                font-size: 13px;
            }
            .info-box {
                background-color: #f0f9fa;
                border-left: 4px solid #193071;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
            .info-box h3 {
                color: #193071;
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            .info-item {
                font-size: 13px;
                margin-bottom: 8px;
                color: #333;
            }
            .info-item strong {
                color: #193071;
            }
            .next-steps {
                background-color: #fff3e0;
                border-left: 4px solid #ff9800;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
            .next-steps h3 {
                color: #e65100;
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            .next-steps ol {
                margin-left: 20px;
            }
            .next-steps li {
                font-size: 13px;
                color: #333;
                margin-bottom: 8px;
            }
            .contact-info {
                background-color: #f3e5ab;
                border-radius: 6px;
                padding: 15px;
                margin-bottom: 20px;
            }
            .contact-info h3 {
                color: #7f6f2f;
                font-size: 13px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            .contact-info p {
                font-size: 13px;
                color: #333;
                margin-bottom: 5px;
            }
            .footer {
                background-color: #f8f9fa;
                border-top: 1px solid #e0e7ff;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Application Received!</h1>
                <p>Yope International High School</p>
            </div>

            <div class="content">
                <p style="font-size: 14px; margin-bottom: 20px;">
                    Dear <strong>${applicantName}</strong>,
                </p>

                <div class="success-box">
                    <h2>🎉 We've Received Your Application</h2>
                    <p>Thank you for applying to Yope International High School for <strong>${classLevelLabel}</strong>. Your application has been successfully submitted and is now in our review queue.</p>
                </div>

                <div class="info-box">
                    <h3> Application Details</h3>
                    <div class="info-item">
                        <strong>Applicant Name:</strong> ${applicantName}
                    </div>
                    <div class="info-item">
                        <strong>Class Level:</strong> ${classLevelLabel}
                    </div>
                    <div class="info-item">
                        <strong>Status:</strong> Under Review
                    </div>
                </div>

                <div class="next-steps">
                    <h3> What Happens Next?</h3>
                    <ol>
                        <li><strong>Review Process:</strong> Our admissions team will carefully review your application.</li>
                        <li><strong>Contact You:</strong> We will call the guardian's phone number to discuss enrollment details, class schedule, and fees.</li>
                        <li><strong>Confirmation:</strong> Once confirmed, we'll provide enrollment and orientation information.</li>
                        <li><strong>Orientation:</strong> You'll be invited to campus orientation to meet staff and tour facilities.</li>
                    </ol>
                </div>

                <div class="contact-info">
                    <h3>📞 Need Immediate Assistance?</h3>
                    <p><strong>Call us at:</strong></p>
                    <p>+211 928 170 000 | +211 929 910 000</p>
                    <p>+211 927 336 6905 | +211 929 656 141</p>
                    <p style="margin-top: 10px; font-size: 12px; color: #7f6f2f;">
                        Available Monday - Friday, 8:00 AM - 5:00 PM (South Sudan Time)
                    </p>
                </div>

                <p style="font-size: 13px; color: #666; margin-bottom: 20px;">
                    Welcome to Yope International High School!
                </p>
            </div>

            <div class="footer">
                <p><strong>Yope International High School</strong></p>
                <p>Juba-Nimule Highway, Nesitu, South Sudan</p>
                <p style="margin-top: 10px; font-style: italic; color: #999;">
                    This is an automated email. Please save this for your records.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
}

/**
 * POST /api/submit-application
 * Handle admission form submission and send emails
 */
app.post('/api/submit-application', async (req, res) => {
    try {
        const { studentName, gender, classLevel, enrollmentType, parentName, phone, previousSchool } = req.body;

        // Validate required fields
        if (!studentName || !gender || !classLevel || !enrollmentType || !parentName || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Get current timestamp
        const submissionTime = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Africa/Juba'
        });

        // Prepare applicant data
        const applicantData = {
            studentName,
            gender,
            classLevel,
            enrollmentType,
            parentName,
            phone,
            previousSchool: previousSchool || 'Not provided',
            submissionTime
        };

        // Generate email templates
        const adminEmailHTML = generateEmailTemplate(applicantData);
        const applicantEmailHTML = generateApplicantConfirmationEmail(studentName, classLevel);

        // Send email to administration
        const adminEmailPromise = transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to: process.env.ADMISSIONS_EMAIL,
            cc: process.env.ADMIN_EMAIL,
            subject: ` New Admission Application - ${studentName} for ${classLevel}`,
            html: adminEmailHTML,
            replyTo: parentName + ' <' + phone + '>'
        });

        // Send confirmation email to applicant (optional - requires email field)
        // For now, we can send it as SMS alert via phone or follow up call
        // You can extend this to capture email field if needed

        // Wait for admin email to be sent
        await adminEmailPromise;

        // Log successful submission
        console.log(`✅ Application Submitted - Student: ${studentName}, Class: ${classLevel}, Phone: ${phone}`);

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Application submitted successfully! Our team will contact you shortly.',
            applicationId: `APP-${Date.now()}`,
            submissionTime: submissionTime
        });

    } catch (error) {
        console.error('❌ Error Processing Application:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing application. Please try again later or contact us directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * GET / 
 * Serve the main HTML file
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Health Check Endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        emailConfigured: !!process.env.SMTP_USER
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   Yope International High School - Admissions Portal║
║                                                         ║
║  Server running on: http://localhost:${PORT}       
║  Environment: ${process.env.NODE_ENV}             
║                                                         ║
║  Email Service: ${process.env.SMTP_USER ? '✅ Configured' : '⚠️  Not Configured'}
║  Admissions Email: ${process.env.ADMISSIONS_EMAIL} 
║                                                         ║
╚════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
