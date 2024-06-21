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
        // this.rayOrigin = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z)
        // this.rayDirection = new THREE.Vector3(10, 0, 0)
        // this.rayDirection.normalize()

        sceneStore.subscribe((value) => {this.scene = value} );

        this.selectIce = new Select(this.targets[0].position);
        this.selectDesert = new Select(this.targets[1].position);
        this.selectFire = new Select(this.targets[2].position);
        this.selectRuins = new Select(this.targets[3].position);

        // console.log();


        let prevScene = 'idle';
                
        this.pointerMove()
        this.pointerClick();
    }

    pointerMove() {
        
        onpointermove = (event) => {
            
            this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
            this.raycaster.setFromCamera(this.mouse, this.camera)

            const intersects = this.raycaster.intersectObjects(this.targets)
        
            if(intersects.length > 0) {  
                if(!this.currentIntersect) {
                    this.currentIntersect = intersects[0]
                    document.body.style.cursor = 'pointer';
                    // this.currentIntersect.object.scale.set(1.2, 1.2, 1.2);
                    if (this.currentIntersect.object.name == "island-ice") {
                        // this.selectIce.createSelect(0x0000ff);
                    }
                    if (this.currentIntersect.object.name == "island-desert") {
                        // this.selectDesert.createSelect(0xffff00);
                    }
                    if (this.currentIntersect.object.name == "island-fire") {
                        // this.selectFire.createSelect(0xff0000);
                    }
                    if (this.currentIntersect.object.name == "island-ruins") {
                        // this.selectRuins.createSelect(0x00ff00);
                    }
                }
            }
            else {
                if(this.currentIntersect)
                    {
                    console.log(this.currentIntersect)

                    document.body.style.cursor = 'default';
                    if (this.currentIntersect.object.name == "island-ice") {
                        // this.selectIce.removeSelect();
                    }
                    if (this.currentIntersect.object.name == "island-desert") {
                        // this.selectDesert.removeSelect();
                    }
                    if (this.currentIntersect.object.name == "island-fire") {
                        // this.selectFire.removeSelect();
                    }
                    if (this.currentIntersect.object.name == "island-ruins") {
                        // this.selectRuins.removeSelect();
                    }
                }
                this.currentIntersect = null
            }
        }
    }

    pointerClick() {
        onclick = (event) => {

            const intersects = this.raycaster.intersectObjects(this.targets)
            console.log(intersects);
            
            if(intersects.length > 0) { 
                
                this.currentIntersect = intersects[0]

                if (this.currentIntersect.object.name == "island-ice") {
                    sceneStore.set("island-ice");
                }
                if (this.currentIntersect.object.name == "island-desert") {
                    sceneStore.set("island-desert");                }
                if (this.scene !='island-fire' && this.currentIntersect.object.name == "island-fire") {
                    // console.log('island fire!!!!!!!!')
                    sceneStore.set("island-fire");
                }
                if (this.currentIntersect.object.name == "island-ruins") {
                    sceneStore.set("island-ruins");
                }
                if (this.currentIntersect.object.name == "artwork1") {
                    sceneStore.set("artwork1");
                }
                if (this.currentIntersect.object.name == "artwork1") {
                    sceneStore.set("artwork1");
                }
                if (this.currentIntersect.object.name == "artwork2") {
                    sceneStore.set("artwork2");
                }
                if (this.currentIntersect.object.name == "artwork3") {
                    sceneStore.set("artwork3");
                }
                if (this.currentIntersect.object.name == "artwork4") {
                    sceneStore.set("artwork4");
                }
                if (this.currentIntersect.object.name == "artwork5") {
                    sceneStore.set("artwork5");
                }
                if (this.currentIntersect.object.name == "artwork6") {
                    sceneStore.set("artwork6");
                }
                if (this.currentIntersect.object.name == "artwork7") {
                    sceneStore.set("artwork7");
                }
                if (this.currentIntersect.object.name == "artwork8") {
                    sceneStore.set("artwork8");
                }
                if (this.currentIntersect.object.name == "artwork9") {
                    sceneStore.set("artwork9");
                }
                if (this.currentIntersect.object.name == "artwork10") {
                    sceneStore.set("artwork10");
                }
                if (this.currentIntersect.object.name == "artwork11") {
                    sceneStore.set("artwork11");
                }
                if (this.currentIntersect.object.name == "artwork12") {
                    sceneStore.set("artwork12");
                }
                if (this.currentIntersect.object.name == "artwork13") {
                    sceneStore.set("artwork13");
                }
                if (this.currentIntersect.object.name == "artwork14") {
                    sceneStore.set("artwork14");
                }
                if (this.currentIntersect.object.name == "artwork15") {
                    sceneStore.set("artwork15");
                }
                if (this.currentIntersect.object.name == "artwork16") {
                    sceneStore.set("artwork16");
                }
                if (this.currentIntersect.object.name == "artwork17") {
                    sceneStore.set("artwork17");
                }
                if (this.currentIntersect.object.name == "artwork18") {
                    sceneStore.set("artwork18");
                }
                if (this.currentIntersect.object.name == "artwork19") {
                    sceneStore.set("artwork19");
                }
                if (this.currentIntersect.object.name == "artwork20") {
                    sceneStore.set("artwork20");
                }
                
                if (this.currentIntersect.object.name == "portal-ice" || this.currentIntersect.object.name == "portal-desert" || this.currentIntersect.object.name == "portal-fire" || this.currentIntersect.object.name == "portal-ruins") {
                    sceneStore.set("idle");
                    //pick a random scene
                    // let scenes = ["island-ice", "island-desert", "island-fire", "island-ruins"];
                    // let randomScene = scenes[Math.floor(Math.random() * scenes.length)];
                    // sceneStore.set(randomScene);
                }
        
        }
    }
}

}