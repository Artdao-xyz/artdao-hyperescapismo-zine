import * as THREE from "three";
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

        // this.float();
        this.rotate();
    }

    setModel() {
        this.model.position.set(positions.islandDesert.position.x, positions.islandDesert.position.y, positions.islandDesert.position.z);
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

    addArtworks() {
        let artworkTexture1 = this.resources.items.artworkTexture1;
        let artworkTexture2 = this.resources.items.artworkTexture2;
        let artworkTexture3 = this.resources.items.artworkTexture3;
        let artworkTexture4 = this.resources.items.artworkTexture4;
        let artworkTexture5 = this.resources.items.artworkTexture5;

        let artworkPosition1 = positions.islandDesert.artwork11.position;
        let artworkPosition2 = positions.islandDesert.artwork12.position;
        let artworkPosition3 = positions.islandDesert.artwork13.position;
        let artworkPosition4 = positions.islandDesert.artwork14.position;
        let artworkPosition5 = positions.islandDesert.artwork15.position;

        let artworkRotation1 = positions.islandDesert.artwork11.rotation;
        let artworkRotation2 = positions.islandDesert.artwork12.rotation;
        let artworkRotation3 = positions.islandDesert.artwork13.rotation;
        let artworkRotation4 = positions.islandDesert.artwork14.rotation;
        let artworkRotation5 = positions.islandDesert.artwork15.rotation;

        let artwork6 = new Artwork('artwork11', artworkTexture1, artworkPosition1, artworkRotation1);
        let artwork7 = new Artwork('artwork12', artworkTexture2, artworkPosition2, artworkRotation2);
        let artwork8 = new Artwork('artwork13', artworkTexture3, artworkPosition3, artworkRotation3);
        let artwork9 = new Artwork('artwork14', artworkTexture4, artworkPosition4, artworkRotation4);
        let artwork10 = new Artwork('artwork15', artworkTexture5, artworkPosition5, artworkRotation5);

        this.artworks.push(artwork6.artworkMesh, artwork7.artworkMesh, artwork8.artworkMesh, artwork9.artworkMesh, artwork10.artworkMesh);

        this.model.add(...this.artworks);

        sceneStore.subscribe((value) => {
            if (value != "island-desert") {
                setTimeout(() => {
                    // artwork6.hide();
                    // artwork7.hide();
                    // artwork8.hide();
                    // artwork9.hide();
                    // artwork10.hide();
                }, 1000);
            }
            else {
                setTimeout(() => {
                    artwork6.show();
                    artwork7.show();
                    artwork8.show();
                    artwork9.show();
                    artwork10.show();
                }, 1000);
            }
        });
    }

    float() {
        this.time.on('animate', () => {
            this.model.position.y = Math.sin(this.time.elapsed * 0.001) * 0.05;
        });
    }

    rotate() {
        
        let lookAtVector = new THREE.Vector3(this.model.position.x, 0.50, this.model.position.z);

        //loop through artworks and make them look at the camera
        // for (let i = 0; i < this.artworks.length; i++) {
        //     this.artworks[i].lookAt(lookAtVector);
        // }

        // this.time.on('animate', () => {
        //     this.model.rotation.y += 0.001;
        // });
    }
}