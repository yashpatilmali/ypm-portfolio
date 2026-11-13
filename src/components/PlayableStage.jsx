import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../audio/soundEngine';
import { 
  drawPixelSprite, 
  MARIO_IDLE_PIXELS, 
  MARIO_RUN1_PIXELS, 
  MARIO_RUN2_PIXELS, 
  MARIO_JUMP_PIXELS, 
  QUESTION_BLOCK_PIXELS, 
  EMPTY_BLOCK_PIXELS 
} from '../utils/marioSprites';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, Play, ArrowLeft, ArrowRight, X, Send, CheckCircle2, Sparkles, Flag, Trophy, Award, Medal, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import confetti from 'canvas-confetti';

export default function PlayableStage({ onCoinCollect }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const LEVEL_WIDTH = 2400;
  const LEVEL_HEIGHT = 380;
  const GROUND_Y = 300;

  const [activePipeData, setActivePipeData] = useState(null);
  const [currentPipeIndex, setCurrentPipeIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const stateRef = useRef({
    mario: {
      x: 80,
      y: GROUND_Y - 40,
      vx: 0,
      vy: 0,
      width: 32,
      height: 40,
      isGrounded: true,
      facingLeft: false,
      runFrame: 0,
      frameCounter: 0,
      isWarping: false,
      isEmerging: false,
      warpProgress: 0,
      warpingPipe: null,
      slidingFlag: false,
    },
    cameraX: 0,
    keys: { left: false, right: false, jump: false, down: false },
    blocks: [
      { id: 'b1', x: 260, y: 180, type: 'q', hit: false, bumpY: 0, item: 'MUSHROOM', title: 'JavaScript' },
      { id: 'b2', x: 300, y: 180, type: 'brick', hit: false, bumpY: 0 },
      { id: 'b3', x: 340, y: 180, type: 'q', hit: false, bumpY: 0, item: 'FLOWER', title: 'React.js' },
      { id: 'b4', x: 380, y: 180, type: 'brick', hit: false, bumpY: 0 },
      { id: 'b5', x: 640, y: 180, type: 'q', hit: false, bumpY: 0, item: 'STAR', title: 'Node.js' },
      { id: 'b6', x: 680, y: 180, type: 'brick', hit: false, bumpY: 0 },
      { id: 'b7', x: 720, y: 180, type: 'q', hit: false, bumpY: 0, item: 'LEAF', title: 'Next.js' },
      { id: 'b8', x: 1040, y: 170, type: 'q', hit: false, bumpY: 0, item: 'TROPHY', title: 'MEDHA 3rd' },
      { id: 'b9', x: 1080, y: 170, type: 'brick', hit: false, bumpY: 0 },
      { id: 'b10', x: 1120, y: 170, type: 'q', hit: false, bumpY: 0, item: 'STAR', title: 'Devthon' },
      { id: 'b11', x: 1440, y: 180, type: 'q', hit: false, bumpY: 0, item: 'MUSHROOM', title: 'Java' },
      { id: 'b12', x: 1480, y: 180, type: 'brick', hit: false, bumpY: 0 },
    ],
    pipes: [
      { id: 'pipe-about', x: 440, height: 60, title: 'ABOUT', code: 'about' },
      { id: 'pipe-skills', x: 800, height: 75, title: 'SKILLS', code: 'skills' },
      { id: 'pipe-projects', x: 1200, height: 85, title: 'PROJECTS', code: 'projects' },
      { id: 'pipe-experience', x: 1560, height: 70, title: 'EXPERIENCE', code: 'experience' },
      { id: 'pipe-achievements', x: 1840, height: 80, title: 'ACHIEVEMENTS', code: 'achievements' },
      { id: 'pipe-education', x: 2020, height: 70, title: 'EDUCATION', code: 'education' },
    ],
    flagpole: { x: 2200, topY: 80, bottomY: GROUND_Y, flagY: 90, reached: false },
    castle: { x: 2250, y: GROUND_Y - 95, width: 95, height: 95 },
    coins: [
      { id: 'c1', x: 180, y: 220, collected: false },
      { id: 'c2', x: 540, y: 200, collected: false },
      { id: 'c3', x: 920, y: 210, collected: false },
      { id: 'c4', x: 970, y: 170, collected: false },
      { id: 'c5', x: 1360, y: 210, collected: false },
      { id: 'c6', x: 1720, y: 210, collected: false },
    ],
    popups: [],
  });

  const openPipeModal = (code) => {
    const s = stateRef.current;
    const m = s.mario;
    let targetPipe = s.pipes.find(p => p.code === code);
    if (!targetPipe && code === 'contact') {
      targetPipe = { x: 2180, height: 75, code: 'contact', title: 'CONTACT' };
    }

    if (targetPipe) {
      sound.playPipe();
      m.isWarping = true;
      m.isEmerging = false;
      m.warpingPipe = targetPipe;
      m.warpProgress = 0;
      m.vx = 0;
      m.vy = 0;
      m.facingLeft = false;
      m.x = targetPipe.x + 28 - m.width / 2;
      m.y = GROUND_Y - targetPipe.height - m.height;
    } else {
      setActivePipeData(code);
    }
  };

  const closePipeModal = () => {
    const s = stateRef.current;
    const m = s.mario;
    setActivePipeData(null);
    if (m.warpingPipe) {
      sound.playPipe();
      m.isEmerging = true;
      m.isWarping = false;
      m.warpProgress = 1;
      const pipeTopY = GROUND_Y - m.warpingPipe.height;
      m.x = m.warpingPipe.x + 28 - m.width / 2;
      m.y = (pipeTopY - m.height) + (m.height + 10);
    } else {
      m.vy = -6;
      sound.playJump();
    }
  };

  const autoRunToNextPipe = () => {
    const s = stateRef.current;
    const pipes = [...s.pipes, { code: 'contact', x: 2180, height: 75, title: 'CONTACT' }];
    const nextIdx = (currentPipeIndex + 1) % pipes.length;
    setCurrentPipeIndex(nextIdx);

    const target = pipes[nextIdx];
    s.mario.x = target.x - 30;
    s.mario.vx = 0;
    s.mario.vy = -6;
    sound.playJump();

    setTimeout(() => {
      openPipeModal(target.code);
    }, 450);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/yashsmali91@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          _subject: `Mario Portfolio Warp Message from ${contactForm.name}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        sound.playVictory();
        setContactSubmitted(true);
        try {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        } catch (err) {}
      } else {
        throw new Error('Service error');
      }
    } catch (err) {
      // Fallback: direct mailto trigger with pre-filled inputs
      const subject = encodeURIComponent(`Portfolio Message from ${contactForm.name}`);
      const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`);
      window.location.href = `mailto:yashsmali91@gmail.com?subject=${subject}&body=${body}`;
      sound.playVictory();
      setContactSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const k = stateRef.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') k.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') k.right = true;
      if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        if (!k.jump && stateRef.current.mario.isGrounded) {
          stateRef.current.mario.vy = -12.5;
          stateRef.current.mario.isGrounded = false;
          sound.playJump();
        }
        k.jump = true;
      }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        k.down = true;
        checkPipeEntry();
      }
    };

    const onKeyUp = (e) => {
      const k = stateRef.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') k.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') k.right = false;
      if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') k.jump = false;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') k.down = false;
    };

    const checkPipeEntry = () => {
      const s = stateRef.current;
      const m = s.mario;
      if (m.isWarping || m.isEmerging || activePipeData) return;
      for (const p of s.pipes) {
        const pipeTopY = GROUND_Y - p.height;
        if (Math.abs(m.x + m.width / 2 - (p.x + 28)) < 28 && Math.abs(m.y + m.height - pipeTopY) < 10) {
          openPipeModal(p.code);
          break;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const updateGame = () => {
      const s = stateRef.current;
      const m = s.mario;

      if (!m.isWarping && !m.isEmerging && !m.slidingFlag && !activePipeData) {
        if (s.keys.left) {
          m.vx = -4.5;
          m.facingLeft = true;
        } else if (s.keys.right) {
          m.vx = 4.5;
          m.facingLeft = false;
        } else {
          m.vx *= 0.75;
          if (Math.abs(m.vx) < 0.2) m.vx = 0;
        }

        m.x += m.vx;
        if (m.x < 10) m.x = 10;
        if (m.x > LEVEL_WIDTH - 60) m.x = LEVEL_WIDTH - 60;

        m.vy += 0.65;
        if (m.vy > 14) m.vy = 14;
        m.y += m.vy;

        if (m.y + m.height >= GROUND_Y) {
          m.y = GROUND_Y - m.height;
          m.vy = 0;
          m.isGrounded = true;
        } else {
          m.isGrounded = false;
        }

        for (const p of s.pipes) {
          const pipeTopY = GROUND_Y - p.height;
          const pipeW = 56;
          if (m.x + m.width > p.x && m.x < p.x + pipeW) {
            if (m.y + m.height >= pipeTopY && m.y + m.height <= pipeTopY + 12 && m.vy >= 0) {
              m.y = pipeTopY - m.height;
              m.vy = 0;
              m.isGrounded = true;
            } else if (m.y + m.height > pipeTopY) {
              if (m.vx > 0 && m.x + m.width >= p.x && m.x < p.x + 10) m.x = p.x - m.width;
              else if (m.vx < 0 && m.x <= p.x + pipeW && m.x + m.width > p.x + pipeW - 10) m.x = p.x + pipeW;
            }
          }
        }

        for (const b of s.blocks) {
          const bw = 32;
          const bh = 32;
          const by = b.y + b.bumpY;

          if (m.x + m.width > b.x && m.x < b.x + bw) {
            if (m.y <= by + bh && m.y >= by + bh - 14 && m.vy < 0) {
              m.y = by + bh;
              m.vy = 2;

              if (!b.hit) {
                sound.playBump();
                b.bumpY = -8;
                setTimeout(() => { b.bumpY = 0; }, 120);

                if (b.type === 'q') {
                  b.hit = true;
                  sound.playPowerUp();
                  onCoinCollect();
                  s.popups.push({
                    x: b.x - 10,
                    y: b.y - 15,
                    vy: -1.8,
                    text: "+100 XP: " + b.title,
                    alpha: 1,
                  });
                }
              }
            } else if (m.y + m.height >= by && m.y + m.height <= by + 12 && m.vy >= 0) {
              m.y = by - m.height;
              m.vy = 0;
              m.isGrounded = true;
            }
          }
        }

        for (const c of s.coins) {
          if (!c.collected && Math.hypot(m.x + m.width / 2 - c.x, m.y + m.height / 2 - c.y) < 28) {
            c.collected = true;
            sound.playCoin();
            onCoinCollect();
            s.popups.push({
              x: c.x - 10,
              y: c.y - 15,
              vy: -2,
              text: '+200 PTS',
              alpha: 1,
            });
          }
        }

        const fp = s.flagpole;
        if (!fp.reached && m.x + m.width >= fp.x && m.x <= fp.x + 20) {
          fp.reached = true;
          m.slidingFlag = true;
          m.vx = 0;
          m.vy = 0;
          sound.playVictory();
        }
      }

      if (m.slidingFlag) {
        const fp = s.flagpole;
        if (fp.flagY < GROUND_Y - 32) fp.flagY += 3.5;
        if (m.y < GROUND_Y - m.height) {
          m.y += 3.5;
        } else {
          m.slidingFlag = false;
          setTimeout(() => {
            openPipeModal('contact');
          }, 800);
        }
      }

      if (m.isWarping && m.warpingPipe) {
        m.warpProgress += 0.04;
        const pipeTopY = GROUND_Y - m.warpingPipe.height;
        m.y = (pipeTopY - m.height) + (m.height + 12) * m.warpProgress;
        if (m.warpProgress >= 1) {
          m.isWarping = false;
          setActivePipeData(m.warpingPipe.code);
        }
      } else if (m.isEmerging && m.warpingPipe) {
        m.warpProgress -= 0.04;
        const pipeTopY = GROUND_Y - m.warpingPipe.height;
        m.y = (pipeTopY - m.height) + (m.height + 12) * Math.max(0, m.warpProgress);
        if (m.warpProgress <= 0) {
          m.isEmerging = false;
          m.warpingPipe = null;
          m.vy = -6.5;
          sound.playJump();
        }
      }

      for (let i = s.popups.length - 1; i >= 0; i--) {
        const pop = s.popups[i];
        pop.y += pop.vy;
        pop.alpha -= 0.018;
        if (pop.alpha <= 0) s.popups.splice(i, 1);
      }

      const targetCamX = m.x - canvas.width / 2 + m.width / 2;
      s.cameraX += (targetCamX - s.cameraX) * 0.1;
      if (s.cameraX < 0) s.cameraX = 0;
      if (s.cameraX > LEVEL_WIDTH - canvas.width) s.cameraX = LEVEL_WIDTH - canvas.width;

      if (m.vx !== 0 && m.isGrounded) {
        m.frameCounter++;
        if (m.frameCounter % 6 === 0) {
          m.runFrame = (m.runFrame + 1) % 2;
        }
      } else {
        m.runFrame = 0;
      }

      renderLevel(ctx, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(updateGame);
    };

    const renderLevel = (ctx, viewWidth, viewHeight) => {
      ctx.imageSmoothingEnabled = false;
      const s = stateRef.current;
      const cam = s.cameraX;

      ctx.fillStyle = '#5C94FC';
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      ctx.fillStyle = '#FFFFFF';
      const clouds = [
        { x: 120, y: 50 }, { x: 380, y: 70 }, { x: 720, y: 40 },
        { x: 1100, y: 60 }, { x: 1480, y: 45 }, { x: 1850, y: 65 }, { x: 2150, y: 50 }
      ];
      for (const cl of clouds) {
        const cx = cl.x - cam * 0.3;
        if (cx > -120 && cx < viewWidth + 120) {
          drawCloud(ctx, cx, cl.y);
        }
      }

      const hills = [
        { x: 60, r: 80 }, { x: 500, r: 90 }, { x: 920, r: 70 },
        { x: 1380, r: 85 }, { x: 1750, r: 95 }, { x: 2100, r: 85 }
      ];
      for (const h of hills) {
        const hx = h.x - cam * 0.5;
        if (hx > -150 && hx < viewWidth + 150) {
          ctx.beginPath();
          ctx.arc(hx, GROUND_Y, h.r, Math.PI, 0);
          ctx.fillStyle = '#00A800';
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#006800';
          ctx.stroke();
        }
      }

      const groundStart = Math.floor(cam / 32) * 32;
      const groundEnd = groundStart + viewWidth + 64;
      for (let gx = groundStart; gx <= groundEnd; gx += 32) {
        const screenX = gx - cam;
        ctx.fillStyle = '#70D000';
        ctx.fillRect(screenX, GROUND_Y, 32, 6);
        ctx.fillStyle = '#E45C10';
        ctx.fillRect(screenX, GROUND_Y + 6, 32, LEVEL_HEIGHT - (GROUND_Y + 6));
        ctx.strokeStyle = '#943200';
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, GROUND_Y + 6, 32, 18);
        ctx.strokeRect(screenX, GROUND_Y + 24, 32, 18);
      }

      for (const b of s.blocks) {
        const bx = b.x - cam;
        const by = b.y + b.bumpY;
        if (bx > -40 && bx < viewWidth + 40) {
          if (b.type === 'q') {
            drawPixelSprite(ctx, b.hit ? EMPTY_BLOCK_PIXELS : QUESTION_BLOCK_PIXELS, bx, by, 32);
          } else {
            ctx.fillStyle = '#B84418';
            ctx.fillRect(bx, by, 32, 32);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.strokeRect(bx, by, 32, 32);
            ctx.strokeRect(bx, by + 16, 32, 16);
          }
        }
      }

      for (const c of s.coins) {
        if (!c.collected) {
          const cx = c.x - cam;
          if (cx > -20 && cx < viewWidth + 20) {
            ctx.save();
            ctx.fillStyle = '#FCD116';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#FCD116';
            ctx.beginPath();
            ctx.arc(cx, c.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#995500';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      for (const p of s.pipes) {
        const px = p.x - cam;
        const py = GROUND_Y - p.height;
        if (px > -80 && px < viewWidth + 80) {
          ctx.fillStyle = '#00A800';
          ctx.fillRect(px + 4, py + 18, 48, p.height - 18);
          ctx.fillStyle = '#70D000';
          ctx.fillRect(px + 8, py + 18, 6, p.height - 18);
          ctx.fillStyle = '#006400';
          ctx.fillRect(px + 44, py + 18, 6, p.height - 18);
          ctx.fillStyle = '#00A800';
          ctx.fillRect(px, py, 56, 18);
          ctx.fillStyle = '#70D000';
          ctx.fillRect(px + 4, py, 6, 18);
          ctx.fillStyle = '#006400';
          ctx.fillRect(px + 48, py, 6, 18);
          ctx.strokeStyle = '#004D00';
          ctx.lineWidth = 2;
          ctx.strokeRect(px, py, 56, 18);
          ctx.strokeRect(px + 4, py + 18, 48, p.height - 18);

          // Sharp, properly fitted NES pipe label badge (no blur, no clipping)
          ctx.save();
          ctx.font = '10px "Press Start 2P", monospace';
          const textMetrics = ctx.measureText(p.title);
          const badgeWidth = Math.max(136, Math.round(textMetrics.width + 24));
          const badgeHeight = 22;
          const badgeX = Math.round(px + 28 - badgeWidth / 2);
          const badgeY = Math.round(py - 30);

          ctx.fillStyle = '#000000';
          ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
          ctx.strokeStyle = '#FCD116';
          ctx.lineWidth = 2;
          ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);

          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.title, Math.round(px + 28), badgeY + 12);
          ctx.restore();
        }
      }

      const fp = s.flagpole;
      const fpx = fp.x - cam;
      if (fpx > -40 && fpx < viewWidth + 40) {
        ctx.fillStyle = '#A3A3A3';
        ctx.fillRect(fpx + 8, fp.topY, 4, fp.bottomY - fp.topY);
        ctx.fillStyle = '#FCD116';
        ctx.beginPath();
        ctx.arc(fpx + 10, fp.topY - 6, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#00A800';
        ctx.fillRect(fpx - 24, fp.flagY, 32, 22);
      }

      const cst = s.castle;
      const cstX = cst.x - cam;
      if (cstX > -120 && cstX < viewWidth + 120) {
        ctx.fillStyle = '#7B7B7B';
        ctx.fillRect(cstX, cst.y, cst.width, cst.height);
        ctx.fillRect(cstX, cst.y - 16, 20, 16);
        ctx.fillRect(cstX + 38, cst.y - 16, 20, 16);
        ctx.fillRect(cstX + 75, cst.y - 16, 20, 16);
        ctx.fillStyle = '#000000';
        ctx.fillRect(cstX + 32, cst.y + 45, 30, 50);
        ctx.fillStyle = '#E52521';
        ctx.fillRect(cstX + 37, cst.y + 12, 20, 14);
      }

      const m = s.mario;
      const mx = m.x - cam;
      let spriteToDraw = MARIO_IDLE_PIXELS;
      if (!m.isGrounded) {
        spriteToDraw = MARIO_JUMP_PIXELS;
      } else if (m.vx !== 0) {
        spriteToDraw = m.runFrame === 0 ? MARIO_RUN1_PIXELS : MARIO_RUN2_PIXELS;
      }

      if ((m.isWarping || m.isEmerging) && m.warpingPipe) {
        const pipeTopY = GROUND_Y - m.warpingPipe.height;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, viewWidth, pipeTopY);
        ctx.clip();
        drawPixelSprite(ctx, MARIO_IDLE_PIXELS, mx, m.y, 36, m.facingLeft);
        ctx.restore();
      } else {
        drawPixelSprite(ctx, spriteToDraw, mx, m.y, 36, m.facingLeft);
      }

      for (const pop of s.popups) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pop.alpha);
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.fillStyle = '#FCD116';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#000000';
        ctx.fillText(pop.text, pop.x - cam, pop.y);
        ctx.restore();
      }
    };

    const drawCloud = (ctx, x, y) => {
      ctx.beginPath();
      ctx.arc(x + 20, y + 20, 18, 0, Math.PI * 2);
      ctx.arc(x + 40, y + 10, 24, 0, Math.PI * 2);
      ctx.arc(x + 65, y + 15, 20, 0, Math.PI * 2);
      ctx.arc(x + 85, y + 22, 16, 0, Math.PI * 2);
      ctx.fill();
    };

    animationFrameId = requestAnimationFrame(updateGame);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activePipeData]);

  const setKey = (code, val) => {
    const k = stateRef.current.keys;
    if (code === 'left') k.left = val;
    if (code === 'right') k.right = val;
    if (code === 'jump' && val) {
      if (stateRef.current.mario.isGrounded) {
        stateRef.current.mario.vy = -12.5;
        stateRef.current.mario.isGrounded = false;
        sound.playJump();
      }
    }
  };

  const jumpFront = () => {
    const s = stateRef.current;
    if (s.mario.isGrounded) {
      s.mario.vy = -12.5;
      s.mario.isGrounded = false;
      s.mario.facingLeft = false;
      s.keys.right = true;
      sound.playJump();
      setTimeout(() => {
        s.keys.right = false;
      }, 420);
    }
  };

  const jumpBack = () => {
    const s = stateRef.current;
    if (s.mario.isGrounded) {
      s.mario.vy = -12.5;
      s.mario.isGrounded = false;
      s.mario.facingLeft = true;
      s.keys.left = true;
      sound.playJump();
      setTimeout(() => {
        s.keys.left = false;
      }, 420);
    }
  };

  const jumpUp = () => {
    const s = stateRef.current;
    if (s.mario.isGrounded) {
      s.mario.vy = -12.5;
      s.mario.isGrounded = false;
      sound.playJump();
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 landscape:py-1 select-none font-pixel">
      {/* Arcade Cabinet Screen Frame */}
      <div className="relative rounded-xl border-4 sm:border-8 border-[#3b3a3e] bg-[#000000] shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(229,37,33,0.3)] overflow-hidden">
        
        {/* Top Arcade Marquee Banner */}
        <div className="bg-gradient-to-r from-[#8B0000] via-[#E52521] to-[#8B0000] text-white px-4 sm:px-6 py-3.5 landscape:py-1.5 flex items-center justify-center border-b-4 border-[#3b3a3e]">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 animate-ping" />
            <span className="text-sm sm:text-base md:text-lg landscape:text-xs text-yellow-300 font-bold drop-shadow-[1px_1px_0_#000]">
              ★ WORLD 1-1: YASH MALI ★
            </span>
          </div>
        </div>

        {/* 60FPS Game Canvas */}
        <div className="relative bg-[#5c94fc] overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={380}
            style={{ imageRendering: 'pixelated' }}
            className="w-full h-auto block filter contrast-105 landscape:max-h-[58vh]"
          />
        </div>

        {/* Bottom Arcade Controls Bar */}
        <div className="bg-[#111116] border-t-4 border-[#3b3a3e] p-2.5 sm:p-5 landscape:p-1.5 flex items-center justify-center text-white">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 landscape:gap-1.5 max-w-full">
            
            {/* Walk Directional Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 landscape:gap-1">
              <button
                onMouseDown={() => setKey('left', true)}
                onMouseUp={() => setKey('left', false)}
                onTouchStart={() => setKey('left', true)}
                onTouchEnd={() => setKey('left', false)}
                title="Walk Left"
                className="px-2.5 sm:px-3.5 landscape:px-2.5 h-10 sm:h-12 landscape:h-8 bg-slate-800 hover:bg-slate-700 active:bg-[#E52521] border-2 border-slate-600 rounded-lg flex items-center gap-1 text-white text-[10px] sm:text-sm landscape:text-[10px] font-bold cursor-pointer select-none shadow-[0_2px_0_#000]"
              >
                <span>◀</span>
                <span>LEFT</span>
              </button>
              <button
                onMouseDown={() => setKey('right', true)}
                onMouseUp={() => setKey('right', false)}
                onTouchStart={() => setKey('right', true)}
                onTouchEnd={() => setKey('right', false)}
                title="Walk Right"
                className="px-2.5 sm:px-3.5 landscape:px-2.5 h-10 sm:h-12 landscape:h-8 bg-slate-800 hover:bg-slate-700 active:bg-[#E52521] border-2 border-slate-600 rounded-lg flex items-center gap-1 text-white text-[10px] sm:text-sm landscape:text-[10px] font-bold cursor-pointer select-none shadow-[0_2px_0_#000]"
              >
                <span>RIGHT</span>
                <span>▶</span>
              </button>
            </div>

            {/* Jump Buttons: Jump Back, Jump Up, Jump Front */}
            <div className="flex items-center gap-1 sm:gap-2 landscape:gap-1">
              <button
                onClick={jumpBack}
                title="Jump Backwards (Leap Left)"
                className="px-2 sm:px-4 landscape:px-2.5 h-10 sm:h-12 landscape:h-8 bg-[#E52521] hover:bg-[#ff3b37] active:bg-[#a61512] border-2 border-white rounded-lg text-white text-[9px] sm:text-sm landscape:text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none shadow-[0_3px_0_#800] active:translate-y-0.5"
              >
                <span>↰</span>
                <span>BACK</span>
              </button>

              <button
                onClick={jumpUp}
                title="Jump Straight Up"
                className="px-2.5 sm:px-4 landscape:px-2.5 h-10 sm:h-12 landscape:h-8 bg-[#E52521] hover:bg-[#ff3b37] active:bg-[#a61512] border-2 border-white rounded-lg text-white text-[10px] sm:text-sm landscape:text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none shadow-[0_3px_0_#800] active:translate-y-0.5"
              >
                <span>▲</span>
                <span>JUMP</span>
              </button>

              <button
                onClick={jumpFront}
                title="Jump Forward (Leap Right)"
                className="px-2 sm:px-4 landscape:px-2.5 h-10 sm:h-12 landscape:h-8 bg-[#E52521] hover:bg-[#ff3b37] active:bg-[#a61512] border-2 border-white rounded-lg text-white text-[9px] sm:text-sm landscape:text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none shadow-[0_3px_0_#800] active:translate-y-0.5"
              >
                <span>FRONT</span>
                <span>↱</span>
              </button>
            </div>

            {/* Enter Pipe Button */}
            <button
              onClick={() => {
                const s = stateRef.current;
                const mx = s.mario.x + s.mario.width / 2;
                const pipe = s.pipes.find(p => Math.abs(mx - (p.x + 30)) < 35);
                if (pipe) {
                  openPipeModal(pipe.code);
                }
              }}
              title="Enter Pipe Standing On It"
              className="px-3 sm:px-5 landscape:px-3 h-10 sm:h-12 landscape:h-8 bg-[#00A800] hover:bg-[#00c800] active:bg-[#007000] border-2 border-white rounded-lg text-white text-[10px] sm:text-sm landscape:text-[10px] font-bold flex items-center gap-1.5 landscape:gap-1 cursor-pointer select-none shadow-[0_3px_0_#005000] active:translate-y-0.5"
            >
              <span>▼</span>
              <span>PIPE</span>
            </button>

          </div>
        </div>
      </div>

      {/* RETRO WARP PIPE POPUP MODAL */}
      {activePipeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 landscape:p-2 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#000000] border-4 border-[#00A800] rounded-xl shadow-[0_0_50px_rgba(0,168,0,0.6)] overflow-hidden flex flex-col max-h-[90vh] landscape:max-h-[96vh]">
            
            {/* Pipe Modal Header (NES Green Pipe Style) */}
            <div className="bg-[#00A800] border-b-4 border-[#005000] p-4 landscape:p-2 text-white flex items-center justify-between">
              <div className="text-sm sm:text-base md:text-lg landscape:text-xs text-yellow-300 drop-shadow-[2px_2px_0_#000] font-bold uppercase tracking-wider">
                {activePipeData}
              </div>
              <button
                onClick={closePipeModal}
                className="w-8 h-8 landscape:w-6 landscape:h-6 bg-red-600 hover:bg-red-500 border-2 border-white text-white text-sm landscape:text-xs font-bold flex items-center justify-center rounded-lg cursor-pointer"
                title="Exit Pipe"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Content with Enlarged Font Sizes */}
            <div className="p-4 sm:p-7 landscape:p-3 overflow-y-auto space-y-5 landscape:space-y-3 text-white text-xs sm:text-sm leading-relaxed">
              
              {/* PIPE 1: ABOUT */}
              {activePipeData === 'about' && (
                <div className="space-y-5">
                  {/* Player Profile Header Card with Crisp Photo */}
                  <div className="border-3 border-[#FCD116] p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900/90 to-slate-950 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-[0_0_25px_rgba(252,209,22,0.25)]">
                    {/* Clear Portrait Photo Frame */}
                    <div className="relative shrink-0 flex flex-col items-center">
                      <div className="relative w-36 sm:w-44 aspect-[3/4] rounded-xl overflow-hidden border-4 border-[#FCD116] shadow-[0_0_20px_rgba(252,209,22,0.45)] bg-slate-950">
                        <img
                          src={`${import.meta.env.BASE_URL}yash.jpg`}
                          alt="Yash Sahadev Mali"
                          className="w-full h-full object-cover object-top select-none"
                          style={{ imageRendering: 'auto' }}
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent pt-4 pb-2 px-1 text-center">
                          <span className="text-[10px] sm:text-xs text-[#FCD116] font-bold tracking-wider">
                            ★ VERIFIED DEV ★
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="text-center sm:text-left flex-1 space-y-2">
                      <div className="inline-block px-3 py-1 bg-[#E52521] text-white text-[10px] sm:text-xs font-bold rounded-md border border-white tracking-widest">
                        PLAYER 1 DOSSIER
                      </div>
                      <h2 className="text-xl sm:text-3xl text-white font-bold drop-shadow-[2px_2px_0_#000000] tracking-wide">
                        YASH MALI
                      </h2>
                      <div className="text-emerald-400 text-xs sm:text-base font-bold">
                        Final-Year CSE Student &amp; Full Stack Developer
                      </div>
                      
                      <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-[10px] sm:text-xs">
                        <span className="px-2.5 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-md font-semibold">
                          🎓 B.E. Computer Science (2023–2027)
                        </span>
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded-md font-semibold">
                          ⭐ CGPA: 7.73 / 10.0
                        </span>
                        <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/50 rounded-md font-semibold">
                          📍 Shegaon, Maharashtra, India
                        </span>
                      </div>

                      <p className="text-slate-100 text-[10px] sm:text-xs pt-2 leading-loose font-pixel drop-shadow-[1px_1px_0_#000]">
                        Final-year Computer Science and Engineering student with two full-stack developer internships, skilled in Java, JavaScript, React.js, and Node.js. Built SSGMCE’s official alumni portal and an exam management portal. Two-time hackathon prize winner; led CSESA’s 25+ member committee as President (2025–26).
                      </p>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                    <div className="bg-slate-900/90 border-2 border-slate-700 p-4 rounded-xl space-y-1">
                      <div className="text-yellow-400 font-bold flex items-center gap-2">
                        <span>🎓</span>
                        <span>EDUCATION</span>
                      </div>
                      <div className="text-white font-medium">B.E. in Computer Science &amp; Engineering</div>
                      <div className="text-slate-400 text-xs">Shri Sant Gajanan Maharaj College of Engineering (SSGMCE)</div>
                      <div className="text-emerald-400 text-xs font-bold">2023 – 2027 (Expected) • CGPA: 7.73 / 10.0</div>
                    </div>

                    <div className="bg-slate-900/90 border-2 border-slate-700 p-4 rounded-xl space-y-1">
                      <div className="text-yellow-400 font-bold flex items-center gap-2">
                        <span>👑</span>
                        <span>LEADERSHIP</span>
                      </div>
                      <div className="text-white font-medium">President — CSESA (2025–26)</div>
                      <div className="text-slate-400 text-xs">Led 25+ member committee, technical events &amp; workshops</div>
                      <div className="text-emerald-400 text-xs font-bold">Coordinator, Innovo'24 &amp; Innovo'25</div>
                    </div>

                    <div className="bg-slate-900/90 border-2 border-slate-700 p-4 rounded-xl space-y-1">
                      <div className="text-yellow-400 font-bold flex items-center gap-2">
                        <span>🏆</span>
                        <span>HACKATHON HONORS</span>
                      </div>
                      <div className="text-white font-medium">3rd Prize MEDHA (Mumbai) &amp; Aavishkar</div>
                      <div className="text-slate-400 text-xs">Winner: Internal Hackathon 2025–26</div>
                      <div className="text-emerald-400 text-xs font-bold">Round 2 Qualifier: Devthon 2025 (450+ Teams)</div>
                    </div>

                    <div className="bg-slate-900/90 border-2 border-slate-700 p-4 rounded-xl space-y-1">
                      <div className="text-yellow-400 font-bold flex items-center gap-2">
                        <span>⚡</span>
                        <span>CORE TECH STACK</span>
                      </div>
                      <div className="text-white font-medium">Full Stack Web &amp; Distributed Systems</div>
                      <div className="text-slate-400 text-xs">Java, JavaScript, React.js, Next.js, Node.js, MongoDB</div>
                      <div className="text-emerald-400 text-xs font-bold">Git, GitHub, Vercel, DSA &amp; OOP</div>
                    </div>
                  </div>
                </div>
              )}

              {/* PIPE 2: SKILLS */}
              {activePipeData === 'skills' && (
                <div className="space-y-4">
                  <div className="text-center text-[#FCD116] text-xs sm:text-sm font-bold">POWER-UP ABILITIES &amp; TECH STACK (FROM RESUME)</div>

                  <div className="space-y-3.5">
                    {/* 1. Programming Languages */}
                    <div className="bg-slate-900 border-2 border-red-500/70 p-4 rounded-xl">
                      <div className="text-red-400 text-xs sm:text-sm mb-2 flex items-center justify-between font-bold">
                        <span className="flex items-center gap-2">
                          <span>🔥</span>
                          <span>PROGRAMMING LANGUAGES</span>
                        </span>
                        <span className="text-[10px] text-red-300 bg-red-950/80 border border-red-800 px-2 py-0.5 rounded">CORE</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        {['Java', 'JavaScript'].map(s => (
                          <span key={s} className="bg-red-950 border border-red-700 px-3 py-1.5 rounded-md text-red-200 font-bold">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* 2. Frontend */}
                    <div className="bg-slate-900 border-2 border-blue-500/70 p-4 rounded-xl">
                      <div className="text-blue-400 text-xs sm:text-sm mb-2 flex items-center justify-between font-bold">
                        <span className="flex items-center gap-2">
                          <span>🍄</span>
                          <span>FRONTEND</span>
                        </span>
                        <span className="text-[10px] text-blue-300 bg-blue-950/80 border border-blue-800 px-2 py-0.5 rounded">UI &amp; CLIENT</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        {['React.js', 'Next.js', 'HTML5', 'CSS3', 'Responsive Web Design'].map(s => (
                          <span key={s} className="bg-blue-950 border border-blue-700 px-3 py-1.5 rounded-md text-blue-200 font-bold">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* 3. Backend & Databases */}
                    <div className="bg-slate-900 border-2 border-green-500/70 p-4 rounded-xl">
                      <div className="text-green-400 text-xs sm:text-sm mb-2 flex items-center justify-between font-bold">
                        <span className="flex items-center gap-2">
                          <span>⭐</span>
                          <span>BACKEND &amp; DATABASES</span>
                        </span>
                        <span className="text-[10px] text-green-300 bg-green-950/80 border border-green-800 px-2 py-0.5 rounded">SERVER &amp; DATA</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        {['Node.js', 'MongoDB'].map(s => (
                          <span key={s} className="bg-green-950 border border-green-700 px-3 py-1.5 rounded-md text-green-200 font-bold">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* 4. Tools & Platforms */}
                    <div className="bg-slate-900 border-2 border-yellow-500/70 p-4 rounded-xl">
                      <div className="text-yellow-400 text-xs sm:text-sm mb-2 flex items-center justify-between font-bold">
                        <span className="flex items-center gap-2">
                          <span>🛠️</span>
                          <span>TOOLS &amp; PLATFORMS</span>
                        </span>
                        <span className="text-[10px] text-yellow-300 bg-yellow-950/80 border border-yellow-800 px-2 py-0.5 rounded">WORKFLOW</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        {['Git', 'GitHub', 'Vercel', 'VS Code', 'Figma', 'AI-assisted development tools'].map(s => (
                          <span key={s} className="bg-yellow-950 border border-yellow-700 px-3 py-1.5 rounded-md text-yellow-200 font-bold">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* 5. Core Concepts */}
                    <div className="bg-slate-900 border-2 border-purple-500/70 p-4 rounded-xl">
                      <div className="text-purple-400 text-xs sm:text-sm mb-2 flex items-center justify-between font-bold">
                        <span className="flex items-center gap-2">
                          <span>⚡</span>
                          <span>CORE CONCEPTS</span>
                        </span>
                        <span className="text-[10px] text-purple-300 bg-purple-950/80 border border-purple-800 px-2 py-0.5 rounded">FOUNDATION</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        {['Data Structures and Algorithms', 'Object-Oriented Programming (OOP)'].map(s => (
                          <span key={s} className="bg-purple-950 border border-purple-700 px-3 py-1.5 rounded-md text-purple-200 font-bold">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PIPE 3: PROJECTS */}
              {activePipeData === 'projects' && (
                <div className="space-y-4">
                  <div className="text-center text-[#FCD116] text-xs sm:text-sm font-bold">COMPLETED QUESTS &amp; PROJECTS (FROM RESUME)</div>

                  <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
                    {portfolioData.projects.map((proj, i) => (
                      <div key={i} className="bg-slate-900 border-2 border-slate-700 p-4 rounded-xl hover:border-[#FCD116] transition-colors space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <div className="text-yellow-300 text-xs sm:text-sm md:text-base font-bold flex items-center gap-2">
                              <span>{proj.title}</span>
                              {proj.status && (
                                <span className="text-[9px] px-2 py-0.5 bg-emerald-950 border border-emerald-600 text-emerald-300 rounded font-bold uppercase">
                                  {proj.status}
                                </span>
                              )}
                            </div>
                            <div className="text-emerald-400 text-xs mt-0.5 font-bold">{proj.tagline || proj.subtitle}</div>
                          </div>

                          <div className="flex items-center gap-2 self-start">
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500 rounded-lg text-cyan-300 text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                                title="Open Live Portal"
                              >
                                <span>🌐</span>
                                <span>LIVE</span>
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-yellow-300 cursor-pointer transition-colors"
                                title="View Code on GitHub"
                              >
                                <Github size={14} />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{proj.description}</p>

                        {/* Resume Bullet Points */}
                        {proj.highlights && proj.highlights.length > 0 && (
                          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                            <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-300">
                              {proj.highlights.map((h, hi) => (
                                <li key={hi} className="leading-relaxed"><span className="text-white">{h}</span></li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tech.map((t, ti) => (
                            <span key={ti} className="text-[11px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-300 font-bold">{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PIPE 4: EXPERIENCE */}
              {activePipeData === 'experience' && (
                <div className="space-y-4">
                  <div className="text-center text-[#FCD116] text-xs sm:text-sm font-bold">WORK EXPERIENCE &amp; LEADERSHIP (FROM RESUME)</div>

                  <div className="space-y-3.5 max-h-[58vh] overflow-y-auto pr-1">
                    {/* Professional Work Experience */}
                    <div className="text-cyan-300 text-xs font-bold flex items-center gap-1.5 px-1">
                      <span>💼</span>
                      <span>INDUSTRY INTERNSHIPS</span>
                    </div>

                    {portfolioData.experience.map((exp, i) => (
                      <div key={i} className="bg-slate-900 border-2 border-emerald-600/70 p-4 rounded-xl space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                          <span className="text-white font-bold text-sm">{exp.company}</span>
                          <span className="text-yellow-400 text-xs font-bold bg-yellow-950/80 border border-yellow-700/60 px-2 py-0.5 rounded self-start sm:self-auto">
                            {exp.duration}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="text-emerald-400 text-xs sm:text-sm font-bold">{exp.role}</span>
                          <span className="text-slate-400 text-xs">📍 {exp.location}</span>
                        </div>

                        {/* Resume Bullet Points */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 mt-2">
                            <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-300">
                              {exp.responsibilities.map((r, ri) => (
                                <li key={ri} className="leading-relaxed"><span className="text-white">{r}</span></li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(exp.technologies || []).map((sk, ski) => (
                            <span key={ski} className="text-[11px] bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded text-emerald-200 font-bold">{sk}</span>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Resume Leadership Section */}
                    <div className="text-yellow-300 text-xs font-bold flex items-center gap-1.5 pt-2 px-1">
                      <span>👑</span>
                      <span>CAMPUS LEADERSHIP &amp; COMMUNITY INITIATIVES</span>
                    </div>

                    {/* 1. CSESA President */}
                    <div className="bg-slate-900 border-2 border-blue-600/70 p-4 rounded-xl space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                        <span className="text-white font-bold text-sm">President, Computer Science and Engineering Students Association (CSESA)</span>
                        <span className="text-yellow-400 text-xs font-bold bg-blue-950 border border-blue-700 px-2 py-0.5 rounded self-start sm:self-auto">
                          Sep 2025 – Sep 2026
                        </span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <ul className="list-disc list-inside text-xs text-slate-200 space-y-1">
                          <li>Led a 25+ member committee, overseeing technical events, workshops, and student initiatives.</li>
                        </ul>
                      </div>
                    </div>

                    {/* 2. Innovo Coordinator */}
                    <div className="bg-slate-900 border-2 border-slate-700 p-4 rounded-xl space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                        <span className="text-white font-bold text-sm">Coordinator, Innovo’24 &amp; Innovo’25 – SSGMCE Annual Technical Fest</span>
                        <span className="text-yellow-400 text-xs font-bold bg-slate-800 border border-slate-700 px-2 py-0.5 rounded self-start sm:self-auto">
                          Aug 2023 – Jun 2025
                        </span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <ul className="list-disc list-inside text-xs text-slate-200 space-y-1">
                          <li>Managed end-to-end planning for Project Expo, RC Car Racing, and inter-college hackathons.</li>
                        </ul>
                      </div>
                    </div>

                    {/* 3. E-Cell & CSESA Tech Team & Event Manager */}
                    <div className="bg-slate-900 border-2 border-slate-700 p-4 rounded-xl space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                        <span className="text-white font-bold text-sm">Technical Team Member &amp; Event Manager, E-Cell &amp; CSESA</span>
                        <span className="text-yellow-400 text-xs font-bold bg-slate-800 border border-slate-700 px-2 py-0.5 rounded self-start sm:self-auto">
                          Jun 2024 – Sep 2025
                        </span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <ul className="list-disc list-inside text-xs text-slate-200 space-y-1">
                          <li>Organized college-level technical events; supported hackathon operations and NEC activities.</li>
                        </ul>
                      </div>
                    </div>

                    {/* 4. NSS Volunteer */}
                    <div className="bg-slate-900 border-2 border-slate-700 p-4 rounded-xl space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                        <span className="text-white font-bold text-sm">Volunteer, National Service Scheme (NSS)</span>
                        <span className="text-emerald-400 text-xs font-bold bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded self-start sm:self-auto">
                          Community Service
                        </span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <ul className="list-disc list-inside text-xs text-slate-200 space-y-1">
                          <li>Completed two 7-day community service camps.</li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* PIPE 5: ACHIEVEMENTS */}
              {activePipeData === 'achievements' && (
                <div className="space-y-4">
                  <div className="text-center text-[#FCD116] text-xs sm:text-sm font-bold">ACHIEVEMENTS &amp; CERTIFICATIONS</div>

                  <div className="space-y-3">
                    {portfolioData.achievements.map((ach, i) => (
                      <div key={i} className="bg-slate-900 border-2 border-yellow-500/60 p-4 rounded-xl flex items-start gap-4">
                        <span className="text-2xl">🏆</span>
                        <div>
                          <div className="text-yellow-300 text-xs sm:text-sm md:text-base font-bold">{ach.title}</div>
                          <div className="text-emerald-400 text-xs mt-1 font-bold">{ach.place} • {ach.organizer}</div>
                          <p className="text-slate-200 text-xs sm:text-sm mt-2 leading-relaxed">{ach.description}</p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t-2 border-slate-800 pt-3">
                      <div className="text-center text-cyan-300 text-xs sm:text-sm font-bold mb-3">VERIFIED CERTIFICATIONS</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {portfolioData.certifications.map((cert, ci) => (
                          <div key={ci} className="bg-slate-900 border border-cyan-500/40 p-3 rounded-lg flex items-center gap-3">
                            <span className="text-xl">📜</span>
                            <div>
                              <div className="text-white text-xs font-bold">{cert.title}</div>
                              <div className="text-cyan-400 text-[10px] mt-0.5">{cert.issuer} • {cert.badge}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PIPE 6: EDUCATION */}
              {activePipeData === 'education' && (
                <div className="space-y-4">
                  <div className="text-center text-[#FCD116] text-xs sm:text-sm font-bold">ACADEMIC EDUCATION (FROM RESUME)</div>

                  <div className="space-y-3.5">
                    <div className="bg-slate-900 border-2 border-purple-500/70 p-5 rounded-xl space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs sm:text-sm">
                        <span className="text-yellow-300 font-bold text-sm sm:text-base">Bachelor of Engineering (B.E.) in Computer Science and Engineering</span>
                        <span className="text-purple-300 text-xs font-bold bg-purple-950/80 border border-purple-700 px-2.5 py-1 rounded-md self-start sm:self-auto">
                          2023 – 2027 (Expected)
                        </span>
                      </div>
                      
                      <div className="text-white text-xs sm:text-sm font-bold flex items-center gap-2">
                        <span>🏛️</span>
                        <span>Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon, Maharashtra</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded-md font-bold text-xs sm:text-sm">
                          ⭐ CGPA: 7.73 / 10.0
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/50 rounded-md font-bold text-xs">
                          Final-Year CSE Student
                        </span>
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded-md font-bold text-xs">
                          📍 Shegaon, Maharashtra
                        </span>
                      </div>

                      <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
                        <div className="text-yellow-400 font-bold">KEY COURSEWORK &amp; CORE FOUNDATIONS (FROM RESUME):</div>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Data Structures and Algorithms',
                            'Object-Oriented Programming (OOP)',
                            'React.js & Full Stack Web Development',
                            'Node.js & MongoDB Databases',
                            'System Architecture & APIs',
                            'Computer Networks & Security'
                          ].map(c => (
                            <span key={c} className="bg-slate-950 border border-slate-700 px-2.5 py-1 rounded text-cyan-300 font-bold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-300">
                        <div className="text-yellow-400 font-bold">CAMPUS CONTRIBUTIONS:</div>
                        <ul className="list-disc list-inside space-y-1 text-slate-200">
                          <li>Official Developer of SSGMCE Alumni Portal (<span className="text-cyan-300 font-bold">alumni.ssgmce.ac.in</span>)</li>
                          <li>Developer of SSGMCE Exam Centre Daily Automation Portal</li>
                          <li>President, Computer Science &amp; Engineering Students Association (CSESA 2025–26)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CASTLE / CONTACT */}
              {activePipeData === 'contact' && (
                <div className="space-y-4">
                  <div className="text-center text-[#FCD116] text-xs sm:text-sm md:text-base font-bold">
                    🚩 STAGE CLEAR! WARP MESSAGE TO YASH MALI
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold">
                    <a
                      href="mailto:yashsmali91@gmail.com"
                      className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 p-3 sm:p-3.5 rounded-xl text-cyan-300 flex items-center gap-3 cursor-pointer transition-colors"
                      title="Send email"
                    >
                      <span className="text-xl shrink-0">✉</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email</div>
                        <div className="text-white text-xs sm:text-sm truncate">yashsmali91@gmail.com</div>
                      </div>
                    </a>

                    <a
                      href="tel:+918830651820"
                      className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-emerald-400 p-3 sm:p-3.5 rounded-xl text-emerald-300 flex items-center gap-3 cursor-pointer transition-colors"
                      title="Call direct"
                    >
                      <span className="text-xl shrink-0">📞</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phone</div>
                        <div className="text-white text-xs sm:text-sm truncate">+91-8830651820</div>
                      </div>
                    </a>

                    <a
                      href="https://linkedin.com/in/yashpatilmali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-blue-400 p-3 sm:p-3.5 rounded-xl text-blue-300 flex items-center gap-3 cursor-pointer transition-colors"
                      title="Open LinkedIn Profile"
                    >
                      <Linkedin size={20} className="text-blue-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">LinkedIn</div>
                        <div className="text-white text-xs sm:text-sm truncate">in/yashpatilmali</div>
                      </div>
                    </a>

                    <a
                      href="https://github.com/yashpatilmali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-purple-400 p-3 sm:p-3.5 rounded-xl text-purple-300 flex items-center gap-3 cursor-pointer transition-colors"
                      title="Open GitHub Profile"
                    >
                      <Github size={20} className="text-purple-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">GitHub</div>
                        <div className="text-white text-xs sm:text-sm truncate">github.com/yashpatilmali</div>
                      </div>
                    </a>

                    {/* Resume Portfolio Link */}
                    <a
                      href="https://yashpatilmaliportfolio.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-yellow-400 p-3 sm:p-3.5 rounded-xl text-yellow-300 flex items-center gap-3 cursor-pointer transition-colors"
                      title="Open Live Portfolio Web App"
                    >
                      <span className="text-xl shrink-0">🌐</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Portfolio</div>
                        <div className="text-white text-xs sm:text-sm truncate">yashpatilmaliportfolio.vercel.app</div>
                      </div>
                    </a>

                    {/* Resume Location */}
                    <div className="bg-slate-900 border-2 border-slate-700 p-3 sm:p-3.5 rounded-xl text-amber-300 flex items-center gap-3">
                      <span className="text-xl shrink-0">📍</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Location</div>
                        <div className="text-white text-xs sm:text-sm truncate">Shegaon, Maharashtra, India</div>
                      </div>
                    </div>
                  </div>

                  {contactSubmitted ? (
                    <div className="bg-emerald-950 border-2 border-emerald-500 p-4 rounded-xl text-center text-emerald-200 text-xs sm:text-sm font-bold animate-bounce-gentle">
                      ★ MESSAGE TRANSMITTED TO YASH MALI! THANK YOU! ★
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3 bg-slate-950 p-4 rounded-xl border-2 border-slate-800 text-xs sm:text-sm">
                      <div className="text-yellow-400 text-xs sm:text-sm font-bold">LEAVE A WARP MESSAGE:</div>
                      <input
                        type="text"
                        placeholder="YOUR NAME"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-slate-900 border-2 border-slate-700 p-3 rounded-lg text-white text-xs sm:text-sm focus:border-yellow-400 outline-none font-pixel"
                      />
                      <input
                        type="email"
                        placeholder="YOUR EMAIL"
                        required
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-slate-900 border-2 border-slate-700 p-3 rounded-lg text-white text-xs sm:text-sm focus:border-yellow-400 outline-none font-pixel"
                      />
                      <textarea
                        rows={3}
                        placeholder="YOUR MESSAGE / OPPORTUNITY"
                        required
                        value={contactForm.message}
                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-slate-900 border-2 border-slate-700 p-3 rounded-lg text-white text-xs sm:text-sm focus:border-yellow-400 outline-none font-pixel"
                      />
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full py-3.5 bg-[#E52521] hover:bg-[#ff3b37] disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg border-2 border-white text-xs sm:text-sm cursor-pointer shadow-[0_3px_0_#800] transition-colors"
                      >
                        {isSending ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE ✉'}
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>

            {/* Modal Navigation Footer */}
            <div className="bg-[#111116] border-t-2 border-slate-800 p-4 landscape:p-2 flex items-center justify-center">
              <button
                onClick={closePipeModal}
                className="px-8 landscape:px-5 py-3 landscape:py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border-2 border-slate-600 rounded-lg text-white text-xs sm:text-sm landscape:text-xs font-bold cursor-pointer transition-colors shadow-[0_3px_0_#000]"
              >
                ▲ EXIT PIPE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}