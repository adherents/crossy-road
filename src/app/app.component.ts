import { Component, OnInit, ViewChild } from '@angular/core';

import { Sprite } from 'pixi.js';
import { images } from './scripts/images';
import { container } from './scripts/container';
declare const PIXI: typeof import('pixi.js');

@Component({
  selector: 'cr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('pixiContainer') pixiContainer;
  public app: any;

  ngOnInit() {
    this.app = new PIXI.Application({
      width: 600,
      height: 600,
      backgroundColor: 0x1099bb
    });
    this.pixiContainer.nativeElement.appendChild(this.app.view);

    const boy: Sprite = PIXI.Sprite.fromImage(images.water);
    boy.position.set(0, 0);
    const car: Sprite = PIXI.Sprite.fromImage(images.car);
    car.position.set(50, 50);
    const barrel: Sprite = PIXI.Sprite.fromImage(images.barrel);
    barrel.position.set(100, 100);

    const test = container;

    test.addChild(boy);
    test.addChild(car);
    test.addChild(barrel);

    /* bunny.anchor.set(0.5);
    bunny.x = this.app.screen.width / 1.9;
    bunny.y = this.app.screen.height / 2; */

    this.app.stage.addChild(test);
  }
}
