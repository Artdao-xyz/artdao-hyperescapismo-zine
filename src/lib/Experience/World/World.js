import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import IslandFire from "./IslandFire.js";
import IslandIce from "./IslandIce.js";
import IslandRuins from "./IslandRuins.js";
import IslandDesert from "./IslandDesert.js";
import Raycaster from "../Utils/Raycaster.js";
import { loadingStore } from "/src/lib/store.js";
export default class World {

    constructor() {

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera.instance;
        this.artworks = [];
        
        this.resources.on('ready', () => {
            this.islandIce = new IslandIce();
            this.islandDesert = new IslandDesert();
            this.islandFire = new IslandFire();
            this.islandRuins = new IslandRuins();
            
            this.environment = new Environment();
            
            this.setRaycaster();
        });


    }

    setRaycaster() {

        this.objects = [this.islandIce.resource.scene, this.islandDesert.resource.scene, this.islandFire.resource.scene, this.islandRuins.resource.scene]
        this.artworks = this.experience.world.artworks;
            
        //loop for every artwork in islandFire
        for (let i = 0; i < this.artworks.length; i++) {
            this.objects.push(this.artworks[i].artworkMesh);
        }
        this.raycaster = new Raycaster(this.objects, this.camera);
    }
    
}
