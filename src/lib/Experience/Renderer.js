import * as THREE from 'three';
import { gsap } from 'gsap';
import { sceneStore } from '$lib/store.js';
import Experience from './Experience.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

export default class Renderer {
	constructor() {
		this.experience = new Experience();
		this.canvas = this.experience.canvas;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera.instance;
		// console.log(this.camera)
		this.debug = this.experience.debug;

		this.setInstance();
		this.setPostprocess();

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('renderer');
			this.debugFolder.close();
			//add a folder for toneMapping
			this.toneMappingFolder = this.debugFolder.addFolder('toneMapping');
			this.toneMappingFolder.close();
			this.toneMappingFolder
				.add(this.instance, 'toneMapping', {
					No: THREE.NoToneMapping,
					Linear: THREE.LinearToneMapping,
					Reinhard: THREE.ReinhardToneMapping,
					Cineon: THREE.CineonToneMapping,
					ACESFilmic: THREE.ACESFilmicToneMapping
				})
				.name('type')
				.onFinishChange(() => {
					this.instance.toneMapping = this.instance.toneMapping;
				});
		}
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			powerPreference: 'high-performance',
			antialias: false,
			stencil: false
		});

		// this.instance.physicallyCorrectLights = true;
		// this.instance.outputColorSpace = THREE.SRGBColorSpace;
		// this.instance.toneMapping = THREE.ACESFilmicToneMapping;
		// this.instance.toneMappingExposure = 1.0;
		// this.instance.shadowMap.enabled = true;
		// this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.setClearColor('#FFFFFF');
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
	}

	setPostprocess() {
		// Post-processing setup

		// console.log(VignetteShader)
		this.composer = new EffectComposer(this.instance);
		const renderPass = new RenderPass(this.scene, this.camera);
		this.composer.addPass(renderPass);

		const vignettePass = new ShaderPass(VignetteShader);

		vignettePass.uniforms['offset'].value = 1.5;
		vignettePass.uniforms['darkness'].value = 0.8;
		this.composer.addPass(vignettePass);

		sceneStore.subscribe((value) => {
			if (value.includes('artwork')) {
				gsap.to(vignettePass.uniforms['offset'], { duration: 3, value: 0.0, ease: 'power2.inOut' });
				gsap.to(vignettePass.uniforms['darkness'], { duration: 3, value: 0, ease: 'power2.inOut' });
			} else {
				gsap.to(vignettePass.uniforms['offset'], { duration: 3, value: 1.5, ease: 'power2.inOut' });
				gsap.to(vignettePass.uniforms['darkness'], {
					duration: 3,
					value: 0.8,
					ease: 'power2.inOut'
				});
			}
			// gsap.to(vignettePass.uniforms["offset"], { duration: 1, value: 1.5 });
			// gsap.to(vignettePass.uniforms["darkness"], {duration: 1, value: 0.8});
		});

		const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
		this.composer.addPass(gammaCorrectionPass);
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
	}

	update() {
		// this.instance.render(this.scene, this.camera.instance);
		this.composer.render();
	}
}
