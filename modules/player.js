import * as base from "./base.js"

const gravity = 1/8;

export function create(x = 50, y = 100) {
    let self = base.createInstance(x, y, 5);
    const d = Math.random()*Math.PI;
    const l = .4;
    Object.assign(self, {
        xSpd: Math.cos(d) * l,
        ySpd: -4 - Math.sin(d) * l,
        step: step,
    })
    return self;
}

function step(self) {
    self.x += self.xSpd;
    self.y += self.ySpd;
    self.ySpd += gravity;
}