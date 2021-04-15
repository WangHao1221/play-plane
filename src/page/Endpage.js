import { defineComponent, h } from "@vue/runtime-core";
import endPageImg from "../../assets/end_page.jpg";
import reStartBtnImg from "../../assets/re_startBtn.png";

export default defineComponent({
  setup(pops, ctx) {
    // 作为vue3的入口函数 (没有this，通过ctx查找)
    const onClick = () => {
      ctx.emit("changePage", "GamePage");//切换page
    }
    return {
      // 里面的东西可以挂载 到ctx
      onClick,
    }
  },
  render(ctx) {
    return h('Container', [
      h('Sprite', { texture: endPageImg, width: 750, height: 800 }),
      h('Sprite', {
        texture: reStartBtnImg,
        x: 275,
        y: 350,
        interactive: true, //开关
        onClick: ctx.onClick //调用ctx上的事件
      })
    ]);
  }
})