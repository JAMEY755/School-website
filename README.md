# Yope International High School Admissions Portal

Yope International High School is a mixed day and boarding secondary school serving students in Nesitu, South Sudan. This project is a responsive admissions website with a student application form and automated email notifications for the admissions team.

## Features

- Fully responsive layout for desktop, tablet, and mobile devices
- Modern school landing page with academic and facility sections
- Admissions form for student application submissions
- Automated email notifications to the school admissions inbox
- Server-side validation for required applicant information
- Professional HTML email templates for admin review
- Clear success and error feedback in the browser

## Project Structure

```text
YOPE/
├── index.html                  # Main website page
├── api/
│   └── submit-application.js  # Vercel serverless email API endpoint
├── server.js                   # Local Express backend for testing
├── package.json                # Node project configuration
├── .env                       # Local environment variables (not committed)
├── .env.example               # Example environment setup
├── badge.jpg                  # School logo asset
├── yope.jpeg                  # Director image asset
├── README.md                  # Project documentation
└── other image assets         # School photos and illustrations
```

## Requirements

- Node.js 18 or later
- npm
- An SMTP email provider such as Gmail or another mail service

## Local Setup

1. Open the project folder in your terminal.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`.
4. Update your email values.
5. Start the local server:

```bash
npm start
```

6. Open the site in your browser at:

```text
http://localhost:3000
```

## Email Configuration

Create a `.env` file with values similar to the following:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Yope International High School
ADMISSIONS_EMAIL=admissions@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
PORT=3000
NODE_ENV=development
```

For Gmail, use an app password instead of your normal account password.

## Vercel Deployment

This project is designed to work with Vercel. The frontend form sends a request to the serverless API endpoint in `api/submit-application.js`.

To deploy successfully:

1. Push the project to your Vercel repository.
2. Add the same environment variables in the Vercel dashboard.
3. Redeploy the project.
4. Submit a test application through the live site.
5. Confirm that the email is received in the admissions inbox.

## Form Fields

The admissions form collects the following information:

1. Student full name
2. Gender
3. Class level (S1 to S4)
4. Enrollment type (day or boarding)
5. Parent or guardian name
6. Contact phone number
7. Previous school and additional notes (optional)

## Email Flow

When a user submits the form:

1. The browser sends the data to the backend API.
2. The server validates the required fields.
3. The application is formatted into an HTML email.
4. The email is sent to the admissions inbox.
5. The user receives a success message in the browser.

## Security Notes

- Do not commit `.env` to version control.
- Use app passwords instead of regular email passwords where needed.
- Keep all email credentials in the deployment environment, not in the source code.
- Use HTTPS in production.

## Troubleshooting

### Email is not sending

Check the following:

- SMTP credentials are correct
- Gmail app password is used if applicable
- Vercel environment variables are set correctly
- The email provider allows the configured SMTP connection

### Form is not submitting

Check:

- the browser console for JavaScript errors
- the Vercel function logs for API errors
- whether all required form fields are filled in

## Contact Information

Phone numbers:
- +211 928 170 000
- +211 929 910 000
- +211 927 336 6905
- +211 929 656 141

Location:
- Juba-Nimule Highway, Nesitu, South Sudan

## License

Copyright 2024 Yope International High School. All rights reserved.
