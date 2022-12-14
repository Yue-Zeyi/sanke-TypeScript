class Snake {
  // 蛇的容器
  element: HTMLElement;
  // 蛇头
  head: HTMLElement;
  // 蛇身
  bodies: HTMLCollection;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }
  // 获取蛇头坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  // 设置蛇头坐标
  set X(value: number) {
    // 如果新值和旧值相同则直接返回不再修改
    if (this.X === value) {
      return;
    }
    // X值的合法范围0-290
    if (value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了');
    }
    // 修改X时,就是在修改水平坐标,蛇在向左移动时,不能向右掉头,反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // console.log('水平掉头了');
      // 如果掉头了,让蛇向反方向继续移动
      if (value > this.X) {
        // 如果新值大于旧值,说明蛇向右走,此时发生掉头,应该让蛇继续向左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.left = value + 'px';
    // 检查撞自己
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了');
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // console.log('水平掉头了');
      // 如果掉头了,让蛇向反方向继续移动
      if (value > this.Y) {
        // 如果新值大于旧值,说明蛇向右走,此时发生掉头,应该让蛇继续向左走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.top = value + 'px';
    // 检查撞自己
    this.checkHeadBody();
  }

  // 蛇增加身体长度方法
  addBody() {
    // 添加div
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
  }
  // 蛇身体移动的方法
  moveBody() {
    /* 将后边的身体设置为前边身体的位置
       4节=3节 3节=2节  2节=1节 
    */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // console.log(X, Y);

      // 设置到当前身体
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  // 检查蛇头是否撞到身体
  checkHeadBody() {
    // 获取所有身体,检查是否和蛇头重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 进入判断说明撞身体了,游戏结束
        throw new Error('撞到自己了');
      }
    }
  }
}

export default Snake;
