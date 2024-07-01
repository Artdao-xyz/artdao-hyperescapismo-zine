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
        this.currentIntersect = null;
        this.prevIntersect = 'idle';
        this.unsubscribe = null;

        if (this.unsubscribe) {
            this.unsubscribe();
        }

        this.unsubscribe = sceneStore.subscribe((value) => { this.prevIntersect = value } );

        this.selectIce = new Select(this.targets[0].position);
        this.selectDesert = new Select(this.targets[1].position);
        this.selectFire = new Select(this.targets[2].position);
        this.selectRuins = new Select(this.targets[3].position);
                
        this.pointerMove()
        this.pointerClick();
    }

    pointerMove() {
        document.addEventListener('pointermove', (event) => {
            this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);
    
            const intersects = this.raycaster.intersectObjects(this.targets);
        
            let hoverCursor = 'default';
            let isIntersectValid = false;
    
            // Check if sceneStore is not 'idle' and there are intersections
            if (this.prevIntersect !== 'idle' && intersects.length > 0) {
                const intersectedObjectName = intersects[0].object.name;
    
                // Define artwork ranges for each island
                const artworkRanges = {
                    'island-fire': [1, 5],
                    'island-ice': [6, 10],
                    'island-desert': [11, 15],
                    'island-ruins': [16, 20]
                };
    
                // Function to check if artwork is in range
                const isArtworkInRange = (artwork, range) => {
                    const artworkNum = parseInt(artwork.replace('artwork', ''), 10);
                    return artworkNum >= range[0] && artworkNum <= range[1];
                };
    
                // Check if the hover is over a valid interactable object
                if (
                    (this.prevIntersect in artworkRanges && intersectedObjectName.startsWith('artwork') && isArtworkInRange(intersectedObjectName, artworkRanges[this.prevIntersect])) ||
                    (this.prevIntersect.startsWith('island') && intersectedObjectName.startsWith('artwork') && isArtworkInRange(intersectedObjectName, artworkRanges[this.prevIntersect])) ||
                    intersectedObjectName === this.prevIntersect
                ) {
                    isIntersectValid = true;
                    hoverCursor = 'pointer';
                }
            } else if (this.prevIntersect === 'idle' && intersects.length > 0) {
                // If sceneStore is 'idle' and there are intersections, change cursor
                isIntersectValid = true;
                hoverCursor = 'pointer';
            }
    
            // Update cursor based on valid hover conditions
            document.body.style.cursor = hoverCursor;
    
            // Optionally, handle hover effects for specific objects if needed
            if (isIntersectValid) {
                switch (intersects[0].object.name) {
                    case 'island-ice':
                        // Handle island-ice hover effect
                        break;
                    case 'island-desert':
                        // Handle island-desert hover effect
                        break;
                    case 'island-fire':
                        // Handle island-fire hover effect
                        break;
                    case 'island-ruins':
                        // Handle island-ruins hover effect
                        break;
                    default:
                        if (intersects[0].object.name.startsWith('artwork')) {
                            // Handle artwork hover effect
                        }
                }
            }
        });
    }
    

    pointerClick() {
        let isDragging = false;
        let dragStartTime;
    
        document.addEventListener('pointerdown', (event) => {
            dragStartTime = Date.now();
            isDragging = false;
        });
    
        document.addEventListener('pointermove', (event) => {
            // Set a threshold distance/time to distinguish between click and drag
            if (Date.now() - dragStartTime > 100) {
                isDragging = true;
            }
        });
    
        document.addEventListener('pointerup', (event) => {
            if (!isDragging) {
                const intersects = this.raycaster.intersectObjects(this.targets);
    
                if (intersects.length > 0) {
                    this.currentIntersect = intersects[0];
    
                    // Define artwork ranges for each island
                    const artworkRanges = {
                        'island-fire': [1, 5],
                        'island-ice': [6, 10],
                        'island-desert': [11, 15],
                        'island-ruins': [16, 20]
                    };
    
                    // Function to check if artwork is in range
                    const isArtworkInRange = (artwork, range) => {
                        const artworkNum = parseInt(artwork.replace('artwork', ''), 10);
                        return artworkNum >= range[0] && artworkNum <= range[1];
                    };
    
                    // Allow clicks within the same island's artwork range or on the same island
                    if (
                        (this.prevIntersect in artworkRanges && this.currentIntersect.object.name.startsWith('artwork') && isArtworkInRange(this.currentIntersect.object.name, artworkRanges[this.prevIntersect])) ||
                        (this.prevIntersect.startsWith('island') && this.currentIntersect.object.name.startsWith('artwork') && isArtworkInRange(this.currentIntersect.object.name, artworkRanges[this.prevIntersect])) ||
                        !this.prevIntersect.startsWith('island') && !this.prevIntersect.startsWith('artwork')
                    ) {
                        switch (this.currentIntersect.object.name) {
                            case 'island-ice':
                                if (this.prevIntersect !== 'island-ice') {
                                    sceneStore.set('island-ice');
                                }
                                break;
                            case 'island-desert':
                                if (this.prevIntersect !== 'island-desert') {
                                    sceneStore.set('island-desert');
                                }
                                break;
                            case 'island-fire':
                                if (this.prevIntersect !== 'island-fire') {
                                    sceneStore.set('island-fire');
                                }
                                break;
                            case 'island-ruins':
                                if (this.prevIntersect !== 'island-ruins') {
                                    sceneStore.set('island-ruins');
                                }
                                break;
                            case 'portal-ice':
                            case 'portal-desert':
                            case 'portal-fire':
                            case 'portal-ruins':
                                sceneStore.set('idle');
                                break;
                            default:
                                if (this.currentIntersect.object.name.startsWith('artwork')) {
                                    sceneStore.set(this.currentIntersect.object.name);
                                }
                        }
                    }
                }
            }
    
            isDragging = false;
        });
    }
    
    
    destroy() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
    }
}