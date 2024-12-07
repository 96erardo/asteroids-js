import { Game } from './shared/Game'; 
import { Display } from './shared/Display'; 
import { Cursor } from './shared/objects/Cursor'; 
import './index.css';

const keys = new Set<string>();
const cursor = new Cursor();
const game = new Game()
const display = new Display();

let lastTime = 0;

document.addEventListener('keydown', (e) => {
  keys.add(e.code)

  if (e.code === 'Escape') {
    if (game.isPaused()) {
      lastTime = 0;

      game.resume();

      requestAnimationFrame(run);

    } else {
      game.pause();
    }
  }

});

document.addEventListener('keyup', (e) => {
  keys.delete(e.code)
});

display.canvas.addEventListener('mousemove', (e) => {
  cursor.point.set(e.offsetX, e.offsetY);
})

display.canvas.addEventListener('mousedown', () => {
  cursor.onPress();
})

display.canvas.addEventListener('mouseup', () => {
  cursor.onRelease();
})

function run (timestamp: DOMHighResTimeStamp) {
  const dt = lastTime === 0 ? 0 : (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  game.update(dt, keys, cursor);

  display.draw(game.state);

    if (!game.isPaused()) {
      requestAnimationFrame(run);
    }
}

requestAnimationFrame(run);