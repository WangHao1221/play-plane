// 碰撞检测的算法
export const hitTestObject = (objA, objB) => {
  // 找出所有没有碰撞的结果
  // 然后取反（碰撞上的结果）
  return (objA.x + objA.width >= objB.x &&
    objB.x + objB.width >= objA.x &&
    objA.y + objA.height >= objB.y &&
    objB.y + objB.height >= objA.y)
}