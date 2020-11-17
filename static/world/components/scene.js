import { Color, Scene } from '/static/three.js/build/three.module.js';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('black');

  return scene;
}

export { createScene };