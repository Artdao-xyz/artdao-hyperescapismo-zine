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
            if (child.isMesh) {
                child.material = this.material;
                child.material.needsUpdate = true
            }
        });
    }
}