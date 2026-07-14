import React, { useEffect, useRef, useState } from "react";
import {
  playCoinSound,
  playJumpSound,
  playPowerupSound,
  playStompSound,
  playWinSound,
} from "../utils/audio";
import { translations } from "../utils/i18n";
import type { Language } from "../utils/i18n";

// Pixel Art Sprites represented as grids of colors
const COLOR_MAP: Record<string, string> = {
  ".": "transparent",
  R: "#e52521", // Mario Red
  B: "#0038c0", // Mario Blue
  S: "#fcc0a0", // Skin Peach
  K: "#000000", // Black
  W: "#ffffff", // White
  Y: "#fbd000", // Yellow
  O: "#d86000", // Orange / Dark Gold
  G: "#00a000", // Green
  p: "#00c000", // Light green
  P: "#007000", // Dark green
  D: "#904000", // Dirt Brown
  d: "#c06000", // Light Dirt Brown
  U: "#502000", // Dark Dirt Shadow
  M: "#b04000", // Goomba Brown
  m: "#e09040", // Goomba Light Brown
  E: "#707070", // Grey
  C: "#b0b0b0", // Light grey
  b: "#002080", // Blue maze wall
};

const SPRITES = {
  mario_idle: [
    "....RRRRR.......",
    "....RRRRRRRRR...",
    "....KKKSSKS.....",
    "...KSSKSSKSSS...",
    "...KSSKKSSKSSS..",
    "...KKSSKKKSSK...",
    ".....SSSSSSS....",
    "....RRBBRRBR....",
    "...RRRBBBRRBB...",
    "..RRRRBBBBBBBB..",
    "..SSRBBYBBYRSS..",
    "..SSSRRRRRRRSS..",
    "..SSRRRRRRRRSS..",
    "....RRR..RRR....",
    "...KKK....KKK...",
    "..KKKK....KKKK..",
  ],
  mario_walk1: [
    "....RRRRR.......",
    "....RRRRRRRRR...",
    "....KKKSSKS.....",
    "...KSSKSSKSSS...",
    "...KSSKKSSKSSS..",
    "...KKSSKKKSSK...",
    ".....SSSSSSS....",
    ".....RBBRRBR....",
    "....RRRBBBRRBB..",
    "...RRRRBBBBBBBB.",
    "...SSRBBYBBYRSS.",
    "...SSSRRRRRRRSS.",
    "....SRRRRRRRSS..",
    ".....RRR..RRR...",
    "....KKK....KKK..",
    "...KKKK.........",
  ],
  mario_walk2: [
    "....RRRRR.......",
    "....RRRRRRRRR...",
    "....KKKSSKS.....",
    "...KSSKSSKSSS...",
    "...KSSKKSSKSSS..",
    "...KKSSKKKSSK...",
    ".....SSSSSSS....",
    "....RRBBRRBR....",
    "...RRRBBBRRBB...",
    "..RRRRBBBBBBBB..",
    "..SSRBBYBBYRSS..",
    "..SSSRRRRRRRSS..",
    "...SSRRRRRRRSS..",
    "....RRR....RRR..",
    "....KK.......KK.",
    "....KKK......KK.",
  ],
  mario_jump: [
    "....RRRRR.......",
    "....RRRRRRRRR...",
    "....KKKSSKS.....",
    "...KSSKSSKSSS...",
    "...KSSKKSSKSSS..",
    "...KKSSKKKSSK...",
    ".....SSSSSSS....",
    "....RRBBRRBR....",
    "...RRRBBBRRBB...",
    "..RRRRBBBBBBBB..",
    "..SSRBBYBBYRSS..",
    "..SSSRRRRRRRSS..",
    "..SSRRRRRRRRSS..",
    "....RR.....RR...",
    "...KKK.....KK...",
    "..KKKK....KKK...",
  ],
  mario_big_idle: [
    ".....RRRRRRR....",
    "....RRRRRRRRRR..",
    "....KKKSSKSS....",
    "...KSSKSSKSSS...",
    "...KSSKKSSKSSS..",
    "...KKSSKKKSSK...",
    ".....SSSSSSS....",
    "....RRBBRRBB....",
    "...RRRBBBRRBBB..",
    "..RRRRBBBBBBBBB.",
    "..SSRBBYBBYYBSS.",
    "..SSSRRRRRRRRSS.",
    "..SSRRRRRRRRRSS.",
    "..SSRRRRRRRRRSS.",
    "....RRRR..RRRR..",
    "....KKK....KKK..",
    "...KKKK....KKKK.",
    "..KKKKK....KKKKK",
  ],
  block_empty: [
    "KKKKKKKKKKKKKKKK",
    "KEEEEEEEEEEEEEKK",
    "KECCCCCCCCCCCCKK",
    "KECKKKKKKKKKCCKK",
    "KECKEEEEEEKCCKK",
    "KECKECCCCEKCCKK",
    "KECKECCCCEKCCKK",
    "KECKECCCCEKCCKK",
    "KECKECCCCEKCCKK",
    "KECKECCCCEKCCKK",
    "KECKECCCCEKCCKK",
    "KECKEEEEEEKCCKK",
    "KECKKKKKKKKKCCKK",
    "KECCCCCCCCCCCCKK",
    "KEEEEEEEEEEEEEKK",
    "KKKKKKKKKKKKKKKK",
  ],
  block_q: [
    "KKKKKKKKKKKKKKKK",
    "KYYYYYYYYYYYYYOK",
    "KYWWWWWWWWWWWOOK",
    "KYWKKKKKKKKKWOOK",
    "KYWKYYYYYYKWUUBK",
    "KYWKYWWWWYKWUUBK",
    "KYWKYWKKWYKWUUBK",
    "KYWKYYYKKWKWUUBK",
    "KYWKYWWKKWKWUUBK",
    "KYWKYWKKKWKWUUBK",
    "KYWKYYYYYKWUUBK",
    "KYWKYWWWWYKWUUBK",
    "KYWKKKKKKKKWUBBK",
    "KYWOOOOOOOOOOBBK",
    "KOOOOOOOOOOOOBBK",
    "KKKKKKKKKKKKKKKK",
  ],
  block_brick: [
    "KKKKKKKKKKKKKKKK",
    "KDDDDDKDDDDDDDKK",
    "KdddddKdddddddKK",
    "KKKKKKKKKKKKKKKK",
    "KDDDKDDDDDKDDDKK",
    "KdddKdddddKdddKK",
    "KKKKKKKKKKKKKKKK",
    "KDDDDDKDDDDDDDKK",
    "KdddddKdddddddKK",
    "KKKKKKKKKKKKKKKK",
    "KDDDKDDDDDKDDDKK",
    "KdddKdddddKdddKK",
    "KKKKKKKKKKKKKKKK",
  ],
  coin: [
    "......KKKK......",
    "....KYYYYYYK....",
    "...KYWYYYYWOK...",
    "..KYWYYYYWWUOK..",
    "..KYWYYYYWWUOK..",
    "..KYWYYYYWWUOK..",
    "..KYWYYYYWWUOK..",
    "...KYYYYYYOK....",
    ".....KKKKKK.....",
  ],
  mushroom: [
    "......RRRR......",
    "....RRWWRRWR....",
    "...RWWWWWRWWR...",
    "..RWWWRWWWWWRR..",
    "..RRRRRRRRRRRR..",
    "...KKSSKKSSKK...",
    "...KSSKKSSKSS...",
    "....SSSSSSSS....",
    ".....KSSKSS.....",
    "......KKKK......",
  ],
  goomba: [
    "......MMMM......",
    "....MMMMMMMM....",
    "...MMWMMMMWMM...",
    "..MMMWMMMMWMMM..",
    "..MMMMMMMMMMMM..",
    "..MMKMMMMMMKMM..",
    "...MKKKKKKKKM...",
    "....mmmmmmmm....",
    ".....KK..KK.....",
    "....KKK..KKK....",
  ],
};

// Draw sprite helper
function drawSprite(
  ctx: CanvasRenderingContext2D,
  spriteName: keyof typeof SPRITES,
  x: number,
  y: number,
  width: number,
  height: number,
  flipX = false,
) {
  const sprite = SPRITES[spriteName];
  if (!sprite) return;
  const rows = sprite.length;
  const cols = sprite[0].length;
  const pixelW = width / cols;
  const pixelH = height / rows;

  ctx.save();
  if (flipX) {
    ctx.translate(x + width, y);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(x, y);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = sprite[r][c];
      if (char !== "." && COLOR_MAP[char]) {
        ctx.fillStyle = COLOR_MAP[char];
        ctx.fillRect(
          Math.floor(c * pixelW),
          Math.floor(r * pixelH),
          Math.ceil(pixelW),
          Math.ceil(pixelH),
        );
      }
    }
  }
  ctx.restore();
}

interface Block {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "brick" | "q";
  empty: boolean;
  content: string;
  bounceOffset: number;
  bounceDir: number;
}

interface Enemy {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  dead: boolean;
  deadTimer: number;
  gridX?: number;
  gridY?: number;
  targetX?: number;
  targetY?: number;
  moveProgress?: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  vy: number;
  life: number;
}

interface Item {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  type: "mushroom" | "coin";
  active: boolean;
  bounceTimer: number;
}

interface Bomb {
  x: number; // grid x
  y: number; // grid y
  timer: number;
  exploded: boolean;
  flameTimer: number;
}

export const MarioGame: React.FC<{
  onSkillUnlocked?: (skill: string) => void;
  coinCount: number;
  setCoinCount: React.Dispatch<React.SetStateAction<number>>;
  lang: Language;
}> = ({ onSkillUnlocked, coinCount, setCoinCount, lang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedGame, setSelectedGame] = useState<"run" | "pacman" | "bomber">(
    "run",
  );
  const [gameState, setGameState] = useState<
    "idle" | "playing" | "gameover" | "victory"
  >("idle");
  const [score, setScore] = useState(0);

  const t = (key: keyof (typeof translations)["en"]) => {
    return translations[lang][key] || key;
  };

  const [activeMessage, setActiveMessage] = useState<string>("");

  // Input direction buffer for grid based movement
  const inputDir = useRef<"left" | "right" | "up" | "down" | null>(null);
  const currentDir = useRef<"left" | "right" | "up" | "down" | null>(null);

  // Key tracking
  const keys = useRef<Record<string, boolean>>({});

  // Game loop variables
  const player = useRef({
    x: 80,
    y: 180,
    vx: 0,
    vy: 0,
    w: 32,
    h: 32,
    grounded: false,
    wasGrounded: true,
    landingTimer: 0,
    facingLeft: false,
    walkFrame: 0,
    isBig: false,
    powerupTimer: 0,

    // Grid positioning parameters
    gridX: 1,
    gridY: 1,
    targetX: 1,
    targetY: 1,
    moveProgress: 0,
  });

  const levelWidth = 1600;
  const cameraX = useRef(0);
  const blocks = useRef<Block[]>([]);
  const enemies = useRef<Enemy[]>([]);
  const items = useRef<Item[]>([]);
  const texts = useRef<FloatingText[]>([]);

  // Bomberman specific variables
  const bombs = useRef<Bomb[]>([]);
  const bomberBricks = useRef<number[][]>([]); // grid maps for Bomber/Pacman

  const TILE_SIZE = 24;
  const GRID_COLS = 31;
  const GRID_ROWS = 10;
  const gridSpeed = 2; // Snappy yet easily controllable speed (divisible by TILE_SIZE 24)

  const skillList = [
    "ReactJS",
    "Next JS",
    "TypeScript",
    "React Native",
    "JavaScript",
    "HTML/CSS",
    "Firebase",
    "Git",
    "Microservices",
    "Public Speaking",
    "Teamwork",
    "Leadership",
    "Negotiation",
  ];

  // Initialize selected game
  const initLevel = () => {
    setGameState("playing");
    items.current = [];
    texts.current = [];
    bombs.current = [];
    setScore(0);
    inputDir.current = null;
    currentDir.current = null;

    const p = player.current;
    p.vx = 0;
    p.vy = 0;
    p.grounded = false;
    p.isBig = false;
    p.powerupTimer = 0;
    cameraX.current = 0;

    if (selectedGame === "run") {
      p.x = 80;
      p.y = 100;
      p.w = 32;
      p.h = 32;

      // Platformer blocks
      const tempBlocks: Block[] = [];
      let skillIndex = 0;
      const blockPositions = [
        { x: 220, y: 120, type: "q" as const },
        { x: 260, y: 120, type: "brick" as const },
        { x: 300, y: 120, type: "q" as const },
        { x: 340, y: 120, type: "brick" as const },
        { x: 380, y: 120, type: "q" as const },

        { x: 550, y: 100, type: "q" as const },
        { x: 590, y: 100, type: "q" as const },
        { x: 630, y: 100, type: "q" as const },

        { x: 800, y: 120, type: "brick" as const },
        { x: 840, y: 120, type: "q" as const },
        { x: 880, y: 120, type: "brick" as const },
        { x: 920, y: 120, type: "q" as const },

        { x: 1050, y: 100, type: "q" as const },
        { x: 1090, y: 100, type: "q" as const },
        { x: 1130, y: 100, type: "q" as const },
        { x: 1170, y: 100, type: "q" as const },
        { x: 1210, y: 100, type: "q" as const },
        { x: 1250, y: 100, type: "q" as const },
      ];

      blockPositions.forEach((pos, idx) => {
        let content = "coin";
        if (pos.type === "q" && skillIndex < skillList.length) {
          content = skillList[skillIndex];
          skillIndex++;
        }
        tempBlocks.push({
          id: idx,
          x: pos.x,
          y: pos.y,
          w: 32,
          h: 32,
          type: pos.type,
          empty: false,
          content: content,
          bounceOffset: 0,
          bounceDir: 0,
        });
      });
      blocks.current = tempBlocks;

      // Platformer enemies
      enemies.current = [
        {
          x: 450,
          y: 180,
          vx: -1.0,
          vy: 0,
          w: 28,
          h: 28,
          dead: false,
          deadTimer: 0,
        },
        {
          x: 720,
          y: 180,
          vx: -0.8,
          vy: 0,
          w: 28,
          h: 28,
          dead: false,
          deadTimer: 0,
        },
        {
          x: 950,
          y: 180,
          vx: -1.2,
          vy: 0,
          w: 28,
          h: 28,
          dead: false,
          deadTimer: 0,
        },
        {
          x: 1200,
          y: 180,
          vx: -0.9,
          vy: 0,
          w: 28,
          h: 28,
          dead: false,
          deadTimer: 0,
        },
      ];
      setActiveMessage(t("tickerWelcome"));
    } else if (selectedGame === "pacman") {
      p.gridX = 1;
      p.gridY = 1;
      p.targetX = 1;
      p.targetY = 1;
      p.x = 24;
      p.y = 24;
      p.moveProgress = 0;
      p.w = 20;
      p.h = 20;

      const maze: number[][] = [
        [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1,
        ],
        [
          1, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2,
          1, 2, 2, 2, 2, 2, 0, 1,
        ],
        [
          1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2,
          1, 2, 1, 1, 1, 1, 2, 1,
        ],
        [
          1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 1, 1, 1, 1, 2, 1,
        ],
        [
          1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2,
          1, 2, 2, 2, 2, 2, 2, 1,
        ],
        [
          1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2,
          1, 2, 1, 1, 1, 1, 2, 1,
        ],
        [
          1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2,
          2, 2, 1, 1, 1, 1, 2, 1,
        ],
        [
          1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          1, 2, 1, 1, 1, 1, 2, 1,
        ],
        [
          1, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
          2, 2, 2, 2, 2, 2, 0, 1,
        ],
        [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1,
        ],
      ];
      bomberBricks.current = maze;

      // Pacman Goomba ghosts with smooth grid coordinate properties
      enemies.current = [
        {
          x: 15 * 24,
          y: 4 * 24,
          vx: 0,
          vy: 0,
          w: 20,
          h: 20,
          dead: false,
          deadTimer: 0,
          gridX: 15,
          gridY: 4,
          targetX: 15,
          targetY: 4,
          moveProgress: 0,
        },
        {
          x: 10 * 24,
          y: 5 * 24,
          vx: 0,
          vy: 0,
          w: 20,
          h: 20,
          dead: false,
          deadTimer: 0,
          gridX: 10,
          gridY: 5,
          targetX: 10,
          targetY: 5,
          moveProgress: 0,
        },
        {
          x: 20 * 24,
          y: 5 * 24,
          vx: 0,
          vy: 0,
          w: 20,
          h: 20,
          dead: false,
          deadTimer: 0,
          gridX: 20,
          gridY: 5,
          targetX: 20,
          targetY: 5,
          moveProgress: 0,
        },
      ];
      setActiveMessage(t("tickerPacWelcome"));
    } else if (selectedGame === "bomber") {
      p.gridX = 1;
      p.gridY = 1;
      p.targetX = 1;
      p.targetY = 1;
      p.x = 24;
      p.y = 24;
      p.moveProgress = 0;
      p.w = 20;
      p.h = 20;

      // Bomberman Grid: (1 = solid metal wall, 2 = breakable brick, 0 = walkway)
      const arena: number[][] = [
        [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1,
        ],
        [
          1, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2,
          1, 0, 2, 2, 2, 2, 0, 1,
        ],
        [
          1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1,
          1, 1, 2, 1, 2, 1, 2, 1,
        ],
        [
          1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 2, 1,
        ],
        [
          1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 1, 2, 1, 2, 1, 2, 1,
          2, 1, 2, 1, 2, 1, 2, 1,
        ],
        [
          1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 2, 1,
        ],
        [
          1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1,
          2, 1, 2, 1, 2, 1, 2, 1,
        ],
        [
          1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 2, 1,
        ],
        [
          1, 0, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2,
          1, 2, 2, 2, 2, 2, 9, 1,
        ], // 9 = portal exit
        [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1,
        ],
      ];
      bomberBricks.current = arena;

      // Bomber Goombas with smooth grid path movement on walkways
      enemies.current = [
        {
          x: 15 * 24,
          y: 4 * 24,
          vx: 0,
          vy: 0,
          w: 20,
          h: 20,
          dead: false,
          deadTimer: 0,
          gridX: 15,
          gridY: 4,
          targetX: 15,
          targetY: 4,
          moveProgress: 0,
        },
        {
          x: 15 * 24,
          y: 5 * 24,
          vx: 0,
          vy: 0,
          w: 20,
          h: 20,
          dead: false,
          deadTimer: 0,
          gridX: 15,
          gridY: 5,
          targetX: 15,
          targetY: 5,
          moveProgress: 0,
        },
        {
          x: 24 * 24,
          y: 1 * 24,
          vx: 0,
          vy: 0,
          w: 20,
          h: 20,
          dead: false,
          deadTimer: 0,
          gridX: 24,
          gridY: 1,
          targetX: 24,
          targetY: 1,
          moveProgress: 0,
        },
      ];
      setActiveMessage(t("tickerBomberWelcome"));
    }
  };

  useEffect(() => {
    initLevel();
  }, [selectedGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
      keys.current[e.code] = true;

      // Buffer the directional input at all times
      if (
        ["ArrowLeft", "KeyA"].includes(e.code) ||
        ["ArrowLeft", "a", "A"].includes(e.key)
      )
        inputDir.current = "left";
      if (
        ["ArrowRight", "KeyD"].includes(e.code) ||
        ["ArrowRight", "d", "D"].includes(e.key)
      )
        inputDir.current = "right";
      if (
        ["ArrowUp", "KeyW"].includes(e.code) ||
        ["ArrowUp", "w", "W"].includes(e.key)
      )
        inputDir.current = "up";
      if (
        ["ArrowDown", "KeyS"].includes(e.code) ||
        ["ArrowDown", "s", "S"].includes(e.key)
      )
        inputDir.current = "down";

      if ((e.code === "Space" || e.key === " ") && selectedGame === "bomber") {
        handleJump();
      }

      if (
        ["ArrowUp", "Space", "KeyW", "ArrowDown", "KeyS"].includes(e.code) ||
        ["ArrowUp", "ArrowDown", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
      keys.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedGame, gameState]);

  // Screen controller buttons actions (snaps direction buffer instantly)
  const handleMoveLeft = (start: boolean) => {
    if (start) inputDir.current = "left";
    keys.current["ArrowLeft"] = start;
    keys.current["KeyA"] = start;
  };

  const handleMoveRight = (start: boolean) => {
    if (start) inputDir.current = "right";
    keys.current["ArrowRight"] = start;
    keys.current["KeyD"] = start;
  };

  const handleMoveUp = (start: boolean) => {
    if (start) inputDir.current = "up";
    keys.current["ArrowUp"] = start;
    keys.current["KeyW"] = start;
  };

  const handleMoveDown = (start: boolean) => {
    if (start) inputDir.current = "down";
    keys.current["ArrowDown"] = start;
    keys.current["KeyS"] = start;
  };

  const handleJump = () => {
    if (selectedGame === "run") {
      if (player.current.grounded) {
        player.current.vy = -10.5;
        player.current.grounded = false;
        playJumpSound();
      }
    } else if (selectedGame === "bomber" && gameState === "playing") {
      const p = player.current;
      const bombX = p.gridX;
      const bombY = p.gridY;

      const exists = bombs.current.some((b) => b.x === bombX && b.y === bombY);
      if (!exists) {
        playStompSound();
        bombs.current.push({
          x: bombX,
          y: bombY,
          timer: 90,
          exploded: false,
          flameTimer: 0,
        });
        setActiveMessage(t("tickerDropBomb"));
      }
    }
  };

  // Main tick game loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const update = () => {
      if (gameState !== "playing") return;

      const p = player.current;
      const currentGrid = bomberBricks.current;

      // ----------------------------------------------------
      // GAME 1: PLATFORMER MARIO RUN LOOP
      // ----------------------------------------------------
      if (selectedGame === "run") {
        const gravity = 0.5;
        const friction = 0.85;
        const moveSpeed = 0.5;
        const maxSpeed = 4.5;

        if (keys.current["ArrowLeft"] || keys.current["KeyA"]) {
          if (p.vx > -maxSpeed) p.vx -= moveSpeed;
          p.facingLeft = true;
        } else if (keys.current["ArrowRight"] || keys.current["KeyD"]) {
          if (p.vx < maxSpeed) p.vx += moveSpeed;
          p.facingLeft = false;
        } else {
          p.vx *= friction;
        }

        if (
          (keys.current["ArrowUp"] ||
            keys.current["Space"] ||
            keys.current["KeyW"]) &&
          p.grounded
        ) {
          p.vy = -10.5;
          p.grounded = false;
          playJumpSound();
          keys.current["Space"] = false;
          keys.current["ArrowUp"] = false;
          keys.current["KeyW"] = false;
        }

        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;

        const groundY = 200 - p.h;
        if (p.y >= groundY) {
          p.y = groundY;
          p.vy = 0;
          p.grounded = true;
        }

        if (p.x < 0) {
          p.x = 0;
          p.vx = 0;
        }

        if (p.x > levelWidth - 60) {
          p.x = levelWidth - 60;
          p.vx = 0;
          setGameState("victory");
          playWinSound();
          setActiveMessage(t("tickerVictory"));
        }

        const targetCamX = p.x - canvas.width / 2 + 50;
        cameraX.current += (targetCamX - cameraX.current) * 0.1;
        cameraX.current = Math.max(
          0,
          Math.min(cameraX.current, levelWidth - canvas.width),
        );

        // Blocks collisions
        blocks.current.forEach((b) => {
          if (b.bounceDir !== 0) {
            b.bounceOffset += b.bounceDir * 2;
            if (Math.abs(b.bounceOffset) >= 8) {
              b.bounceDir = 1;
            }
            if (b.bounceOffset >= 0) {
              b.bounceOffset = 0;
              b.bounceDir = 0;
            }
          }

          if (
            p.x + p.w > b.x &&
            p.x < b.x + b.w &&
            p.y < b.y + b.h &&
            p.y + p.h > b.y
          ) {
            const overlapX = Math.min(p.x + p.w - b.x, b.x + b.w - p.x);
            const overlapY = Math.min(p.y + p.h - b.y, b.y + b.h - p.y);

            if (overlapY < overlapX) {
              if (p.vy < 0 && p.y + 4 >= b.y + b.h - 8) {
                p.vy = 0;
                p.y = b.y + b.h;

                if (!b.empty) {
                  b.bounceDir = -1;
                  b.empty = true;

                  if (b.content === "coin") {
                    playCoinSound();
                    setScore((prev) => prev + 100);
                    setCoinCount((prev) => prev + 1);
                    items.current.push({
                      x: b.x + 8,
                      y: b.y - 24,
                      vx: 0,
                      vy: -4,
                      w: 16,
                      h: 18,
                      type: "coin",
                      active: true,
                      bounceTimer: 15,
                    });
                  } else {
                    playPowerupSound();
                    setScore((prev) => prev + 500);
                    items.current.push({
                      x: b.x + 8,
                      y: b.y - 32,
                      vx: 1.2,
                      vy: -3,
                      w: 24,
                      h: 24,
                      type: "mushroom",
                      active: true,
                      bounceTimer: 0,
                    });
                    setActiveMessage(
                      `${t("tickerRevealSkill")}${b.content.toUpperCase()}${t("tickerRevealSkillEnd")}`,
                    );
                    if (onSkillUnlocked) {
                      onSkillUnlocked(b.content);
                    }
                  }
                }
              } else if (p.vy > 0 && p.y + p.h - 8 <= b.y) {
                p.vy = 0;
                p.y = b.y - p.h;
                p.grounded = true;
              }
            } else {
              if (p.x + p.w / 2 < b.x + b.w / 2) {
                p.x = b.x - p.w;
                p.vx = 0;
              } else {
                p.x = b.x + b.w;
                p.vx = 0;
              }
            }
          }
        });

        // Items update
        items.current.forEach((it) => {
          if (!it.active) return;
          if (it.type === "coin") {
            it.y += it.vy;
            it.vy += 0.2;
            it.bounceTimer--;
            if (it.bounceTimer <= 0) it.active = false;
          } else if (it.type === "mushroom") {
            it.vy += gravity;
            it.x += it.vx;
            it.y += it.vy;

            if (it.y >= 200 - it.h) {
              it.y = 200 - it.h;
              it.vy = 0;
            }

            blocks.current.forEach((b) => {
              if (
                it.x + it.w > b.x &&
                it.x < b.x + b.w &&
                it.y < b.y + b.h &&
                it.y + it.h > b.y
              ) {
                it.vx = -it.vx;
                if (it.vx > 0) it.x = b.x + b.w;
                else it.x = b.x - it.w;
              }
            });

            if (
              p.x + p.w > it.x &&
              p.x < it.x + it.w &&
              p.y < it.y + it.h &&
              p.y + p.h > it.y
            ) {
              it.active = false;
              p.isBig = true;
              p.powerupTimer = 120;
              setScore((prev) => prev + 1000);
              setCoinCount((prev) => prev + 5);
              playPowerupSound();
              texts.current.push({
                x: it.x,
                y: it.y - 10,
                text: "1000 XP!",
                vy: -1.5,
                life: 40,
              });
            }
          }
        });

        // Platformer Goombas update
        enemies.current.forEach((en) => {
          if (en.dead) {
            en.deadTimer--;
            return;
          }
          en.x += en.vx;
          en.y = 200 - en.h;

          blocks.current.forEach((b) => {
            if (
              en.x + en.w > b.x &&
              en.x < b.x + b.w &&
              en.y < b.y + b.h &&
              en.y + en.h > b.y
            ) {
              en.vx = -en.vx;
              en.x += en.vx;
            }
          });

          if (
            p.x + p.w > en.x &&
            p.x < en.x + en.w &&
            p.y < en.y + en.h &&
            p.y + p.h > en.y
          ) {
            if (p.vy > 0 && p.y + p.h - 12 <= en.y) {
              en.dead = true;
              en.deadTimer = 30;
              p.vy = -6.5;
              playStompSound();
              setScore((prev) => prev + 200);
              texts.current.push({
                x: en.x,
                y: en.y - 10,
                text: "200 XP!",
                vy: -1,
                life: 30,
              });
              setActiveMessage(t("tickerStomp"));
            } else {
              if (p.powerupTimer <= 0) {
                if (p.isBig) {
                  p.isBig = false;
                  p.powerupTimer = 90;
                  playStompSound();
                  setActiveMessage(t("tickerOuch"));
                } else {
                  initLevel();
                  setActiveMessage(t("tickerGameOver"));
                }
              }
            }
          }
        });
      }

      // ----------------------------------------------------
      // GAME 2 & 3: GRID BASED (PACMAN & BOMBERMAN)
      // ----------------------------------------------------
      else {
        // Smooth player grid movement
        if (p.moveProgress > 0) {
          p.moveProgress -= gridSpeed;

          const srcX = p.gridX * TILE_SIZE;
          const srcY = p.gridY * TILE_SIZE;
          const dstX = p.targetX * TILE_SIZE;
          const dstY = p.targetY * TILE_SIZE;
          const tVal = (TILE_SIZE - p.moveProgress) / TILE_SIZE;

          p.x = srcX + (dstX - srcX) * tVal;
          p.y = srcY + (dstY - srcY) * tVal;

          if (p.moveProgress <= 0) {
            p.gridX = p.targetX;
            p.gridY = p.targetY;
            p.x = p.gridX * TILE_SIZE;
            p.y = p.gridY * TILE_SIZE;
          }
        }

        // Logical tile boundary check
        if (p.moveProgress <= 0) {
          // Resolve current keyboard held keys
          let activeKeyDir: "left" | "right" | "up" | "down" | null = null;
          if (
            keys.current["ArrowLeft"] ||
            keys.current["KeyA"] ||
            keys.current["left"]
          )
            activeKeyDir = "left";
          else if (
            keys.current["ArrowRight"] ||
            keys.current["KeyD"] ||
            keys.current["right"]
          )
            activeKeyDir = "right";
          else if (
            keys.current["ArrowUp"] ||
            keys.current["KeyW"] ||
            keys.current["up"]
          )
            activeKeyDir = "up";
          else if (
            keys.current["ArrowDown"] ||
            keys.current["KeyS"] ||
            keys.current["down"]
          )
            activeKeyDir = "down";

          inputDir.current = activeKeyDir;

          if (!activeKeyDir) {
            // Stop immediately if no direction keys are held
            currentDir.current = null;
          } else {
            // Check if the currently held direction key is passable
            let desiredGX = p.gridX;
            let desiredGY = p.gridY;
            if (activeKeyDir === "left") desiredGX--;
            if (activeKeyDir === "right") desiredGX++;
            if (activeKeyDir === "up") desiredGY--;
            if (activeKeyDir === "down") desiredGY++;

            const tile = currentGrid[desiredGY]?.[desiredGX];
            const isBombOnTile = bombs.current.some(
              (b) => b.x === desiredGX && b.y === desiredGY,
            );

            if (
              tile !== undefined &&
              tile !== 1 &&
              (selectedGame === "pacman" || tile !== 2) &&
              !isBombOnTile
            ) {
              currentDir.current = activeKeyDir;
            } else {
              // The held key direction is blocked. Check if we can keep going in our current direction
              let currentGX = p.gridX;
              let currentGY = p.gridY;
              if (currentDir.current === "left") currentGX--;
              if (currentDir.current === "right") currentGX++;
              if (currentDir.current === "up") currentGY--;
              if (currentDir.current === "down") currentGY++;

              const currentTile = currentGrid[currentGY]?.[currentGX];
              const isCurrentBomb = bombs.current.some(
                (b) => b.x === currentGX && b.y === currentGY,
              );
              const isHoldingCurrentKey =
                (currentDir.current === "left" &&
                  (keys.current["ArrowLeft"] ||
                    keys.current["KeyA"] ||
                    keys.current["left"])) ||
                (currentDir.current === "right" &&
                  (keys.current["ArrowRight"] ||
                    keys.current["KeyD"] ||
                    keys.current["right"])) ||
                (currentDir.current === "up" &&
                  (keys.current["ArrowUp"] ||
                    keys.current["KeyW"] ||
                    keys.current["up"])) ||
                (currentDir.current === "down" &&
                  (keys.current["ArrowDown"] ||
                    keys.current["KeyS"] ||
                    keys.current["down"]));

              if (
                isHoldingCurrentKey &&
                currentTile !== undefined &&
                currentTile !== 1 &&
                (selectedGame === "pacman" || currentTile !== 2) &&
                !isCurrentBomb
              ) {
                // Keep moving in currentDir
              } else {
                currentDir.current = null;
              }
            }
          }

          // Move player grid coordinates if a direction is set
          let nextGX = p.gridX;
          let nextGY = p.gridY;

          if (currentDir.current) {
            if (currentDir.current === "left") {
              nextGX--;
              p.facingLeft = true;
            } else if (currentDir.current === "right") {
              nextGX++;
              p.facingLeft = false;
            } else if (currentDir.current === "up") nextGY--;
            else if (currentDir.current === "down") nextGY++;

            const tile = currentGrid[nextGY]?.[nextGX];
            const isBombOnTile = bombs.current.some(
              (b) => b.x === nextGX && b.y === nextGY,
            );

            if (
              tile !== undefined &&
              tile !== 1 &&
              (selectedGame === "pacman" || tile !== 2) &&
              !isBombOnTile
            ) {
              p.targetX = nextGX;
              p.targetY = nextGY;
              p.moveProgress = TILE_SIZE;
            } else {
              currentDir.current = null;
            }
          }
        }

        // Pacman dot collection check
        if (selectedGame === "pacman") {
          if (currentGrid[p.gridY]?.[p.gridX] === 2) {
            currentGrid[p.gridY][p.gridX] = 0;
            playCoinSound();
            setScore((prev) => prev + 50);
            setCoinCount((prev) => prev + 1);

            let dotRemaining = false;
            for (let r = 0; r < GRID_ROWS; r++) {
              for (let c = 0; c < GRID_COLS; c++) {
                if (currentGrid[r][c] === 2) dotRemaining = true;
              }
            }
            if (!dotRemaining) {
              setGameState("victory");
              playWinSound();
              setActiveMessage(t("tickerPacWin"));
            }
          }
        }

        // Bomberman Portal entrance check
        if (selectedGame === "bomber") {
          if (currentGrid[p.gridY]?.[p.gridX] === 9) {
            setGameState("victory");
            playWinSound();
            setActiveMessage(t("tickerBomberWin"));
          }
        }

        // Goomba ghost/monster grid movement
        enemies.current.forEach((en) => {
          if (en.dead) return;

          // Smooth grid-based movement for monsters
          if (en.moveProgress !== undefined && en.moveProgress > 0) {
            en.moveProgress -= gridSpeed;

            const srcX = en.gridX! * TILE_SIZE;
            const srcY = en.gridY! * TILE_SIZE;
            const dstX = en.targetX! * TILE_SIZE;
            const dstY = en.targetY! * TILE_SIZE;
            const tVal = (TILE_SIZE - en.moveProgress) / TILE_SIZE;

            en.x = srcX + (dstX - srcX) * tVal;
            en.y = srcY + (dstY - srcY) * tVal;

            if (en.moveProgress <= 0) {
              en.gridX = en.targetX;
              en.gridY = en.targetY;
              en.x = en.gridX! * TILE_SIZE;
              en.y = en.gridY! * TILE_SIZE;
            }
          }

          // Decides next random step when aligned
          if (
            (en.moveProgress === undefined || en.moveProgress <= 0) &&
            en.gridX !== undefined &&
            en.gridY !== undefined
          ) {
            en.gridX = en.targetX ?? en.gridX;
            en.gridY = en.targetY ?? en.gridY;

            const dirs = [
              { x: 1, y: 0 },
              { x: -1, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: -1 },
            ];
            const validDirs = dirs.filter((d) => {
              const tx = en.gridX! + d.x;
              const ty = en.gridY! + d.y;
              const tile = currentGrid[ty]?.[tx];
              return (
                tile !== undefined &&
                tile !== 1 &&
                (selectedGame === "pacman" || tile !== 2)
              );
            });

            if (validDirs.length > 0) {
              const selected =
                validDirs[Math.floor(Math.random() * validDirs.length)];
              en.targetX = en.gridX! + selected.x;
              en.targetY = en.gridY! + selected.y;
              en.moveProgress = TILE_SIZE;
            }
          }

          // Kill player on touch
          const dist = Math.hypot(p.x - en.x, p.y - en.y);
          if (dist < 15) {
            initLevel();
            if (selectedGame === "pacman") {
              setActiveMessage(t("tickerPacLose"));
            } else {
              setActiveMessage(t("tickerBomberLose"));
            }
          }
        });

        // Bomberman bomb tick and explosion blast math
        if (selectedGame === "bomber") {
          bombs.current.forEach((b) => {
            if (b.exploded) {
              b.flameTimer--;
              return;
            }

            b.timer--;
            if (b.timer <= 0) {
              b.exploded = true;
              b.flameTimer = 20;
              playStompSound();

              // Bomb explosion spreads in 4 directions up to range 2, blocked correctly by solid and breakable structures
              const blastDirections = [
                { dx: 1, dy: 0 },
                { dx: -1, dy: 0 },
                { dx: 0, dy: 1 },
                { dx: 0, dy: -1 },
              ];

              // Kill player if standing on the bomb center
              if (p.gridX === b.x && p.gridY === b.y) {
                initLevel();
                setActiveMessage(t("tickerBomberLose"));
              }

              // Kill Goombas on bomb center
              enemies.current.forEach((en) => {
                if (en.gridX === b.x && en.gridY === b.y) {
                  en.dead = true;
                  setScore((prev) => prev + 500);
                }
              });

              blastDirections.forEach((dir) => {
                for (let step = 1; step <= 1; step++) {
                  const tx = b.x + dir.dx * step;
                  const ty = b.y + dir.dy * step;
                  const tile = currentGrid[ty]?.[tx];

                  if (tile === 1) {
                    // Solid wall, stop explosion in this direction
                    break;
                  }

                  // Kill player if in blast line
                  if (p.gridX === tx && p.gridY === ty) {
                    initLevel();
                    setActiveMessage(t("tickerBomberLose"));
                    break;
                  }

                  // Kill Goombas in blast line
                  enemies.current.forEach((en) => {
                    if (en.gridX === tx && en.gridY === ty) {
                      en.dead = true;
                      setScore((prev) => prev + 500);
                    }
                  });

                  if (tile === 2) {
                    // Breakable brick, destroy brick & stop explosion line
                    currentGrid[ty][tx] = 0;
                    setScore((prev) => prev + 50);

                    if (Math.random() < 0.3) {
                      playCoinSound();
                      setCoinCount((prev) => prev + 1);
                    }
                    break;
                  }
                }
              });
            }
          });

          bombs.current = bombs.current.filter(
            (b) => !b.exploded || b.flameTimer > 0,
          );
        }
      }

      // Floating text update
      texts.current.forEach((t) => {
        t.y += t.vy;
        t.life--;
      });
      texts.current = texts.current.filter((t) => t.life > 0);

      // Walk frame animation cycle
      if (
        (Math.abs(p.vx) > 0.1 || p.moveProgress > 0) &&
        (p.grounded || selectedGame !== "run")
      ) {
        p.walkFrame += 0.2;
      } else {
        p.walkFrame = 0;
      }
      if (p.powerupTimer > 0) {
        p.powerupTimer--;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ----------------------------------------------------
      // RENDER GAME 1: MARIO RUN PLATFORMER
      // ----------------------------------------------------
      if (selectedGame === "run") {
        ctx.save();
        ctx.translate(-cameraX.current, 0);

        // Sky & Clouds
        ctx.fillStyle = "#6b8cff";
        ctx.fillRect(cameraX.current, 0, canvas.width, 240);

        for (let i = 0; i < levelWidth; i += 400) {
          // Green Hills
          ctx.fillStyle = "#00a000";
          ctx.beginPath();
          ctx.arc(i + 150, 200, 70, Math.PI, 0);
          ctx.fill();
          ctx.fillStyle = "#008000";
          ctx.beginPath();
          ctx.arc(i + 150, 200, 70, Math.PI * 1.5, 0);
          ctx.fill();

          // Clouds
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(i + 100, 60, 20, 0, Math.PI * 2);
          ctx.arc(i + 125, 55, 25, 0, Math.PI * 2);
          ctx.arc(i + 150, 60, 20, 0, Math.PI * 2);
          ctx.fill();
        }

        // Flagpole end
        const poleX = levelWidth - 80;
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(poleX, 40, 6, 160);
        ctx.fillStyle = "#00a000";
        ctx.beginPath();
        ctx.arc(poleX + 3, 38, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(poleX - 34, 50, 34, 24);
        ctx.fillStyle = "#e52521";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText("B", poleX - 22, 68);

        // Castle end
        ctx.fillStyle = "#904000";
        ctx.fillRect(levelWidth - 60, 140, 50, 60);
        ctx.fillStyle = "#402000";
        ctx.fillRect(levelWidth - 45, 170, 20, 30);

        // Blocks
        blocks.current.forEach((b) => {
          const renderY = b.y + b.bounceOffset;
          if (b.type === "q") {
            drawSprite(
              ctx,
              b.empty ? "block_empty" : "block_q",
              b.x,
              renderY,
              b.w,
              b.h,
            );
          } else {
            drawSprite(
              ctx,
              b.empty ? "block_empty" : "block_brick",
              b.x,
              renderY,
              b.w,
              b.h,
            );
          }
        });

        // Items
        items.current.forEach((it) => {
          if (!it.active) return;
          if (it.type === "coin") {
            drawSprite(ctx, "coin", it.x, it.y, it.w, it.h);
          } else if (it.type === "mushroom") {
            drawSprite(ctx, "mushroom", it.x, it.y, it.w, it.h);
          }
        });

        // Enemies Goombas
        enemies.current.forEach((en) => {
          if (en.dead) {
            if (en.deadTimer > 0) {
              ctx.fillStyle = "#b04000";
              ctx.fillRect(en.x, en.y + 18, en.w, 10);
            }
            return;
          }
          drawSprite(ctx, "goomba", en.x, en.y, en.w, en.h);
        });

        // Ground
        ctx.fillStyle = "#d86000";
        ctx.fillRect(cameraX.current, 200, canvas.width, 40);
        ctx.fillStyle = "#000000";
        ctx.fillRect(cameraX.current, 200, canvas.width, 4);

        ctx.fillStyle = "#802000";
        for (
          let x = Math.floor(cameraX.current / 16) * 16;
          x < cameraX.current + canvas.width + 16;
          x += 16
        ) {
          ctx.fillRect(x, 216, 1, 24);
          ctx.fillRect(x, 200, 16, 1);
          ctx.fillRect(x, 216, 16, 1);
        }

        // Draw Player Mario
        const p = player.current;
        const walkCycle = Math.floor(p.walkFrame) % 2;
        let spriteToDraw: keyof typeof SPRITES = "mario_idle";

        if (!p.grounded) {
          spriteToDraw = "mario_jump";
        } else if (Math.abs(p.vx) > 0.1) {
          spriteToDraw = walkCycle === 0 ? "mario_walk1" : "mario_walk2";
        } else {
          spriteToDraw = "mario_idle";
        }

        let drawPlayer = true;
        if (p.powerupTimer > 0 && Math.floor(p.powerupTimer / 4) % 2 === 0) {
          drawPlayer = false;
        }

        if (drawPlayer) {
          let w_anim = p.w;
          let h_anim = p.isBig ? 42 : 32;
          let y_offset = 0;

          if (!p.grounded) {
            const stretch = Math.min(Math.abs(p.vy) * 0.6, 6);
            w_anim -= stretch * 0.4;
            h_anim += stretch;
            y_offset = -stretch;
          } else if (p.landingTimer && p.landingTimer > 0) {
            const squish = p.landingTimer * 0.8;
            w_anim += squish;
            h_anim -= squish;
            y_offset = squish;
          }

          ctx.save();
          ctx.translate(p.x + p.w / 2, p.y + p.h - h_anim / 2 + y_offset);
          drawSprite(
            ctx,
            p.isBig ? "mario_big_idle" : spriteToDraw,
            -w_anim / 2,
            -h_anim / 2,
            w_anim,
            h_anim,
            p.facingLeft,
          );
          ctx.restore();
        }

        ctx.restore();
      }

      // ----------------------------------------------------
      // RENDER GAME 2 & 3: GRID BASED PACMAN & BOMBERMAN
      // ----------------------------------------------------
      else {
        const currentGrid = bomberBricks.current;
        // Grid black background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render grid tiles
        for (let r = 0; r < GRID_ROWS; r++) {
          for (let c = 0; c < GRID_COLS; c++) {
            const tile = currentGrid[r]?.[c];
            const x = c * TILE_SIZE;
            const y = r * TILE_SIZE;

            if (tile === 1) {
              // Solid maze / border wall (blue maze or grey Bomberman bricks)
              ctx.fillStyle = selectedGame === "pacman" ? "#002080" : "#707070";
              ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
              ctx.strokeStyle = "#000000";
              ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
            } else if (tile === 2) {
              // Breakable bricks
              drawSprite(ctx, "block_brick", x, y, TILE_SIZE, TILE_SIZE);
            } else if (tile === 9) {
              // Portal
              ctx.fillStyle = "#e52521";
              ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
              ctx.strokeStyle = "#ffffff";
              ctx.strokeRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
            }

            // Pacman gold coin dots
            if (selectedGame === "pacman" && tile === 2) {
              ctx.fillStyle = "#fbd000";
              ctx.beginPath();
              ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Render Bomberman bombs & blast fires
        if (selectedGame === "bomber") {
          bombs.current.forEach((b) => {
            const bx = b.x * TILE_SIZE;
            const by = b.y * TILE_SIZE;

            if (!b.exploded) {
              // Draw bomb
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(
                bx + TILE_SIZE / 2,
                by + TILE_SIZE / 2,
                8,
                0,
                Math.PI * 2,
              );
              ctx.fill();
              ctx.fillStyle = "#e52521";
              ctx.beginPath();
              ctx.arc(
                bx + TILE_SIZE / 2,
                by + TILE_SIZE / 2,
                4,
                0,
                Math.PI * 2,
              );
              ctx.fill();
            } else {
              // Draw explosion fire cross
              ctx.fillStyle = "#e52521";
              const blastDirs = [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: -1, y: 0 },
                { x: -2, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: -1 },
                { x: 0, y: -2 },
              ];
              blastDirs.forEach((d) => {
                const fx = (b.x + d.x) * TILE_SIZE;
                const fy = (b.y + d.y) * TILE_SIZE;

                // Only draw explosion inside bounds and not over metal walls
                if (currentGrid[b.y + d.y]?.[b.x + d.x] !== 1) {
                  ctx.fillStyle = "#ff9900";
                  ctx.fillRect(fx + 2, fy + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                }
              });
            }
          });
        }

        // Render enemies (Goombas)
        enemies.current.forEach((en) => {
          if (en.dead) return;
          drawSprite(ctx, "goomba", en.x + 2, en.y + 2, en.w, en.h);
        });

        // Render Player Mario
        const p = player.current;
        const walkCycle = Math.floor(p.walkFrame) % 2;
        const sprite = walkCycle === 0 ? "mario_walk1" : "mario_walk2";

        drawSprite(ctx, sprite, p.x + 2, p.y + 2, p.w, p.h, p.facingLeft);
      }

      // Draw Floating Scores
      texts.current.forEach((t) => {
        ctx.fillStyle = "#ffffff";
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText(t.text, t.x, t.y);
      });
    };

    const loop = () => {
      update();
      render();
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState, selectedGame, lang]);

  return (
    <div
      ref={containerRef}
      className="retro-border border-4 border-white bg-[#6b8cff] p-2 text-white relative"
    >
      {/* Game HUD */}
      <div className="flex justify-between items-center bg-[#000] border-b-4 border-white p-2 font-mono text-[9px] sm:text-xs text-yellow-400 select-none">
        <div>
          <p className="retro-font-press text-white">{t("gameHUDName")}</p>
          <p className="retro-font-press mt-1 text-[#e52521]">
            {String(score).padStart(6, "0")}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="retro-font-press text-white">{t("coinsHUD")}</p>
          <p className="retro-font-press mt-1 text-yellow-300">
            🪙 x{String(coinCount).padStart(2, "0")}
          </p>
        </div>
        <div className="text-right">
          <p className="retro-font-press text-white">{t("worldHUD")}</p>
          <p className="retro-font-press mt-1 text-[#00c000]">
            {selectedGame === "run"
              ? "1-1"
              : selectedGame === "pacman"
                ? "1-2"
                : "1-3"}
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden w-full h-[240px] bg-[#6b8cff]">
        <canvas
          ref={canvasRef}
          width={744}
          height={240}
          className="w-full h-full block image-render-pixelated bg-black"
        />

        {/* Victory/Game Clear Screen */}
        {gameState === "victory" && (
          <div className="absolute inset-0 bg-[#000000c0] flex flex-col justify-center items-center text-center p-4 z-30">
            <h3 className="retro-font-press text-yellow-400 text-lg mb-2 animate-bounce">
              WORLD CLEAR!
            </h3>
            <p className="text-xs mb-4">
              Bento Putra Hermanto - Senior Frontend Engineer
            </p>
            <button
              onClick={() => {
                initLevel();
              }}
              className="retro-border-accent bg-yellow-400 text-black px-4 py-2 text-xs font-bold hover:bg-yellow-300 transition-colors retro-font-press cursor-pointer"
            >
              {t("playAgain")}
            </button>
          </div>
        )}
      </div>

      {/* Info message ticker panel */}
      <div className="bg-[#000000d0] p-2 text-center text-[9px] sm:text-xs font-mono text-[#00ff00] border-t-4 border-white">
        <span className="retro-font-press animate-pulse">📢 </span>
        <span className="retro-font-press">{activeMessage}</span>
      </div>

      {/* Game Selector list buttons */}
      <div className="flex bg-[#222] justify-center items-center gap-2 p-2 border-t-4 border-white select-none">
        <span className="text-[8px] sm:text-[9px] retro-font-press text-yellow-400 mr-2">
          {t("selectGame")}:
        </span>
        <button
          onClick={() => setSelectedGame("run")}
          className={`px-2.5 py-1 text-[9px] font-bold rounded border cursor-pointer ${
            selectedGame === "run"
              ? "bg-[#e52521] text-white border-white"
              : "bg-black text-gray-500 border-gray-800"
          } retro-font-press`}
        >
          {t("marioRun")}
        </button>
        <button
          onClick={() => setSelectedGame("pacman")}
          className={`px-2.5 py-1 text-[9px] font-bold rounded border cursor-pointer ${
            selectedGame === "pacman"
              ? "bg-green-600 text-white border-white"
              : "bg-black text-gray-500 border-gray-800"
          } retro-font-press`}
        >
          {t("marioPac")}
        </button>
        <button
          onClick={() => setSelectedGame("bomber")}
          className={`px-2.5 py-1 text-[9px] font-bold rounded border cursor-pointer ${
            selectedGame === "bomber"
              ? "bg-yellow-500 text-black border-white"
              : "bg-black text-gray-500 border-gray-800"
          } retro-font-press`}
        >
          {t("marioBomber")}
        </button>
      </div>

      {/* Retro NES-Style Controller HUD */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#cccccc] pt-8 pb-4 px-4 border-t-4 border-black border-b-4 border-l-4 border-r-4 rounded-b-xl select-none relative gap-4">
        {/* Red horizontal accent lines to match NES faceplate */}
        <div className="absolute top-2 left-0 right-0 h-1 bg-[#e52521]"></div>
        <div className="absolute top-4 left-0 right-0 h-1 bg-[#e52521]"></div>
        <div className="absolute bottom-2 left-0 right-0 h-1 bg-black opacity-10"></div>

        {/* D-Pad (Left side) */}
        <div className="flex items-center justify-center p-2 bg-[#7f7f7f] rounded-full border-4 border-black shadow-inner">
          <div className="grid grid-cols-3 gap-0.5 w-24 h-24 relative bg-black rounded-full p-2">
            {/* Row 1: empty, UP, empty */}
            <div></div>
            <button
              onMouseDown={() => handleMoveUp(true)}
              onMouseUp={() => handleMoveUp(false)}
              onMouseLeave={() => handleMoveUp(false)}
              onTouchStart={() => handleMoveUp(true)}
              onTouchEnd={() => handleMoveUp(false)}
              className="w-7 h-7 bg-[#222] active:bg-[#444] text-white font-bold rounded flex items-center justify-center cursor-pointer border-t-2 border-l-2 border-r-2 border-gray-600 shadow-md"
            >
              ▲
            </button>
            <div></div>

            {/* Row 2: LEFT, empty, RIGHT */}
            <button
              onMouseDown={() => handleMoveLeft(true)}
              onMouseUp={() => handleMoveLeft(false)}
              onMouseLeave={() => handleMoveLeft(false)}
              onTouchStart={() => handleMoveLeft(true)}
              onTouchEnd={() => handleMoveLeft(false)}
              className="w-7 h-7 bg-[#222] active:bg-[#444] text-white font-bold rounded flex items-center justify-center cursor-pointer border-t-2 border-l-2 border-b-2 border-gray-600 shadow-md"
            >
              ◀
            </button>
            <div className="w-7 h-7 bg-[#111] rounded-full"></div>
            <button
              onMouseDown={() => handleMoveRight(true)}
              onMouseUp={() => handleMoveRight(false)}
              onMouseLeave={() => handleMoveRight(false)}
              onTouchStart={() => handleMoveRight(true)}
              onTouchEnd={() => handleMoveRight(false)}
              className="w-7 h-7 bg-[#222] active:bg-[#444] text-white font-bold rounded flex items-center justify-center cursor-pointer border-t-2 border-r-2 border-b-2 border-gray-600 shadow-md"
            >
              ▶
            </button>

            {/* Row 3: empty, DOWN, empty */}
            <div></div>
            <button
              onMouseDown={() => handleMoveDown(true)}
              onMouseUp={() => handleMoveDown(false)}
              onMouseLeave={() => handleMoveDown(false)}
              onTouchStart={() => handleMoveDown(true)}
              onTouchEnd={() => handleMoveDown(false)}
              className="w-7 h-7 bg-[#222] active:bg-[#444] text-white font-bold rounded flex items-center justify-center cursor-pointer border-b-2 border-l-2 border-r-2 border-gray-600 shadow-md"
            >
              ▼
            </button>
            <div></div>
          </div>
        </div>

        {/* Center Section: START and Controller Branding */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            {/* Start Game Button (NES START) */}
            <div className="flex flex-col items-center">
              <button
                onClick={initLevel}
                className="w-10 h-5 bg-[rgb(127,127,127)] active:bg-gray-600 rounded-full border-2 border-black cursor-pointer shadow-md transform rotate-[-15deg] transition-all"
              ></button>
              <span className="text-[6px] retro-font-press text-black mt-2.5 font-bold">
                START / RESET
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: B & A (Right side) */}
        <div className="flex items-center gap-4 bg-[#7f7f7f] p-3 rounded-2xl border-4 border-black shadow-inner">
          {/* B Button (Decorative/Attack) */}
          <div className="flex flex-col items-center">
            <button
              onMouseDown={handleJump}
              onTouchStart={handleJump}
              className="w-10 h-10 bg-[#e52521] active:bg-red-700 text-white font-bold text-xs rounded-full border-4 border-black shadow-lg flex items-center justify-center cursor-pointer"
            >
              B
            </button>
            <span className="text-[7px] retro-font-press text-black mt-1 font-bold">
              ATTACK
            </span>
          </div>

          {/* A Button (Jump/Bomb) */}
          <div className="flex flex-col items-center">
            <button
              onMouseDown={handleJump}
              onTouchStart={handleJump}
              className="w-10 h-10 bg-[#e52521] active:bg-red-700 text-white font-bold text-xs rounded-full border-4 border-black shadow-lg flex items-center justify-center cursor-pointer"
            >
              A
            </button>
            <span className="text-[7px] retro-font-press text-black mt-1 font-bold">
              {selectedGame === "bomber" ? "BOMB" : "JUMP"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
