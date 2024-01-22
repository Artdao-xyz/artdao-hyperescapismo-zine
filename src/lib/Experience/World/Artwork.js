import * as THREE from 'three';
import Experience from "../Experience";

export default class Artwork {

    constructor(name, texture, position) {
        this.texture = texture;
        this.name = name;
        this.position = position;
        
        this.experience = new Experience();
        this.resources = this.experience.resources;
        
        this.width = this.texture.image.width;
        this.height = this.texture.image.height;
        this.ratio = this.width / this.height;
        
        this.createArtwork();
    }

    // editTexture()

    createArtwork() {
        this.artworkGeometry = new THREE.PlaneGeometry(1 * this.ratio, 1);
        this.artworkMaterial = new THREE.MeshBasicMaterial({ map: this.texture});
        
        this.artworkMesh = new THREE.Mesh(this.artworkGeometry, this.artworkMaterial);
        this.artworkMesh.name = this.name;
        
        this.artworkMesh.position.set(this.position.x, this.position.y, this.position.z);
        
        this.experience.scene.add(this.artworkMesh)
    }
}