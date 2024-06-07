import * as THREE from 'three';
import Experience from "../Experience";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export default class Artwork {

    constructor(name, texture, position, rotation) {

        this.texture = texture;
        this.name = name;
        this.position = position;
        this.rotation = rotation;

        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.width = this.texture.image.width;
        this.height = this.texture.image.height;
        this.ratio = this.width / this.height;

        this.font = this.resources.items.artworkFont;

        // this.createScreen();
        this.createArtwork();
        // this.createText();
    }

    setTexture() {
        this.texture.flipY = false;
        this.texture.colorSpace = THREE.SRGBColorSpace;
        // this.texture.minFilter = THREE.NearestFilter
        // this.texture.magFilter = THREE.NearestFilter
        // this.texture.generateMipmaps = false
        
    }

    createSeen() {}

    createArtwork() {
        this.setTexture();

        this.artworkGeometry = new THREE.PlaneGeometry(1 * this.ratio, 1);
        this.artworkMaterial = new THREE.MeshBasicMaterial({ map: this.texture, side: THREE.DoubleSide, });

        this.artworkMesh = new THREE.Mesh(this.artworkGeometry, this.artworkMaterial);
        this.artworkMesh.name = this.name;
        
        this.artworkMesh.position.set(this.position.x, this.position.y, this.position.z);
        this.artworkMesh.scale.set(0.5, 0.5, 0.5);
        this.artworkMesh.rotation.set(0, this.rotation.y, 0);

        this.experience.scene.add(this.artworkMesh);
    }

    createText() {

        let textGeometry = new TextGeometry('Artwork name\nby Artist', {
            font: this.font,
            size: .05,
            height: .01, // Adjust as needed
        });

        // textGeometry.computeBoundingBox();

        let material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
        });

        let textMesh = new THREE.Mesh(textGeometry, material);
        textMesh.position.set(this.position.x, this.position.y - 0.5, this.position.z);
        this.experience.scene.add(textMesh);

        // let backgroundGeometry = new THREE.PlaneGeometry(textGeometry.boundingBox.max.x * 2, textGeometry.boundingBox.max.y * 2);
        // let backgroundMaterial = new THREE.MeshBasicMaterial({
        //     color: 0xffffff, // White background color
        //     side: THREE.DoubleSide,
        // });
        // let backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        // this.experience.scene.add(backgroundMesh);

        // backgroundMesh.position.z = -0.1; // Move the background slightly behind the text
    }

    hide() {
        this.artworkMesh.visible = false;
    }

    show() {
        this.artworkMesh.visible = true;
    }
}