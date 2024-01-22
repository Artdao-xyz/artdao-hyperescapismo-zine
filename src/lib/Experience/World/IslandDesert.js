import * as THREE from "three";
import Experience from "../Experience";

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
        
        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-desert');
        }
        
        
        this.setModel();
        this.setTextures();
        this.setMaterial();
        // this.setAnimation()
    }

    setModel() {
        this.model.position.set(-4.5, 0, 0);
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

        this.resources.items.islandDesertTexture.flipY = false;
        this.resources.items.islandDesertTexture.colorSpace = THREE.SRGBColorSpace;
        this.resources.items.islandDesertTexture.minFilter = THREE.NearestFilter
        this.resources.items.islandDesertTexture.magFilter = THREE.NearestFilter
        this.resources.items.islandDesertTexture.generateMipmaps = false
        
        this.textures.color = this.resources.items.islandDesertTexture;
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
}