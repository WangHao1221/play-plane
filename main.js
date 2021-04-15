// console.log("main.js...1111");
import App from "./src/App";
import { createApp } from "./src/runtime-canvas";
import { getRootContainer } from "./src/Game";
// 根组件，(App)
//根容器(canvas->pixi.js)
createApp(App).mount(getRootContainer());
