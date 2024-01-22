import * as THREE from "three";
import Experience from "../Experience";
import Artwork from "./Artwork";

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

        this.addArtworks()

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-fire');
        }
        
        this.setModel();
        this.setTextures();
        this.setMaterial();
    }

    setModel() {
        this.model.position.set(4.5, 0, 0);
        this.model.rotation.set(0, Math.PI, 0);
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
        this.resources.items.islandFireTexture.minFilter = THREE.NearestFilter
        this.resources.items.islandFireTexture.magFilter = THREE.NearestFilter
        this.resources.items.islandFireTexture.generateMipmaps = false
        
        this.textures.color = this.resources.items.islandFireTexture;
    }

    setMaterial() {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.textures.color, 
            transparent: true, 
            // alphaTest: 0.75, 
            side: THREE.DoubleSide });

        //add texture to island
        this.model.traverse((child) => {
            if (child.isMesh) {
                child.material = this.material;
                child.material.needsUpdate = true
            }
        });
    }

    addArtworks() {
        this.artworkTexture1 = this.resources.items.artworkTexture1;
        this.artworkTexture2 = this.resources.items.artworkTexture2;

        this.artwork1 = new Artwork('artwork1', this.artworkTexture1, { x: 5.0, y: 1, z: -1 });
        this.artwork2 = new Artwork('artwork2', this.artworkTexture2, { x: 4.0, y: 1, z: -1 });
        
        console.log(this.artwork1);

        // console.log(this.experience.world);
        
        this.experience.world.artworks.push(this.artwork1, this.artwork2);
    }
}