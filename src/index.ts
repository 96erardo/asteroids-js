import { Game } from './shared/Game'; 
import { Display } from './shared/Display'; 
import { Point } from './shared/objects/Point'; 
import './index.css';

const keys = new Set<string>();
let cursor = new Point(0, 0);
const game = new Game()
const display = new Display();

let lastTime = 0;

document.addEventListener('keydown', (e) => {
  keys.add(e.code)
});

document.addEventListener('keyup', (e) => {
  keys.delete(e.code)
});

display.canvas.addEventListener('mousemove', (e) => {
  cursor.set(e.offsetX, e.offsetY);
})

function run (timestamp: DOMHighResTimeStamp) {
  const dt = lastTime === 0 ? 0 : (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  game.update(dt, keys, cursor);

  display.draw(game.state);

  requestAnimationFrame(run);
}

requestAnimationFrame(run);