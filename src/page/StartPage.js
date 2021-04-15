import { defineComponent, h } from "@vue/runtime-core";
import startPageImg from "../../assets/start_page.jpeg";
import startBtnImg from "../../assets/startBtn.png";

export default defineComponent({
  setup(pops, ctx) {
    // 作为vue3的入口函数 (没有this，通过ctx查找)
    const onClick = () => {
      console.log("onClick....");
      ctx.emit("changePage", "GamePage");//切换page
    }
    return {
      // 里面的东西可以挂载 到ctx
      onClick,
    }
  },
  render(ctx) {
    // 背景图片
    // <div><img src="imgPath" /></div></div>
    // pixi.js...
    return h('Container', [
      h('Sprite', { texture: startPageImg, width: 750, height: 800 }),
      h('Sprite', {
        texture: startBtnImg,
        x: 275,
        y: 350,
        interactive: true, //开关
        onClick: ctx.onClick //调用ctx上的事件
      })
    ]);
  }
})