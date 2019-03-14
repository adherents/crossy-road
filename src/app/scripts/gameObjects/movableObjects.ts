import { images } from '../gameMap/images';
import { lines } from '../gameMap/level';

class LaneObject extends PIXI.Sprite {
  public speed: number;
  public startPoint: number;
  public lane: number;
  public completed: boolean;

  constructor(image) {
    super(PIXI.Texture.fromImage(image));
    this.scale.set(-1, 1);
    this.anchor.set(0.5);
    this.speed = 3;
    this.completed = false;
  }
}

class ObjectController {
  public objects: Array<LaneObject>; // objects to handle
  private lefts: Array<number>; // lane indexes with left directions, other ones are right-direction
  private lanes: Array<number>; // lanes
  private container: PIXI.Container; // object container
  private maxObjects: number; // maximum total number of objects on the lanes (if 0 then no maximum)
  public image: any; // object image

  constructor(lanes: Array<number>, container: PIXI.Container, maxObjects: number, image) {
    this.image = image;
    this.objects = [];
    this.lefts = [];
    this.lanes = lanes;
    this.container = container;
    this.maxObjects = maxObjects;
    this.setDirections();
  }

  public manageObjects() {
    if (this.objects.length > this.container.children.length) {
      this.objects = this.objects.filter(obj => !obj.completed); // filter not completed objects first!
    }
    if (this.maxObjects <= 0 || this.objects.length < this.maxObjects) {
      this.addObjects(this.lanes.length); // add new objects
    }
  }

  public moveObjects(delta: number) {
    for (let o = 0; o < this.objects.length; o++) {
      const obj = this.objects[o];
      obj.x += (obj.startPoint * ((obj.speed / 4) + delta));
      if (obj.x < 0 || obj.x > 600) {
        obj.completed = true; // mark it to delete on next managing iteration
        this.container.removeChild(obj);
      }
    }
  }

  private setDirections() {
    for (let i = 0; i < this.lanes.length; i++) {
      const directionLuck = Math.random() * 10;
      if (directionLuck <= 5) {
        this.lefts.push(i);
      }
    }
  }

  private addObjects(amount: number) {
    for (let i = 0; i < amount; i++) {
      const obj = new LaneObject(this.image);
      obj.lane = Math.floor(Math.random() * this.lanes.length);
      obj.y = this.lanes[obj.lane] - 50;
      if (this.lefts.indexOf(obj.lane) >= 0) {
        obj.startPoint = 1; // left
        obj.scale.set(1, -1);
        obj.y = obj.y;
      } else {
        obj.x = 550;
        obj.startPoint = -1; // right
        obj.y = obj.y;
      }
      this.objects.push(obj);
      this.container.addChild(obj);
    }
  }
}

// define containers here
export const carsContainer = new PIXI.Container();
export const boxesContainer = new PIXI.Container();

const maxCars = lines.roadLines.length * 3; // maximum cars on the roads
const maxBoxes = lines.roadLines.length; // maximum barrels on the rivers, could be 0

// create controllers for different objects
export const carsController = new ObjectController(lines.roadLines, carsContainer, maxCars, images.car);
export const boxesController = new ObjectController(lines.waterLines, boxesContainer, maxBoxes, images.box);

// here move objects from objects controller
export function objectsMove(delta: number) {
  carsController.moveObjects(delta);
  boxesController.moveObjects(delta);
}

// managing objects from different controllers
setInterval(function () {
  carsController.manageObjects(); // manage cars
}, (Math.floor(Math.random() * 2001) + 1000));

setInterval(function () {
  boxesController.manageObjects(); // manage boxes
}, (Math.floor(Math.random() * 2001) + 1000));
