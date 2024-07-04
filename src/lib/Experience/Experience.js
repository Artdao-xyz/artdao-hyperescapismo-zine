import * as THREE from 'three';
import sources from './sources.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Debug from './Utils/Debug.js';

let instance = null;

export default class Experience {
	constructor(canvas) {
		if (instance) {
			return instance;
		}
		instance = this;
		// Global
		window.experience = this;

		// Options
		this.canvas = canvas;

		// Setup
		this.resources = new Resources(sources);
		this.debug = new Debug();
		this.sizes = new Sizes();
		this.time = new Time();

		this.scene = new THREE.Scene();
		this.world = new World();
		this.camera = new Camera();
		this.renderer = new Renderer();

		// Events
		this.sizes.on('resize', () => this.resize());
		this.time.on('animate', () => this.update());
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.renderer.update();
	}

	destroy() {
		this.sizes.off('resize');
		this.time.off('animate');

		this.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();

				for (const key in child.material) {
					const value = child.material[key];

					if (value && typeof value.dispose === 'function') {
						value.dispose();
					}
				}
			}
		});
		// this.camera.controls.dispose();
		this.renderer.instance.dispose();

		if (this.debug.active) {
			this.debug.ui.destroy();
		}
	}
}
