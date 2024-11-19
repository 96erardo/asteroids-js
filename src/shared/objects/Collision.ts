import { State } from '../State';
import { QuadTree } from './QuadTree';
import { Ship } from '../../modules/ship/Ship';
import { Bullets } from '../../modules/ship/Bullet';
import { Asteroid } from '../../modules/asteroid/Asteroid';
import { Entity, EntityType } from '../types';

export class Collision {
  constructor () {};

  detect (
    ship: Ship,
    asteroids: Array<Asteroid>,
    bullets: Bullets,
    quadTree: QuadTree,
  ): State {
    const withShip = quadTree.retrieve(ship);

    if (withShip.length > 0) {
      withShip.forEach((e, i) => {
        if (e.name === EntityType.Asteroid) {
          console.log(i, e.x, e.y, e.width, e.height, ship.x, ship.y, ship.width, ship.height)
        }
      });
    }

    const isColliding = withShip.some((entity) => {
      return (
        entity.name === EntityType.Asteroid &&
        areRectsColliding(ship, entity)
      )
    })

    if (isColliding) {
      ship.onCollision(EntityType.Asteroid);
    } else {
      ship.onNoCollision();
    }

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