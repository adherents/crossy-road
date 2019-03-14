import { Component, OnInit, ViewChild } from '@angular/core';

import { player } from './scripts/gameObjects/player';
import { levelContainer } from './scripts/gameMap/level';
import { treesContainer } from './scripts/gameObjects/tree';
import { carsContainer, boxesContainer, objectsMove } from './scripts/gameObjects/movableObjects';
import { lifesContainer } from './scripts/gameObjects/playersLife';
import { tests } from './scripts/collisionTests';
import { endGameContainer } from './scripts/gameOverScreen';

declare const PIXI: typeof import('pixi.js');
export const appContainer = new PIXI.Container();

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
    appContainer.addChild(levelContainer);
    appContainer.addChild(carsContainer);
    appContainer.addChild(boxesContainer);
    appContainer.addChild(treesContainer);
    appContainer.addChild(lifesContainer);
    appContainer.addChild(player);
    this.app.stage.addChild(appContainer);
    this.app.stage.addChild(endGameContainer);

    this.app.ticker.add(function(delta: number) {
      tests.carCheck();
      tests.boxCheck();
      tests.waterCheck();
      tests.endGameCheck();
      objectsMove(delta);
    });
  }
}
