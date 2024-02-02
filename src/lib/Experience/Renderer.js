import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {

    constructor() {

        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.debug = this.experience.debug;

        this.setInstance();

        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('renderer');
            this.debugFolder.close();
            //add a folder for toneMapping 
            this.toneMappingFolder = this.debugFolder.addFolder('toneMapping');
            this.toneMappingFolder.close();
            this.toneMappingFolder.add(this.instance, 'toneMapping', {
                No: THREE.NoToneMapping,
                Linear: THREE.LinearToneMapping,
                Reinhard: THREE.ReinhardToneMapping,
                Cineon: THREE.CineonToneMapping,
                ACESFilmic: THREE.ACESFilmicToneMapping
            }).name('type').onFinishChange(() => {
                this.instance.toneMapping = this.instance.toneMapping;
            });
        }
    }

    setInstance() {

        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });

        // this.instance.physicallyCorrectLights = true;
        this.instance.outputColorSpace = THREE.SRGBColorSpace;
        this.instance.toneMapping = THREE.ReinhardToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor('#F5F1ED');
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {

        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.render(this.scene, this.camera.instance);
    }
}