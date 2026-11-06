import nodemailer from 'nodemailer';

interface EmailResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'Shri Haridutt Ayurvedic College <admissions@hariduttayurveda.edu.in>';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'admissions@hariduttayurveda.edu.in';

function getTransporter() {
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return null;
}

// Reusable Vedic Luxury HTML Template Wrapper
function buildLuxuryEmailHtml(headline: string, bodyContent: string, actionButton?: { label: string; url: string }): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${headline}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6F2E9; margin: 0; padding: 20px; color: #342B25; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid rgba(197, 164, 109, 0.4); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(23, 61, 50, 0.08); }
    .header { background-color: #173D32; color: #ffffff; padding: 32px 24px; text-align: center; border-bottom: 3px solid #C5A46D; }
    .om { font-size: 28px; color: #C5A46D; margin-bottom: 8px; }
    .college-name { font-size: 20px; font-weight: bold; letter-spacing: 0.5px; margin: 0; color: #ffffff; font-family: Georgia, serif; }
    .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A46D; margin-top: 6px; }
    .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #342B25; }
    .ref-box { background: #173D32; color: #ffffff; padding: 16px; border-radius: 6px; text-align: center; margin: 24px 0; border: 1px solid #C5A46D; }
    .ref-num { font-size: 22px; font-weight: bold; color: #C5A46D; letter-spacing: 2px; font-family: monospace; }
    .btn { display: inline-block; background: linear-gradient(135deg, #DFCA9E 0%, #C5A46D 100%); color: #173D32 !important; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding: 12px 28px; border-radius: 4px; margin: 20px 0; }
    .footer { background: #0F2821; color: #81917A; padding: 20px; font-size: 11px; text-align: center; border-top: 1px solid rgba(197, 164, 109, 0.2); }
    .footer a { color: #C5A46D; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="om">ॐ</div>
      <div class="college-name">Shri Haridutt Ayurvedic Medical College & Hospital</div>
      <div class="tagline">Approved by NCISM & Ministry of AYUSH, Govt. of India</div>
    </div>
    <div class="content">
      <h2 style="color: #173D32; font-family: Georgia, serif; font-size: 20px; margin-top: 0;">${headline}</h2>
      ${bodyContent}
      ${actionButton ? `<div style="text-align: center;"><a href="${actionButton.url}" class="btn">${actionButton.label}</a></div>` : ''}
    </div>
    <div class="footer">
      <p>National Highway 11B Corridor, Rajasthan, India<br>
      Admissions Helpline: +91 98290 44120 | EPABX: +91 (01464) 224589</p>
      <p style="margin-top: 8px;">© ${new Date().getFullYear()} Shri Haridutt Ayurvedic Medical College & Hospital. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// 1. Admission Application Confirmation to Candidate
export async function sendAdmissionConfirmationEmail(
  toEmail: string,
  candidateName: string,
  applicationNumber: string,
  courseTitle: string
): Promise<EmailResult> {
  const subject = `Admission Dossier Received: Ref #${applicationNumber} — Shri Haridutt Ayurvedic College`;
  const body = `
    <p>Dear <strong>${candidateName}</strong>,</p>
    <p>We are pleased to confirm that your official admission application for <strong>${courseTitle}</strong> for Academic Session 2026–27 has been cataloged in our institutional admissions database.</p>
    
    <div class="ref-box">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #DFCA9E;">Official Application Reference Number</div>
      <div class="ref-num">${applicationNumber}</div>
      <div style="font-size: 11px; color: #81917A; margin-top: 4px;">Quote this reference in all communications with the counseling board</div>
    </div>

    <p><strong>Next Steps:</strong></p>
    <ul style="padding-left: 20px; color: #342B25;">
      <li>Our Academic Admissions Committee will scrutinize your NEET credentials and qualifying marksheets.</li>
      <li>You may track real-time progress and document verification status via the Institutional Application Status Portal.</li>
      <li>Statutory merit counseling will be conducted strictly per NCISM and State AYUSH Regulatory Directorate guidelines.</li>
    </ul>

    <p>For any pre-counseling inquiries, feel free to reply to this email or contact our Admissions Helpline.</p>
  `;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const html = buildLuxuryEmailHtml('Application Received Successfully', body, {
    label: 'Track Application Status',
    url: `${appUrl}/admissions/status?ref=${applicationNumber}`,
  });

  return deliverEmail(toEmail, subject, html);
}

// 2. Alert to Admissions Office on New Application
export async function sendAdminAdmissionAlert(application: any): Promise<EmailResult> {
  const subject = `[New Application] Ref #${application.applicationNumber} — ${application.fullName} (${application.courseCode})`;
  const body = `
    <p>A new candidate has submitted an admission application dossier:</p>
    <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin: 16px 0;">
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; color: #173D32;">Reference Number</td><td style="padding: 6px;">${application.applicationNumber}</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; color: #173D32;">Candidate Name</td><td style="padding: 6px;">${application.fullName}</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; color: #173D32;">Email</td><td style="padding: 6px;">${application.email}</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; color: #173D32;">Phone</td><td style="padding: 6px;">${application.phone}</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; color: #173D32;">Course Applied</td><td style="padding: 6px;">${application.courseCode}</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; color: #173D32;">NEET Score / AIR</td><td style="padding: 6px;">${application.neetScore || 'N/A'} (AIR: ${application.neetRank || 'N/A'})</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; color: #173D32;">10+2 PCB %</td><td style="padding: 6px;">${application.marksPercentage}%</td></tr>
      <tr><td style="padding: 6px; font-weight: bold; color: #173D32;">Category & State</td><td style="padding: 6px;">${application.category} (${application.state})</td></tr>
    </table>
  `;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const html = buildLuxuryEmailHtml('New Admission Application Alert', body, {
    label: 'Open Admin Dossier',
    url: `${appUrl}/admin`,
  });

  return deliverEmail(ADMIN_EMAIL, subject, html);
}

// 3. Status Update Notification to Candidate
export async function sendStatusUpdateEmail(
  toEmail: string,
  candidateName: string,
  applicationNumber: string,
  newStatus: string,
  adminNotes?: string
): Promise<EmailResult> {
  const statusLabels: Record<string, string> = {
    SUBMITTED: 'Application Submitted & Cataloged',
    UNDER_REVIEW: 'Under Scrutiny by Admissions Board',
    DOCUMENTS_REQUIRED: 'Additional Verification Documents Required',
    APPROVED: 'Dossier Cleared for Counseling',
    REJECTED: 'Application Closed / Ineligible',
  };

  const subject = `Update on Application #${applicationNumber}: ${statusLabels[newStatus] || newStatus}`;
  const body = `
    <p>Dear <strong>${candidateName}</strong>,</p>
    <p>This is an automated notification regarding your application <strong>#${applicationNumber}</strong> for admission to Shri Haridutt Ayurvedic Medical College.</p>
    
    <div class="ref-box">
      <div style="font-size: 11px; text-transform: uppercase; color: #DFCA9E;">Updated Status</div>
      <div style="font-size: 20px; font-weight: bold; color: #ffffff; margin-top: 4px;">${statusLabels[newStatus] || newStatus}</div>
    </div>

    ${adminNotes ? `
      <div style="background: #F6F2E9; border-left: 4px solid #C5A46D; padding: 12px 16px; margin: 16px 0; font-size: 13px;">
        <strong>Admissions Committee Remarks:</strong><br>
        <em>${adminNotes}</em>
      </div>
    ` : ''}

    <p>Please log in to your candidate tracking portal for comprehensive guidance.</p>
  `;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const html = buildLuxuryEmailHtml('Application Status Updated', body, {
    label: 'Check Status Details',
    url: `${appUrl}/admissions/status?ref=${applicationNumber}`,
  });

  return deliverEmail(toEmail, subject, html);
}

// 4. Alert to Admissions on New General Enquiry
export async function sendEnquiryNotification(enquiry: any): Promise<EmailResult> {
  const subject = `[New Admission Enquiry] Ref #${enquiry.enquiryNumber} — ${enquiry.studentName}`;
  const body = `
    <p>A prospective scholar has registered an admission enquiry:</p>
    <ul style="font-size: 13px; line-height: 1.8;">
      <li><strong>Enquiry Ref:</strong> ${enquiry.enquiryNumber}</li>
      <li><strong>Student Name:</strong> ${enquiry.studentName}</li>
      <li><strong>Parent/Guardian:</strong> ${enquiry.parentName}</li>
      <li><strong>Mobile:</strong> ${enquiry.mobile}</li>
      <li><strong>Email:</strong> ${enquiry.email}</li>
      <li><strong>Programme Interest:</strong> ${enquiry.programme}</li>
      <li><strong>Query:</strong> ${enquiry.message}</li>
    </ul>
  `;

  const html = buildLuxuryEmailHtml('New Admissions Enquiry', body);
  return deliverEmail(ADMIN_EMAIL, subject, html);
}

// Unified Dispatcher
export async function sendEmail(options: {
  to: string;
  subject: string;
  template?: string;
  context?: Record<string, any>;
  html?: string;
}): Promise<EmailResult> {
  let contentHtml = options.html || '';

  if (options.template === 'ENQUIRY_ACKNOWLEDGEMENT' && options.context) {
    contentHtml = buildLuxuryEmailHtml(
      'Admissions Enquiry Acknowledged',
      `<p>Dear ${options.context.studentName},</p>
       <p>Thank you for expressing interest in <strong>${options.context.programme}</strong> at Shri Haridutt Ayurvedic Medical College & Hospital.</p>
       <p>Your enquiry reference is <strong>#${options.context.enquiryNumber}</strong>. Our academic counseling office will contact you shortly.</p>`
    );
  } else if (options.template === 'APPLICATION_CONFIRMATION' && options.context) {
    return sendAdmissionConfirmationEmail(
      options.to,
      options.context.fullName,
      options.context.applicationNumber,
      options.context.courseCode
    );
  } else if (options.template === 'STATUS_UPDATE' && options.context) {
    return sendStatusUpdateEmail(
      options.to,
      options.context.fullName,
      options.context.applicationNumber,
      options.context.status,
      options.context.remarks
    );
  } else if (!contentHtml) {
    contentHtml = buildLuxuryEmailHtml(options.subject, `<p>Institutional Notification from Shri Haridutt Ayurvedic College.</p>`);
  }

  return deliverEmail(options.to, options.subject, contentHtml);
}

async function deliverEmail(to: string, subject: string, html: string): Promise<EmailResult> {
  const transporter = getTransporter();

  if (!transporter) {
    // Graceful logging fallback when SMTP is not configured
    console.log(`[SMTP SIMULATED DISPATCH] To: ${to} | Subject: "${subject}"`);
    return {
      success: true,
      simulated: true,
      messageId: `sim-${Date.now()}`,
    };
  }

  try {
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      html,
    });
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error('[SMTP DISPATCH ERROR]:', err);
    return {
      success: false,
      error: err.message || 'SMTP transmission failure',
    };
  }
}
