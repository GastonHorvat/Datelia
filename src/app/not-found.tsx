// =======================================================================================
// SECCIÓN 1: IMPORTACIONES Y CONFIGURACIÓN DEL COMPONENTE
// =======================================================================================
"use client"; // Esencial: Indica a Next.js que este es un Componente de Cliente para usar hooks.

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import Image from 'next/image';

export default function NotFoundPage() {
  // --- Subsección: Referencias a Elementos del DOM ---
  // Creamos referencias para cada elemento HTML que necesitamos manipular directamente.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextCanvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const highScoreRef = useRef<HTMLSpanElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Mobile Control Refs
  const btnLeftRef = useRef<HTMLButtonElement>(null);
  const btnRightRef = useRef<HTMLButtonElement>(null);
  const btnDownRef = useRef<HTMLButtonElement>(null);
  const btnRotateRef = useRef<HTMLButtonElement>(null);
  const btnDropRef = useRef<HTMLButtonElement>(null);

  // =======================================================================================
  // SECCIÓN 2: LÓGICA DEL JUEGO (DENTRO DE useEffect)
  // =======================================================================================
  // useEffect ejecuta el código solo en el navegador, después de que el HTML se haya renderizado.
  useEffect(() => {
    // --- Subsección: Patrón de Guardia Estricto ---
    // Esta es la comprobación clave que soluciona todos los errores.
    // Si alguno de los elementos del DOM no existe, detenemos la ejecución del juego inmediatamente.
    if (
      !canvasRef.current || !nextCanvasRef.current || !scoreRef.current ||
      !highScoreRef.current || !canvasContainerRef.current
    ) {
      console.error("Error: Elementos del DOM para el juego no encontrados.");
      return; // Salimos del useEffect y no hacemos nada más.
    }

    // Si pasamos la primera comprobación, asignamos las referencias a variables locales.
    const canvas = canvasRef.current;
    const nextCanvas = nextCanvasRef.current;
    const scoreElement = scoreRef.current;
    const highScoreElement = highScoreRef.current;
    const tetrisContainer = canvasContainerRef.current;

    // Obtenemos los contextos 2D y hacemos una segunda comprobación.
    const ctx = canvas.getContext('2d');
    const nextCtx = nextCanvas.getContext('2d');

    // Si los contextos no se pueden crear, también detenemos la ejecución.
    if (!ctx || !nextCtx) {
      console.error("Error: No se pudo obtener el contexto 2D de los canvas.");
      return;
    }

    // --- Subsección: Ámbito Seguro del Juego ---
    // AHORA QUE SABEMOS QUE TODO EXISTE, DEFINIMOS TODA LA LÓGICA DEL JUEGO AQUÍ DENTRO.
    // Esto garantiza a TypeScript que `canvas`, `ctx`, etc., nunca serán `null`.

    // -- Variables y Constantes --
    let block_w = 0, block_h = 0, board: number[][] = [], current_piece_shape: number[][], current_piece_type_idx = 0, next_piece_shape: number[][] | null = null, next_piece_type_idx = 0, current_x = 0, current_y = 0, lose = false, score = 0, next_block_size = 0;
    let intervalId: number | undefined;
    const COLS = 10, ROWS = 20, EMPTY = -1;
    const pieces: number[][][][] = [[[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]], [[[1, 0, 0], [1, 1, 1], [0, 0, 0]]], [[[0, 0, 1], [1, 1, 1], [0, 0, 0]]], [[[1, 1], [1, 1]]], [[[0, 1, 1], [1, 1, 0], [0, 0, 0]]], [[[0, 1, 0], [1, 1, 1], [0, 0, 0]]], [[[1, 1, 0], [0, 1, 1], [0, 0, 0]]]];
    const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

    // -- Funciones de Lógica del Juego --
    function init_board() { board = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY)); }
    function generate_random_piece() { const type_idx = Math.floor(Math.random() * pieces.length); return { shape: pieces[type_idx][0], type_idx }; }
    function new_piece() {
      if (!next_piece_shape) { const data = generate_random_piece(); current_piece_shape = data.shape; current_piece_type_idx = data.type_idx; }
      else { current_piece_shape = next_piece_shape; current_piece_type_idx = next_piece_type_idx; }
      const next_data = generate_random_piece(); next_piece_shape = next_data.shape; next_piece_type_idx = next_data.type_idx;
      draw_next_piece();
      current_x = Math.floor((COLS - (current_piece_shape[0]?.length || 0)) / 2);
      current_y = 0;
      if (!valid_move(0, 0)) lose = true;
    }
    function valid_move(dx: number, dy: number, piece?: number[][]) {
      const shape = piece || current_piece_shape;
      for (let y = 0; y < shape.length; ++y) for (let x = 0; x < shape[y].length; ++x) if (shape[y][x]) {
        const newX = current_x + x + dx, newY = current_y + y + dy;
        if (newY >= ROWS || newX < 0 || newX >= COLS || (board[newY] && board[newY][newX] !== EMPTY)) return false;
      }
      return true;
    }
    function freeze_piece() {
      for (let y = 0; y < current_piece_shape.length; ++y) for (let x = 0; x < current_piece_shape[y].length; ++x) if (current_piece_shape[y][x] && board[current_y + y]) board[current_y + y][current_x + x] = current_piece_type_idx;
      clear_lines();
    }

    function clear_lines() {
      let linesToClear: number[] = [];
      for (let y = ROWS - 1; y >= 0; --y) if (board[y].every(cell => cell !== EMPTY)) linesToClear.push(y);

      if (linesToClear.length > 0) {
        if (intervalId !== undefined) clearInterval(intervalId);

        let step = 0;
        const maxSteps = 6;
        const anim = setInterval(() => {
          step++;
          if (!ctx) return;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let y = 0; y < ROWS; ++y) {
            for (let x = 0; x < COLS; ++x) {
              if (linesToClear.includes(y)) {
                // Flash Effect: White <-> Original Color
                ctx.fillStyle = step % 2 === 0 ? '#ffffff' : colors[board[y][x]];
                ctx.fillRect(block_w * x, block_h * y, block_w - 1, block_h - 1);
              } else if (board[y][x] !== EMPTY) {
                draw_block(ctx, x, y, board[y][x], block_w, block_h);
              }
            }
          }

          if (step >= maxSteps) {
            clearInterval(anim);
            finalize_clear();
          }
        }, 80);
      } else {
        new_piece();
      }
    }

    function finalize_clear() {
      let lines = 0;
      for (let y = ROWS - 1; y >= 0; --y) if (board[y].every(cell => cell !== EMPTY)) { lines++; board.splice(y, 1); board.unshift(Array(COLS).fill(EMPTY)); y++; }
      if (lines > 0) { score += lines * 100 * lines; scoreElement.textContent = score.toString(); update_high_score(score); }

      new_piece();
      if (intervalId !== undefined) clearInterval(intervalId);
      intervalId = window.setInterval(tick, 700);
    }
    function update_high_score(currentScore: number) { const stored = parseInt(localStorage.getItem('tetrisHighScore') || '0'); if (currentScore > stored) { localStorage.setItem('tetrisHighScore', currentScore.toString()); highScoreElement.textContent = currentScore.toLocaleString(); } }
    function rotate_piece(shape: number[][]) { return shape[0].map((_, colIndex) => shape.map(row => row[colIndex]).reverse()); }

    // -- Funciones de Dibujado en Canvas --
    function draw_block(context: CanvasRenderingContext2D, x: number, y: number, colorIdx: number, bw: number, bh: number) { if (colorIdx === EMPTY) return; context.fillStyle = colors[colorIdx]; context.fillRect(bw * x, bh * y, bw - 1, bh - 1); }
    function draw_next_piece() {
      if (!next_piece_shape || !nextCtx) return;
      nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
      const w = (next_piece_shape[0]?.length || 0) * next_block_size, h = next_piece_shape.filter(r => r.some(c => c !== 0)).length * next_block_size;
      const ox = (nextCanvas.width - w) / 2 / next_block_size, oy = (nextCanvas.height - h) / 2 / next_block_size;
      for (let y = 0; y < next_piece_shape.length; ++y) for (let x = 0; x < next_piece_shape[y].length; ++x) if (next_piece_shape[y][x]) draw_block(nextCtx, x + ox, y + oy, next_piece_type_idx, next_block_size, next_block_size);
    }
    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < COLS; ++x) for (let y = 0; y < ROWS; ++y) if (board[y][x] !== EMPTY) draw_block(ctx, x, y, board[y][x], block_w, block_h);
      for (let y = 0; y < current_piece_shape.length; ++y) for (let x = 0; x < current_piece_shape[y].length; ++x) if (current_piece_shape[y][x]) draw_block(ctx, current_x + x, current_y + y, current_piece_type_idx, block_w, block_h);
    }

    // -- Funciones de Control del Juego --
    function tick() {
      if (!ctx) return;
      if (lose) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
        ctx.font = '20px Orbitron, sans-serif'; ctx.fillStyle = 'white'; ctx.textAlign = 'center';
        ctx.fillText('¡Juego Terminado!', canvas.width / 2, canvas.height / 2);
        ctx.font = '14px Roboto, sans-serif'; ctx.fillText('Presiona R para Reiniciar', canvas.width / 2, canvas.height / 2 + 22);
        if (intervalId !== undefined) clearInterval(intervalId); return;
      }
      if (valid_move(0, 1)) current_y++; else freeze_piece();
      render();
    }
    function new_game() {
      if (intervalId !== undefined) clearInterval(intervalId); init_board(); next_piece_shape = null; new_piece();
      lose = false; score = 0; scoreElement.textContent = score.toString();
      const stored = parseInt(localStorage.getItem('tetrisHighScore') || '0'); highScoreElement.textContent = stored.toLocaleString();
      intervalId = window.setInterval(tick, 700); render(); draw_next_piece();
    }
    function key_press(key_code: number) {
      if (lose && key_code === 82) { new_game(); return; }
      if (lose) return;
      switch (key_code) { case 37: if (valid_move(-1, 0)) current_x--; break; case 39: if (valid_move(1, 0)) current_x++; break; case 40: if (valid_move(0, 1)) current_y++; break; case 38: const r = rotate_piece(current_piece_shape); if (valid_move(0, 0, r)) current_piece_shape = r; break; case 32: while (valid_move(0, 1)) current_y++; tick(); break; }
      render();
    }

    // --- Subsección: Setup Inicial y Event Listeners ---
    const containerWidth = tetrisContainer.offsetWidth; block_w = Math.floor(containerWidth / COLS); block_h = block_w;
    canvas.width = COLS * block_w; canvas.height = ROWS * block_h;
    next_block_size = Math.floor(block_w * 0.8) > 20 ? 15 : Math.floor(block_w * 0.8);
    nextCanvas.width = 4 * next_block_size; nextCanvas.height = 4 * next_block_size;


    const handleKeyDown = (e: KeyboardEvent) => { if ([32, 37, 38, 39, 40, 82].includes(e.keyCode)) e.preventDefault(); key_press(e.keyCode); };
    document.addEventListener('keydown', handleKeyDown);

    // --- Mobile Controls Event Listeners ---
    // Helper para añadir listeners de touch/click de forma segura
    const addBtnListener = (ref: React.RefObject<HTMLButtonElement>, code: number) => {
      const btn = ref.current;
      if (!btn) return;

      const handler = (e: MouseEvent | TouchEvent) => {
        e.preventDefault(); // Evita comportamientos por defecto como selección o scroll
        key_press(code);
      };

      // Usamos 'touchstart' para respuesta inmediata en móviles, y click para fallback
      btn.addEventListener('touchstart', handler, { passive: false });
      btn.addEventListener('click', handler);

      return () => {
        btn.removeEventListener('touchstart', handler);
        btn.removeEventListener('click', handler);
      };
    };

    const cleanupLeft = addBtnListener(btnLeftRef, 37);
    const cleanupRight = addBtnListener(btnRightRef, 39);
    const cleanupDown = addBtnListener(btnDownRef, 40);
    const cleanupRotate = addBtnListener(btnRotateRef, 38);
    const cleanupDrop = addBtnListener(btnDropRef, 32);


    new_game(); // Inicia el juego

    // --- Subsección: Limpieza del Componente ---
    // Esto es crucial: se ejecuta cuando el usuario navega a otra página,
    // limpiando el intervalo y el event listener para evitar fugas de memoria.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (intervalId !== undefined) clearInterval(intervalId);

      if (cleanupLeft) cleanupLeft();
      if (cleanupRight) cleanupRight();
      if (cleanupDown) cleanupDown();
      if (cleanupRotate) cleanupRotate();
      if (cleanupDrop) cleanupDrop();
    };

  }, []); // El array vacío `[]` asegura que esto se ejecute solo una vez.

  // =======================================================================================
  // SECCIÓN 3: ESTRUCTURA JSX (HTML Y CSS)
  // =======================================================================================
  return (
    <Layout>
      <Head>
        <title>Página No Encontrada (404) | Datelia</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root { --primary-color-404: #facc15; --secondary-color-404: #9ca3af; --background-color-404: #111827; --text-color-404: #e5e7eb; --accent-color-404: #3b82f6; --game-bg-404: #1f2937; --border-color-404: #4b5563; }
        .body-404 { font-family: 'Roboto', sans-serif; background-color: var(--background-color-404); color: var(--text-color-404); margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; overflow-x: hidden; }
        .logo-container-404 { margin-bottom: 30px; text-align: center; }
        #header-logo-404 { max-width: 250px; height: auto; filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.7)); transition: transform 0.3s ease; }
        #header-logo-404:hover { transform: scale(1.05); }
        .container-404 { display: flex; flex-wrap: wrap; justify-content: space-around; align-items: flex-start; gap: 30px; max-width: 1200px; width: 100%; padding: 20px; background-color: rgba(0,0,0,0.2); border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .text-content-404 { flex: 1; min-width: 300px; padding: 20px; }
        .game-section-404 { flex: 1.5; display: flex; gap: 20px; min-width: 320px; }
        .game-container-404 { flex: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; background-color: var(--game-bg-404); border-radius: 10px; }
        #tetris-canvas { border: 2px solid var(--primary-color-404); background-color: #000; box-shadow: 0 0 15px var(--primary-color-404); }
        .game-info-404 { flex: 1; display: flex; flex-direction: column; gap: 15px; padding: 15px; background-color: var(--game-bg-404); border-radius: 10px; font-size: 0.9em; }
        .game-info-404 h4 { margin: 0 0 5px 0; color: var(--primary-color-404); font-family: 'Orbitron', sans-serif; }
        #score-display, #high-score-display { background-color: #111; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color-404); }
        #current-score, #today-high-score { font-weight: bold; color: var(--accent-color-404); }
        #next-piece-container { display: flex; flex-direction: column; align-items: center; background-color: #111; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color-404); }
        #next-piece-canvas { background-color: #000; border: 1px solid var(--primary-color-404); }
        .controls-info-404 { font-size: 0.9em; color: var(--secondary-color-404); margin-top: 15px; }
        .controls-info-404 strong { color: var(--text-color-404); }
        .h1-404 { font-family: 'Orbitron', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); color: var(--primary-color-404); margin: 0 0 10px 0; text-shadow: 0 0 10px var(--primary-color-404); }
        .h2-404 { font-size: clamp(1.3rem, 4vw, 2rem); color: var(--text-color-404); margin-bottom: 20px; }
        .h3-404 { font-family: 'Orbitron', sans-serif; color: var(--text-color-404); margin-top: 0; }
        .p-404 { font-size: clamp(1rem, 2.5vw, 1.2rem); line-height: 1.6; margin-bottom: 30px; }
        .home-link-404 { display: inline-block; color: var(--primary-color-404); text-decoration: none; font-weight: bold; margin-top: 20px; padding: 10px 20px; border: 2px solid var(--primary-color-404); border-radius: 50px; transition: background-color 0.3s ease, color 0.3s ease; }
        .home-link-404:hover { background-color: var(--primary-color-404); color: var(--background-color-404); }
        @media (max-width: 992px) { 
          .game-section-404 { flex-direction: column; width: 100%; max-width: 350px; margin: 0 auto; } 
          .game-info-404 { flex-direction: row; justify-content: space-around; align-items: center; padding: 10px; } 
          #next-piece-container { flex-grow: 1; max-width: 120px; } 
          #score-display, #high-score-display { font-size: 0.8em; padding: 5px; }
        }
        
        @media (max-width: 768px) { 
          .body-404 { padding-top: 100px; justify-content: flex-start; } /* Added padding for fixed header and alignment */
          .container-404 { flex-direction: column; align-items: center; gap: 15px; padding: 15px; } 
          .text-content-404, .game-section-404 { width: 100%; max-width: 100%; padding: 10px; } 
          .game-info-404 { flex-direction: row; gap: 10px; } 
          
          /* Make Tetris smaller on mobile */
          #tetris-canvas-container { max-width: 220px; } /* Reduced from 300px to fit screen */
          
          /* Hide desktop controls info on mobile */
          .controls-info-404 { display: none; }
          
          /* Adjust headings */
          .h1-404 { font-size: 2rem; }
          .h2-404 { font-size: 1.2rem; }
          .logo-container-404 { margin-bottom: 20px; display: none; } /* Hide duplicate logo on mobile if header already has it, or just reduce margin */
        }
        
        #tetris-canvas-container { width: 100%; max-width: 300px; margin: 0 auto; transition: max-width 0.3s ease; }
        #tetris-canvas { display: block; max-width: 100%; height: auto; }
      
        /* Controles Móviles */
        .mobile-controls {
          display: none; /* Oculto por defecto en desktop */
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
          width: 100%;
          max-width: 280px;
          margin-left: auto;
          margin-right: auto;
        }

        .control-row {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .control-btn {
          background-color: rgba(31, 41, 55, 0.9);
          border: 2px solid var(--primary-color-404);
          color: var(--primary-color-404);
          border-radius: 10px;
          width: 50px; /* Smaller buttons */
          height: 50px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          touch-action: manipulation;
          user-select: none;
          transition: all 0.1s active;
          box-shadow: 0 4px 0 var(--border-color-404);
        }

        .control-btn:active {
          transform: translateY(4px);
          box-shadow: none;
          background-color: #374151;
        }

        .btn-large {
          width: 110px;
        }

        /* Mostrar controles en móviles y tablets */
        @media (max-width: 992px) {
          .mobile-controls { display: flex; }
        }
      `}</style>
      <div className="body-404">
        <main>
          <div className="container-404">
            <div className="text-content-404">
              <div className="logo-container-404">
                <Link href="/" aria-label="Volver al Inicio de Datelia">
                  <Image src="/images/logo.jpg" alt="Datelia Logo" width={250} height={60} id="header-logo-404" />
                </Link>
              </div>
              <h1 className="h1-404">Página No Encontrada</h1>
              <h2 className="h2-404">Parece que te has perdido en el cosmos digital.</h2>
              <p className="p-404">La página que buscas no existe o ha sido movida. Mientras nuestros sistemas te reubican, ¿por qué no pruebas tus habilidades con un clásico?</p>
              <Link href="/" className="home-link-404">
                Volver al Inicio
              </Link>
            </div>
            <div className="game-section-404">
              <div className="game-container-404">
                <h3 className="h3-404">¿Un descanso? ¡Juega al Tetris!</h3>
                <div id="tetris-canvas-container" ref={canvasContainerRef}>
                  <canvas id="tetris-canvas" ref={canvasRef}></canvas>
                </div>

                {/* Controles para Móvil */}
                <div className="mobile-controls">
                  <div className="control-row">
                    <button className="control-btn" ref={btnRotateRef} aria-label="Rotar">↻</button>
                  </div>
                  <div className="control-row">
                    <button className="control-btn" ref={btnLeftRef} aria-label="Izquierda">←</button>
                    <button className="control-btn" ref={btnDownRef} aria-label="Bajar">↓</button>
                    <button className="control-btn" ref={btnRightRef} aria-label="Derecha">→</button>
                  </div>
                  <div className="control-row">
                    <button className="control-btn btn-large" ref={btnDropRef} aria-label="Caída Rápida">DROP</button>
                  </div>
                </div>

                <div className="controls-info-404">
                  Usa las <strong>teclas de flecha</strong> para mover y rotar. <br />
                  <strong>Espacio</strong> para caída rápida.
                </div>
              </div>
              <div className="game-info-404">
                <div id="score-display">
                  <h4>Puntaje</h4>
                  <span id="current-score" ref={scoreRef}>0</span>
                </div>
                <div id="high-score-display">
                  <h4>Mejor Puntaje</h4>
                  <span id="today-high-score" ref={highScoreRef}>0</span>
                </div>
                <div id="next-piece-container">
                  <h4>Siguiente Pieza</h4>
                  <canvas id="next-piece-canvas" ref={nextCanvasRef}></canvas>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}