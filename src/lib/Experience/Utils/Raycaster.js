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

        this.selectFire = new Select(this.targets[2].position);
        this.selectDesert = new Select();
        this.selectIce = new Select();
        this.selectRuins = new Select();

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
                    if (this.currentIntersect.object.name == "IslandGround") {
                        this.selectFire.createSelect();
                    }
                    // this.select.createSelect();
                }
            }
            else {
                if(this.currentIntersect)
                {
                    document.body.style.cursor = 'default';
                    this.selectFire.removeSelect();
                    // this.currentIntersect.object.scale.set(1, 1, 1);
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

                if (this.currentIntersect.object.name == "IslandGround") {
                    sceneStore.set("islandFire");
                }
                if (this.currentIntersect.object.name == "artwork1") {
                    sceneStore.set("artwork1");
                }
            }
        }
    }

}