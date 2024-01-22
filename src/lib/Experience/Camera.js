import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from './Experience.js';
import { sceneStore } from '/src/lib/store.js';

export default class Camera {
    
    constructor() {

        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        console.log(this.experience);

        this.setInstance();
        this.setOrbitControls();

        this.cameraUpdate();
    }

    setInstance() {

        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 200);
        // this.instance.position.set(0, 0, 30);
        console.log(this.instance.aspect);
        console.log(this.sizes.width);
        console.log(this.sizes.height);

        
        // if(this.instance.aspect > 1){
        //     this.instance.position.z = 30 / this.instance.aspect;
        // } else{
        //         this.instance.position.z= 30;
        // }
      
        this.scene.add(this.instance);
    }

    setOrbitControls() {

        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enabled = true;
    }

    cameraUpdate() {
        sceneStore.subscribe((value) => {

            if (value == "idle") {
                this.newlookAt = new THREE.Vector3(0, 0, 0);

                gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });

                gsap.to(this.instance.position, { duration: 1, x: 0, y: 0, z: 70 / this.instance.aspect, ease: "power2.inOut" });
            }
            if (value == "islandFire") {
                //make the camera look at the geometry
                this.newlookAt = this.experience.world.islandFire.model.position; 

                gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });

                gsap.to(this.instance.position, { duration: 1, x: 4.5, y: 1.5, z: 5, ease: "power2.inOut" });
            }
            if (value == "artwork1") {
                this.newlookAt = this.experience.world.artworks[0].artworkMesh.position;
            
                gsap.to(this.controls.target, { duration: 1, x: this.newlookAt.x, y: this.newlookAt.y, z: this.newlookAt.z, ease: "power2.inOut" });

                gsap.to(this.instance.position, { duration: 1, x: 4.9, y: 1, z: 2, ease: "power2.inOut" , onUpdate: () => {
                    this.instance.lookAt(this.newlookAt)
                }});
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