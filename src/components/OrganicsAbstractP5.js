import { ReactP5Wrapper } from '@p5-wrapper/react';

// Define Organic class outside the component
class Organic {
  constructor(radius, xpos, ypos, roughness, angle, color) {
    this.radius = radius;
    this.xpos = xpos - ((Math.random() * 150) + 50);
    this.ypos = ypos - ((Math.random() * 150) + 50);
    this.roughness = roughness;
    this.angle = angle;
    this.color = color;
  }

  show(p, change) {
    p.noStroke();
    p.fill(this.color);

    p.push();
    p.translate(this.xpos, this.ypos);
    p.rotate(this.angle + change);
    p.beginShape();

    let off = 0;
    for (let i = 0; i < p.TWO_PI; i += 1) {
      let offset = p.map(p.noise(off, change), 0, 0.7, -this.roughness, this.roughness);
      let r = this.radius + offset;
      let x = r * p.cos(i);
      let y = r * p.sin(i);
      p.vertex(x, y);
      off += 1;
    }

    p.endShape();
    p.pop();
  }
}

const Sketch = () => {
  let organics = [];
  let change = 0;
  let colorsPalette = [];

  const setup = (p) => {
    p.createCanvas(800, 800).parent('canvas-container');
    p.background(0, 255);
    change = 0;

    colorsPalette = [
      p.color(0, 41, 77, 30),
      p.color(0, 66, 110, 30),
      p.color(0, 91, 143, 30),
      p.color(0, 116, 176, 30),
      p.color(0, 141, 209, 30),
      p.color(0, 166, 242, 30),
      p.color(0, 191, 255, 30),
      p.color(0, 216, 255, 30),
    ];

    for (let i = 0; i < 110; i++) {
      organics.push(
        new Organic(
          0.1 + 1 * i,
          p.width / 2,
          p.height / 2,
          i * 2,
          i * p.random(90),
          colorsPalette[p.floor(p.random(8))]
        )
      );
    }
  };

  const draw = (p) => {
    p.background(0, 0, 0);
    for (let i = 0; i < organics.length; i++) {
      organics[i].show(p, change);
    }
    change += 0.009;
  };

  return <ReactP5Wrapper setup={setup} draw={draw} />;
};

export default Sketch;