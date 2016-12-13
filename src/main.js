
import Entity from './Entity';
import {WIDTH, HEIGHT} from './constants';

const state = {
    r: 1,
    speed: 0.001,
    num: 100,
};

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    document.getElementById('initButton').addEventListener('click', () => {
        init(state);
    });
    const numInput = document.getElementById('num');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const speedInput = document.getElementById('speed');
    const rInput = document.getElementById('r');
    const speedValue = document.getElementById('speed-value');
    const rValue = document.getElementById('r-value');

    function textUpdate(props) {
        speedValue.innerText = props.speed;
        rValue.innerText = props.r;
    }

    function speedUpdate(value, state) {
        state.speed  = 0.001 * Math.pow(10, value);
        textUpdate(state);
    }
    speedInput.addEventListener('input', () => {
        speedUpdate(speedInput.value, state);
    });
    function rUpdate(value, state) {
        state.r = parseInt(value);
        textUpdate(state);
    }
    rInput.addEventListener('input', () => {
        rUpdate(rInput.value, state);
    });

    function numUpdate(value, state) {
        state.num = parseInt(value);
    }

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    let entities = [];
    const render = function (props) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        entities.forEach(entity => {
            ctx.beginPath();
            ctx.arc(entity.x, entity.y, props.r, 0, Math.PI * 2, false);
            ctx.fill();
        });
    };
    const update = function update() {
        entities.forEach(entity => {
            entity.calcAccel(entities);
        });
        entities.forEach(entity => {
            entity.update(state.speed)
        });
        render(state);
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);

    function init(props) {
        entities = [];
        numUpdate(numInput.value, props);
        speedUpdate(speedInput.value, props);
        rUpdate(rInput.value, props);
        for (let i = 0; i < props.num; i++) {
            const x = Math.floor(Math.random() * (WIDTH - props.r));
            const y = Math.floor(Math.random() * (HEIGHT - props.r));
            const e = new Entity(x, y);
            entities.push(e);
        }
    }
});


