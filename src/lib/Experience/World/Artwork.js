import * as THREE from 'three';
import Experience from '../Experience';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export default class Artwork {
	constructor(name, texture, position, rotation) {
		this.texture = texture;
		this.name = name;
		this.position = position;
		this.rotation = rotation;

		this.experience = new Experience();
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;
		this.width = this.texture.image.width;
		this.height = this.texture.image.height;
		this.ratio = this.width / this.height;

		this.createArtwork();
	}

	setTexture() {
		this.texture.flipY = false;
		this.texture.colorSpace = THREE.SRGBColorSpace;
		// this.texture.minFilter = THREE.NearestFilter
		// this.texture.magFilter = THREE.NearestFilter
		// this.texture.generateMipmaps = false
	}

	createArtwork() {
		this.setTexture();

		// Determine if the aspect ratio is landscape or portrait
		if (this.ratio > 1) {
			// Landscape (16:9 or similar)
			this.artworkGeometry = new THREE.PlaneGeometry(this.ratio, 1);
		} else {
			// Portrait (9:16 or similar)
			this.artworkGeometry = new THREE.PlaneGeometry(1, 1 / this.ratio);
		}

		// console.log('this.artworkGeometry', this.artworkGeometry)
		this.artworkMaterial = new THREE.MeshBasicMaterial({
			map: this.texture,
			side: THREE.DoubleSide
		});

		this.artworkMesh = new THREE.Mesh(this.artworkGeometry, this.artworkMaterial);
		this.artworkMesh.name = this.name;

		this.artworkMesh.position.set(this.position.x, this.position.y, this.position.z);
		this.artworkMesh.scale.set(0.2, 0.2, 0.2);
		this.artworkMesh.rotation.set(0, this.rotation.y, 0);

		this.experience.scene.add(this.artworkMesh);
	}
}
