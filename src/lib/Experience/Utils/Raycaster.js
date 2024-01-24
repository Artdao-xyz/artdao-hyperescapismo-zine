import * as THREE from 'three';
import Sizes from './Sizes';
import Experience from '../Experience';
import { sceneStore } from '/src/lib/store.js';
import Select from './Select';
export default class Raycaster {

    constructor(targets, camera) {

        this.experience = new Experience();

        this.targets = targets;
        this.camera = camera;
        this.sizes = new Sizes();
        this.mouse = new THREE.Vector2()
        this.raycasterEnabled = true;
        this.raycaster = new THREE.Raycaster()
        this.currentIntersect = null
        this.rayOrigin = new THREE.Vector3(- 3, 0, 0)
        this.rayDirection = new THREE.Vector3(10, 0, 0)
        this.rayDirection.normalize()

        this.selectIce = new Select(this.targets[0].position);
        this.selectDesert = new Select(this.targets[1].position);
        this.selectFire = new Select(this.targets[2].position);
        this.selectRuins = new Select(this.targets[3].position);

        // console.log();

        
        this.pointerMove();
        this.pointerClick();
    }

    pointerMove() {
        
        onpointermove = (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
            this.raycaster.setFromCamera(this.mouse, this.camera)

            const intersects = this.raycaster.intersectObjects(this.targets)

        
            if(intersects.length > 0) {  
                if(!this.currentIntersect) {
                    this.currentIntersect = intersects[0]
                    document.body.style.cursor = 'pointer';
                    // this.currentIntersect.object.scale.set(1.2, 1.2, 1.2);
                    if (this.currentIntersect.object.name == "island-ice") {
                        this.selectIce.createSelect();
                    }
                    if (this.currentIntersect.object.name == "island-desert") {
                        this.selectDesert.createSelect();
                    }
                    if (this.currentIntersect.object.name == "island-fire") {
                        this.selectFire.createSelect();
                    }
                    if (this.currentIntersect.object.name == "island-ruins") {
                        this.selectRuins.createSelect();
                    }
                }
            }
            else {
                if(this.currentIntersect)
                {
                    document.body.style.cursor = 'default';
                    if (this.currentIntersect.object.name == "island-ice") {
                        this.selectIce.removeSelect();
                    }
                    if (this.currentIntersect.object.name == "island-desert") {
                        this.selectDesert.removeSelect();
                    }
                    if (this.currentIntersect.object.name == "island-fire") {
                        this.selectFire.removeSelect();
                    }
                    if (this.currentIntersect.object.name == "island-ruins") {
                        this.selectRuins.removeSelect();
                    }
                }
                this.currentIntersect = null
            }
        }
    }

    pointerClick() {
        onclick = (event) => {
            if(this.currentIntersect)
            {
                console.log(this.currentIntersect.object.name);

                if (this.currentIntersect.object.name == "island-ice") {
                    sceneStore.set("island-ice");
                }
                if (this.currentIntersect.object.name == "island-desert") {
                    sceneStore.set("island-desert");                }
                if (this.currentIntersect.object.name == "island-fire") {
                    sceneStore.set("island-fire");
                }
                if (this.currentIntersect.object.name == "island-ruins") {
                    sceneStore.set("island-ruins");
                }
                if (this.currentIntersect.object.name == "artwork1") {
                    sceneStore.set("artwork1");
                }
            }
        }
    }

}