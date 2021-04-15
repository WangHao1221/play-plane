import { defineComponent, h, reactive, onMounted, onUnmounted } from "@vue/runtime-core";
import Map from "../component/Map";
import Plane from "../component/Plane";
import EnemyPlane from "../component/EnemyPlane";
import { game } from "../Game";
import { hitTestObject } from "../utils/index";
import Bullet from '../component/Bullet';

export default defineComponent({
  setup(props, { emit }) {
    // 响应式对象(针对引用类型 reactive)，控制飞机的位置
    const {planInfo} = useCreatePlane();
    // console.log(planInfo)
    // 敌方飞机(数组)
    const { enemyPlanes } = useCreateEnemyPlanes();
    // 创建我方子弹
    const {bullets, addBullet} = useCreateBullets();
    // 接收我方子弹创建事件
    const onAttack = (bulletInfo) => {
      addBullet(bulletInfo);
    };
    // 战斗逻辑
    useFitting(enemyPlanes, bullets, planInfo, emit);
    return {
      planInfo,
      enemyPlanes,
      bullets,
      onAttack
    }
  },
  render(ctx) {
    // 创建敌方飞机
    const createEnemyPlanes = () => {
      return ctx.enemyPlanes.map((info) => {
        return h(EnemyPlane, { x: info.x, y: info.y});
      })
    };
    // 创建我方子弹
    const createBullets = () => {
      return ctx.bullets.map((info) => {
        return h(Bullet, { x: info.x, y: info.y});
      })
    };
    return h('Container', [
      // h('Sprite', { texture: mapImg, width: 750, height: 800 }) //方案一
      h(Map),//方案二
      h(Plane, { x: ctx.planInfo.x, y: ctx.planInfo.y, onAttack:ctx.onAttack }),
      ...createEnemyPlanes(),
      ...createBullets()
    ]);
  }
});
// 我方飞机的逻辑
function useCreatePlane() {
  const planInfo = reactive({ x: 150, y: 450, width: 200, height: 119 });
  // console.log(planInfo);
  // 键盘控制飞机的移动
  const speed = 15;
  window.addEventListener("keydown", (e) => {
    // console.log(e.code);
    switch (e.code) {
      case "ArrowUp":
        planInfo.y -= speed;
        break;
      case "ArrowDown":
        planInfo.y += speed;
        break;
      case "ArrowLeft":
        planInfo.x -= speed;
        break;
      case "ArrowRight":
        planInfo.x += speed;
        break;
    }
  });
  return {planInfo};
};
//  敌方飞机
function useCreateEnemyPlanes() {
  const enemyPlanes = reactive([
    {
      x: 50,
      y: 0,
      width: 197,
      height: 134
    }
  ]);
  return {enemyPlanes};
};
// 我方子弹
function useCreateBullets() {
  const bullets = reactive([]);
  const addBullet = (info) => {
    bullets.push({...info, width: 14, height: 34});
   };
  return {bullets, addBullet};
};
// 战斗逻辑
function useFitting(enemyPlanes, bullets, planInfo, emit) {
  const handleTicker = () => {
      // 主循环
      // 敌方飞机移动
      enemyPlanes.forEach((enemyInfo) => {
        enemyInfo.y++;
      });
      // 碰撞检测(双方飞机检测)
      enemyPlanes.forEach((enemyInfo) => {
        if (hitTestObject(enemyInfo, planInfo)) {
          // console.log("hit...")
          // 页面跳转，游戏结束
          emit("changePage", "EndPage");
        }
      });
      // 我方子弹移动
      bullets.forEach((bulletInfo) => {
        bulletInfo.y--;
      });
      // 我方子弹和敌方飞机的碰撞检测
      bullets.forEach((bulletInfo, bulletIndex) => {
        // 碰撞检测
        enemyPlanes.forEach((enemyInfo, enemyIndex) => {
          if (hitTestObject(bulletInfo, enemyInfo)) {
            // 我方子弹消失，
            bullets.splice(bulletIndex,1);
            //敌方飞机消失
            enemyPlanes.splice(enemyIndex,1);
          }
        });
      });
    };
    onMounted(() => {
      game.ticker.add(handleTicker);
    });
    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });
};