import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import IslandFire from "./IslandFire.js";
import IslandIce from "./IslandIce.js";
import IslandRuins from "./IslandRuins.js";
import IslandDesert from "./IslandDesert.js";

export default class World {

    constructor() {

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        this.resources.on('ready', () => {
            this.islandIce = new IslandIce();
            this.islandDesert = new IslandDesert();
            this.islandFire = new IslandFire();
            this.islandRuins = new IslandRuins();
            
            this.environment = new Environment();
        });
    }   
}
