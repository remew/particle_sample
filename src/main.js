
import {WIDTH, HEIGHT} from './constants';
import $ from './lib/queryselector';
import Entity from './lib/Entity';
import Renderer from './lib/EntityRenderer';
const renderer = new Renderer();

const state = {
    r: 1,
    speed: 0.001,
    num: 100,
};

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    $('#initButton').addEventListener('click', () => {
        init(state);
    });
    const canvas = $('#canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');

    const numInput = $('#num');
    const speedInput = $('#speed');
    const rInput = $('#r');
    const speedValue = $('#speed-value');
    const rValue = $('#r-value');

    let entities = [];

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
        entities.forEach(entity => {
            entity.setRadius(state.r);
        });
        textUpdate(state);
    }
    rInput.addEventListener('input', () => {
        rUpdate(rInput.value, state);
    });

    requestAnimationFrame(() => {
        update(state);
    });

    function numUpdate(value, state) {
        state.num = parseInt(value);
    }

    function update(props) {
        entities.forEach(entity => {
            entity.preUpdate(entities);
        });
        entities.forEach(entity => {
            entity.update(props.speed)
        });
        render(props);
        requestAnimationFrame(() => {
            update(state);
        });
    }
    function render(props) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        entities.forEach(entity => {
            renderer.render(ctx, entity, props);
        });
    }

    function init(props) {
        entities = [];
        numUpdate(numInput.value, props);
        speedUpdate(speedInput.value, props);
        rUpdate(rInput.value, props);
        for (let i = 0; i < props.num; i++) {
            const x = Math.floor(Math.random() * (WIDTH - props.r));
            const y = Math.floor(Math.random() * (HEIGHT - props.r));
            const e = new Entity(x, y, props.r);
            entities.push(e);
        }
    }
});


