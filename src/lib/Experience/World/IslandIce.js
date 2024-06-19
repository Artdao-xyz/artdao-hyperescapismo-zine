import * as THREE from "three";
import Experience from "../Experience";
import Artwork from "./Artwork";
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

        console.log(positions.islandIce);

        this.addArtworks()

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-ice');
            this.debugFolder.close();
            positions.islandIce.artwork6.position = this.debugFolder.addFolder('artwork6');
            positions.islandIce.artwork6.position.close();
            positions.islandIce.artwork6.position.add(this.artworks[0].position, 'x').name('x').min(-2.5).max(2.5).step(0.001);
            positions.islandIce.artwork6.position.add(this.artworks[0].position, 'y').name('y').min(-2.5).max(2.5).step(0.001);
            positions.islandIce.artwork6.position.add(this.artworks[0].position, 'z').name('z').min(-2.5).max(2.5).step(0.001);

            positions.islandIce.artwork6.position.add(this.artworks[0].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandIce.artwork7.position = this.debugFolder.addFolder('artwork7');
            positions.islandIce.artwork7.position.close();
            positions.islandIce.artwork7.position.add(this.artworks[1].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork7.position.add(this.artworks[1].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork7.position.add(this.artworks[1].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandIce.artwork7.position.add(this.artworks[1].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandIce.artwork8.position = this.debugFolder.addFolder('artwork8');
            positions.islandIce.artwork8.position.close();
            positions.islandIce.artwork8.position.add(this.artworks[2].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork8.position.add(this.artworks[2].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork8.position.add(this.artworks[2].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandIce.artwork8.position.add(this.artworks[2].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandIce.artwork9.position = this.debugFolder.addFolder('artwork9');
            positions.islandIce.artwork9.position.close();
            positions.islandIce.artwork9.position.add(this.artworks[3].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork9.position.add(this.artworks[3].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork9.position.add(this.artworks[3].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);
            
            positions.islandIce.artwork9.position.add(this.artworks[3].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);

            positions.islandIce.artwork10.position = this.debugFolder.addFolder('artwork10');
            positions.islandIce.artwork10.position.close();
            positions.islandIce.artwork10.position.add(this.artworks[4].position, 'x').name('x').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork10.position.add(this.artworks[4].position, 'y').name('y').min(-1.5).max(1.5).step(0.0001);
            positions.islandIce.artwork10.position.add(this.artworks[4].position, 'z').name('z').min(-1.5).max(1.5).step(0.0001);

            positions.islandIce.artwork10.position.add(this.artworks[4].rotation, 'y').name('rotation').min(-Math.PI / 2).max(Math.PI / 2).step(0.0001);
        }
        
        this.resource = this.resources.items.islandIce;

        this.setModel();
        this.setTextures();
        this.setMaterial();
        
        // this.float();
        this.rotate();
    }

    setModel() {
        this.model = this.resource.scene;
        this.model.position.set(positions.islandIce.position.x, positions.islandIce.position.y, positions.islandIce.position.z);
        this.model.rotation.set(0, -Math.PI/4, 0);
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setTextures() {
        this.textures = {}

        this.resources.items.islandIceTexture.flipY = false;
        this.resources.items.islandIceTexture.colorSpace = THREE.SRGBColorSpace;
        this.resources.items.islandIceTexture.minFilter = THREE.NearestFilter
        this.resources.items.islandIceTexture.magFilter = THREE.NearestFilter
        this.resources.items.islandIceTexture.generateMipmaps = false

        this.resources.items.islandIceAlphaMap.flipY = false;
        this.resources.items.islandIceAlphaMap.colorSpace = THREE.SRGBColorSpace;
        this.resources.items.islandIceAlphaMap.minFilter = THREE.NearestFilter
        this.resources.items.islandIceAlphaMap.magFilter = THREE.NearestFilter
        this.resources.items.islandIceAlphaMap.generateMipmaps = false

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
            if (child.isMesh && child.name === 'island-ice' || child.isMesh && child.name === 'portal-ice') {
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

        let artworkPosition1 = positions.islandIce.artwork6.position;
        let artworkPosition2 = positions.islandIce.artwork7.position;
        let artworkPosition3 = positions.islandIce.artwork8.position;
        let artworkPosition4 = positions.islandIce.artwork9.position;
        let artworkPosition5 = positions.islandIce.artwork10.position;

        let artworkRotation1 = positions.islandIce.artwork6.rotation;
        let artworkRotation2 = positions.islandIce.artwork7.rotation;
        let artworkRotation3 = positions.islandIce.artwork8.rotation;
        let artworkRotation4 = positions.islandIce.artwork9.rotation;
        let artworkRotation5 = positions.islandIce.artwork10.rotation;

        let artwork11 = new Artwork('artwork6', artworkTexture1, artworkPosition1, artworkRotation1);
        let artwork12 = new Artwork('artwork7', artworkTexture2, artworkPosition2, artworkRotation2);
        let artwork13 = new Artwork('artwork8', artworkTexture3, artworkPosition3, artworkRotation3);
        let artwork14 = new Artwork('artwork9', artworkTexture4, artworkPosition4, artworkRotation4);
        let artwork15 = new Artwork('artwork10', artworkTexture5, artworkPosition5, artworkRotation5);

        this.artworks.push(artwork11.artworkMesh, artwork12.artworkMesh, artwork13.artworkMesh, artwork14.artworkMesh, artwork15.artworkMesh);

        this.model.add(...this.artworks);

        sceneStore.subscribe((value) => {
            if (value != "island-ice") {
                setTimeout(() => {
                    // artwork11.hide();
                    // artwork12.hide();
                    // artwork13.hide();
                    // artwork14.hide();
                    // artwork15.hide();
                }, 1000);
            }
            else {
                setTimeout(() => {
                    artwork11.show();
                    artwork12.show();
                    artwork13.show();
                    artwork14.show();
                    artwork15.show();
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