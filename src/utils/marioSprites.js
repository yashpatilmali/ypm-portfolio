export const PALETTE = {
  transparent: 'rgba(0,0,0,0)',
  red: '#E52521',
  darkRed: '#9B0000',
  blue: '#0048DE',
  darkBlue: '#002580',
  skin: '#FCD8A8',
  brown: '#552300',
  darkBrown: '#381200',
  white: '#FFFFFF',
  gold: '#FCD116',
  orange: '#E45C10',
  sky: '#5C94FC',
  pipeGreen: '#00A800',
  pipeLight: '#70D000',
  pipeDark: '#006400',
  brickColor: '#B84418',
  brickLine: '#000000',
  black: '#000000',
};

// 16x16 Mario Idle Sprite (Authentic Nintendo Super Mario)
export const MARIO_IDLE_PIXELS = [
  ".....RRRRR......",
  "....RRRRRRRRR...",
  "....BBBSS.BS....",
  "...BSBSSSBSSS...",
  "...BSBSSSBSSS...",
  "...BBSSBBBB.....",
  ".....SSSSSS.....",
  "...RRRUUURRR....",
  "..RRRRUUURRRR...",
  "..RR.UYUYU.RR...",
  ".WW..UUUUU..WW..",
  ".WWW.UUUUU.WWW..",
  "..W.UUUUUUU.W...",
  "....UUU.UUU.....",
  "...BBB...BBB....",
  "..BBBB...BBBB...",
];

// 16x16 Mario Run Frame 1 (Authentic Nintendo Super Mario)
export const MARIO_RUN1_PIXELS = [
  ".....RRRRR......",
  "....RRRRRRRRR...",
  "....BBBSS.BS....",
  "...BSBSSSBSSS...",
  "...BSBSSSBSSS...",
  "...BBSSBBBB.....",
  ".....SSSSSS.....",
  "...RRRUUURRR....",
  "..RRRRUUURRRR...",
  "..RR.UYUYU.RR...",
  ".WW..UUUUU......",
  ".WWW.UUUUU......",
  "....UUUUUU......",
  "....UU...UU.....",
  "...BBB....BBB...",
  "..BBBB....BBBB..",
];

// 16x16 Mario Run Frame 2 (Authentic Nintendo Super Mario)
export const MARIO_RUN2_PIXELS = [
  ".....RRRRR......",
  "....RRRRRRRRR...",
  "....BBBSS.BS....",
  "...BSBSSSBSSS...",
  "...BSBSSSBSSS...",
  "...BBSSBBBB.....",
  ".....SSSSSS.....",
  ".....RUUURRR....",
  "...RRRUUURRRR...",
  "..RR.UYUYU.RR...",
  ".....UUUUU..WW..",
  ".....UUUUU.WWW..",
  "....UUUUUUU.....",
  "...UU.....UU....",
  "..BBB......BBB..",
  ".BBBB......BBBB.",
];

// 16x16 Mario Jump (Authentic Nintendo Super Mario)
export const MARIO_JUMP_PIXELS = [
  ".....RRRRR..WW..",
  "....RRRRRRRRWWW.",
  "....BBBSS.BSRR..",
  "...BSBSSSBSSRR..",
  "...BSBSSSBSSS...",
  "...BBSSBBBB.....",
  ".....SSSSSS.....",
  ".WW.RRRUUURRR...",
  ".WWWRRRUUURRR...",
  "..W.R.UYUYU.R...",
  ".....UUUUUUU....",
  "....UUUUUUUU....",
  "...UUU....UUU...",
  "..BBB......BBB..",
  ".BBBB......BBBB.",
  "................",
];

// 16x16 Question Block
export const QUESTION_BLOCK_PIXELS = [
  "GGGGGGGGGGGGGGGG",
  "GYYYYYYYYYYYYYYD",
  "GYDDDDDDDDDDDDYD",
  "GYD...GGGG...DYD",
  "GYD..GG..GG..DYD",
  "GYD......GG..DYD",
  "GYD....GGG...DYD",
  "GYD...GGG....DYD",
  "GYD...GGG....DYD",
  "GYD..........DYD",
  "GYD...GGG....DYD",
  "GYD...GGG....DYD",
  "GYD..........DYD",
  "GYDDDDDDDDDDDDYD",
  "GYYYYYYYYYYYYYYD",
  "DDDDDDDDDDDDDDDD",
];

// 16x16 Empty / Used Block
export const EMPTY_BLOCK_PIXELS = [
  "GGGGGGGGGGGGGGGG",
  "GBBBBBBBBBBBBBBD",
  "GBDDDDDDDDDDDDYD",
  "GBD..........DYD",
  "GBD.D......D.DYD",
  "GBD..D....D..DYD",
  "GBD...D..D...DYD",
  "GBD....DD....DYD",
  "GBD....DD....DYD",
  "GBD...D..D...DYD",
  "GBD..D....D..DYD",
  "GBD.D......D.DYD",
  "GBD..........DYD",
  "GBDDDDDDDDDDDDYD",
  "GBBBBBBBBBBBBBBD",
  "DDDDDDDDDDDDDDDD",
];

export function drawPixelSprite(ctx, pixels, x, y, size = 32, flip = false) {
  const pixelSize = size / 16;
  const colorMap = {
    'R': PALETTE.red,
    'B': PALETTE.brown,
    'S': PALETTE.skin,
    'Y': PALETTE.gold,
    'U': PALETTE.blue,
    'G': PALETTE.gold,
    'D': PALETTE.darkBrown,
    'W': PALETTE.white,
  };

  ctx.save();
  if (flip) {
    ctx.translate(x + size, y);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(x, y);
  }

  for (let r = 0; r < 16; r++) {
    const row = pixels[r];
    if (!row) continue;
    for (let c = 0; c < 16; c++) {
      const char = row[c];
      if (char && char !== '.' && colorMap[char]) {
        ctx.fillStyle = colorMap[char];
        ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  ctx.restore();
}
