const fs = require('fs');
const sharp = require('sharp');

function generatePenSvg({ name, brand, dosage, accentColor }) {
  const accent = accentColor || (brand === 'Alluvi' ? '#6366f1' : '#059669');
  const accentLight = brand === 'Alluvi' ? '#a5b4fc' : '#34d399';
  const accentDark = brand === 'Alluvi' ? '#312e81' : '#064e3b';
  
  const labelTitle = name.replace(/(Alluvi|Retava)\s*/gi, '').trim().toUpperCase();

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
      <stop offset="0%" stop-color="${accentDark}"/>
      <stop offset="25%" stop-color="${accentLight}"/>
      <stop offset="60%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${accentDark}"/>
    </linearGradient>

    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#bgGrad)" />

  <!-- Subtle Studio Grid Line -->
  <g opacity="0.15" stroke="#94a3b8" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="800" stroke-dasharray="4,8" />
    <line x1="700" y1="0" x2="700" y2="800" stroke-dasharray="4,8" />
    <line x1="0" y1="710" x2="800" y2="710" stroke-dasharray="4,8" />
  </g>

  <!-- Floor Shadow -->
  <ellipse cx="400" cy="720" rx="140" ry="22" fill="url(#shadowGrad)" />

  <!-- PEPTIDE INJECTOR PEN -->
  <g filter="url(#dropShadow)" transform="translate(0, 10)">
    
    <!-- Top Plunger / Dose Selector Dial -->
    <rect x="362" y="110" width="76" height="36" rx="4" fill="url(#silverTrim)" stroke="#475569" stroke-width="1.5" />
    <!-- Dose Notches on Dial -->
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

    <!-- Specular Highlight Strip along body -->
    <rect x="362" y="154" width="8" height="260" fill="rgba(255,255,255,0.15)" />

    <!-- Pen Brand Typography on Barrel -->
    <g transform="translate(400, 210)" text-anchor="middle">
      <rect x="-42" y="-18" width="84" height="26" rx="13" fill="${accent}" />
      <text y="-1" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#ffffff" letter-spacing="3">${brand.toUpperCase()}</text>
      
      <text y="32" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#f8fafc" letter-spacing="1.5">RESEARCH PEN</text>
      <text y="48" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="600" fill="#94a3b8" letter-spacing="1">CARTRIDGE SYSTEM</text>
    </g>

    <!-- Compound Details on Body -->
    <g transform="translate(400, 290)" text-anchor="middle">
      <!-- Divider -->
      <line x1="-38" y1="0" x2="38" y2="0" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      
      <text y="24" font-family="system-ui, -apple-system, sans-serif" font-size="${labelTitle.length > 18 ? '10' : '12'}" font-weight="900" fill="#ffffff" letter-spacing="0.5">
        ${labelTitle}
      </text>

      <!-- Dosage Badge -->
      <rect x="-35" y="34" width="70" height="20" rx="10" fill="#1e293b" stroke="${accent}" stroke-width="1.5"/>
      <text y="48" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" fill="${accentLight}">${dosage || 'MULTI-DOSE'}</text>
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
    <!-- Needle Guard Tip -->
    <rect x="394" y="705" width="12" height="10" rx="2" fill="#0f172a" />
  </g>
</svg>`;
  return svg;
}

const penSvg = generatePenSvg({
  name: 'Alluvi Retatrutide 20mg',
  brand: 'Alluvi',
  dosage: '20mg',
  accentColor: '#6366f1'
});

sharp(Buffer.from(penSvg))
  .png({ quality: 100 })
  .toFile('test-pen.png')
  .then(info => console.log('Generated test pen PNG:', info))
  .catch(err => console.error('Error generating pen PNG:', err));
