import * as THREE from "three";
import gsap from 'gsap';
import Experience from "../Experience";
import Artwork from "./Artwork";
import { sceneStore } from '$lib/store.js';
import positions from '../positions.js';

export default class IslandFire {

    constructor() {
            
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.camera = this.experience.camera.instance;
        this.resource = this.resources.items.islandFire;
        this.model = this.resource.scene;
        this.artworks = [];

        // console.log(positions);
        let floating = true;

        this.addArtworks()

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-fire');
            this.debugFolder.close();
            positions.islandFire.artwork1.position = this.debugFolder.addFolder('artwork1');
            positions.islandFire.artwork1.position.close();
            positions.islandFire.artwork1.position.add(this.artworks[0].position, 'x').name('x').min(-2.5).max(2.5).step(0.001);
            positions.islandFire.artwork1.position.add(this.artworks[0].position, 'y').name('y').min(-2.5).max(2.5).step(0.001);
            positions.islandFire.artwork1.position.add(this.artworks[0].position, 'z').name('z').min(-2.5).max(2.5).step(0.001);

            positions.islandFire.artwork1.position.add(this.artworks[0].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandFire.artwork2.position = this.debugFolder.addFolder('artwork2');
            positions.islandFire.artwork2.position.close();
            positions.islandFire.artwork2.position.add(this.artworks[1].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork2.position.add(this.artworks[1].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork2.position.add(this.artworks[1].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandFire.artwork2.position.add(this.artworks[1].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandFire.artwork3.position = this.debugFolder.addFolder('artwork3');
            positions.islandFire.artwork3.position.close();
            positions.islandFire.artwork3.position.add(this.artworks[2].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork3.position.add(this.artworks[2].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork3.position.add(this.artworks[2].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandFire.artwork3.position.add(this.artworks[2].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandFire.artwork4.position = this.debugFolder.addFolder('artwork4');
            positions.islandFire.artwork4.position.close();
            positions.islandFire.artwork4.position.add(this.artworks[3].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork4.position.add(this.artworks[3].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork4.position.add(this.artworks[3].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandFire.artwork4.position.add(this.artworks[3].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);
            
            positions.islandFire.artwork5.position = this.debugFolder.addFolder('artwork5');
            positions.islandFire.artwork5.position.close();
            positions.islandFire.artwork5.position.add(this.artworks[4].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork5.position.add(this.artworks[4].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandFire.artwork5.position.add(this.artworks[4].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandFire.artwork5.position.add(this.artworks[4].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);
        }
        
        this.setModel();
        this.setTextures();
        this.setMaterial();
        this.updateMaterial();
    }

    setModel() {
        this.model.position.set(positions.islandFire.position.x, positions.islandFire.position.y, positions.islandFire.position.z);
        this.model.rotation.set(0, -Math.PI / 4, 0);
        this.model.scale.set(0.65, 0.65, 0.65)
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setTextures() {
        this.textures = {}

        this.resources.items.islandFireTexture.flipY = false;
        this.resources.items.islandFireTexture.colorSpace = THREE.SRGBColorSpace;
        // this.resources.items.islandFireTexture.minFilter = THREE.NearestFilter
        // this.resources.items.islandFireTexture.magFilter = THREE.NearestFilter
        // this.resources.items.islandFireTexture.generateMipmaps = false;

        this.resources.items.islandFireAlphaMap.flipY = false;
        
        this.textures.color = this.resources.items.islandFireTexture;
        this.textures.alphaMap = this.resources.items.islandFireAlphaMap;
    }

    setMaterial() {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.textures.color, 
            alphaMap: this.textures.alphaMap,
            transparent: true, 
            // alphaTest: 0.1, 
            side: THREE.DoubleSide 
        });

        //add texture to island
        this.model.traverse((child) => {
            if (child.isMesh && child.name === 'island-fire' || child.isMesh && child.name === 'portal-fire') {
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
                    ease: "power2.inOut",
                    onUpdate: () => {
                        this.material.color.setScalar(this.material.scalar);
                        this.material.needsUpdate = true;
                    }
                });
            } else {
                gsap.to(this.material, {
                    duration: 2,
                    scalar: 1.0,
                    ease: "power2.inOut",
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
        const {
            artworkTexture1,
            artworkTexture2,
            artworkTexture3,
            artworkTexture4,
            artworkTexture5
        } = this.resources.items;
    
        const {
            artwork1: { position: artworkPosition1, rotation: artworkRotation1 },
            artwork2: { position: artworkPosition2, rotation: artworkRotation2 },
            artwork3: { position: artworkPosition3, rotation: artworkRotation3 },
            artwork4: { position: artworkPosition4, rotation: artworkRotation4 },
            artwork5: { position: artworkPosition5, rotation: artworkRotation5 }
        } = positions.islandFire;
    
        // Instantiate Artwork instances
        const artwork1 = new Artwork('artwork1', artworkTexture1, artworkPosition1, artworkRotation1);
        const artwork2 = new Artwork('artwork2', artworkTexture2, artworkPosition2, artworkRotation2);
        const artwork3 = new Artwork('artwork3', artworkTexture3, artworkPosition3, artworkRotation3);
        const artwork4 = new Artwork('artwork4', artworkTexture4, artworkPosition4, artworkRotation4);
        const artwork5 = new Artwork('artwork5', artworkTexture5, artworkPosition5, artworkRotation5);
    
        // Push artwork meshes to the array
        this.artworks.push(artwork1.artworkMesh, artwork2.artworkMesh, artwork3.artworkMesh, artwork4.artworkMesh, artwork5.artworkMesh);
    
        // Add all artwork meshes to this.model
        this.model.add(...this.artworks);
    }
    
    
}