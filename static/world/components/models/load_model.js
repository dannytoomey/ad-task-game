import { GLTFLoader } from '/static/three.js/examples/jsm/loaders/GLTFLoader.js';

import { setup_model } from './setup_model.js';

async function load_model() {
  const loader = new GLTFLoader();

  const model_data = await loader.loadAsync('/static/pixel_art_rocket.glb');

  console.log('rocket!', model_data);

  const rocket = setup_model(model_data);
  rocket.position.set(0,0,0)

  return { rocket }
}

export { load_model }