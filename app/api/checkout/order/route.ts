import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

interface OrderPayload {
  orderId?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    notes?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    format?: string;
  }>;
  shippingOption: {
    id: 'normal' | 'express' | 'international';
    name: string;
    price: number;
    estimatedDelivery?: string;
  };
  paymentMethod: 'bank_transfer' | 'crypto' | 'revolut';
  subtotal: number;
  shippingFee: number;
  total: number;
}

const PAYMENT_DETAILS = {
  bank_transfer: {
    title: 'UK & International Bank Wire Transfer',
    accountName: 'RetaPharma UK Ltd',
    sortCode: '20-04-15',
    accountNumber: '83920194',
    iban: 'GB29BARC20041583920194',
    bic: 'BARCGB22',
    bank: 'Barclays Bank UK PLC',
    instructions: 'Please transfer the exact total in GBP (£) using your Order ID as the payment reference to ensure same-day dispatch.',
  },
  crypto: {
    title: 'Cryptocurrency Direct Payment',
    usdtTrc20: 'TYh8Lp2WqZ99xM1N88KvB312RtQ9w4XyzP',
    btc: 'bc1q9v8k3f4x7z2j5w8m1n0r4t6y9u2p5s8d1f4g7',
    eth: '0x71C94B4E38A3F1d7b36B7963A0F81f1De8167812',
    instructions: 'Please send the equivalent crypto amount to any of the verified addresses above and email your TxHash or transfer screenshot.',
  },
  revolut: {
    title: 'Revolut App Direct Settlement',
    revtag: '@retapharma',
    accountName: 'RetaPharma Ltd',
    instructions: 'Open your Revolut app, send payment to Revtag @retapharma with your Order ID in the reference note.',
  },
};

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();

    const { customer, items, shippingOption, paymentMethod, subtotal, shippingFee, total } = body;

    // 1. Validation: Minimum order requirement (100 GBP)
    if (!subtotal || subtotal < 100) {
      return NextResponse.json(
        { error: 'Minimum order amount is £100.00 GBP subtotal. Please add more items to your cart.' },
        { status: 400 }
      );
    }

    if (!customer?.email || !customer?.fullName || !customer?.address || !customer?.city || !customer?.postalCode) {
      return NextResponse.json(
        { error: 'Please provide all required shipping and contact details.' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Your cart is empty.' },
        { status: 400 }
      );
    }

    // Generate Order ID if not supplied
    const orderId = body.orderId || `RP-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderDate = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'medium', timeStyle: 'short' });

    // 2. Prepare Email Contents
    const itemsHtml = items.map(item => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; font-weight: 600;">
          ${item.name}
          ${item.format ? `<br/><span style="font-size: 12px; color: #64748b; font-weight: normal;">Format: ${item.format}</span>` : ''}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #475569; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 8px; font-size: 14px; color: #475569; text-align: right;">£${item.price.toFixed(2)}</td>
        <td style="padding: 12px 8px; font-size: 14px; color: #0f172a; font-weight: bold; text-align: right;">£${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    let paymentMethodText = 'Bank Transfer';
    let paymentInstructionsHtml = '';

    if (paymentMethod === 'bank_transfer') {
      paymentMethodText = 'Bank Transfer (BACS / Faster Payments / Wire)';
      paymentInstructionsHtml = `
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px;">🏦 Bank Transfer Payment Details</h4>
          <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
            <tr><td style="padding: 4px 0; font-weight: bold; width: 140px;">Account Name:</td><td>${PAYMENT_DETAILS.bank_transfer.accountName}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">Sort Code:</td><td>${PAYMENT_DETAILS.bank_transfer.sortCode}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">Account Number:</td><td>${PAYMENT_DETAILS.bank_transfer.accountNumber}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">IBAN:</td><td>${PAYMENT_DETAILS.bank_transfer.iban}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">BIC / SWIFT:</td><td>${PAYMENT_DETAILS.bank_transfer.bic}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">Bank:</td><td>${PAYMENT_DETAILS.bank_transfer.bank}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #059669;">Payment Reference:</td><td style="font-weight: bold; color: #059669; font-size: 15px;">${orderId}</td></tr>
          </table>
          <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">
            ⚠️ <strong>Crucial:</strong> Please include reference code <strong>${orderId}</strong> in your transfer so your payment is automatically verified and dispatched without delay.
          </p>
        </div>
      `;
    } else if (paymentMethod === 'crypto') {
      paymentMethodText = 'Cryptocurrency (USDT / BTC / ETH)';
      paymentInstructionsHtml = `
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px;">💳 Cryptocurrency Payment Addresses</h4>
          <div style="font-size: 13px; color: #334155; line-height: 1.6;">
            <p style="margin: 4px 0;"><strong>USDT (TRC-20):</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${PAYMENT_DETAILS.crypto.usdtTrc20}</code></p>
            <p style="margin: 4px 0;"><strong>Bitcoin (BTC):</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${PAYMENT_DETAILS.crypto.btc}</code></p>
            <p style="margin: 4px 0;"><strong>Ethereum (ETH / ERC-20):</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${PAYMENT_DETAILS.crypto.eth}</code></p>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b;">
              Please send the equivalent value of <strong>£${total.toFixed(2)} GBP</strong> and reply to this email or contact support with your Transaction Hash (TxID) and Order ID <strong>${orderId}</strong>.
            </p>
          </div>
        </div>
      `;
    } else if (paymentMethod === 'revolut') {
      paymentMethodText = 'Revolut App';
      paymentInstructionsHtml = `
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px;">📱 Revolut App Payment Details</h4>
          <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
            <tr><td style="padding: 4px 0; font-weight: bold; width: 140px;">Revolut Revtag:</td><td style="font-weight: bold; color: #2563eb; font-size: 15px;">${PAYMENT_DETAILS.revolut.revtag}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">Account Name:</td><td>${PAYMENT_DETAILS.revolut.accountName}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold; color: #059669;">Reference Note:</td><td style="font-weight: bold; color: #059669; font-size: 15px;">${orderId}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">Amount:</td><td style="font-weight: bold; font-size: 15px;">£${total.toFixed(2)} GBP</td></tr>
          </table>
          <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">
            Open your Revolut app, tap Transfer &gt; Search <strong>${PAYMENT_DETAILS.revolut.revtag}</strong>, and enter <strong>${orderId}</strong> in the note field.
          </p>
        </div>
      `;
    }

    // Customer Email HTML
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation #${orderId}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <div style="background-color: #0f172a; padding: 28px 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">RetaPharma UK</h1>
            <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px;">Premium Research Peptides & Analytical Compounds</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px;">
              <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #0f172a;">Thank You for Your Order, ${customer.fullName}!</h2>
              <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5;">
                We have received your order <strong>#${orderId}</strong> placed on ${orderDate}. Your order is currently reserved and awaiting payment settlement.
              </p>
            </div>

            <!-- Order Summary Table -->
            <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #0f172a;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
                  <th style="padding: 10px 8px; font-size: 12px; text-transform: uppercase; color: #475569;">Item</th>
                  <th style="padding: 10px 8px; font-size: 12px; text-transform: uppercase; color: #475569; text-align: center;">Qty</th>
                  <th style="padding: 10px 8px; font-size: 12px; text-transform: uppercase; color: #475569; text-align: right;">Price</th>
                  <th style="padding: 10px 8px; font-size: 12px; text-transform: uppercase; color: #475569; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Financial Totals -->
            <div style="margin-left: auto; width: 280px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; font-size: 14px; color: #475569; padding: 4px 0;">
                <span>Subtotal:</span>
                <span style="font-weight: 600;">£${subtotal.toFixed(2)} GBP</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 14px; color: #475569; padding: 4px 0;">
                <span>Shipping (${shippingOption.name}):</span>
                <span style="font-weight: 600;">£${shippingFee.toFixed(2)} GBP</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 18px; color: #0f172a; font-weight: bold; border-top: 2px solid #e2e8f0; padding-top: 8px; margin-top: 6px;">
                <span>Total Due:</span>
                <span style="color: #059669;">£${total.toFixed(2)} GBP</span>
              </div>
            </div>

            <!-- Shipping Address -->
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px; font-size: 13px; color: #334155;">
              <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a;">📦 Delivery Destination</h4>
              <p style="margin: 2px 0;"><strong>${customer.fullName}</strong></p>
              <p style="margin: 2px 0;">${customer.address}${customer.apartment ? `, ${customer.apartment}` : ''}</p>
              <p style="margin: 2px 0;">${customer.city}, ${customer.state ? `${customer.state}, ` : ''}${customer.postalCode}</p>
              <p style="margin: 2px 0;">${customer.country}</p>
              <p style="margin: 6px 0 0 0; color: #64748b;">Phone: ${customer.phone}</p>
              ${customer.notes ? `<p style="margin: 6px 0 0 0; font-style: italic; color: #64748b;">Notes: ${customer.notes}</p>` : ''}
            </div>

            <!-- Payment Instructions Block -->
            <div style="margin-bottom: 24px;">
              <h3 style="margin: 0 0 6px 0; font-size: 16px; color: #0f172a;">Payment Instructions (${paymentMethodText})</h3>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569;">
                Please finalize your payment using the details below so our dispatch department can package and send your order.
              </p>
              ${paymentInstructionsHtml}
            </div>

            <!-- Support Footer -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
              <p style="margin: 0 0 6px 0;">Need assistance with this order or have technical questions?</p>
              <p style="margin: 0;">Reply directly to this email or reach our support specialists.</p>
            </div>
          </div>

          <!-- Bottom bar -->
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; text-align: center; font-size: 11px; color: #94a3b8;">
            © ${new Date().getFullYear()} RetaPharma UK · All rights reserved. Strictly supplied for research and laboratory evaluation.
          </div>
        </div>
      </body>
      </html>
    `;

    // Admin Notification Email HTML
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Alert #${orderId}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 24px; color: #1e293b;">
        <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 28px; border: 1px solid #cbd5e1;">
          <h2 style="color: #0f172a; margin-top: 0;">🚨 New Order Received: #${orderId}</h2>
          <p style="font-size: 15px; color: #334155;">
            <strong>Amount:</strong> <span style="color: #059669; font-size: 18px; font-weight: bold;">£${total.toFixed(2)} GBP</span><br/>
            <strong>Payment Method:</strong> ${paymentMethodText}<br/>
            <strong>Shipping Tier:</strong> ${shippingOption.name} (£${shippingFee.toFixed(2)})<br/>
            <strong>Date:</strong> ${orderDate}
          </p>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

          <h3 style="color: #0f172a; margin-bottom: 8px;">Customer Information</h3>
          <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">
            <strong>Name:</strong> ${customer.fullName}<br/>
            <strong>Email:</strong> <a href="mailto:${customer.email}">${customer.email}</a><br/>
            <strong>Phone:</strong> ${customer.phone}<br/>
            <strong>Address:</strong> ${customer.address}${customer.apartment ? `, ${customer.apartment}` : ''}, ${customer.city}, ${customer.state ? `${customer.state}, ` : ''}${customer.postalCode}, ${customer.country}<br/>
            ${customer.notes ? `<strong>Notes:</strong> <em>${customer.notes}</em><br/>` : ''}
          </p>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

          <h3 style="color: #0f172a; margin-bottom: 12px;">Ordered Items</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
                <th style="padding: 8px;">Item</th>
                <th style="padding: 8px; text-align: center;">Qty</th>
                <th style="padding: 8px; text-align: right;">Price</th>
                <th style="padding: 8px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

    // 3. Dispatch via Zoho SMTP using nodemailer
    const host = process.env.ZOHO_SMTP_HOST || 'smtppro.zoho.eu';
    const port = Number(process.env.ZOHO_SMTP_PORT) || 465;
    const user = process.env.ZOHO_EMAIL_USER;
    const pass = process.env.ZOHO_EMAIL_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || user || 'admin@retapharma.com';

    let emailSent = false;
    let emailStatusMsg = '';

    if (user && pass && user !== 'orders@retapharma.com' && pass !== 'your-zoho-app-password') {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: {
            user,
            pass,
          },
        });

        // Send confirmation to Customer
        await transporter.sendMail({
          from: `"RetaPharma UK" <${user}>`,
          to: customer.email,
          subject: `Order Confirmation #${orderId} - RetaPharma UK (£${total.toFixed(2)} GBP)`,
          html: customerEmailHtml,
        });

        // Send alert to Admin
        await transporter.sendMail({
          from: `"RetaPharma System" <${user}>`,
          to: adminEmail,
          subject: `[NEW ORDER] #${orderId} - £${total.toFixed(2)} GBP from ${customer.fullName}`,
          html: adminEmailHtml,
        });

        emailSent = true;
        emailStatusMsg = 'Emails successfully dispatched via Zoho SMTP';
      } catch (err: any) {
        console.error('Zoho SMTP Send Error:', err);
        emailStatusMsg = `Zoho SMTP error: ${err?.message || 'Failed to dispatch'}`;
      }
    } else {
      console.log('Zoho SMTP not configured with live credentials yet. Order logged successfully:', {
        orderId,
        customerEmail: customer.email,
        total,
        paymentMethod,
      });
      emailStatusMsg = 'Order registered. Configure live Zoho SMTP credentials in environment to enable live email delivery.';
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderDate,
      emailSent,
      emailStatusMsg,
      customer: {
        fullName: customer.fullName,
        email: customer.email,
      },
      summary: {
        itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
        subtotal,
        shippingFee,
        total,
        shippingOption,
        paymentMethod,
      },
      paymentDetails: PAYMENT_DETAILS[paymentMethod] || PAYMENT_DETAILS.bank_transfer,
    });
  } catch (error: any) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process order' },
      { status: 500 }
    );
  }
}
