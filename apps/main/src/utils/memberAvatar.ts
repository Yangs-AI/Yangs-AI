export type AvatarGender = "masculine" | "feminine" | "neutral";
export type MemberKind = "employee" | "student" | "intern";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const seeded = (seed: string) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (step: number) => {
    const x = Math.sin((h + step * 137) * 0.0174533) * 43758.5453;
    return x - Math.floor(x);
  };
};

const roleGradients: Record<MemberKind, Array<[string, string]>> = {
  employee: [["#4a627b", "#2a3f54"], ["#506975", "#2f4550"]],
  student: [["#4f6681", "#30465b"], ["#526c78", "#334a55"]],
  intern: [["#566f7d", "#374d59"], ["#5c7180", "#3a4f5c"]],
};

const skinTones = ["#efd8c2", "#e6c5a8", "#d7ae8b", "#c89878", "#ba896b"];
const hairTones = ["#23262d", "#312d2c", "#3c342f", "#3a3f49", "#4d4138"];

const buildMasculineAvatar = (displayName: string, memberType: MemberKind, unit: (step: number) => number) => {
  const [bgA, bgB] = roleGradients[memberType][Math.floor(unit(1) * roleGradients[memberType].length)];
  const skin = skinTones[Math.floor(unit(2) * skinTones.length)];
  const hair = hairTones[Math.floor(unit(3) * hairTones.length)];
  const eyeOffset = 18 + Math.floor(unit(4) * 3);
  const eyeY = 195 + Math.floor(unit(5) * 2);
  const faceRx = 71 + Math.floor(unit(6) * 3);
  const faceRy = 78 + Math.floor(unit(7) * 3);
  const shirtHue = Math.floor(202 + unit(8) * 10);
  const hairVariant = Math.floor(unit(9) * 3);
  const mouthY = 229 + Math.floor(unit(10) * 2);
  const mouthCurve = 5 + Math.floor(unit(11) * 2);
  const outline = "#202e3d";

  const hairCap =
    hairVariant === 0
      ? "M 126 172 C 132 128, 166 100, 200 100 C 234 100, 268 128, 274 172 C 258 158, 236 150, 214 150 C 190 150, 168 158, 126 172 Z"
      : hairVariant === 1
      ? "M 124 172 C 130 132, 162 106, 200 106 C 238 106, 270 132, 276 172 C 258 160, 236 154, 200 154 C 166 154, 144 160, 124 172 Z"
      : "M 128 172 C 136 136, 166 114, 200 114 C 234 114, 264 136, 272 172 C 252 160, 234 154, 200 154 C 168 154, 148 160, 128 172 Z";

  const glasses = unit(12) > 0.54
    ? `<rect x='${200 - eyeOffset - 11}' y='${eyeY - 7}' width='20' height='13' rx='6' stroke='${outline}' stroke-width='1.4' fill='none'/>
  <rect x='${200 + eyeOffset - 9}' y='${eyeY - 7}' width='20' height='13' rx='6' stroke='${outline}' stroke-width='1.4' fill='none'/>
  <path d='M 198 ${eyeY - 1} H 202' stroke='${outline}' stroke-width='1.3'/>`
    : "";

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' role='img' aria-label='${escapeXml(displayName)}'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${bgA}'/>
      <stop offset='100%' stop-color='${bgB}'/>
    </linearGradient>
    <radialGradient id='halo' cx='22%' cy='12%' r='74%'>
      <stop offset='0%' stop-color='rgba(248,252,255,0.23)'/>
      <stop offset='100%' stop-color='rgba(255,255,255,0)'/>
    </radialGradient>
  </defs>
  <rect width='400' height='400' fill='url(#bg)'/>
  <rect width='400' height='400' fill='url(#halo)'/>

  <ellipse cx='200' cy='366' rx='132' ry='80' fill='hsl(${shirtHue}, 28%, 33%)' opacity='0.96'/>
  <path d='M 142 320 Q 200 282 258 320' stroke='rgba(232,243,255,0.28)' stroke-width='4' fill='none' stroke-linecap='round'/>

  <ellipse cx='200' cy='194' rx='${faceRx}' ry='${faceRy}' fill='${skin}'/>
  <path d='${hairCap}' fill='${hair}'/>
  <path d='M 168 132 C 180 124, 220 124, 232 132 C 222 128, 212 126, 200 126 C 188 126, 178 128, 168 132 Z' fill='rgba(255,255,255,0.12)'/>

  <path d='M ${200 - eyeOffset - 11} 176 Q ${200 - eyeOffset} 171 ${200 - eyeOffset + 11} 176' stroke='${outline}' stroke-width='1.8' fill='none' stroke-linecap='round'/>
  <path d='M ${200 + eyeOffset - 11} 176 Q ${200 + eyeOffset} 171 ${200 + eyeOffset + 11} 176' stroke='${outline}' stroke-width='1.8' fill='none' stroke-linecap='round'/>

  <ellipse cx='${200 - eyeOffset}' cy='${eyeY}' rx='4.7' ry='5.1' fill='${outline}'/>
  <ellipse cx='${200 + eyeOffset}' cy='${eyeY}' rx='4.7' ry='5.1' fill='${outline}'/>
  <circle cx='${200 - eyeOffset - 1}' cy='${eyeY - 1}' r='1' fill='rgba(255,255,255,0.5)'/>
  <circle cx='${200 + eyeOffset - 1}' cy='${eyeY - 1}' r='1' fill='rgba(255,255,255,0.5)'/>
  ${glasses}

  <path d='M 200 199 C 198 206, 198 212, 200 215' stroke='#9e765f' stroke-width='1.6' fill='none' stroke-linecap='round'/>
  <path d='M 182 ${mouthY} Q 200 ${mouthY + mouthCurve} 218 ${mouthY}' stroke='#73584a' stroke-width='2.1' fill='none' stroke-linecap='round'/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const buildFeminineAvatar = (displayName: string, memberType: MemberKind, unit: (step: number) => number) => {
  const [bgA, bgB] = roleGradients[memberType][Math.floor(unit(1) * roleGradients[memberType].length)];
  const skin = skinTones[Math.floor(unit(2) * skinTones.length)];
  const hair = hairTones[Math.floor(unit(3) * hairTones.length)];
  const eyeOffset = 18 + Math.floor(unit(4) * 3);
  const eyeY = 194 + Math.floor(unit(5) * 2);
  const faceRx = 69 + Math.floor(unit(6) * 3);
  const faceRy = 80 + Math.floor(unit(7) * 3);
  const shirtHue = Math.floor(198 + unit(8) * 10);
  const mouthY = 229 + Math.floor(unit(10) * 2);
  const mouthCurve = 5 + Math.floor(unit(11) * 2);
  const outline = "#202e3d";

  const hairShell = "M 120 190 C 112 144, 150 102, 200 102 C 250 102, 288 144, 280 190 C 276 212, 278 234, 282 254 C 286 278, 274 302, 252 318 C 238 328, 224 336, 210 338 C 206 328, 204 314, 204 296 C 204 282, 202 276, 200 276 C 198 276, 196 282, 196 296 C 196 314, 194 328, 190 338 C 176 336, 162 328, 148 318 C 126 302, 114 278, 118 254 C 122 234, 124 212, 120 190 Z";

  const hairCap = "M 124 176 C 132 130, 166 96, 200 96 C 234 96, 268 130, 276 176 C 258 162, 236 154, 200 154 C 164 154, 142 162, 124 176 Z";

  const fringe = "M 150 148 C 162 130, 180 120, 200 120 C 220 120, 238 130, 250 148 C 238 142, 224 138, 210 138 C 196 138, 182 142, 168 148 C 162 150, 156 150, 150 148 Z";

  const sideLocks = "";

  const glasses = unit(12) > 0.5
    ? `<rect x='${200 - eyeOffset - 11}' y='${eyeY - 7}' width='20' height='13' rx='6' stroke='${outline}' stroke-width='1.4' fill='none'/>
  <rect x='${200 + eyeOffset - 9}' y='${eyeY - 7}' width='20' height='13' rx='6' stroke='${outline}' stroke-width='1.4' fill='none'/>
  <path d='M 198 ${eyeY - 1} H 202' stroke='${outline}' stroke-width='1.3'/>`
    : "";

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' role='img' aria-label='${escapeXml(displayName)}'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${bgA}'/>
      <stop offset='100%' stop-color='${bgB}'/>
    </linearGradient>
    <radialGradient id='halo' cx='22%' cy='12%' r='74%'>
      <stop offset='0%' stop-color='rgba(248,252,255,0.25)'/>
      <stop offset='100%' stop-color='rgba(255,255,255,0)'/>
    </radialGradient>
  </defs>
  <rect width='400' height='400' fill='url(#bg)'/>
  <rect width='400' height='400' fill='url(#halo)'/>

  <ellipse cx='200' cy='366' rx='132' ry='80' fill='hsl(${shirtHue}, 28%, 33%)' opacity='0.96'/>
  <path d='M 142 320 Q 200 282 258 320' stroke='rgba(232,243,255,0.28)' stroke-width='4' fill='none' stroke-linecap='round'/>

  <path d='${hairShell}' fill='${hair}'/>
  <ellipse cx='200' cy='194' rx='${faceRx}' ry='${faceRy}' fill='${skin}'/>
  <path d='${hairCap}' fill='${hair}'/>
  <path d='M 162 126 C 176 114, 224 114, 238 126 C 226 120, 214 118, 200 118 C 186 118, 174 120, 162 126 Z' fill='rgba(255,255,255,0.16)'/>
  <path d='${fringe}' fill='${hair}'/>
  ${sideLocks}

  <path d='M ${200 - eyeOffset - 11} 175 Q ${200 - eyeOffset} 170 ${200 - eyeOffset + 11} 175' stroke='${outline}' stroke-width='1.8' fill='none' stroke-linecap='round'/>
  <path d='M ${200 + eyeOffset - 11} 175 Q ${200 + eyeOffset} 170 ${200 + eyeOffset + 11} 175' stroke='${outline}' stroke-width='1.8' fill='none' stroke-linecap='round'/>

  <ellipse cx='${200 - eyeOffset}' cy='${eyeY}' rx='4.8' ry='5.2' fill='${outline}'/>
  <ellipse cx='${200 + eyeOffset}' cy='${eyeY}' rx='4.8' ry='5.2' fill='${outline}'/>
  <circle cx='${200 - eyeOffset - 1}' cy='${eyeY - 1}' r='1.1' fill='rgba(255,255,255,0.52)'/>
  <circle cx='${200 + eyeOffset - 1}' cy='${eyeY - 1}' r='1.1' fill='rgba(255,255,255,0.52)'/>
  ${glasses}

  <path d='M 200 199 C 198 206, 198 212, 200 215' stroke='#9e765f' stroke-width='1.6' fill='none' stroke-linecap='round'/>
  <path d='M 182 ${mouthY} Q 200 ${mouthY + mouthCurve} 218 ${mouthY}' stroke='#7f5d67' stroke-width='2.1' fill='none' stroke-linecap='round'/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const buildFallbackAvatar = (displayName: string, memberType: MemberKind, gender: AvatarGender = "neutral") => {
  const unit = seeded(`${displayName}|${memberType}|${gender}`);
  if (gender === "feminine") {
    return buildFeminineAvatar(displayName, memberType, unit);
  }
  return buildMasculineAvatar(displayName, memberType, unit);
};
