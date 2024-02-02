import * as THREE from "three";
import Experience from "../Experience";
import Artwork from "./Artwork";
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

        this.addArtworks()

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-ruins');
            this.debugFolder.close();

            positions.islandRuins.artwork16.position = this.debugFolder.addFolder('artwork16');
            positions.islandRuins.artwork16.position.close();
            positions.islandRuins.artwork16.position.add(this.artworks[0].position, 'x').name('x').min(-2.5).max(2.5).step(0.001);
            positions.islandRuins.artwork16.position.add(this.artworks[0].position, 'y').name('y').min(-2.5).max(2.5).step(0.001);
            positions.islandRuins.artwork16.position.add(this.artworks[0].position, 'z').name('z').min(-2.5).max(2.5).step(0.001);

            positions.islandRuins.artwork16.position.add(this.artworks[0].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandRuins.artwork17.position = this.debugFolder.addFolder('artwork17');
            positions.islandRuins.artwork17.position.close();
            positions.islandRuins.artwork17.position.add(this.artworks[1].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork17.position.add(this.artworks[1].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork17.position.add(this.artworks[1].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandRuins.artwork17.position.add(this.artworks[1].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandRuins.artwork18.position = this.debugFolder.addFolder('artwork18');
            positions.islandRuins.artwork18.position.close();
            positions.islandRuins.artwork18.position.add(this.artworks[2].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork18.position.add(this.artworks[2].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork18.position.add(this.artworks[2].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandRuins.artwork18.position.add(this.artworks[2].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandRuins.artwork19.position = this.debugFolder.addFolder('artwork19');
            positions.islandRuins.artwork19.position.close();
            positions.islandRuins.artwork19.position.add(this.artworks[3].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork19.position.add(this.artworks[3].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork19.position.add(this.artworks[3].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandRuins.artwork19.position.add(this.artworks[3].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);
            
            positions.islandRuins.artwork20.position = this.debugFolder.addFolder('artwork20');
            positions.islandRuins.artwork20.position.close();
            positions.islandRuins.artwork20.position.add(this.artworks[4].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork20.position.add(this.artworks[4].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandRuins.artwork20.position.add(this.artworks[4].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandRuins.artwork20.position.add(this.artworks[4].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);
        }
        
        this.setModel();
        this.setTextures();
        this.setMaterial();

        // this.float();
        this.rotate();
    }

    setModel() {
        this.model = this.resource.scene
        this.model.position.set(positions.islandRuins.position.x, positions.islandRuins.position.y, positions.islandRuins.position.z)
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setTextures() {
        this.textures = {}

        this.resources.items.islandRuinsTexture.flipY = false;
        this.resources.items.islandRuinsTexture.colorSpace = THREE.SRGBColorSpace;
        this.resources.items.islandRuinsTexture.minFilter = THREE.NearestFilter
        this.resources.items.islandRuinsTexture.magFilter = THREE.NearestFilter
        this.resources.items.islandRuinsTexture.generateMipmaps = false

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
            alphaTest: 0.1, 
            side: THREE.DoubleSide 
        });

        this.model.traverse((child) => {
            if (child.isMesh && child.name === 'island-ruins' || child.isMesh && child.name === 'portal-ruins') {
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

        let artworkPosition1 = positions.islandRuins.artwork16.position;
        let artworkPosition2 = positions.islandRuins.artwork17.position;
        let artworkPosition3 = positions.islandRuins.artwork18.position;
        let artworkPosition4 = positions.islandRuins.artwork19.position;
        let artworkPosition5 = positions.islandRuins.artwork20.position;

        let artworkRotation1 = positions.islandRuins.artwork16.rotation;
        let artworkRotation2 = positions.islandRuins.artwork17.rotation;
        let artworkRotation3 = positions.islandRuins.artwork18.rotation;
        let artworkRotation4 = positions.islandRuins.artwork19.rotation;
        let artworkRotation5 = positions.islandRuins.artwork20.rotation;

        let artwork16 = new Artwork('artwork16', artworkTexture1, artworkPosition1, artworkRotation1);
        let artwork17 = new Artwork('artwork17', artworkTexture2, artworkPosition2, artworkRotation2);
        let artwork18 = new Artwork('artwork18', artworkTexture3, artworkPosition3, artworkRotation3);
        let artwork19 = new Artwork('artwork19', artworkTexture4, artworkPosition4, artworkRotation4);
        let artwork20 = new Artwork('artwork20', artworkTexture5, artworkPosition5, artworkRotation5);

        this.artworks.push(artwork16.artworkMesh, artwork17.artworkMesh, artwork18.artworkMesh, artwork19.artworkMesh, artwork20.artworkMesh);

        this.model.add(...this.artworks);

        sceneStore.subscribe((value) => {
            if (value != "island-ruins") {
                setTimeout(() => {
                    // artwork16.hide();
                    // artwork17.hide();
                    // artwork18.hide();
                    // artwork19.hide();
                    // artwork20.hide();
                }, 1000);
            }
            else {
                setTimeout(() => {
                    artwork16.show();
                    artwork17.show();
                    artwork18.show();
                    artwork19.show();
                    artwork20.show();
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