"use strict";

// =============================================================
// 汎用: canvas に y = f(x) のグラフを描く関数
//   canvas   : <canvas> 要素
//   f        : 数値 x を受け取って数値を返す関数
//   xMin,xMax: x 軸の表示範囲
//   yMin,yMax: y 軸の表示範囲
// =============================================================
function drawGraph(canvas, f, xMin, xMax, yMin, yMax) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // いったん全部消す
  ctx.clearRect(0, 0, W, H);

  // 実座標 (x, y) を canvas 上のピクセル (px, py) に変換する
  const toPx = (x) => ((x - xMin) / (xMax - xMin)) * W;
  const toPy = (y) => H - ((y - yMin) / (yMax - yMin)) * H;

  // --- 軸を描く ---
  ctx.strokeStyle = "#bbb";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(toPx(xMin), toPy(0)); // x 軸
  ctx.lineTo(toPx(xMax), toPy(0));
  ctx.moveTo(toPx(0), toPy(yMin)); // y 軸
  ctx.lineTo(toPx(0), toPy(yMax));
  ctx.stroke();

  // --- 曲線を描く ---
  ctx.strokeStyle = "#2b6cb0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const steps = 300;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (xMax - xMin) * (i / steps);
    const y = f(x);
    const px = toPx(x);
    const py = toPy(y);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
}

// =============================================================
// シグモイド関数
// =============================================================
function sigmoid(x, a) {
  return 1 / (1 + Math.exp(-a * x));
}

// スライダーとグラフを結びつける
const sigmoidSlider = document.getElementById("sigmoid-a");
const sigmoidValueLabel = document.getElementById("sigmoid-a-value");
const sigmoidCanvas = document.getElementById("sigmoid-canvas");

function renderSigmoid() {
  const a = parseFloat(sigmoidSlider.value);
  sigmoidValueLabel.textContent = a.toFixed(1);
  // x: -10〜10, y: 0〜1 の範囲で描画
  drawGraph(sigmoidCanvas, (x) => sigmoid(x, a), -10, 10, -0.1, 1.1);
}

// スライダーを動かすたびに描き直す
sigmoidSlider.addEventListener("input", renderSigmoid);

// 最初の1回を描画
renderSigmoid();

// =============================================================
// ここに関数を追加していく:
//   1. index.html に <section class="card"> を追加
//   2. ここに f(x) の関数と render〇〇() を書く
//   3. スライダーの input イベントに render を登録
// =============================================================
