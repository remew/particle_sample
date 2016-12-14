
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

    $('#init-random').addEventListener('click', () => {
        init(state, generateRandomEntities);
    });
    $('#init-circle').addEventListener('click', () => {
        init(state, generateCircleEntities);
    });
    $('#init-nautilus').addEventListener('click', () => {
        init(state, generateNautilusEntities);
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
    const fpsText = $('#fps');

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

    let lastTimestamp = -1;
    requestAnimationFrame(timestamp => {
        lastTimestamp = timestamp;
        update(state);
    });

    function numUpdate(value, state) {
        state.num = parseInt(value);
    }

    function update(props) {
        const center = {x: WIDTH / 2, y: HEIGHT /2};
        entities.forEach(entity => {
            entity.preUpdate(center);
        });
        entities.forEach(entity => {
            entity.update(props)
        });
        render(props);
        requestAnimationFrame(timestamp => {
            const diff = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            fpsText.innerText = 'FPS:' + Math.floor(1000000 / diff) / 1000;
            update(state);
        });
    }

    function render(props) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        entities.forEach(entity => {
            renderer.render(ctx, entity, props);
        });
    }

    function init(props, gen) {
        numUpdate(numInput.value, props);
        speedUpdate(speedInput.value, props);
        rUpdate(rInput.value, props);
        entities = gen(props);
    }

    function generateRandomEntities(props) {
        return Array.from({length: props.num}, (_, i) => {
            const x = Math.floor(Math.random() * (WIDTH - props.r));
            const y = Math.floor(Math.random() * (HEIGHT - props.r));
            return new Entity(x, y, props.r + Math.random());
        });
    }
    function generateNautilusEntities(props) {
        return Array.from({length: props.num}, (_, i) => {
            const rad = Math.PI * 2 / props.num * i;
            const ratio = (WIDTH / 2) / props.num;
            const x = Math.cos(rad) * (i * ratio) + WIDTH / 2;
            const y = Math.sin(rad) * (i * ratio) + HEIGHT / 2;
            return new Entity(x, y, props.r + Math.random());
        });
    }
    function generateCircleEntities(props) {
        return Array.from({length: props.num}, (_, i) => {
            const rad = Math.PI * 2 / props.num * i;
            const x = Math.cos(rad) * 196 + WIDTH / 2;
            const y = Math.sin(rad) * 196 + HEIGHT / 2;
            return new Entity(x, y, props.r + Math.random());
        });
    }
});


