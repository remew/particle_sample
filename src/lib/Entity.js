'use strict';

const InitialVelocity = 256;

export default class Entity {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        // this.vx = 0;
        // this.vy = 0;
        this.vx = Math.random() * InitialVelocity - InitialVelocity / 2;
        this.vy = Math.random() * InitialVelocity - InitialVelocity / 2;
        this.ax = 0;
        this.ay = 0;
    }

    setRadius(r) {
        this.r = r;
    }

    preUpdate(target) {
        const xDiff = target.x - this.x;
        const yDiff = target.y - this.y;
        const rad = Math.atan2(yDiff, xDiff);
        this.ax = Math.cos(rad);
        this.ay = Math.sin(rad);
    }

    update(props) {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx * props.speed;
        this.y += this.vy * props.speed;

        // remove comments if you want balls to stop at the wall
        // if (this.x < 0) {
        //     this.x = 0;
        //     if (this.ax < 0) this.ax = 0;
        // }
        // if (this.x > WIDTH - 1) {
        //     this.x = WIDTH - 1;
        //     if (this.ax > 0) this.ax = 0;
        // }
        // if (this.y < 0) {
        //     this.y = 0;
        //     if (this.ay < 0) this.ay = 0;
        // }
        // if (this.y > HEIGHT - 1) {
        //     this.y = HEIGHT - 1;
        //     if (this.ay > 0) this.ay = 0;
        // }
    }
}

