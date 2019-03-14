import { grassMap, waterMap, roadMap, dirtMap } from './level';

export function levelSettings() {
  dirtMap(1); // end-game line

  roadMap(1);
  grassMap(1);
  waterMap(1);
  roadMap(1);
  grassMap(1);
  grassMap(1);
  roadMap(1);
  grassMap(1);
  roadMap(1);
  waterMap(1);

  dirtMap(1); // start-game line
}
