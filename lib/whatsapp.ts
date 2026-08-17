export const WHATSAPP_CONFIG = {
  rawPhone: '447402233804',
  displayPhone: '+44 7402 223804',
  businessName: 'Reta Pharma',
  operatingHours: 'Mon - Fri: 9:00 AM - 5:00 PM (GMT)',
  responseNotice: 'Typically replies within minutes',
  greetings: {
    general: 'Hello Reta Pharma Support, I have a question regarding your peptide research catalogue.',
    orderHelp: 'Hello Reta Pharma, I would like assistance with placing an order.',
    batchCOA: 'Hello Reta Pharma, I would like to request batch analytical data or COA verification for a peptide.',
    paymentShipping: 'Hello Reta Pharma, I would like to inquire about accepted payment methods and UK shipping delivery times.',
  }
};

export interface OrderItemSummary {
  name: string;
  format?: string;
  quantity: number;
  price: number;
  slug?: string;
}

export interface WhatsAppOrderDetails {
  items: OrderItemSummary[];
  subtotal: number;
  shippingOption?: {
    name: string;
    price: number;
  };
  grandTotal: number;
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    notes?: string;
    paymentMethod?: string;
  };
}

/**
 * Creates a direct wa.me link with encoded message
 */
export function getWhatsAppLink(message?: string, customPhone?: string): string {
  const phone = customPhone || WHATSAPP_CONFIG.rawPhone;
  const encoded = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ''}`;
}

/**
 * Generates an inquiry message for a specific product
 */
export function getProductInquiryMessage(productName: string, format: string, price: number, slug?: string): string {
  const productUrl = slug ? `https://retapharma.uk/shop/${slug}` : '';
  return [
    `Hello ${WHATSAPP_CONFIG.businessName},`,
    '',
    `I am interested in researching: *${productName}*`,
    `Format: ${format}`,
    `Price: £${price.toFixed(2)}`,
    productUrl ? `Link: ${productUrl}` : '',
    '',
    `Could you please confirm current stock availability and dispatch time? Thank you!`
  ].filter(Boolean).join('\n');
}

/**
 * Generates an instant single-product order message
 */
export function getSingleProductOrderMessage(productName: string, format: string, price: number, quantity: number, slug?: string): string {
  const total = price * quantity;
  const productUrl = slug ? `https://retapharma.uk/shop/${slug}` : '';
  return [
    `🛒 *New Order Request via WhatsApp*`,
    `--------------------------------`,
    `Hello ${WHATSAPP_CONFIG.businessName}, I would like to place an order for:`,
    '',
    `*Product:* ${productName}`,
    `*Quantity:* ${quantity} unit(s)`,
    `*Format:* ${format}`,
    `*Unit Price:* £${price.toFixed(2)}`,
    `*Total Item Cost:* £${total.toFixed(2)}`,
    productUrl ? `*Reference Link:* ${productUrl}` : '',
    '',
    `Please provide payment details (Bank Transfer / Revolut / Crypto) and confirm next UK dispatch. Thank you!`
  ].filter(Boolean).join('\n');
}

/**
 * Generates a full basket order message for checkout
 */
export function getFullCartOrderMessage(details: WhatsAppOrderDetails): string {
  const lines: string[] = [
    `🛒 *New Order Submission - ${WHATSAPP_CONFIG.businessName}*`,
    `-------------------------------------------`,
    `Hello! I would like to confirm and complete my order via WhatsApp:`,
    '',
    `*📦 ORDER ITEMS:*`
  ];

  details.items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    lines.push(`${index + 1}. *${item.name}* (x${item.quantity}) - £${itemTotal.toFixed(2)}`);
  });

  lines.push('');
  lines.push(`*Subtotal:* £${details.subtotal.toFixed(2)}`);
  
  if (details.shippingOption) {
    lines.push(`*Shipping:* ${details.shippingOption.name} (£${details.shippingOption.price.toFixed(2)})`);
  }
  
  lines.push(`*Total Amount Due:* £${details.grandTotal.toFixed(2)}`);
  lines.push(`-------------------------------------------`);

  if (details.customer && (details.customer.fullName || details.customer.email || details.customer.address)) {
    lines.push(`*📋 CUSTOMER & DELIVERY DETAILS:*`);
    if (details.customer.fullName) lines.push(`*Name:* ${details.customer.fullName}`);
    if (details.customer.email) lines.push(`*Email:* ${details.customer.email}`);
    if (details.customer.phone) lines.push(`*Phone:* ${details.customer.phone}`);
    if (details.customer.address) {
      const fullAddr = [
        details.customer.address,
        details.customer.city,
        details.customer.postalCode,
        details.customer.country || 'United Kingdom'
      ].filter(Boolean).join(', ');
      lines.push(`*Delivery Address:* ${fullAddr}`);
    }
    if (details.customer.paymentMethod) {
      const paymentLabels: Record<string, string> = {
        bank_transfer: 'UK Faster Payments / Bank Transfer',
        revolut: 'Revolut Pay (@retapharma)',
        crypto: 'Cryptocurrency (USDT / BTC / ETH)'
      };
      lines.push(`*Preferred Payment:* ${paymentLabels[details.customer.paymentMethod] || details.customer.paymentMethod}`);
    }
    if (details.customer.notes) {
      lines.push(`*Order Notes:* ${details.customer.notes}`);
    }
    lines.push(`-------------------------------------------`);
  }

  lines.push('Please confirm my order receipt and send payment instructions. Thank you!');

  return lines.join('\n');
}
