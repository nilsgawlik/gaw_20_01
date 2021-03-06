
import {virtualCanvasWidth, virtualCanvasHeight, viewX, viewY, score} from "./main.js"
import { lerp } from "./utils.js";
export let canvas = null;
export let ctx = null;
export const wallThickness = 3;

let shakeX = 0;
let shakeY = 0;

let actualViewX = 0;
let actualViewY = 0;


export function init() {
    actualViewX = viewX;
    actualViewY = viewY;
}

export function update() {
    actualViewX = lerp(actualViewX, viewX, 0.125);
    actualViewY = lerp(actualViewY, viewY, 0.125);
    const decay = .9;
    shakeX = decay * shakeX;
    shakeY = decay * shakeY;

    // walls
    line(viewX + wallThickness, viewY, viewX + wallThickness, viewY + virtualCanvasHeight);
    line(viewX + virtualCanvasWidth - wallThickness, viewY, viewX + virtualCanvasWidth - wallThickness, viewY + virtualCanvasHeight);

    // score
    let scoreDigits = Math.max(Math.ceil(Math.log10(Math.max(score, 1))), 4);
    let scoreString = "";
    for(let i = 0; i < scoreDigits; i++) {
        let number = Math.floor(score / 10**i) % 10
        scoreString = `${number}${scoreString}`
    }
    let main = document.querySelector("main");
    let scoreElement = main.querySelector(".scoreDisplay");
    scoreElement.innerHTML = scoreString;
}

export function setCanvas(newCanvas, virtualCanvasWidth, virtualCanvasHeight) {
    canvas = newCanvas;
    ctx = canvas.getContext('2d');
}

export function setShake(x, y) {
    shakeX = x;
    shakeY = y;
}

export function instance(inst) {
    inst.draw(inst);
    // rad drawing
    const rad = inst.rad || 0;
    let x = inst.x || 0;
    let y = inst.y || 0;
    const scale = canvas.width / virtualCanvasWidth;
    x = (x - actualViewX + shakeX) * scale;
    y = (y - actualViewY + shakeY) * scale;
    ctx.beginPath();
    ctx.arc(x, y, rad * scale, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

export function clear(style) {
    ctx.fillStyle = style;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function line(x1, y1, x2, y2, style="#fddffd") {
    const scale = canvas.width / virtualCanvasWidth;
    x1 = (x1 - actualViewX + shakeX) * scale;
    y1 = (y1 - actualViewY + shakeY) * scale;
    x2 = (x2 - actualViewX + shakeX) * scale;
    y2 = (y2 - actualViewY + shakeY) * scale;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = style;
    ctx.stroke();
}