import { State } from '../State';
import { QuadTree } from './QuadTree';
import { Ship } from '../../modules/ship/Ship';
import { Bullets } from '../../modules/ship/Bullet';
import { Manager as AsteroidsManager } from '../../modules/asteroid/Manager';
import { Entity, EntityType } from '../types';

export class Collision {
  constructor () {};

  detect (
    ship: Ship,
    asteroids: AsteroidsManager,
    bullets: Bullets,
    quadTree: QuadTree,
  ): State {
    const withShip = quadTree.retrieve(ship);

    withShip.forEach((entity) => {
      if (entity.name === EntityType.Asteroid) {
        if (areRectsColliding(ship, entity)) {
          ship.onCollision();
          entity.onCollision();
        }
      }
    })

    bullets.list.forEach(bullet => {
      const withBullet = quadTree.retrieve(bullet);

      withBullet.forEach((entity) => {
        if (entity.name === EntityType.Asteroid) {
          if (areRectsColliding(bullet, entity)) {
            bullet.onCollision();
            entity.onCollision();
          }
        }
      })
    })

    return new State(ship, asteroids, bullets, quadTree);
  }
}

function areRectsColliding (a: Entity, b: Entity): boolean {
  return (
    (a.x < b.x + b.width) &&
    (a.x + a.width > b.x) &&
    (a.y < b.y + b.height) &&
    (a.y + a.height > b.y)
  );
}