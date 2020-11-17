import { Color, Scene } from '/static/three.js/build/three.module.js';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('white');

  return scene;
}

export { createScene };