import { GLTFLoader } from '/static/three.js/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function load_model() {
  const loader = new GLTFLoader();

  const model_data = await loader.loadAsync('/static/pixel_art_rocket.glb');

  console.log('rocket!', model_data);

  const rocket = setupModel(model_data);

  return { rocket }
}