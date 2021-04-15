// 根组件
import { defineComponent, h, computed, ref } from "@vue/runtime-core";
import Circle from "./component/Circle";
import StartPage from './page/StartPage';
import GamePage from './page/GamePage';
import EndPage from './page/EndPage';

export default defineComponent({
  setup() {
    // 普通的值（值类型：string,number）是无法实现的，即没有实现双向绑定，VUE3里面使用ref
    // ref创建一个响应式对象
    const currentPageName = ref("StartPage");
    console.log(currentPageName);
    // 改变String的话，就可以切换字符串
    // 一个依赖别的属性的属性（计算属性）
    const currentPage = computed(() => {
      if (currentPageName.value === "StartPage") {
        // currentPageName是一个对象，所以需要用.value
        return StartPage;
      } else if (currentPageName.value === "GamePage") {
        return GamePage;
      }else if (currentPageName.value === "EndPage") {
        return EndPage;
      }
    });
    return {
      currentPage,
      currentPageName,
    }
  },
  render(ctx) {
    // 创建vnode
    // const vnode = h('rect', { x: 100, y: 100 }, ["我是一个参数....", h('circle', {x: 150,y: 150}),h(Circle)]);
    // console.log(vnode);
    // return vnode;
    return h("Container", [h(ctx.currentPage, {
      onChangePage(page){
        console.log(page)
        ctx.currentPageName = page; //此时不需要.vue，是因为render会自动结构
      }
    })]);
    // return h("Container", [h(GamePage)]);
  }
});