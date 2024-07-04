import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience';
import Artwork from './Artwork';
import { sceneStore } from '$lib/store.js';
import positions from '../positions.js';

export default class IslandRuins {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;
		this.camera = this.experience.camera.instance;
		this.resource = this.resources.items.islandRuins;
		this.model = this.resource.scene;
		this.artworks = [];

		this.addArtworks();

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('island-ruins');
			this.debugFolder.close();

			positions.islandRuins.artwork16.position = this.debugFolder.addFolder('artwork16');
			positions.islandRuins.artwork16.position.close();
			positions.islandRuins.artwork16.position
				.add(this.artworks[0].position, 'x')
				.name('x')
				.min(-2.5)
				.max(2.5)
				.step(0.001);
			positions.islandRuins.artwork16.position
				.add(this.artworks[0].position, 'y')
				.name('y')
				.min(-2.5)
				.max(2.5)
				.step(0.001);
			positions.islandRuins.artwork16.position
				.add(this.artworks[0].position, 'z')
				.name('z')
				.min(-2.5)
				.max(2.5)
				.step(0.001);

			positions.islandRuins.artwork16.position
				.add(this.artworks[0].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandRuins.artwork17.position = this.debugFolder.addFolder('artwork17');
			positions.islandRuins.artwork17.position.close();
			positions.islandRuins.artwork17.position
				.add(this.artworks[1].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork17.position
				.add(this.artworks[1].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork17.position
				.add(this.artworks[1].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandRuins.artwork17.position
				.add(this.artworks[1].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandRuins.artwork18.position = this.debugFolder.addFolder('artwork18');
			positions.islandRuins.artwork18.position.close();
			positions.islandRuins.artwork18.position
				.add(this.artworks[2].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork18.position
				.add(this.artworks[2].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork18.position
				.add(this.artworks[2].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandRuins.artwork18.position
				.add(this.artworks[2].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandRuins.artwork19.position = this.debugFolder.addFolder('artwork19');
			positions.islandRuins.artwork19.position.close();
			positions.islandRuins.artwork19.position
				.add(this.artworks[3].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork19.position
				.add(this.artworks[3].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork19.position
				.add(this.artworks[3].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandRuins.artwork19.position
				.add(this.artworks[3].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandRuins.artwork20.position = this.debugFolder.addFolder('artwork20');
			positions.islandRuins.artwork20.position.close();
			positions.islandRuins.artwork20.position
				.add(this.artworks[4].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork20.position
				.add(this.artworks[4].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandRuins.artwork20.position
				.add(this.artworks[4].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandRuins.artwork20.position
				.add(this.artworks[4].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);
		}

		this.setModel();
		this.setTextures();
		this.setMaterial();
		this.updateMaterial();
	}

	setModel() {
		this.model = this.resource.scene;
		this.model.position.set(
			positions.islandRuins.position.x,
			positions.islandRuins.position.y,
			positions.islandRuins.position.z
		);
		this.model.rotation.set(0, Math.PI / 4, 0);
		this.model.scale.set(0.65, 0.65, 0.65);
		this.scene.add(this.model);

		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});
	}

	setTextures() {
		this.textures = {};

		this.resources.items.islandRuinsTexture.flipY = false;
		this.resources.items.islandRuinsTexture.colorSpace = THREE.SRGBColorSpace;
		this.resources.items.islandRuinsTexture.minFilter = THREE.NearestFilter;
		this.resources.items.islandRuinsTexture.magFilter = THREE.NearestFilter;
		this.resources.items.islandRuinsTexture.generateMipmaps = false;

		this.resources.items.islandRuinsAlphaMap.flipY = false;
		// this.resources.items.islandRuinsAlphaMap.colorSpace = THREE.SRGBColorSpace;
		// this.resources.items.islandRuinsAlphaMap.minFilter = THREE.NearestFilter
		// this.resources.items.islandRuinsAlphaMap.magFilter = THREE.NearestFilter
		// this.resources.items.islandRuinsAlphaMap.generateMipmaps = false

		// this.resources.items.islandRuinsAlphaMap.wrapT = THREE.RepeatWrapping;
		// this.resources.items.islandRuinsAlphaMap.wrapS = THREE.RepeatWrapping;
		// this.resources.items.islandRuinsAlphaMap.repeat.set( 9, 1 );

		this.textures.color = this.resources.items.islandRuinsTexture;
		this.textures.alphaMap = this.resources.items.islandRuinsAlphaMap;
	}

	setMaterial() {
		this.material = new THREE.MeshBasicMaterial({
			map: this.textures.color,
			alphaMap: this.textures.alphaMap,
			transparent: true,
			alphaTest: 0.5,
			side: THREE.DoubleSide
		});

		this.model.traverse((child) => {
			if (
				(child.isMesh && child.name === 'island-ruins') ||
				(child.isMesh && child.name === 'portal-ruins')
			) {
				child.material = this.material;
				child.material.needsUpdate = true;
			}
		});
	}

	updateMaterial() {
		sceneStore.subscribe((value) => {
			if (value.includes('artwork')) {
				gsap.to(this.material, {
					duration: 2,
					scalar: 0.1,
					ease: 'power2.inOut',
					onUpdate: () => {
						this.material.color.setScalar(this.material.scalar);
						this.material.needsUpdate = true;
					}
				});
			} else {
				gsap.to(this.material, {
					duration: 2,
					scalar: 1.0,
					ease: 'power2.inOut',
					onUpdate: () => {
						this.material.color.setScalar(this.material.scalar);
						this.material.needsUpdate = true;
					}
				});
			}
		});
	}

	addArtworks() {
		// Destructure artwork textures and positions from this.resources.items and positions.islandFire respectively
		const { artworkTexture1, artworkTexture2, artworkTexture3, artworkTexture4, artworkTexture5 } =
			this.resources.items;

		const {
			artwork16: { position: artworkPosition1, rotation: artworkRotation1 },
			artwork17: { position: artworkPosition2, rotation: artworkRotation2 },
			artwork18: { position: artworkPosition3, rotation: artworkRotation3 },
			artwork19: { position: artworkPosition4, rotation: artworkRotation4 },
			artwork20: { position: artworkPosition5, rotation: artworkRotation5 }
		} = positions.islandRuins;

		// Instantiate Artwork instances
		const artwork16 = new Artwork('artwork16', artworkTexture1, artworkPosition1, artworkRotation1);
		const artwork17 = new Artwork('artwork17', artworkTexture2, artworkPosition2, artworkRotation2);
		const artwork18 = new Artwork('artwork18', artworkTexture3, artworkPosition3, artworkRotation3);
		const artwork19 = new Artwork('artwork19', artworkTexture4, artworkPosition4, artworkRotation4);
		const artwork20 = new Artwork('artwork20', artworkTexture5, artworkPosition5, artworkRotation5);

		// Push artwork meshes to the array
		this.artworks.push(
			artwork16.artworkMesh,
			artwork17.artworkMesh,
			artwork18.artworkMesh,
			artwork19.artworkMesh,
			artwork20.artworkMesh
		);

		// Add all artwork meshes to this.model
		this.model.add(...this.artworks);
	}
}
