'use strict';

import {WIDTH, HEIGHT} from './constants';

export default class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }

    calcAccel(_entities) {
        const rad = Math.atan2((HEIGHT / 2)- this.y, (WIDTH / 2) - this.x);
        const entities = _entities.filter(e => e !== this);
        const rads = entities.map(e => {
            return Math.atan2(e.y - this.y, e.x - this.x);
        });
        this.ax = rads.reduce((result, rad) => {
                return result + Math.cos(rad);
            }, 0) / entities.length;
        this.ax += Math.cos(rad) / 10;
        this.ay = rads.reduce((result, rad) => {
                return result + Math.sin(rad);
            }, 0) / entities.length;
        this.ay += Math.sin(rad) / 10;
    }

    update(speed) {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx * speed;
        this.y += this.vy * speed;

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

