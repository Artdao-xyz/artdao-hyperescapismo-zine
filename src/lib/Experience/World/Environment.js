import * as THREE from 'three';
import Experience from '../Experience.js';
import { sceneStore } from '$lib/store.js';
import { gsap } from 'gsap';

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setSunLight();
        this.createFog()
        this.setEnvironmentMap();
        
        
        sceneStore.subscribe((value) => {
            if (value != 'idle') {
                this.addFog()
            } else {
                this.removeFog()
            }
        });

    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(3, 3, - 2.25);
        this.scene.add(this.sunLight);
    }

    setEnvironmentMap()
    {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture0;
        this.environmentMap.enconding = THREE.SRGBColorSpace;
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        
        this.scene.background = this.environmentMap.texture;
        // this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse(child =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity;
                    child.material.enconding = this.environmentMap.enconding;
                    child.material.mapping = this.environmentMap.mapping;
                    child.material.needsUpdate = true;
                }
            });
        }
        this.environmentMap.updateMaterial();
    }

    createFog() {
        this.fog = {}

        this.fog.far = 25;
        // this.fog.far = 100;
        this.fog.near = 1;
        this.fog.colorFog = '#919191';
        this.fog.instance = new THREE.Fog(this.fog.colorFog, this.fog.near, this.fog.far);

        this.scene.fog = this.fog.instance;

    }

    addFog() {
        gsap.to(this.fog.instance, {duration: 1, far: 25, ease: "power2.inOut"});
    }

    removeFog() {
        gsap.to(this.fog.instance, {duration: 1, far: 25, ease: "power2.inOut"});
        // gsap.to(this.fog.instance, {duration: 1, far: 100, ease: "power2.inOut"});
    }

}