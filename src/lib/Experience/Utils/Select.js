import * as THREE from 'three';
import Experience from '../Experience';


export default class Select {

    constructor(position) {
        this.experience = new Experience();
        this.position = position;
        this.arrowTexture = this.experience.resources.items.uiSelect;
    }

    // createSelect() {
    //     this.arrowGeometry = new THREE.PlaneGeometry(1, 1);
    //     this.arrowMaterial = new THREE.MeshBasicMaterial({ map: this.arrowTexture, transparent: true});
    //     this.arrowMesh = new THREE.Mesh(this.arrowGeometry, this.arrowMaterial);
    //     this.arrowMesh.position.set(this.position.x, 4, 0);
    //     this.experience.scene.add(this.arrowMesh)
    // }
    createSelect(color) {
        this.sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        this.sphereMaterial = new THREE.MeshStandardMaterial({ color, metalness: 0.5, roughness: 0.1 });
        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
        this.sphereMesh.position.set(this.position.x, 0.5, this.position.z);
        this.experience.scene.add(this.sphereMesh);
    }

    removeSelect() {
        this.experience.scene.remove(this.sphereMesh);
        this.sphereGeometry.dispose();
        this.sphereMaterial.dispose();
        // this.arrowTexture.dispose();    
    }


}