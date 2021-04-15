import { defineComponent, h, ref } from "@vue/runtime-core";
import mapImg from "../../assets/map.jpg";
import { game } from "../Game";

export default defineComponent({
  setup(pops, ctx) {
    const viewHeight = 800;
    const mapY1 = ref(0);
    const mapY2 = ref(-viewHeight);

    //interval
    // pixi:ticker
    const speed = 5;
    game.ticker.add(() => {
      mapY1.value += speed;
      mapY2.value += speed;
      // 如果超出屏幕，则又恢复回去
      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight;
      }
      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight;
      }
    });

    return {
      mapY1,
      mapY2
    }
  },
  render(ctx) {
    return h('Container', [
      h('Sprite', { texture: mapImg, width: 750, height: 800, y: ctx.mapY1 }),
      h('Sprite', { texture: mapImg, width: 750, height: 800, y: ctx.mapY2 })
    ]);
  }
})