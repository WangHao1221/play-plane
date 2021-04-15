import { defineComponent, h, watch, reactive, toRefs } from "@vue/runtime-core";
import paneImg from '../../assets/plane.png';

export default defineComponent({
  props:["x","y"],
  setup(props, { emit }) {
    console.log("props-->", props);
    // // 方案一
    // const point = reactive({ x: props.x, y: props.y });
    // watch(props,(value) => {
    //   console.log(value);
    //   point.x = value.x;
    //   point.y = value.y;
    // })
    // return {
    //   point
    // }
    
    // 方案二
    // 响应式丢失问题(解构会丢失引用)
    const { x, y } = toRefs(props);
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        console.log("bullet attach");
        emit("attack", {
          x: x.value+93,
          y: y.value-25
        });
      }
    });
    console.log("props.x-->", props.x);
    return {
      x,
      y
    };
   },
  render(ctx) {
    // 方案一
    // return h("Container", {x: ctx.point.x, y: ctx.point.y}, [h("Sprite", {texture: paneImg})]);
    // 方案二
    return h("Container", {x: ctx.x, y: ctx.y}, [h("Sprite", {texture: paneImg})]);
  }
})
