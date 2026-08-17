const fs = require('fs');
const sharp = require('sharp');

function generateVialSvg({ name, dosage, category, capColor, cakeColor, format }) {
  const isLiquid = format && format.toLowerCase().includes('water') || name.toLowerCase().includes('water') || name.toLowerCase().includes('acid');
  
  const capPrimary = capColor || '#059669';
  const capDark = '#064e3b';
  const capLight = '#34d399';
  
  const labelTitle = name.replace(/\s*(5mg|10mg|15mg|2mg|20mg|50mg|1mg|16mg|10ml)\s*/gi, '').trim().toUpperCase();
  const labelDosage = (name.match(/\b(\d+(?:\.\d+)?(?:mg|ml))\b/i) || ['', dosage || ''])[1].toUpperCase();

  const svg = `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Studio Radial Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="65%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>

    <!-- Floor Shadow Gradient -->
    <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15, 23, 42, 0.25)"/>
      <stop offset="50%" stop-color="rgba(15, 23, 42, 0.08)"/>
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0)"/>
    </radialGradient>

    <!-- Glass Cylinder Gradients -->
    <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
      <stop offset="8%" stop-color="rgba(240,249,255,0.3)"/>
      <stop offset="20%" stop-color="rgba(255,255,255,0.1)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.02)"/>
      <stop offset="80%" stop-color="rgba(255,255,255,0.15)"/>
      <stop offset="92%" stop-color="rgba(224,242,254,0.4)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.8)"/>
    </linearGradient>

    <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.8)"/>
      <stop offset="15%" stop-color="rgba(255,255,255,0.0)"/>
      <stop offset="85%" stop-color="rgba(255,255,255,0.0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.6)"/>
    </linearGradient>

    <!-- Aluminum Crimp Collar Gradient -->
    <linearGradient id="alumCrimp" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="15%" stop-color="#f8fafc"/>
      <stop offset="35%" stop-color="#94a3b8"/>
      <stop offset="55%" stop-color="#e2e8f0"/>
      <stop offset="80%" stop-color="#64748b"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>

    <!-- Cap Color Gradient -->
    <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${capDark}"/>
      <stop offset="20%" stop-color="${capLight}"/>
      <stop offset="45%" stop-color="${capPrimary}"/>
      <stop offset="80%" stop-color="${capDark}"/>
      <stop offset="100%" stop-color="${capPrimary}"/>
    </linearGradient>

    <!-- Lyophilized Cake / Liquid Gradient -->
    <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${cakeColor || '#f8fafc'}"/>
      <stop offset="80%" stop-color="${cakeColor ? cakeColor : '#f1f5f9'}"/>
      <stop offset="100%" stop-color="${cakeColor ? cakeColor : '#e2e8f0'}"/>
    </linearGradient>

    <!-- Label Gradient -->
    <linearGradient id="labelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="5%" stop-color="#ffffff"/>
      <stop offset="85%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>

    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="800" fill="url(#bgGrad)" />
  
  <!-- Subtle Grid Pattern in background -->
  <g opacity="0.15" stroke="#94a3b8" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="800" stroke-dasharray="4,8" />
    <line x1="700" y1="0" x2="700" y2="800" stroke-dasharray="4,8" />
    <line x1="0" y1="680" x2="800" y2="680" stroke-dasharray="4,8" />
  </g>

  <!-- Floor Shadow Under Vial -->
  <ellipse cx="400" cy="690" rx="170" ry="24" fill="url(#shadowGrad)" />

  <!-- MAIN VIAL GROUP -->
  <g filter="url(#dropShadow)">
    <!-- Glass Vial Body Outer Container -->
    <!-- Base Curved Bottom of Vial -->
    <path d="M 270 630 C 270 670, 310 680, 400 680 C 490 680, 530 670, 530 630 L 530 250 C 530 235, 490 230, 445 228 L 445 200 L 355 200 L 355 228 C 310 230, 270 235, 270 250 Z"
          fill="rgba(240, 249, 255, 0.4)" stroke="rgba(203, 213, 225, 0.8)" stroke-width="2.5" />

    <!-- Lyophilized Cake / Liquid Fill Inside Glass -->
    ${isLiquid ? `
      <!-- Liquid Form (Bacteriostatic Water / Solution) -->
      <path d="M 274 630 C 274 665, 312 675, 400 675 C 488 675, 526 665, 526 630 L 526 380 C 490 390, 310 390, 274 380 Z"
            fill="rgba(186, 230, 253, 0.4)" />
      <!-- Liquid Meniscus Line -->
      <ellipse cx="400" cy="380" rx="126" ry="12" fill="rgba(125, 211, 252, 0.5)" stroke="rgba(56, 189, 248, 0.7)" stroke-width="2"/>
    ` : `
      <!-- Lyophilized Powder Cake Structure at bottom -->
      <path d="M 275 628 C 275 664, 312 674, 400 674 C 488 674, 525 664, 525 628 L 525 580 C 480 572, 320 572, 275 580 Z"
            fill="url(#cakeGrad)" stroke="#cbd5e1" stroke-width="1.5" />
      <ellipse cx="400" cy="580" rx="125" ry="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
      <!-- Powder Texture Microdots -->
      <g opacity="0.25" fill="#64748b">
        <circle cx="350" cy="610" r="1.5"/><circle cx="390" cy="620" r="2"/><circle cx="440" cy="605" r="1.5"/>
        <circle cx="320" cy="630" r="2"/><circle cx="470" cy="635" r="1.5"/><circle cx="410" cy="645" r="2"/>
      </g>
    `}

    <!-- Glass Bottom Thickness / Inner Refraction -->
    <path d="M 276 636 C 280 665, 315 675, 400 675 C 485 675, 520 665, 524 636 C 500 660, 460 666, 400 666 C 340 666, 300 660, 276 636 Z"
          fill="rgba(148, 163, 184, 0.4)" />

    <!-- PHARMACEUTICAL PRODUCT LABEL -->
    <!-- Label Base wrapped on cylinder -->
    <rect x="274" y="275" width="252" height="280" rx="4" fill="url(#labelGrad)" stroke="#cbd5e1" stroke-width="1.5"/>
    
    <!-- Label Side Shadow Shading for 3D wrap effect -->
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
      <text font-family="system-ui, -apple-system, sans-serif" font-size="${labelTitle.length > 18 ? '15' : labelTitle.length > 12 ? '18' : '21'}" font-weight="900" fill="#0f172a" letter-spacing="0.5">
        ${labelTitle}
      </text>
      ${labelDosage ? `
        <rect x="-45" y="10" width="90" height="22" rx="11" fill="${capPrimary}" />
        <text y="25" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#ffffff" letter-spacing="0.5">${labelDosage}</text>
      ` : ''}
    </g>

    <!-- Lab Specs & Purity Grid -->
    <g transform="translate(400, 430)" text-anchor="middle">
      <!-- Purity Pill Box -->
      <rect x="-85" y="0" width="170" height="26" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
      <circle cx="-68" cy="13" r="4" fill="#10b981"/>
      <text x="5" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#0f172a">
        HPLC PURITY: &gt;99.4%
      </text>
    </g>

    <!-- Analytical Details Subtext -->
    <g transform="translate(400, 474)" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" fill="#475569">
      <text y="0" font-weight="600">FORMAT: ${format || 'LYOPHILIZED PEPTIDE'}</text>
      <text y="14" font-weight="500">STERILE VACUUM SEALED • STORE AT -20°C</text>
    </g>

    <!-- Bottom Warning Stripe -->
    <rect x="274" y="508" width="252" height="22" fill="#0f172a" />
    <text x="400" y="522" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="700" fill="#f8fafc" letter-spacing="1">
      STRICTLY FOR LABORATORY RESEARCH ONLY
    </text>

    <!-- Label Bottom Margin Code / Batch Tag -->
    <g transform="translate(290, 545)" font-family="monospace" font-size="7.5" fill="#94a3b8">
      <text x="0" y="0">LOT: RP-${Math.floor(Math.random() * 8000 + 1000)}</text>
      <text x="160" y="0">COA VERIFIED</text>
    </g>

    <!-- Glass Cylindrical Highlight / Specular Overlays -->
    <rect x="270" y="250" width="260" height="390" fill="url(#glassBody)" pointer-events="none" />
    <path d="M 285 260 L 285 620 L 298 610 L 298 260 Z" fill="rgba(255,255,255,0.6)" opacity="0.7"/>
    <path d="M 505 260 L 505 620 L 515 610 L 515 260 Z" fill="rgba(255,255,255,0.3)" opacity="0.5"/>

    <!-- ALUMINUM CRIMP NECK -->
    <!-- Lower crimp skirt -->
    <path d="M 350 200 L 450 200 L 454 228 C 454 233, 346 233, 346 228 Z" fill="url(#alumCrimp)" stroke="#64748b" stroke-width="1.5" />
    <!-- Crimp indent lines -->
    <line x1="365" y1="205" x2="365" y2="225" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
    <line x1="380" y1="205" x2="380" y2="225" stroke="rgba(15,23,42,0.3)" stroke-width="1.5"/>
    <line x1="420" y1="205" x2="420" y2="225" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
    <line x1="435" y1="205" x2="435" y2="225" stroke="rgba(15,23,42,0.3)" stroke-width="1.5"/>

    <!-- FLIP-OFF COLORED PLASTIC CAP -->
    <!-- Cap base ring -->
    <rect x="340" y="166" width="120" height="34" rx="6" fill="url(#capGrad)" stroke="${capDark}" stroke-width="1.5" />
    <!-- Cap top dome -->
    <ellipse cx="400" cy="166" rx="60" ry="12" fill="${capLight}" stroke="${capDark}" stroke-width="1.5" />
    <ellipse cx="400" cy="166" rx="54" ry="9" fill="url(#capGrad)" />

    <!-- Center Flip-Off Button Circle Indicator -->
    <circle cx="400" cy="166" r="14" fill="${capDark}" opacity="0.6"/>
    <circle cx="400" cy="166" r="11" fill="${capPrimary}"/>
    <!-- Flip-off Embossed Arrow -->
    <path d="M 395 168 L 400 162 L 405 168 Z" fill="#ffffff" opacity="0.8"/>

    <!-- Specular Flare on Cap -->
    <path d="M 355 174 C 360 170, 385 170, 390 174 L 388 188 C 383 184, 360 184, 357 188 Z" fill="rgba(255,255,255,0.4)"/>
  </g>
</svg>`;
  return svg;
}

const svg = generateVialSvg({
  name: 'Retatrutide 10mg',
  dosage: '10mg',
  category: 'GLP-1 / GIP / GCG Agonist',
  capColor: '#059669',
  format: 'Lyophilized Powder'
});

fs.writeFileSync('test.svg', svg);
sharp(Buffer.from(svg))
  .png({ quality: 100 })
  .toFile('test.png')
  .then(info => {
    console.log('Successfully generated test PNG:', info);
  })
  .catch(err => {
    console.error('Error generating PNG:', err);
  });
