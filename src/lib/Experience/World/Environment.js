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

        this.setAmientLight();
        this.setSunLight();
        this.createFog()
        this.setEnvironmentMap();
        this.environmentUpdate()

        
        sceneStore.subscribe((value) => {
            if (value != 'idle') {
                this.addFog()
            } else {
                this.removeFog()
            }
        });

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment');

            // this.debugFolder.add(this.sunLight, 'intensity').min(0).max(10).step(0.001).name('sunLightIntensity');
        }

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

    setAmientLight() {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
        this.scene.add(this.ambientLight);
    }

    setEnvironmentMap()
    {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.5;
        this.environmentMap.texture =  this.resources.items.environmentMap;
        this.environmentMap.enconding = THREE.SRGBColorSpace;
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        
        this.scene.background = this.environmentMap.texture;

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

    environmentUpdate() {
    
        sceneStore.subscribe((value) => {
            if (value != "idle" && value != 'island-fire' && value != 'island-desert' && value != 'island-ice' && value != 'island-ruins') {
                // Use GSAP to animate the backgroundIntensity to 0.05 over 1 second
                gsap.to(this.scene, { duration: 1, backgroundIntensity: 0.05 });
                gsap.to(this.fog.instance.color, {duration: 1, r: 0, g: 0, b: 0});
            } else {
                // Immediately set the backgroundIntensity to 1.0 without animation
                gsap.to(this.scene, { duration: 1, backgroundIntensity: 0.65 });
                gsap.to(this.fog.instance.color, {duration: 1, r: 88/255, g: 100/255, b: 105/255});

            }
        });
        
    }

    createFog() {
        this.fog = {}

        this.fog.far = 30;
        // this.fog.far = 100;
        this.fog.near = 0;
        this.fog.colorFog = '#7a8e99';
        this.fog.instance = new THREE.Fog(this.fog.colorFog, this.fog.near, this.fog.far);

        this.scene.fog = this.fog.instance;

    }

    addFog() {
        gsap.to(this.fog.instance, {duration: 3, far: 4.5, ease: "power2.inOut"});
        gsap.to(this.fog.instance, {duration: 3, near: 0.75, ease: "power2.inOut"});
    }

    removeFog() {
        gsap.to(this.fog.instance, {duration: 3, far: 30, ease: "power2.inOut"});
        gsap.to(this.fog.instance, {duration: 3, near: 0, ease: "power2.inOut"});
        // gsap.to(this.fog.instance, {duration: 1, far: 100, ease: "power2.inOut"});
    }

}