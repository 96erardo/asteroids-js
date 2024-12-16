import { State } from '../State';
import { Score } from './Score';
import { QuadTree } from './QuadTree';
import { Bullets } from '../../modules/ship/Bullet';
import { Ship, ShipStatus } from '../../modules/ship/Ship';
import { SpawnSpace } from '../../modules/ship/SpawnSpace';
import { Manager as AsteroidsManager } from '../../modules/asteroid/Manager';
import { Entity, EntityType } from './Entity';

export class Collision {
  constructor () {};

  detect (
    ship: Ship,
    asteroids: AsteroidsManager,
    bullets: Bullets,
    score: Score,
    quadTree: QuadTree,
  ): State {

    if (ship.status === ShipStatus.Alive) {
      const withShip = quadTree.retrieve(ship);
  
      withShip.some((entity) => {
        if (entity.name === EntityType.Asteroid) {
          if (areRectsColliding(ship, entity)) {
            ship.onCollision();

            return true;
          }
        }

        return false;
      })
    }

    if (ship.status === ShipStatus.Dead && ship.respawn.isCompleted()) {
      const emptySpace = new SpawnSpace();

      const isFree = asteroids.asteroids.every(a => areRectsColliding(emptySpace, a) === false);

      if (isFree) {
        ship.reset();
      }
    }

    bullets.list.forEach(bullet => {
      const withBullet = quadTree.retrieve(bullet);

      withBullet.forEach((entity) => {
        if (entity.name === EntityType.Asteroid) {
          if (areRectsColliding(bullet, entity)) {
            bullet.onCollision();
            entity.onCollision();

            score.point(entity);
          }
        }
      })
    })

    return new State(ship, asteroids, score, bullets, quadTree);
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