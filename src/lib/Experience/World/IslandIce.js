import * as THREE from "three";
import Experience from "../Experience";

export default class IslandIce {

    constructor() {
            
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('island-ice');
        }
        
        this.resource = this.resources.items.islandIce;

        this.setModel();
        this.setTextures();
        this.setMaterial();
        // this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene;
        this.model.position.set(-15, 0, 0);
        // this.model.rotation.set(0, Math.PI, 0);
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
            if (child.isMesh) {
                child.material = this.material;
                child.material.needsUpdate = true
            }
        });
    }

}