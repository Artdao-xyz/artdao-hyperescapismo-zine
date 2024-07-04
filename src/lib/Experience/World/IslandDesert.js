import * as THREE from "three";
import gsap from 'gsap';
import Experience from "../Experience";
import Artwork from "./Artwork";
import { sceneStore } from '$lib/store.js';
import positions from '../positions.js';

export default class IslandDesert {

    constructor() {
            
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.camera = this.experience.camera.instance;
        this.resource = this.resources.items.islandDesert;
        this.model = this.resource.scene;
        this.artworks = [];

        this.addArtworks()

        
        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-desert');
            this.debugFolder.close();

            positions.islandDesert.artwork11.position = this.debugFolder.addFolder('artwork11');
            positions.islandDesert.artwork11.position.close();
            positions.islandDesert.artwork11.position.add(this.artworks[0].position, 'x').name('x').min(-2.5).max(2.5).step(0.001);
            positions.islandDesert.artwork11.position.add(this.artworks[0].position, 'y').name('y').min(-2.5).max(2.5).step(0.001);
            positions.islandDesert.artwork11.position.add(this.artworks[0].position, 'z').name('z').min(-2.5).max(2.5).step(0.001);
            
            positions.islandDesert.artwork11.position.add(this.artworks[0].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandDesert.artwork12.position = this.debugFolder.addFolder('artwork12');
            positions.islandDesert.artwork12.position.close();
            positions.islandDesert.artwork12.position.add(this.artworks[1].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork12.position.add(this.artworks[1].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork12.position.add(this.artworks[1].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandDesert.artwork12.position.add(this.artworks[1].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandDesert.artwork13.position = this.debugFolder.addFolder('artwork13');
            positions.islandDesert.artwork13.position.close();
            positions.islandDesert.artwork13.position.add(this.artworks[2].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork13.position.add(this.artworks[2].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork13.position.add(this.artworks[2].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandDesert.artwork13.position.add(this.artworks[2].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandDesert.artwork14.position = this.debugFolder.addFolder('artwork14');
            positions.islandDesert.artwork14.position.close();
            positions.islandDesert.artwork14.position.add(this.artworks[3].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork14.position.add(this.artworks[3].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork14.position.add(this.artworks[3].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandDesert.artwork14.position.add(this.artworks[3].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);
            
            positions.islandDesert.artwork15.position = this.debugFolder.addFolder('artwork15');
            positions.islandDesert.artwork15.position.close();
            positions.islandDesert.artwork15.position.add(this.artworks[4].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork15.position.add(this.artworks[4].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandDesert.artwork15.position.add(this.artworks[4].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandDesert.artwork15.position.add(this.artworks[4].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);
        }
        
        this.setModel();
        this.setTextures();
        this.setMaterial();
        this.updateMaterial()
    }

    setModel() {
        this.model.position.set(positions.islandDesert.position.x, positions.islandDesert.position.y, positions.islandDesert.position.z);
        this.model.rotation.set(0, Math.PI, 0);
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

        this.resources.items.islandDesertTexture.flipY = false;
        this.resources.items.islandDesertTexture.colorSpace = THREE.SRGBColorSpace;
        this.resources.items.islandDesertTexture.minFilter = THREE.NearestFilter
        this.resources.items.islandDesertTexture.magFilter = THREE.NearestFilter
        this.resources.items.islandDesertTexture.generateMipmaps = false

        this.resources.items.islandDesertAlphaMap.flipY = false;
        this.resources.items.islandDesertAlphaMap.colorSpace = THREE.SRGBColorSpace;
        this.resources.items.islandDesertAlphaMap.minFilter = THREE.NearestFilter
        this.resources.items.islandDesertAlphaMap.magFilter = THREE.NearestFilter
        this.resources.items.islandDesertAlphaMap.generateMipmaps = false

        // this.resources.items.islandDesertAlphaMap.wrapT = THREE.RepeatWrapping;
        // this.resources.items.islandDesertAlphaMap.wrapS = THREE.RepeatWrapping;
        // this.resources.items.islandDesertAlphaMap.repeat.set( 9, 1 );

        this.textures.color = this.resources.items.islandDesertTexture;
        this.textures.alphaMap = this.resources.items.islandDesertAlphaMap;
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
            if (child.isMesh && child.name === 'island-desert' || child.isMesh && child.name === 'portal-desert') {
                child.material = this.material;
                child.material.needsUpdate = true
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
            artwork11: { position: artworkPosition1, rotation: artworkRotation1 },
            artwork12: { position: artworkPosition2, rotation: artworkRotation2 },
            artwork13: { position: artworkPosition3, rotation: artworkRotation3 },
            artwork14: { position: artworkPosition4, rotation: artworkRotation4 },
            artwork15: { position: artworkPosition5, rotation: artworkRotation5 }
        } = positions.islandDesert;
    
        // Instantiate Artwork instances
        const artwork11 = new Artwork('artwork11', artworkTexture1, artworkPosition1, artworkRotation1);
        const artwork12 = new Artwork('artwork12', artworkTexture2, artworkPosition2, artworkRotation2);
        const artwork13 = new Artwork('artwork13', artworkTexture3, artworkPosition3, artworkRotation3);
        const artwork14 = new Artwork('artwork14', artworkTexture4, artworkPosition4, artworkRotation4);
        const artwork15 = new Artwork('artwork15', artworkTexture5, artworkPosition5, artworkRotation5);
    
        // Push artwork meshes to the array
        this.artworks.push(artwork11.artworkMesh, artwork12.artworkMesh, artwork13.artworkMesh, artwork14.artworkMesh, artwork15.artworkMesh);
    
        // Add all artwork meshes to this.model
        this.model.add(...this.artworks);
    }
}