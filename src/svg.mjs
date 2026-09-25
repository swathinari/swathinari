// contribution grid, and each square fades out just as he reaches it.
// Light/dark is handled with a prefers-color-scheme media query, so one file
// works in both GitHub themes when embedded with <img>.





const CELL = 12; // square size
const GAP = 3; // gap between squares
const PITCH = CELL + GAP; // center-to-center distance
const MARGIN_X = 14;
const MARGIN_Y = 14;
const R = CELL * 0.85; // Pac-Man radius
const SECONDS_PER_CELL = 0.12; // travel speed (bigger = slower)
const CHOMP = 0.45; // seconds per full open/close cycle
const MOUTH_OPEN = 45; // widest mouth half-angle (degrees)
const MOUTH_SHUT = 2; // nearly-closed mouth half-angle (degrees)

const round = (n) => Math.round(n * 100) / 100;

const ROWS = 7;
const opposite = (r) => (r === 0 ? ROWS - 1 : 0);

const exists = (grid, w, d) => !!(grid[w] && grid[w][d]);

function neighbors(grid, w, d) {
  const out = [];
  if (exists(grid, w, d - 1)) out.push([w, d - 1]);
  if (exists(grid, w, d + 1)) out.push([w, d + 1]);
  if (exists(grid, w - 1, d)) out.push([w - 1, d]);
@@ -228,38 +232,32 @@
  const motion =
    "M" + order.map(([w, d]) => `${round(cx(w))},${round(cy(d))}`).join(" L");

  const pac = `
  <g class="pac">
    <path d="${pacPath(MOUTH_SHUT)}">
      <animate attributeName="d" dur="${CHOMP}s" repeatCount="indefinite"
        calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        values="${pacPath(MOUTH_SHUT)};${pacPath(MOUTH_OPEN)};${pacPath(MOUTH_SHUT)}"/>
    </path>
    <animateMotion dur="${dur}s" repeatCount="indefinite" rotate="auto"
      path="${motion}" keyPoints="0;1" keyTimes="0;1" calcMode="linear"/>
  </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="sans-serif">
  <style>
    :root {
      --empty:#ebedf0; --l1:#9be9a8; --l2:#40c463; --l3:#30a14e; --l4:#216e39;
      --pac:#ffd93b; --pellet:#e0a92e;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --empty:#161b22; --l1:#0e4429; --l2:#006d32; --l3:#26a641; --l4:#39d353;
        --pac:#ffd93b; --pellet:#ffe08a;
      }
    }
    .empty { fill: var(--empty); }
    .l1 { fill: var(--l1); } .l2 { fill: var(--l2); }
    .l3 { fill: var(--l3); } .l4 { fill: var(--l4); }
    .pac { fill: var(--pac); }
    .pellet { fill: var(--pellet); }
  </style>
  <g>${emptyCells.join("")}</g>
  <g>${pellets.join("")}</g>
  <g>${squares.join("")}</g>
  ${pac}
</svg>`;
}
