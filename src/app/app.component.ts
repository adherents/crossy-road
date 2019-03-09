import { Component, OnInit, ViewChild } from '@angular/core';

import { images } from './scripts/images';
import { container } from './scripts/container';
import { player } from './scripts/player';

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

    const boy = PIXI.Sprite.fromImage(images.water);
    boy.position.set(0, 0);
    const car = PIXI.Sprite.fromImage(images.car);
    car.position.set(50, 50);
    const barrel = PIXI.Sprite.fromImage(images.barrel);
    barrel.position.set(100, 100);

    container.addChild(boy);
    container.addChild(car);
    container.addChild(barrel);
    container.addChild(player);

    this.app.stage.addChild(container);
  }
}
