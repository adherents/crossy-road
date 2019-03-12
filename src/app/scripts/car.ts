import { images } from './images';
import { lines } from './level';

export const carsContainer = new PIXI.Container();

class Car extends PIXI.Sprite {
  speed: number;
  startPoint: string;
  road: number;

  constructor() {
    super(PIXI.Texture.fromImage(images.car));
    this.scale.set(-1, 1);
    this.anchor.set(0.5);
    this.y = 0;
    this.speed = 3;
  }
}

export const cars: Array<Car> = [];
const roadsCount = lines.roadLines.length;
let car: Car;

const leftRoads = [];

function setDirections(roads: number) {
  for (let i = 0; i < roads; i++) {
    const directionLuck = Math.random() * 10;
    if (directionLuck <= 5) {
      leftRoads.push(i);
    }
  }
  console.log(leftRoads.length);
}
setDirections(roadsCount);

function addCars(amount: number) {
  for (let i = 0; i < amount; i++ ) {
    car = new Car();
    car.road = Math.floor(Math.random() * (roadsCount));
    car.y = lines.roadLines[car.road] - 50;
    if (leftRoads.indexOf(car.road) >= 0) {
      car.startPoint = 'left';
      car.scale.set(1, -1);
    } else {
      car.x = 550;
      car.startPoint = 'right';
    }
    carsContainer.addChild(car);
    cars.push(car);
  }
}

function cleanCars() {
  if (cars.length > carsContainer.children.length) {
    cars.splice(0, cars.length - carsContainer.children.length);
  }
}

export function carsMove(delta: number) {
  cars.forEach(function(item, i, arr) {
    item.startPoint === 'right' ? item.x -= ((item.speed / 4) + delta)
    : item.x += (item.speed / 4) + delta;
    if (item.x < 0 || item.x > 600) {
      carsContainer.removeChild(item);
    }
  });
}

setInterval(function() {
  addCars(roadsCount);
  cleanCars();
  console.log('Cars ' + cars.length);
  console.log('Sprites ' + carsContainer.children.length);
}, (Math.floor(Math.random() * 2001) + 1000));
