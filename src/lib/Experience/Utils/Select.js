import * as THREE from 'three';
import Experience from '../Experience';


export default class Select {

    constructor(position) {

        this.experience = new Experience();
        this.position = position;
        this.arrowTexture = this.experience.resources.items.uiSelect;

    }

    createSelect() {
        this.arrowGeometry = new THREE.PlaneGeometry(1, 1);
        this.arrowMaterial = new THREE.MeshBasicMaterial({ map: this.arrowTexture, transparent: true});
        
        this.arrowMesh = new THREE.Mesh(this.arrowGeometry, this.arrowMaterial);
        
        this.arrowMesh.position.set(this.position.x, 4, 0);
        
        this.experience.scene.add(this.arrowMesh)
    }

    removeSelect() {
        this.experience.scene.remove(this.arrowMesh);
        this.arrowGeometry.dispose();
        this.arrowMaterial.dispose();
        this.arrowTexture.dispose();
        
    }


}