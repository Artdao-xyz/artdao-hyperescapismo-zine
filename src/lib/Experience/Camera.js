import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
import Experience from './Experience.js';
import Raycaster from './Utils/Raycaster.js';
import { sceneStore } from '/src/lib/store.js';
import positions from './positions.js';

export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.resources = this.experience.resources;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.debug = this.experience.debug;
		this.unsubscribe = null;

		this.currentArtworkIndex = null; // Track the current animated artwork index
		let experienceLoaded = false;

		if (this.unsubscribe) {
			this.unsubscribe();
		}

		this.setInstance();
		this.setOrbitControls();
		this.cameraUpdate('idle');

		this.unsubscribe = sceneStore.subscribe((value) => {
			if (experienceLoaded) {
				this.cameraUpdate(value);
			}
		});

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('camera');
			this.debugFolder.close();

			const helper = new THREE.CameraHelper(this.instance);
			helper.visible = false;
			this.debugFolder.add(helper, 'visible').name('visible').listen();
			this.scene.add(helper);

			this.debugFolder
				.add(this.instance.position, 'x')
				.name('x')
				.step(0.01)
				.min(-5)
				.max(5)
				.listen();
			this.debugFolder
				.add(this.instance.position, 'y')
				.name('y')
				.step(0.01)
				.min(-5)
				.max(5)
				.listen();
			this.debugFolder
				.add(this.instance.position, 'z')
				.name('z')
				.step(0.01)
				.min(-25)
				.max(25)
				.listen();
		}

		this.resources.on('ready', () => {
			const { islandDesert, islandFire, islandIce, islandRuins } = this.experience.world;
			const targets = [islandDesert, islandFire, islandIce, islandRuins];

			this.setRaycaster(targets);
			this.initializeOriginalPositions();
			experienceLoaded = true;
		});
	}

	setInstance() {
		const isMobile = window.innerWidth < 768;
		const fov = isMobile ? 50 : 30;

		this.instance = new THREE.PerspectiveCamera(
			fov,
			this.sizes.width / this.sizes.height,
			0.1,
			200
		);

		// this.instance.position.set(0, 0, 30);
		this.scene.add(this.instance);
	}

	setOrbitControls(enabled = true) {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.dampingFactor = 0.1;
		this.controls.enableDamping = true;

		this.controls.enablePan = false;
		this.controls.enableZoom = false;
		this.controls.enabled = enabled;
	}

	cameraUpdate(value) {
		if (!value.includes('artwork')) {
			if (value == 'idle') {
				this.newlookAt = new THREE.Vector3(0, 0.0, 0);
				gsap.to(this.controls.target, {
					duration: 1,
					x: this.newlookAt.x,
					y: this.newlookAt.y,
					z: this.newlookAt.z,
					ease: 'power2.inOut'
				});
				if (this.instance.aspect > 1) {
					gsap.to(this.instance.position, {
						duration: 2,
						x: 0,
						y: 2.62,
						z: 6.4,
						ease: 'power2.inOut'
					});
				} else {
					gsap.to(this.instance.position, {
						duration: 2,
						x: 0,
						y: 4.0,
						z: 12.0,
						ease: 'power2.inOut'
					});
				}
				this.controls.enabled = false;
			}
			if (value == 'island-ice') {
				this.resetPreviousArtworkPosition('islandFire');
				this.newlookAt = this.experience.world.islandIce.model.position;
				gsap.to(this.controls.target, {
					duration: 2,
					x: this.newlookAt.x,
					y: this.newlookAt.y,
					z: this.newlookAt.z,
					ease: 'power2.inOut'
				});
				gsap.to(this.instance.position, {
					duration: 3,
					x: 0.93,
					y: 0.95,
					z: -1.1,
					ease: 'power2.inOut'
				});
				this.controls.enabled = true;
			}

			if (value == 'island-desert') {
				this.resetPreviousArtworkPosition('islandFire');
				this.newlookAt = this.experience.world.islandDesert.model.position;
				gsap.to(this.controls.target, {
					duration: 2,
					x: this.newlookAt.x,
					y: this.newlookAt.y,
					z: this.newlookAt.z,
					ease: 'power2.inOut'
				});
				gsap.to(this.instance.position, {
					duration: 3,
					x: 1.75,
					y: 1.25,
					z: -0.7,
					ease: 'power2.inOut'
				});
				this.controls.enabled = true;
			}

			if (value == 'island-fire') {
				this.resetPreviousArtworkPosition('islandFire');
				this.newlookAt = this.experience.world.islandFire.model.position;
				gsap.to(this.controls.target, {
					duration: 2,
					x: this.newlookAt.x,
					y: this.newlookAt.y,
					z: this.newlookAt.z,
					ease: 'power2.inOut'
				});
				gsap.to(this.instance.position, {
					duration: 3,
					x: -0.12,
					y: 1.22,
					z: 0.37,
					ease: 'power2.inOut'
				});
				this.controls.enabled = true;
			}

			if (value == 'island-ruins') {
				this.newlookAt = this.experience.world.islandRuins.model.position;
				gsap.to(this.controls.target, {
					duration: 2,
					x: this.newlookAt.x,
					y: this.newlookAt.y,
					z: this.newlookAt.z,
					ease: 'power2.inOut'
				});
				gsap.to(this.instance.position, {
					duration: 3,
					x: -1,
					y: 1.22,
					z: -1.2,
					ease: 'power2.inOut'
				});
				this.controls.enabled = true;
			}

			gsap.to(this.controls, { duration: 3, minPolarAngle: Math.PI / 3.0, ease: 'power2.inOut' });
			gsap.to(this.controls, { duration: 3, maxPolarAngle: Math.PI / 2.25, ease: 'power2.inOut' });
		} else {
			gsap.to(this.controls, { duration: 3, minPolarAngle: 0, ease: 'power2.inOut' });
			gsap.to(this.controls, { duration: 3, maxPolarAngle: Math.PI, ease: 'power2.inOut' });

			const islands = ['islandFire', 'islandDesert', 'islandIce', 'islandRuins'];
			for (const island of islands) {
				if (this.experience.world[island].artworks.some((artwork) => artwork.name === value)) {
					this.animateArtwork(island, value);
					break;
				}
			}
			// if (value == "artwork1") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandFire.artworks[0].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork1.camera.x, y: positions.islandFire.artwork1.camera.y, z: positions.islandFire.artwork1.camera.z, ease: "power2.inOut"});

			//     if (this.instance.aspect < 1) {
			//         // Animate the y position of the first artwork in islandDesert
			//         gsap.to(islandFire.artworks[0].position, {
			//             duration: 2,
			//             y: islandDesert.artworks[0].position.y + 0.2,
			//             ease: "power2.inOut",
			//         });
			//     }
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork2") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandFire.artworks[1].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork2.camera.x, y: positions.islandFire.artwork2.camera.y, z: positions.islandFire.artwork2.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork3") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandFire.artworks[2].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork3.camera.x, y: positions.islandFire.artwork3.camera.y, z: positions.islandFire.artwork3.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork4") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandFire.artworks[3].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork4.camera.x, y: positions.islandFire.artwork4.camera.y, z: positions.islandFire.artwork4.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork5") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandFire.artworks[4].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork5.camera.x, y: positions.islandFire.artwork5.camera.y, z: positions.islandFire.artwork5.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork6") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandIce.artworks[0].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork6.camera.x, y: positions.islandIce.artwork6.camera.y, z: positions.islandIce.artwork6.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork7") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandIce.artworks[1].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork7.camera.x, y: positions.islandIce.artwork7.camera.y, z: positions.islandIce.artwork7.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork8") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandIce.artworks[2].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork8.camera.x, y: positions.islandIce.artwork8.camera.y, z: positions.islandIce.artwork8.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork9") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandIce.artworks[3].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork9.camera.x, y: positions.islandIce.artwork9.camera.y, z: positions.islandIce.artwork9.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork10") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandIce.artworks[4].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork10.camera.x, y: positions.islandIce.artwork10.camera.y, z: positions.islandIce.artwork10.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork11") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandDesert.artworks[0].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork11.camera.x, y: positions.islandDesert.artwork11.camera.y, z: positions.islandDesert.artwork11.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork12") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandDesert.artworks[1].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork12.camera.x, y: positions.islandDesert.artwork12.camera.y, z: positions.islandDesert.artwork12.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork13") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandDesert.artworks[2].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork13.camera.x, y: positions.islandDesert.artwork13.camera.y, z: positions.islandDesert.artwork13.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork14") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandDesert.artworks[3].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork14.camera.x, y: positions.islandDesert.artwork14.camera.y, z: positions.islandDesert.artwork14.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork15") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandDesert.artworks[4].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork15.camera.x, y: positions.islandDesert.artwork15.camera.y, z: positions.islandDesert.artwork15.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork16") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandRuins.artworks[0].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork16.camera.x, y: positions.islandRuins.artwork16.camera.y, z: positions.islandRuins.artwork16.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork17") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandRuins.artworks[1].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork17.camera.x, y: positions.islandRuins.artwork17.camera.y, z: positions.islandRuins.artwork17.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork18") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandRuins.artworks[2].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork18.camera.x, y: positions.islandRuins.artwork18.camera.y, z: positions.islandRuins.artwork18.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork19") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandRuins.artworks[3].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork19.camera.x, y: positions.islandRuins.artwork19.camera.y, z: positions.islandRuins.artwork19.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
			// if (value == "artwork20") {
			//     let getWorldPosition = new THREE.Vector3();
			//     this.experience.world.islandRuins.artworks[4].getWorldPosition(getWorldPosition);
			//     this.newlookAt = getWorldPosition;
			//     gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y + offset, z: this.newlookAt.z, ease: "power2.inOut" });
			//     gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork20.camera.x, y: positions.islandRuins.artwork20.camera.y, z: positions.islandRuins.artwork20.camera.z, ease: "power2.inOut"});
			//     this.controls.enabled = false;
			// }
		}
	}

	initializeOriginalPositions() {
		this.originalPositions = {};

		const islands = ['islandFire', 'islandDesert', 'islandIce', 'islandRuins'];
		islands.forEach((island) => {
			const artworks = this.experience.world[island].artworks;
			this.originalPositions[island] = artworks.map((artwork) => artwork.position.clone());
		});
	}

	resetPreviousArtworkPosition(island) {
		if (this.currentArtworkIndex != null) {
			const previousArtwork = this.experience.world[island].artworks[this.currentArtworkIndex % 5];
			const originalPosition = this.originalPositions[island][this.currentArtworkIndex % 5];
			gsap.to(previousArtwork.position, {
				duration: 2,
				x: originalPosition.x,
				y: originalPosition.y,
				z: originalPosition.z,
				ease: 'power2.inOut'
			});
		}
	}

	animateArtwork(island, value) {
		const offset = 0.025;
		const artworks = this.experience.world[island].artworks;
		const artworkIndex = parseInt(value.replace('artwork', '')) - 1;

		if (this.currentArtworkIndex !== artworkIndex % 5) {
			this.resetPreviousArtworkPosition(island);
		}

		let getWorldPosition = new THREE.Vector3();
		artworks[artworkIndex % 5].getWorldPosition(getWorldPosition);
		this.newlookAt = getWorldPosition;

		gsap.to(this.controls.target, {
			duration: 1,
			x: this.newlookAt.x,
			y: this.newlookAt.y + offset,
			z: this.newlookAt.z,
			ease: 'power2.inOut'
		});

		gsap.to(this.instance.position, {
			duration: 2,
			x: positions[island][`artwork${artworkIndex + 1}`].camera.x,
			y: positions[island][`artwork${artworkIndex + 1}`].camera.y,
			z: positions[island][`artwork${artworkIndex + 1}`].camera.z,
			ease: 'power2.inOut'
		});

		if (this.instance.aspect < 1) {
			console.log(artworks, artworkIndex);
			gsap.to(artworks[artworkIndex % 5].position, {
				duration: 2,
				y: artworks[artworkIndex % 5].position.y + 0.15,
				ease: 'power2.inOut'
			});
		}

		this.controls.enabled = false;

		this.currentArtworkIndex = artworkIndex;
	}

	setRaycaster(targets) {
		const scenes = targets.map((target) => target.resource.scene);
		this.raycaster = new Raycaster(scenes, this.instance);
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
		if (this.controls) {
			this.controls.update();
		}
	}

	destroy() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}
}
