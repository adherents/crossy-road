import { Component, OnInit, ViewChild } from '@angular/core';
import { Sprite } from 'pixi.js';
declare const PIXI: typeof import('pixi.js');

@Component({
  selector: 'cr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('pixiContainer') pixiContainer;
  public pApp: any; // pixi App
  ngOnInit() {
    this.pApp = new PIXI.Application({
      width: 400,
      height: 600,
      backgroundColor: 0x1099bb
    });
    this.pixiContainer.nativeElement.appendChild(this.pApp.view);
  }
}
