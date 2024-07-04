import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience';
import Artwork from './Artwork';
import { sceneStore } from '$lib/store.js';
import positions from '../positions.js';

export default class IslandIce {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;
		this.camera = this.experience.camera.instance;
		this.resource = this.resources.items.islandIce;
		this.model = this.resource.scene;
		this.artworks = [];

		// console.log(positions.islandIce);

		this.addArtworks();

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('island-ice');
			this.debugFolder.close();
			positions.islandIce.artwork6.position = this.debugFolder.addFolder('artwork6');
			positions.islandIce.artwork6.position.close();
			positions.islandIce.artwork6.position
				.add(this.artworks[0].position, 'x')
				.name('x')
				.min(-2.5)
				.max(2.5)
				.step(0.001);
			positions.islandIce.artwork6.position
				.add(this.artworks[0].position, 'y')
				.name('y')
				.min(-2.5)
				.max(2.5)
				.step(0.001);
			positions.islandIce.artwork6.position
				.add(this.artworks[0].position, 'z')
				.name('z')
				.min(-2.5)
				.max(2.5)
				.step(0.001);

			positions.islandIce.artwork6.position
				.add(this.artworks[0].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandIce.artwork7.position = this.debugFolder.addFolder('artwork7');
			positions.islandIce.artwork7.position.close();
			positions.islandIce.artwork7.position
				.add(this.artworks[1].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork7.position
				.add(this.artworks[1].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork7.position
				.add(this.artworks[1].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandIce.artwork7.position
				.add(this.artworks[1].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandIce.artwork8.position = this.debugFolder.addFolder('artwork8');
			positions.islandIce.artwork8.position.close();
			positions.islandIce.artwork8.position
				.add(this.artworks[2].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork8.position
				.add(this.artworks[2].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork8.position
				.add(this.artworks[2].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandIce.artwork8.position
				.add(this.artworks[2].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandIce.artwork9.position = this.debugFolder.addFolder('artwork9');
			positions.islandIce.artwork9.position.close();
			positions.islandIce.artwork9.position
				.add(this.artworks[3].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork9.position
				.add(this.artworks[3].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork9.position
				.add(this.artworks[3].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandIce.artwork9.position
				.add(this.artworks[3].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);

			positions.islandIce.artwork10.position = this.debugFolder.addFolder('artwork10');
			positions.islandIce.artwork10.position.close();
			positions.islandIce.artwork10.position
				.add(this.artworks[4].position, 'x')
				.name('x')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork10.position
				.add(this.artworks[4].position, 'y')
				.name('y')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);
			positions.islandIce.artwork10.position
				.add(this.artworks[4].position, 'z')
				.name('z')
				.min(-1.5)
				.max(1.5)
				.step(0.0001);

			positions.islandIce.artwork10.position
				.add(this.artworks[4].rotation, 'y')
				.name('rotation')
				.min(-Math.PI / 2)
				.max(Math.PI / 2)
				.step(0.0001);
		}

		this.resource = this.resources.items.islandIce;

		this.setModel();
		this.setTextures();
		this.setMaterial();
		this.updateMaterial();
	}

	setModel() {
		this.model = this.resource.scene;
		this.model.position.set(
			positions.islandIce.position.x,
			positions.islandIce.position.y,
			positions.islandIce.position.z
		);
		this.model.rotation.set(0, -Math.PI / 4, 0);
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

		this.resources.items.islandIceTexture.flipY = false;
		this.resources.items.islandIceTexture.colorSpace = THREE.SRGBColorSpace;
		// this.resources.items.islandIceTexture.minFilter = THREE.NearestFilter
		// this.resources.items.islandIceTexture.magFilter = THREE.NearestFilter
		// this.resources.items.islandIceTexture.generateMipmaps = false

		this.resources.items.islandIceAlphaMap.flipY = false;
		// this.resources.items.islandIceAlphaMap.colorSpace = THREE.SRGBColorSpace;
		// this.resources.items.islandIceAlphaMap.minFilter = THREE.NearestFilter
		// this.resources.items.islandIceAlphaMap.magFilter = THREE.NearestFilter
		// this.resources.items.islandIceAlphaMap.generateMipmaps = false

		// this.resources.items.islandIceAlphaMap.wrapT = THREE.RepeatWrapping;
		// this.resources.items.islandIceAlphaMap.wrapS = THREE.RepeatWrapping;
		// this.resources.items.islandIceAlphaMap.repeat.set( 9, 1 );

		this.textures.color = this.resources.items.islandIceTexture;
		this.textures.alphaMap = this.resources.items.islandIceAlphaMap;
	}

	setMaterial() {
		this.material = new THREE.MeshBasicMaterial({
			map: this.textures.color,
			alphaMap: this.textures.alphaMap,
			transparent: true,
			alphaTest: 0.1,
			side: THREE.DoubleSide
		});

		this.model.traverse((child) => {
			if (
				(child.isMesh && child.name === 'island-ice') ||
				(child.isMesh && child.name === 'portal-ice')
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
			artwork6: { position: artworkPosition1, rotation: artworkRotation1 },
			artwork7: { position: artworkPosition2, rotation: artworkRotation2 },
			artwork8: { position: artworkPosition3, rotation: artworkRotation3 },
			artwork9: { position: artworkPosition4, rotation: artworkRotation4 },
			artwork10: { position: artworkPosition5, rotation: artworkRotation5 }
		} = positions.islandIce;

		// Instantiate Artwork instances
		const artwork6 = new Artwork('artwork6', artworkTexture1, artworkPosition1, artworkRotation1);
		const artwork7 = new Artwork('artwork7', artworkTexture2, artworkPosition2, artworkRotation2);
		const artwork8 = new Artwork('artwork8', artworkTexture3, artworkPosition3, artworkRotation3);
		const artwork9 = new Artwork('artwork9', artworkTexture4, artworkPosition4, artworkRotation4);
		const artwork10 = new Artwork('artwork10', artworkTexture5, artworkPosition5, artworkRotation5);

		// Push artwork meshes to the array
		this.artworks.push(
			artwork6.artworkMesh,
			artwork7.artworkMesh,
			artwork8.artworkMesh,
			artwork9.artworkMesh,
			artwork10.artworkMesh
		);

		// Add all artwork meshes to this.model
		this.model.add(...this.artworks);
	}
}
