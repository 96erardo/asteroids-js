import { State } from '../State';
import { Score } from './Score';
import { QuadTree } from './QuadTree';
import { Saucer } from '../../modules/saucer/Saucer';
import { Asteroid } from '../../modules/asteroid/Asteroid';
import { Bullets, Bullet } from '../../modules/ship/Bullet';
import { Ship, ShipStatus } from '../../modules/ship/Ship';
import { Manager } from '../../modules/saucer/Manager';
import { SpawnSpace } from '../../modules/ship/SpawnSpace';
import { Manager as AsteroidsManager } from '../../modules/asteroid/Manager';
import { Entity, EntityType } from './Entity';

export class Collision {
  constructor () {};

  detect (
    ship: Ship,
    asteroids: AsteroidsManager,
    saucer: Manager,
    bullets: Bullets,
    score: Score,
    quadTree: QuadTree,
  ): State {

    if (ship.status === ShipStatus.Alive) {
      const withShip = quadTree.retrieve(ship);
  
      withShip.some((entity) => {
        if (
          entity.name === EntityType.Asteroid ||
          entity.name === EntityType.Saucer ||
          (entity instanceof Bullet && entity.from === 'saucer')
        ) {
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
        if (entity instanceof Asteroid) {
          if (areRectsColliding(bullet, entity)) {
            bullet.onCollision();
            entity.onCollision();

            if (bullet.from === 'ship') {
              score.point(entity);
            }
          }
        
        } else if (entity instanceof Saucer && bullet.from === 'ship') {
          if (areRectsColliding(bullet, entity)) {
            entity.onCollision();
            bullet.onCollision();
            
            score.point(entity);
          }
        
        } else if (entity instanceof Ship && bullet.from === 'saucer') {
          if (areRectsColliding(bullet, entity)) {
            entity.onCollision();
            bullet.onCollision();            
          }
        }
      })
    })

    if (saucer.saucer) {
      const withSaucer = quadTree.retrieve(saucer.saucer)

      withSaucer.some(entity => {
        if (entity instanceof Asteroid) {
          if (areRectsColliding(saucer.saucer, entity)) {
            saucer.saucer.onCollision();
            entity.onCollision();            
          }
        }
      })
    }

    return new State(ship, asteroids, saucer, score, bullets, quadTree);
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