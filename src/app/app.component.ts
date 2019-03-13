import { Component, OnInit, ViewChild } from '@angular/core';

import { player } from './scripts/player';
import { levelContainer } from './scripts/level';
import { treesContainer } from './scripts/tree';
import { carsContainer, boxesContainer, objectsMove } from './scripts/movableObjects';

declare const PIXI: typeof import('pixi.js');
const container = new PIXI.Container();

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
    PIXI.loader.load(this.setup.bind(this));
  }

  setup() {
    container.addChild(levelContainer);
    container.addChild(carsContainer);
    container.addChild(boxesContainer);
    container.addChild(treesContainer);
    container.addChild(player);
    this.app.stage.addChild(container);

    this.app.ticker.add(function(delta: number) {
      objectsMove(delta);
    });
  }
}
