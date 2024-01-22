import * as THREE from "three";
import Experience from "../Experience";

export default class IslandRuins {

    constructor() {
            
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-ruins');
        }
        
        this.resource = this.resources.items.islandRuins;

        this.setModel();
        this.setTextures();
        this.setMaterial();
        // this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.position.set(15, 0, 0)
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

        this.resources.items.islandRuinsTexture.flipY = false;
        this.resources.items.islandRuinsTexture.colorSpace = THREE.SRGBColorSpace;
        this.resources.items.islandRuinsTexture.minFilter = THREE.NearestFilter
        this.resources.items.islandRuinsTexture.magFilter = THREE.NearestFilter
        this.resources.items.islandRuinsTexture.generateMipmaps = false
        
        this.textures.color = this.resources.items.islandRuinsTexture;
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