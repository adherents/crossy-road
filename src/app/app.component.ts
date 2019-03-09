import { Component, OnInit, ViewChild } from '@angular/core';
import { Sprite } from 'pixi.js';
declare const PIXI: typeof import('pixi.js');
declare function require(path: string);
@Component({
  selector: 'cr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('pixiContainer') pixiContainer;
  public app: any; // pixi App
  cat = require('../app/img/boy.png');

  ngOnInit() {
    this.app = new PIXI.Application({
      width: 600,
      height: 600,
      backgroundColor: 0x1099bb
    });
    this.pixiContainer.nativeElement.appendChild(this.app.view);

    const bunny: Sprite = PIXI.Sprite.fromImage(this.cat);
    bunny.anchor.set(0.5);
    bunny.x = this.app.screen.width / 1.9;
    bunny.y = this.app.screen.height / 2;

    this.app.stage.addChild(bunny);
    /* this.app.ticker.add(function(delta) {
      bunny.rotation += 0.1 * delta;
    }); */
  }
}
