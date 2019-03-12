import { images } from './images';
import { lines } from './level';

const carsContainer = new PIXI.Container();
export default carsContainer;

class Car extends PIXI.Sprite {
  speed: number;
  startPoint: string;

  constructor() {
    super(PIXI.Texture.fromImage(images.car));
    this.scale.set(-1, 1);
    this.anchor.set(0.5);
    this.y = 0;
    this.speed = 1;
  }
}

export const cars: Array<Car> = [];
const carsLength = lines.roadLines.length;
let car: Car;

function addCars(amount: number) {
  for (let i = 0; cars.length < amount; i++ ) {
    car = new Car();
    car.y = lines.roadLines[i] - 50;
    cars.push(car);
  }
}
addCars(carsLength);

let positionY = 50;
let positionLuck = 0;
let x = 0;
function placeCars() {
  for (x; x <= cars.length - 1; x++ ) {
    if ( positionY >= 550) {
      positionY = 50;
    }
    positionLuck = Math.random() * 10;
    if (positionLuck >= 5) {
      cars[x].x = 550;
      cars[x].startPoint = 'right';
    } else {
      cars[x].startPoint = 'left';
      cars[x].scale.set(1, -1);
    }
  }
}
placeCars();

export function carsMove(delta: number) {
  cars.forEach(function(item, i, arr) {
    item.startPoint === 'right' ? item.x -= ((item.speed / 4) + delta)
    : item.x += (item.speed / 4) + delta;
    if (item.x > 600) {
      carsContainer.removeChild(item);
    }
    if (item.x < 0) {
      carsContainer.removeChild(item);
    }
  });
}

function carsRender() {
  cars.forEach(function(item, i, arr) {
    carsContainer.addChild(cars[i]);
  });
}

carsRender();

let carsCount = carsLength;
let timer = (Math.floor(Math.random() * 2001) + 1000);
setInterval(function() {
  carsCount += carsLength;
  timer = (Math.floor(Math.random() * 2001) + 1000);
  addCars(carsCount);
  placeCars();
  carsRender();
}, timer);
