// import * as PIXI from "pixi.js";
// console.log(PIXI);
import { Application } from "pixi.js";
// setup->canvas
export const game = new Application({
  width: 750,
  height: 800,
});
console.log(game);
document.body.appendChild(game.view);
// game.stage(根容器)
export function getRootContainer() {
  return game.stage;
}