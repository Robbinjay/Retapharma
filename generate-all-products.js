const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { products } = require('./lib/data.ts');

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function getProductDesign(product) {
  const name = product.name;
  const slug = product.slug;
  const lowerName = name.toLowerCase();
  const format = product.format;
  const category = product.category;

  const isPen = category === 'Alluvi' || category === 'Reteva' || format === 'Peptide Pen' || lowerName.includes('alluvi') || lowerName.includes('retava');
  
  if (isPen) {
    const brand = category === 'Alluvi' || lowerName.includes('alluvi') ? 'Alluvi' : 'Retava';
    let accentColor = '#6366f1';
    if (lowerName.includes('retatrutide')) accentColor = '#059669';
    else if (lowerName.includes('tirzepatide')) accentColor = '#0284c7';
    else if (lowerName.includes('ghk') || lowerName.includes('glow')) accentColor = '#d97706';
    else if (lowerName.includes('nad')) accentColor = '#7c3aed';

    const dosageMatch = name.match(/(\d+(?:\.\d+)?(?:mg|ml|x2|bundle|\+))/i);
    const dosage = dosageMatch ? dosageMatch[0] : 'Multi-Dose';

    return {
      type: 'pen',
      brand,
      name,
      dosage,
      accentColor
    };
  }

  // Peptide Vial
  let capColor = '#059669'; // default emerald
  let cakeColor = '#f8fafc';
  let isLiquid = false;

  if (lowerName.includes('water') || lowerName.includes('acid')) {
    capColor = '#94a3b8';
    isLiquid = true;
  } else if (lowerName.includes('retatrutide')) {
    capColor = '#059669'; // emerald
  } else if (lowerName.includes('melanotan') || lowerName.includes('mt2') || lowerName.includes('mt-2')) {
    capColor = '#d97706'; // amber gold
  } else if (lowerName.includes('bpc-157') || lowerName.includes('bpc 157')) {
    capColor = '#2563eb'; // royal blue
  } else if (lowerName.includes('tb500') || lowerName.includes('tb-500') || lowerName.includes('thymosin')) {
    capColor = '#7c3aed'; // purple
  } else if (lowerName.includes('ghk-cu') || lowerName.includes('copper')) {
    capColor = '#0891b2'; // cyan/copper
    cakeColor = '#e0f2fe';
  } else if (
    lowerName.includes('cjc') || 
    lowerName.includes('ipamorelin') || 
    lowerName.includes('ghrp') || 
    lowerName.includes('tesamorelin') || 
    lowerName.includes('igf') || 
    lowerName.includes('aod')
  ) {
    capColor = '#0284c7'; // oceanic cyan
  } else if (
    lowerName.includes('cardiogen') || 
    lowerName.includes('cartalax') || 
    lowerName.includes('bronchogen') || 
    lowerName.includes('cortagen') || 
    lowerName.includes('crystagen')
  ) {
    capColor = '#e11d48'; // ruby crimson
  } else if (
    lowerName.includes('adamax') || 
    lowerName.includes('dihexa') || 
    lowerName.includes('dsip') || 
    lowerName.includes('semax') || 
    lowerName.includes('selank') || 
    lowerName.includes('dnsp') || 
    lowerName.includes('colivelin') ||
    lowerName.includes('dermorphin')
  ) {
    capColor = '#0f766e'; // teal slate
  } else {
    capColor = '#475569'; // steel slate
  }

  const dosageMatch = name.match(/(\d+(?:\.\d+)?(?:mg|ml))/i);
  const dosage = dosageMatch ? dosageMatch[0] : '';

  return {
    type: 'vial',
    name,
    dosage,
    category,
    capColor,
    cakeColor,
    isLiquid,
    format
  };
}

function generateVialSvg(design) {
  const capPrimary = design.capColor;
  const capDark = '#0f172a';
  const capLight = '#94a3b8';
  
  // Clean up label title
  let labelTitle = design.name
    .replace(/\s*(5mg|10mg|15mg|20mg|30mg|40mg|50mg|1mg|2mg|16mg|1000mg|10ml|0\.6%)\s*/gi, '')
    .replace(/\s*-\s*Bioregulator(?:\s*Peptide)?/gi, '')
    .replace(/\s*\(.*?\)/gi, '')
    .trim()
    .toUpperCase();
    
  if (labelTitle.length > 24) {
    labelTitle = labelTitle.substring(0, 22) + '...';
  }

  const labelDosage = design.dosage ? design.dosage.toUpperCase() : 'RESEARCH';

  return `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Studio Radial Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="65%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>

    <!-- Floor Shadow Gradient -->
    <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15, 23, 42, 0.28)"/>
      <stop offset="50%" stop-color="rgba(15, 23, 42, 0.08)"/>
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0)"/>
    </radialGradient>

    <!-- Glass Cylinder Gradients -->
    <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
      <stop offset="8%" stop-color="rgba(240,249,255,0.3)"/>
      <stop offset="20%" stop-color="rgba(255,255,255,0.05)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.01)"/>
      <stop offset="80%" stop-color="rgba(255,255,255,0.12)"/>
      <stop offset="92%" stop-color="rgba(224,242,254,0.35)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.75)"/>
    </linearGradient>

    <!-- Aluminum Crimp Collar Gradient -->
    <linearGradient id="alumCrimp" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="15%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#94a3b8"/>
      <stop offset="55%" stop-color="#e2e8f0"/>
      <stop offset="80%" stop-color="#64748b"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>

    <!-- Cap Color Gradient -->
    <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="18%" stop-color="${capPrimary}"/>
      <stop offset="45%" stop-color="${capPrimary}"/>
      <stop offset="80%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="${capPrimary}"/>
    </linearGradient>

    <!-- Lyophilized Cake / Liquid Gradient -->
    <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${design.cakeColor}"/>
      <stop offset="80%" stop-color="${design.cakeColor}"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>

    <!-- Label Gradient -->
    <linearGradient id="labelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="5%" stop-color="#ffffff"/>
      <stop offset="85%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>

    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="800" fill="url(#bgGrad)" />
  
  <!-- Subtle Studio Technical Grid Marks -->
  <g opacity="0.12" stroke="#64748b" stroke-width="1">
    <line x1="120" y1="0" x2="120" y2="800" stroke-dasharray="4,8" />
    <line x1="680" y1="0" x2="680" y2="800" stroke-dasharray="4,8" />
    <line x1="0" y1="680" x2="800" y2="680" stroke-dasharray="4,8" />
  </g>

  <!-- Floor Shadow Under Vial -->
  <ellipse cx="400" cy="690" rx="175" ry="24" fill="url(#shadowGrad)" />

  <!-- MAIN VIAL GROUP -->
  <g filter="url(#dropShadow)">
    <!-- Glass Vial Body Outer Profile -->
    <path d="M 270 630 C 270 670, 310 680, 400 680 C 490 680, 530 670, 530 630 L 530 250 C 530 235, 490 230, 445 228 L 445 200 L 355 200 L 355 228 C 310 230, 270 235, 270 250 Z"
          fill="rgba(240, 249, 255, 0.35)" stroke="rgba(203, 213, 225, 0.85)" stroke-width="2.5" />

    <!-- Contents: Liquid or Lyophilized Cake -->
    ${design.isLiquid ? `
      <path d="M 274 630 C 274 665, 312 675, 400 675 C 488 675, 526 665, 526 630 L 526 380 C 490 390, 310 390, 274 380 Z"
            fill="rgba(186, 230, 253, 0.35)" />
      <ellipse cx="400" cy="380" rx="126" ry="12" fill="rgba(125, 211, 252, 0.5)" stroke="rgba(56, 189, 248, 0.7)" stroke-width="2"/>
    ` : `
      <path d="M 275 628 C 275 664, 312 674, 400 674 C 488 674, 525 664, 525 628 L 525 580 C 480 572, 320 572, 275 580 Z"
            fill="url(#cakeGrad)" stroke="#cbd5e1" stroke-width="1.5" />
      <ellipse cx="400" cy="580" rx="125" ry="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
      <!-- Powder Micro-Texture -->
      <g opacity="0.25" fill="#64748b">
        <circle cx="350" cy="610" r="1.5"/><circle cx="390" cy="620" r="2"/><circle cx="440" cy="605" r="1.5"/>
        <circle cx="320" cy="630" r="2"/><circle cx="470" cy="635" r="1.5"/><circle cx="410" cy="645" r="2"/>
      </g>
    `}

    <!-- Glass Bottom Thickness / Inner Base Refraction -->
    <path d="M 276 636 C 280 665, 315 675, 400 675 C 485 675, 520 665, 524 636 C 500 660, 460 666, 400 666 C 340 666, 300 660, 276 636 Z"
          fill="rgba(148, 163, 184, 0.35)" />

    <!-- PHARMACEUTICAL PRODUCT LABEL -->
    <rect x="274" y="275" width="252" height="280" rx="4" fill="url(#labelGrad)" stroke="#cbd5e1" stroke-width="1.5"/>
    
    <!-- 3D Wrap Shadow Bands -->
    <rect x="274" y="275" width="24" height="280" fill="rgba(15, 23, 42, 0.08)" />
    <rect x="502" y="275" width="24" height="280" fill="rgba(15, 23, 42, 0.08)" />

    <!-- Label Top Color Banner Accent -->
    <rect x="274" y="275" width="252" height="14" rx="2" fill="${capPrimary}" />

    <!-- Brand Header -->
    <g transform="translate(400, 312)" text-anchor="middle">
      <text font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#0f172a" letter-spacing="3">RETAPHARMA UK</text>
      <text y="14" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="600" fill="#64748b" letter-spacing="1.5">RESEARCH LABORATORIES</text>
    </g>

    <!-- Divider Line -->
    <line x1="295" y1="336" x2="505" y2="336" stroke="#e2e8f0" stroke-width="1.5" />

    <!-- Compound Main Name -->
    <g transform="translate(400, 368)" text-anchor="middle">
      <text font-family="system-ui, -apple-system, sans-serif" font-size="${labelTitle.length > 18 ? '14' : labelTitle.length > 12 ? '17' : '20'}" font-weight="900" fill="#0f172a" letter-spacing="0.5">
        ${escapeXml(labelTitle)}
      </text>
      ${labelDosage ? `
        <rect x="-48" y="10" width="96" height="22" rx="11" fill="${capPrimary}" />
        <text y="25" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#ffffff" letter-spacing="0.5">${escapeXml(labelDosage)}</text>
      ` : ''}
    </g>

    <!-- Lab Specs & Purity Box -->
    <g transform="translate(400, 430)" text-anchor="middle">
      <rect x="-85" y="0" width="170" height="26" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
      <circle cx="-68" cy="13" r="4" fill="#10b981"/>
      <text x="5" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#0f172a">
        HPLC PURITY: &gt;99.4%
      </text>
    </g>

    <!-- Analytical Details Subtext -->
    <g transform="translate(400, 474)" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" fill="#475569">
      <text y="0" font-weight="600">FORMAT: ${escapeXml(design.format || 'LYOPHILIZED PEPTIDE')}</text>
      <text y="14" font-weight="500">STERILE VACUUM SEALED • STORE AT -20°C</text>
    </g>

    <!-- Bottom Warning Stripe -->
    <rect x="274" y="508" width="252" height="22" fill="#0f172a" />
    <text x="400" y="522" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="700" fill="#f8fafc" letter-spacing="1">
      STRICTLY FOR LABORATORY RESEARCH ONLY
    </text>

    <!-- Batch / Verification Tag -->
    <g transform="translate(290, 545)" font-family="monospace" font-size="7.5" fill="#94a3b8">
      <text x="0" y="0">LOT: RP-2026-UK</text>
      <text x="160" y="0">COA VERIFIED</text>
    </g>

    <!-- Glass Specular Highlights -->
    <rect x="270" y="250" width="260" height="390" fill="url(#glassBody)" pointer-events="none" />
    <path d="M 285 260 L 285 620 L 298 610 L 298 260 Z" fill="rgba(255,255,255,0.6)" opacity="0.7"/>
    <path d="M 505 260 L 505 620 L 515 610 L 515 260 Z" fill="rgba(255,255,255,0.3)" opacity="0.5"/>

    <!-- ALUMINUM CRIMP NECK -->
    <path d="M 350 200 L 450 200 L 454 228 C 454 233, 346 233, 346 228 Z" fill="url(#alumCrimp)" stroke="#64748b" stroke-width="1.5" />
    <line x1="365" y1="205" x2="365" y2="225" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
    <line x1="380" y1="205" x2="380" y2="225" stroke="rgba(15,23,42,0.3)" stroke-width="1.5"/>
    <line x1="420" y1="205" x2="420" y2="225" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
    <line x1="435" y1="205" x2="435" y2="225" stroke="rgba(15,23,42,0.3)" stroke-width="1.5"/>

    <!-- FLIP-OFF COLORED PLASTIC CAP -->
    <rect x="340" y="166" width="120" height="34" rx="6" fill="url(#capGrad)" stroke="#0f172a" stroke-width="1.5" />
    <ellipse cx="400" cy="166" rx="60" ry="12" fill="${capPrimary}" stroke="#0f172a" stroke-width="1.5" />
    <ellipse cx="400" cy="166" rx="54" ry="9" fill="url(#capGrad)" />
    <circle cx="400" cy="166" r="14" fill="#0f172a" opacity="0.6"/>
    <circle cx="400" cy="166" r="11" fill="${capPrimary}"/>
    <path d="M 395 168 L 400 162 L 405 168 Z" fill="#ffffff" opacity="0.85"/>
  </g>
</svg>`;
}

function generatePenSvg(design) {
  const accent = design.accentColor;
  const brand = design.brand;
  
  let labelTitle = design.name
    .replace(/(Alluvi|Retava|Reteva)\s*/gi, '')
    .replace(/\s*(?:20mg|40mg|50mg|10mg|30mg|1000mg|70mg)\s*/gi, '')
    .trim()
    .toUpperCase();

  if (labelTitle.length > 20) {
    labelTitle = labelTitle.substring(0, 18) + '...';
  }

  return `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Studio Radial Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="65%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>

    <!-- Floor Shadow Gradient -->
    <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15, 23, 42, 0.28)"/>
      <stop offset="50%" stop-color="rgba(15, 23, 42, 0.08)"/>
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0)"/>
    </radialGradient>

    <!-- Pen Body Matte Gradient -->
    <linearGradient id="penBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="12%" stop-color="#64748b"/>
      <stop offset="35%" stop-color="#1e293b"/>
      <stop offset="70%" stop-color="#0f172a"/>
      <stop offset="90%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <!-- Aluminum Metallic Trim -->
    <linearGradient id="silverTrim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="25%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#cbd5e1"/>
      <stop offset="75%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>

    <!-- Cartridge Chamber Gradient -->
    <linearGradient id="cartridgeChamber" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(240, 249, 255, 0.9)"/>
      <stop offset="15%" stop-color="rgba(255, 255, 255, 0.95)"/>
      <stop offset="50%" stop-color="rgba(224, 242, 254, 0.6)"/>
      <stop offset="85%" stop-color="rgba(186, 230, 253, 0.7)"/>
      <stop offset="100%" stop-color="rgba(240, 249, 255, 0.9)"/>
    </linearGradient>

    <!-- Accent Gradient -->
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="35%" stop-color="${accent}"/>
      <stop offset="70%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#bgGrad)" />

  <!-- Studio Grid Line -->
  <g opacity="0.12" stroke="#64748b" stroke-width="1">
    <line x1="120" y1="0" x2="120" y2="800" stroke-dasharray="4,8" />
    <line x1="680" y1="0" x2="680" y2="800" stroke-dasharray="4,8" />
    <line x1="0" y1="710" x2="800" y2="710" stroke-dasharray="4,8" />
  </g>

  <!-- Floor Shadow -->
  <ellipse cx="400" cy="720" rx="145" ry="22" fill="url(#shadowGrad)" />

  <!-- PEPTIDE INJECTOR PEN -->
  <g filter="url(#dropShadow)" transform="translate(0, 10)">
    
    <!-- Top Plunger / Dose Selector Dial -->
    <rect x="362" y="110" width="76" height="36" rx="4" fill="url(#silverTrim)" stroke="#475569" stroke-width="1.5" />
    <g stroke="#334155" stroke-width="1.5">
      <line x1="375" y1="114" x2="375" y2="142"/>
      <line x1="388" y1="114" x2="388" y2="142"/>
      <line x1="400" y1="114" x2="400" y2="142"/>
      <line x1="412" y1="114" x2="412" y2="142"/>
      <line x1="425" y1="114" x2="425" y2="142"/>
    </g>
    <!-- Dial Cap Ring -->
    <rect x="356" y="142" width="88" height="12" rx="3" fill="url(#accentGrad)" />

    <!-- Upper Body Barrel -->
    <rect x="348" y="154" width="104" height="260" rx="6" fill="url(#penBody)" stroke="#1e293b" stroke-width="2" />
    <rect x="362" y="154" width="8" height="260" fill="rgba(255,255,255,0.15)" />

    <!-- Pen Brand Typography on Barrel -->
    <g transform="translate(400, 210)" text-anchor="middle">
      <rect x="-44" y="-18" width="88" height="26" rx="13" fill="${accent}" />
      <text y="-1" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#ffffff" letter-spacing="3">${escapeXml(brand.toUpperCase())}</text>
      
      <text y="32" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#f8fafc" letter-spacing="1.5">RESEARCH PEN</text>
      <text y="48" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="600" fill="#94a3b8" letter-spacing="1">CARTRIDGE SYSTEM</text>
    </g>

    <!-- Compound Details on Body -->
    <g transform="translate(400, 290)" text-anchor="middle">
      <line x1="-38" y1="0" x2="38" y2="0" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      
      <text y="24" font-family="system-ui, -apple-system, sans-serif" font-size="${labelTitle.length > 18 ? '10' : '12'}" font-weight="900" fill="#ffffff" letter-spacing="0.5">
        ${escapeXml(labelTitle)}
      </text>

      <rect x="-38" y="34" width="76" height="20" rx="10" fill="#1e293b" stroke="${accent}" stroke-width="1.5"/>
      <text y="48" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#ffffff">${escapeXml(design.dosage || 'MULTI-DOSE')}</text>
    </g>

    <!-- Purity Badge on Pen -->
    <g transform="translate(400, 385)" text-anchor="middle">
      <text font-family="system-ui, -apple-system, sans-serif" font-size="7.5" font-weight="700" fill="#94a3b8" letter-spacing="1">PURITY &gt;99% • COA BATCH</text>
      <text y="12" font-family="monospace" font-size="7" fill="#64748b">FOR RESEARCH USE ONLY</text>
    </g>

    <!-- Middle Aluminum Connector Ring -->
    <rect x="344" y="414" width="112" height="18" rx="3" fill="url(#silverTrim)" stroke="#475569" stroke-width="1.5" />
    <line x1="344" y1="423" x2="456" y2="423" stroke="#334155" stroke-width="1" />

    <!-- Transparent Cartridge Window Section -->
    <rect x="350" y="432" width="100" height="190" rx="5" fill="url(#cartridgeChamber)" stroke="rgba(148, 163, 184, 0.8)" stroke-width="2" />
    
    <!-- Liquid Solution inside Cartridge -->
    <rect x="354" y="460" width="92" height="158" fill="rgba(186, 230, 253, 0.35)" />
    <!-- Meniscus / Plunger Rubber Stopper -->
    <rect x="354" y="452" width="92" height="16" rx="3" fill="#334155" />
    <line x1="354" y1="460" x2="446" y2="460" stroke="#1e293b" stroke-width="1.5"/>

    <!-- Volume Measurement Tick Marks on Window -->
    <g stroke="#0f172a" stroke-width="1.5" opacity="0.6">
      <line x1="356" y1="475" x2="368" y2="475"/><text x="372" y="478" font-family="monospace" font-size="7" fill="#0f172a">10</text>
      <line x1="356" y1="495" x2="364" y2="495"/>
      <line x1="356" y1="515" x2="368" y2="515"/><text x="372" y="518" font-family="monospace" font-size="7" fill="#0f172a">20</text>
      <line x1="356" y1="535" x2="364" y2="535"/>
      <line x1="356" y1="555" x2="368" y2="555"/><text x="372" y="558" font-family="monospace" font-size="7" fill="#0f172a">30</text>
      <line x1="356" y1="575" x2="364" y2="575"/>
      <line x1="356" y1="595" x2="368" y2="595"/><text x="372" y="598" font-family="monospace" font-size="7" fill="#0f172a">40</text>
    </g>

    <!-- Glass Reflection Highlights on Window -->
    <path d="M 358 438 L 358 616 L 364 616 L 364 438 Z" fill="rgba(255,255,255,0.7)" />

    <!-- Lower Tip Collar & Protective Cone -->
    <path d="M 350 622 L 450 622 L 436 670 C 436 675, 364 675, 364 670 Z" fill="url(#penBody)" stroke="#1e293b" stroke-width="1.5" />
    <path d="M 364 670 L 436 670 L 416 705 C 416 708, 384 708, 384 705 Z" fill="url(#silverTrim)" stroke="#475569" stroke-width="1.5" />
    <rect x="394" y="705" width="12" height="10" rx="2" fill="#0f172a" />
  </g>
</svg>`;
}

async function run() {
  const productsDir = path.join(__dirname, 'public', 'products');
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  console.log(`Generating images for ${products.length} products...`);
  
  for (const product of products) {
    const design = getProductDesign(product);
    const svg = design.type === 'pen' ? generatePenSvg(design) : generateVialSvg(design);
    
    const pngPath = path.join(productsDir, `${product.slug}.png`);
    const jpgPath = path.join(productsDir, `${product.slug}.jpg`);

    // Generate PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .png({ quality: 95 })
      .toBuffer();
    fs.writeFileSync(pngPath, pngBuffer);

    // Generate JPEG
    const jpgBuffer = await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toBuffer();
    fs.writeFileSync(jpgPath, jpgBuffer);

    // Generate WebP
    const webpPath = path.join(productsDir, `${product.slug}.webp`);
    const webpBuffer = await sharp(Buffer.from(svg))
      .webp({ quality: 95 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuffer);
    
    console.log(`✓ Generated ${product.slug} (.png, .webp, .jpg)`);
  }

  // Ensure legacy aliases are synchronized
  const aliases = [
    { from: 'melanotan-ii-mt2-10mg', to: 'mt2-melanotan-ii-10mg' },
    { from: 'melanotan-mt2-10mg', to: 'melanotan-mt2-10mg' }
  ];

  for (const alias of aliases) {
    for (const ext of ['.png', '.webp', '.jpg']) {
      const src = path.join(productsDir, `${alias.from}${ext}`);
      const dest = path.join(productsDir, `${alias.to}${ext}`);
      if (fs.existsSync(src) && src !== dest) {
        fs.copyFileSync(src, dest);
      }
    }
  }

  // Ensure Logo and Favicon assets are synchronized from Reta parma.PNG
  const rootLogoPath = path.join(__dirname, 'Reta parma.PNG');
  if (fs.existsSync(rootLogoPath)) {
    const publicLogo = path.join(__dirname, 'public', 'logo.png');
    await sharp(rootLogoPath).trim().png({ quality: 100 }).toFile(publicLogo);

    const publicIcon = path.join(__dirname, 'public', 'icon.png');
    const pngBuffer = await sharp(rootLogoPath)
      .trim()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    fs.writeFileSync(publicIcon, pngBuffer);
    fs.writeFileSync(path.join(__dirname, 'public', 'favicon.png'), pngBuffer);

    // Build standard ICO container
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0);
    icoHeader.writeUInt16LE(1, 2);
    icoHeader.writeUInt16LE(1, 4);

    const icoDir = Buffer.alloc(16);
    icoDir.writeUInt8(32, 0);
    icoDir.writeUInt8(32, 1);
    icoDir.writeUInt8(0, 2);
    icoDir.writeUInt8(0, 3);
    icoDir.writeUInt16LE(1, 4);
    icoDir.writeUInt16LE(32, 6);
    icoDir.writeUInt32LE(pngBuffer.length, 8);
    icoDir.writeUInt32LE(22, 12);

    const icoBuffer = Buffer.concat([icoHeader, icoDir, pngBuffer]);
    fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), icoBuffer);

    const publicApple = path.join(__dirname, 'public', 'apple-icon.png');
    await sharp(rootLogoPath).trim().resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(publicApple);

    await sharp(rootLogoPath).trim().resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(__dirname, 'public', 'icon-192.png'));
    await sharp(rootLogoPath).trim().resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(__dirname, 'public', 'icon-512.png'));
    console.log('✓ Synchronized app logo, standard ICO favicon, and high-res brand icons from Reta parma.PNG');
  }

  console.log('All product images and brand assets generated and synchronized successfully!');
}

run().catch(console.error);
