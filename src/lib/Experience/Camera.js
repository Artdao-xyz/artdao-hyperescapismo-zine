import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
import Experience from './Experience.js';
import { sceneStore } from '/src/lib/store.js';
import positions from './positions.js';

export default class Camera {
    
    constructor() {

        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.debug = this.experience.debug; 

        this.setInstance();
        this.setOrbitControls();
        this.cameraUpdate();

        const axesHelper = new THREE.AxesHelper(1); // The size parameter determines the length of the axes
        this.scene.add(axesHelper);

        if (this.debug.active) {

            this.debugFolder = this.debug.ui.addFolder('camera');
            this.debugFolder.close();

            const helper = new THREE.CameraHelper( this.instance );
            helper.visible = false;
            this.debugFolder.add(helper, 'visible').name('visible').listen();
            this.scene.add( helper );

            this.debugFolder.add(this.instance.position, 'x').name('x').step(0.01).min(-5).max(5).listen();
            this.debugFolder.add(this.instance.position, 'y').name('y').step(0.01).min(-5).max(5).listen();
            this.debugFolder.add(this.instance.position, 'z').name('z').step(0.01).min(-25).max(25).listen();


            // this.debugFolder.add(this.controls.target, 'x').step(0.01).name('target x').listen();
            // this.debugFolder.add(this.controls.target, 'y').step(0.01).name('target y').listen();
            // this.debugFolder.add(this.controls.target, 'z').step(0.01).name('target z').listen();
        }
    }

    setInstance() {

        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 200);
        // this.instance.position.set(0, 0, 30);
        
        // if(this.instance.aspect > 1){
        //     this.instance.position.z = 30 / this.instance.aspect;
        // } else{
        //         this.instance.position.z= 30;
        // }
      
        this.scene.add(this.instance);
    }

    setOrbitControls() {

        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.dampingFactor = 0.1;
        // this.controls = new ArcballControls( this.instance, this.canvas, this.scene );
        this.controls.enableDamping = true;

        this.controls.enablePan = false
        this.controls.enableZoom = false
        // this.controls.enabled = false;

    }

    cameraUpdate() {
        
        sceneStore.subscribe((value) => {

            if (value == "idle" ||  value == "island-ice" || value == "island-desert" || value == "island-fire" || value == "island-ruins") {
                
                if (value == "idle") {
                    this.newlookAt = new THREE.Vector3(0, 0.0, 0);
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: 0, y: 4.5, z: 7.5, ease: "power2.inOut" });
                    // gsap.to(this.instance.position, { duration: 1, x: 0, y: 0, z: 70 / this.instance.aspect, ease: "power2.inOut" });
                    this.controls.enabled = true;
                }
                if (value == "island-ice") {
                    this.newlookAt = this.experience.world.islandIce.model.position; 
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: -4.5, y: 0.5, z: -10, ease: "power2.inOut" });
                    this.controls.enabled = true;
                }

                if (value == "island-desert") {
                    this.newlookAt = this.experience.world.islandDesert.model.position; 
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: -2.25, y: 0.5, z: -10, ease: "power2.inOut" });
                    this.controls.enabled = true;
                }

                if (value == "island-fire") {
                    this.newlookAt = this.experience.world.islandFire.model.position; 
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: 2.25, y: 0.5, z: -10, ease: "power2.inOut" });
                    this.controls.enabled = true;
                }

                if (value == "island-ruins") {
                    this.newlookAt = this.experience.world.islandRuins.model.position; 
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: -4.5, y: 0.5, z: -10, ease: "power2.inOut" });
                    this.controls.enabled = true;
                }

                gsap.to(this.controls, { duration: 1, minPolarAngle: Math.PI / 3.0, ease: "power2.inOut" });
                gsap.to(this.controls, { duration: 1, maxPolarAngle: Math.PI / 2.25, ease: "power2.inOut" });

            } else {


                if (value == "artwork1") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandFire.artworks[0].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork1.camera.x, y: positions.islandFire.artwork1.camera.y, z: positions.islandFire.artwork1.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork2") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandFire.artworks[1].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork2.camera.x, y: positions.islandFire.artwork2.camera.y, z: positions.islandFire.artwork2.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork3") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandFire.artworks[2].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork3.camera.x, y: positions.islandFire.artwork3.camera.y, z: positions.islandFire.artwork3.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork4") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandFire.artworks[3].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork4.camera.x, y: positions.islandFire.artwork4.camera.y, z: positions.islandFire.artwork4.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork5") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandFire.artworks[4].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandFire.artwork5.camera.x, y: positions.islandFire.artwork5.camera.y, z: positions.islandFire.artwork5.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork6") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandIce.artworks[0].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork6.camera.x, y: positions.islandIce.artwork6.camera.y, z: positions.islandIce.artwork6.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork7") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandIce.artworks[1].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork7.camera.x, y: positions.islandIce.artwork7.camera.y, z: positions.islandIce.artwork7.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork8") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandIce.artworks[2].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork8.camera.x, y: positions.islandIce.artwork8.camera.y, z: positions.islandIce.artwork8.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork9") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandIce.artworks[3].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork9.camera.x, y: positions.islandIce.artwork9.camera.y, z: positions.islandIce.artwork9.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork10") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandIce.artworks[4].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandIce.artwork10.camera.x, y: positions.islandIce.artwork10.camera.y, z: positions.islandIce.artwork10.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork11") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandDesert.artworks[0].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork11.camera.x, y: positions.islandDesert.artwork11.camera.y, z: positions.islandDesert.artwork11.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork12") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandDesert.artworks[1].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork12.camera.x, y: positions.islandDesert.artwork12.camera.y, z: positions.islandDesert.artwork12.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork13") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandDesert.artworks[2].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork13.camera.x, y: positions.islandDesert.artwork13.camera.y, z: positions.islandDesert.artwork13.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork14") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandDesert.artworks[3].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork14.camera.x, y: positions.islandDesert.artwork14.camera.y, z: positions.islandDesert.artwork14.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork15") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandDesert.artworks[4].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandDesert.artwork15.camera.x, y: positions.islandDesert.artwork15.camera.y, z: positions.islandDesert.artwork15.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork16") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandRuins.artworks[0].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork16.camera.x, y: positions.islandRuins.artwork16.camera.y, z: positions.islandRuins.artwork16.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork17") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandRuins.artworks[1].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork17.camera.x, y: positions.islandRuins.artwork17.camera.y, z: positions.islandRuins.artwork17.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork18") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandRuins.artworks[2].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork18.camera.x, y: positions.islandRuins.artwork18.camera.y, z: positions.islandRuins.artwork18.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork19") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandRuins.artworks[3].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork19.camera.x, y: positions.islandRuins.artwork19.camera.y, z: positions.islandRuins.artwork19.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }
                if (value == "artwork20") {
                    let getWorldPosition = new THREE.Vector3();
                    this.experience.world.islandRuins.artworks[4].getWorldPosition(getWorldPosition);
                    this.newlookAt = getWorldPosition;
                    gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });
                    gsap.to(this.instance.position, { duration: 2, x: positions.islandRuins.artwork20.camera.x, y: positions.islandRuins.artwork20.camera.y, z: positions.islandRuins.artwork20.camera.z, ease: "power2.inOut"});
                    this.controls.enabled = false;
                }

                // gsap.to(this.controls, { duration: 1, minPolarAngle: 0, ease: "power2.inOut" });
                // gsap.to(this.controls, { duration: 1, maxPolarAngle: Math.PI, ease: "power2.inOut" });
            }

        });
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {

        if(this.controls) {
            this.controls.update();
        }
    }

}