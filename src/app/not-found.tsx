// PASO 1: Marcar como Componente de Cliente
// Esto es OBLIGATORIO porque usamos hooks de React (useEffect, useRef) para el juego.
"use client";

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout'; // Tu layout principal

export default function NotFoundPage() {
  // PASO 2: Referencias para interactuar con el DOM
  // En React, no usamos document.getElementById. Usamos refs.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextCanvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const highScoreRef = useRef<HTMLSpanElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // PASO 3: Toda la lógica del juego dentro de un useEffect
  // Esto asegura que el código se ejecute solo en el navegador, después de que la página cargue.
  useEffect(() => {
    // Pegamos aquí todo el código del juego, con pequeñas adaptaciones
    let canvas = canvasRef.current;
    let ctx = canvas ? canvas.getContext('2d') : null;
    let nextCanvas = nextCanvasRef.current;
    let nextCtx = nextCanvas ? nextCanvas.getContext('2d') : null;
    let scoreElement = scoreRef.current;
    let highScoreElement = highScoreRef.current;
    let tetrisContainer = canvasContainerRef.current;

    // Si alguno de los elementos esenciales no existe, detenemos la ejecución.
    if (!canvas || !ctx || !nextCanvas || !nextCtx || !scoreElement || !highScoreElement || !tetrisContainer) {
      console.error("Error: Uno o más elementos del canvas del Tetris no se encontraron.");
      return;
    }

    let block_w = 0, block_h = 0, board: number[][] = [], current_piece_shape: number[][], current_piece_type_idx = 0, next_piece_shape: number[][] | null = null, next_piece_type_idx = 0, current_x = 0, current_y = 0, lose = false, score = 0, next_block_size = 0;
    let intervalId: number | undefined;

    const COLS = 10, ROWS = 20, EMPTY = -1;
    const pieces: number[][][][] = [
        [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]], // I
        [[[1,0,0],[1,1,1],[0,0,0]]],                 // J
        [[[0,0,1],[1,1,1],[0,0,0]]],                 // L
        [[[1,1],[1,1]]],                             // O
        [[[0,1,1],[1,1,0],[0,0,0]]],                 // S
        [[[0,1,0],[1,1,1],[0,0,0]]],                 // T
        [[[1,1,0],[0,1,1],[0,0,0]]]                  // Z
    ];
    const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

    function init_board() {
        board = [];
        for (let y = 0; y < ROWS; ++y) {
            board[y] = [];
            for (let x = 0; x < COLS; ++x) board[y][x] = EMPTY;
        }
    }

    function generate_random_piece() {
        const type_idx = Math.floor(Math.random() * pieces.length);
        return { shape: pieces[type_idx][0], type_idx: type_idx };
    }

    function new_piece() {
        if (!next_piece_shape) {
            const first_piece_data = generate_random_piece();
            current_piece_shape = first_piece_data.shape;
            current_piece_type_idx = first_piece_data.type_idx;
        } else {
            current_piece_shape = next_piece_shape;
            current_piece_type_idx = next_piece_type_idx;
        }
        
        const next_data = generate_random_piece();
        next_piece_shape = next_data.shape;
        next_piece_type_idx = next_data.type_idx;
        draw_next_piece();

        current_x = Math.floor((COLS - current_piece_shape[0].length) / 2);
        current_y = 0;
        if (!valid_move(0, 0)) lose = true;
    }
    
    function valid_move(dx: number, dy: number, piece_to_check_shape_param?: number[][]) {
        const shape_to_use = piece_to_check_shape_param || current_piece_shape;
        const next_x_pos = current_x + dx, next_y_pos = current_y + dy;

        for (let y_check = 0; y_check < shape_to_use.length; ++y_check) {
            for (let x_check = 0; x_check < shape_to_use[y_check].length; ++x_check) {
                if (shape_to_use[y_check][x_check]) {
                    if (next_y_pos + y_check >= ROWS || next_x_pos + x_check < 0 || next_x_pos + x_check >= COLS || (board[next_y_pos + y_check] && board[next_y_pos + y_check][next_x_pos + x_check] !== EMPTY)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function freeze_piece() {
        for (let y_freeze = 0; y_freeze < current_piece_shape.length; ++y_freeze) {
            for (let x_freeze = 0; x_freeze < current_piece_shape[y_freeze].length; ++x_freeze) {
                if (current_piece_shape[y_freeze][x_freeze] && board[current_y + y_freeze]) {
                   board[current_y + y_freeze][current_x + x_freeze] = current_piece_type_idx;
                }
            }
        }
        clear_lines();
        new_piece();
    }

    function clear_lines() {
        let lines_cleared = 0;
        for (let y = ROWS - 1; y >= 0; --y) {
            if (board[y].every(cell => cell !== EMPTY)) {
                lines_cleared++;
                board.splice(y, 1);
                board.unshift(Array(COLS).fill(EMPTY));
                y++;
            }
        }
        if (lines_cleared > 0) {
            score += lines_cleared * 100 * lines_cleared;
            if (scoreElement) scoreElement.textContent = score.toString();
            update_high_score(score);
        }
    }
    
    function update_high_score(currentScore: number) {
        const storedHighScore = parseInt(localStorage.getItem('tetrisHighScore') || '0');
        if (currentScore > storedHighScore) {
            localStorage.setItem('tetrisHighScore', currentScore.toString());
            if (highScoreElement) highScoreElement.textContent = currentScore.toLocaleString();
        }
    }

    function rotate_piece(shape_param: number[][]) {
        const new_shape: number[][] = [];
        for (let y_rotate = 0; y_rotate < shape_param.length; ++y_rotate) {
            new_shape[y_rotate] = [];
            for (let x_rotate = 0; x_rotate < shape_param[y_rotate].length; ++x_rotate) {
                new_shape[y_rotate][x_rotate] = shape_param[shape_param[y_rotate].length - 1 - x_rotate][y_rotate];
            }
        }
        return new_shape;
    }

    function draw_block(context_param: CanvasRenderingContext2D, x_pos: number, y_pos: number, color_idx_param: number, block_width: number, block_height: number) {
        if (color_idx_param === EMPTY) return;
        context_param.fillStyle = colors[color_idx_param];
        context_param.fillRect(block_width * x_pos, block_height * y_pos, block_width - 1, block_height - 1);
    }
    
    function draw_next_piece() {
        if (!nextCtx || !nextCanvas || !next_piece_shape) return;
        nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
        
        const piece_w = next_piece_shape[0].length * next_block_size;
        let actual_piece_h = next_piece_shape.filter(row => row.some(cell => cell !== 0)).length;
        const piece_h = actual_piece_h * next_block_size;

        const offset_x = (nextCanvas.width - piece_w) / 2 / next_block_size;
        const offset_y = (nextCanvas.height - piece_h) / 2 / next_block_size;

        for (let y = 0; y < next_piece_shape.length; ++y) {
            for (let x = 0; x < next_piece_shape[y].length; ++x) {
                if (next_piece_shape[y][x]) {
                    draw_block(nextCtx, x + offset_x, y + offset_y, next_piece_type_idx, next_block_size, next_block_size);
                }
            }
        }
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < COLS; ++x) {
            for (let y = 0; y < ROWS; ++y) {
                if (board[y] && board[y][x] !== EMPTY) {
                    draw_block(ctx, x, y, board[y][x], block_w, block_h);
                }
            }
        }
        for (let y = 0; y < current_piece_shape.length; ++y) {
            for (let x = 0; x < current_piece_shape[y].length; ++x) {
                if (current_piece_shape[y][x]) {
                    draw_block(ctx, current_x + x, current_y + y, current_piece_type_idx, block_w, block_h);
                }
            }
        }
    }

    function tick() {
        if (lose) {
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
            ctx.font = '20px Orbitron, sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('¡Juego Terminado!', canvas.width / 2, canvas.height / 2);
            ctx.font = '14px Roboto, sans-serif';
            ctx.fillText('Presiona R para Reiniciar', canvas.width / 2, canvas.height / 2 + 22);
            if (intervalId !== undefined) clearInterval(intervalId);
            return;
        }

        if (valid_move(0, 1)) {
            current_y++;
        } else {
            freeze_piece();
        }
        render();
    }

    function new_game() {
        if (intervalId !== undefined) clearInterval(intervalId);
        init_board();
        next_piece_shape = null;
        new_piece();
        lose = false;
        score = 0;
        if (scoreElement) scoreElement.textContent = score.toString();
        const storedHighScore = parseInt(localStorage.getItem('tetrisHighScore') || '0');
        if (highScoreElement) highScoreElement.textContent = storedHighScore.toLocaleString();
        intervalId = window.setInterval(tick, 700);
        render();
        draw_next_piece();
    }

    function key_press(key_code: number) {
        if (lose && key_code === 82) { new_game(); return; }
        if (lose) return;
        switch (key_code) {
            case 37: if (valid_move(-1, 0)) current_x--; break;
            case 39: if (valid_move(1, 0)) current_x++; break;
            case 40: if (valid_move(0, 1)) current_y++; break;
            case 38: const rotated = rotate_piece(current_piece_shape); if (valid_move(0, 0, rotated)) current_piece_shape = rotated; break;
            case 32: while(valid_move(0,1)) current_y++; tick(); break;
        }
        render();
    }
    
    // Setup
    const containerWidth = tetrisContainer.offsetWidth;
    block_w = Math.floor(containerWidth / COLS);
    block_h = block_w;
    canvas.width = COLS * block_w;
    canvas.height = ROWS * block_h;
    next_block_size = Math.floor(block_w * 0.8) > 20 ? Math.floor(block_w * 0.8) : 15;
    nextCanvas.width = 4 * next_block_size;
    nextCanvas.height = 4 * next_block_size;

    const handleKeyDown = (e: KeyboardEvent) => {
        if ([32, 37, 38, 39, 40, 82].includes(e.keyCode)) {
            e.preventDefault();
        }
        key_press(e.keyCode);
    };

    document.addEventListener('keydown', handleKeyDown);
    new_game();

    // PASO 4: Limpieza de efectos
    // Esto es crucial para evitar memory leaks. Se ejecuta cuando el usuario navega a otra página.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, []); // El array vacío [] significa que este efecto solo se ejecuta una vez.


  return (
    <Layout>
      <Head>
        <title>Página No Encontrada (404) | Datelia</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      {/* PASO 5: Todo el CSS va aquí adentro. */}
      {/* Usamos `global` porque el CSS original afecta a tags como `body`, `h1`, etc. */}
      <style jsx global>{`
        :root {
            --primary-color-404: #facc15; /* Usando el amarillo de tu tema */
            --secondary-color-404: #9ca3af;
            --background-color-404: #111827; /* Usando el gris oscuro de tu tema */
            --text-color-404: #e5e7eb;
            --accent-color-404: #3b82f6; /* Usando el azul de tu tema */
            --game-bg-404: #1f2937;
            --border-color-404: #4b5563;
        }

        .body-404 {
            font-family: 'Roboto', sans-serif;
            background-color: var(--background-color-404);
            color: var(--text-color-404);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            overflow-x: hidden;
        }
        
        /* ... el resto de tu CSS va aquí ... */
        /* He reemplazado las variables para que no colisionen con tu globals.css */

        .logo-container-404 { margin-bottom: 30px; text-align: center; }
        #header-logo-404 {
            max-width: 250px;
            height: auto;
            filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.7));
            transition: transform 0.3s ease;
        }
        #header-logo-404:hover { transform: scale(1.05); }

        .container-404 {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: flex-start;
            gap: 30px;
            max-width: 1200px;
            width: 100%;
            padding: 20px;
            background-color: rgba(0,0,0,0.2);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

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
        
        /* Media Queries */
        @media (max-width: 992px) {
            .game-section-404 { flex-direction: column; width: 100%; max-width: 450px; margin: 0 auto; }
            .game-info-404 { flex-direction: row; justify-content: space-around; align-items: center; }
            #next-piece-container { flex-grow: 1; }
        }
        @media (max-width: 768px) {
            .container-404 { flex-direction: column; align-items: center; }
            .text-content-404, .game-section-404 { width: 100%; max-width: 450px; }
            .game-info-404 { flex-direction: column; }
        }
        #tetris-canvas-container { width: 100%; max-width: 300px; margin: 0 auto; }
        #tetris-canvas { display: block; max-width: 100%; height: auto; }
      `}</style>

      {/* PASO 6: El HTML va aquí. */}
      {/* Usamos los componentes de React y `className` en lugar de `class`. */}
      <div className="body-404">
        <main>
          <div className="logo-container-404">
            <Link href="/" aria-label="Volver al Inicio de Datelia">
              <Image src="/images/logo.png" alt="Datelia Logo" width={250} height={60} id="header-logo-404" />
            </Link>
          </div>

          <div className="container-404">
            <div className="text-content-404">
              <h1 className="h1-404">Página No Encontrada</h1>
              <h2 className="h2-404">Parece que te has perdido en el cosmos digital.</h2>
              <p className="p-404">La página que buscas no existe o ha sido movida. Mientras nuestros sistemas te reubican, ¿por qué no pruebas tus habilidades con un clásico?</p>
              <Link href="/" className="home-link" style={{ 
                display: 'inline-block',
                color: 'var(--primary-color-404)',
                textDecoration: 'none',
                fontWeight: 'bold',
                marginTop: '20px',
                padding: '10px 20px',
                border: '2px solid var(--primary-color-404)',
                borderRadius: '50px',
                transition: 'background-color 0.3s ease, color 0.3s ease'
              }}>
                Volver al Inicio
              </Link>
            </div>

            <div className="game-section-404">
              <div className="game-container-404">
                <h3 className="h3-404">¿Un descanso? ¡Juega al Tetris!</h3>
                <div id="tetris-canvas-container" ref={canvasContainerRef}>
                  <canvas id="tetris-canvas" ref={canvasRef}></canvas>
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