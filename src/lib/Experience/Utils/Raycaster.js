import * as THREE from 'three';
import { sceneStore } from '/src/lib/store.js';
import { get } from 'svelte/store';
import Experience from '../Experience.js';
class RaycasterHandler {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera.instance;
        this.scene = this.experience.scene;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.touch = new THREE.Vector2();
        this.intersects = [];
        this.isDragging = false;
        this.mouseDownTime = 0;

        // Bind event handlers
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        // Add event listeners
        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('mousedown', this.onMouseDown, false);
        window.addEventListener('mouseup', this.onMouseUp, false);
        window.addEventListener('click', this.onMouseClick, false);
        window.addEventListener('touchstart', this.onTouchStart, false);
        window.addEventListener('touchend', this.onTouchEnd, false);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.updateRaycaster(this.mouse);
    }

    onMouseDown(event) {
        this.isDragging = false; // Reset drag flag on mouse down
        this.mouseDownTime = Date.now(); // Record mouse down time
    }

    onMouseUp(event) {
        const mouseUpTime = Date.now();
        // Set drag flag only if mouse is held down for a short time (click)
        this.isDragging = mouseUpTime - this.mouseDownTime > 200; // Adjust the threshold as needed
    }

    onMouseClick(event) {
        if (!this.isDragging) {
            this.updateRaycaster(this.mouse);
            this.handleIntersection();
        }
    }

    onTouchStart(event) {
        if (event.touches.length === 1) {
            this.isDragging = false; // Reset drag flag on touch start
            this.touch.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            this.touch.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
            this.mouseDownTime = Date.now(); // Record touch start time
        }
    }

    onTouchEnd(event) {
        if (event.changedTouches.length === 1) {
            const touchEndTime = Date.now();
            // Set drag flag only if touch is held down for a short time (tap)
            this.isDragging = touchEndTime - this.mouseDownTime > 200; // Adjust the threshold as needed
            if (!this.isDragging) {
                this.updateRaycaster(this.touch);
                this.handleIntersection();
            }
        }
    }

    updateRaycaster(coords) {
        this.raycaster.setFromCamera(coords, this.camera);
        this.intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (this.intersects.length > 0) {
            const name = this.intersects[0].object.name;
            const islandNames = ['island-fire', 'island-ice', 'island-desert', 'island-ruins'];
            const artworkNames = Array.from({
                length: 20
            }, (_, i) => `artwork${i + 1}`);
            const currentScene = get(sceneStore);
            const artworkRanges = {
                'island-fire': [1, 5],
                'island-ice': [6, 10],
                'island-desert': [11, 15],
                'island-ruins': [16, 20]
            };

            if (currentScene === 'idle') {
                // Change cursor only for islands in idle mode
                if (islandNames.includes(name)) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
            } else if (currentScene === name) {
                document.body.style.cursor = 'pointer';
            } else if (islandNames.includes(currentScene)) {
                // Change cursor only for appropriate artworks in island mode
                const [start, end] = artworkRanges[currentScene];
                const artworkNumber = parseInt(name.replace('artwork', ''), 10);

                if (artworkNames.includes(name) && artworkNumber >= start && artworkNumber <= end) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
            } else {
                document.body.style.cursor = 'default';
            }
        } else {
            document.body.style.cursor = 'default';
        }
    }

    handleIntersection() {
        const currentScene = get(sceneStore);

        if (this.intersects.length > 0) {
            const name = this.intersects[0].object.name;
            const islandNames = ['island-fire', 'island-ice', 'island-desert', 'island-ruins'];
            const artworkNames = Array.from({
                length: 20
            }, (_, i) => `artwork${i + 1}`);
            const artworkRanges = {
                'island-fire': [1, 5],
                'island-ice': [6, 10],
                'island-desert': [11, 15],
                'island-ruins': [16, 20]
            };

            if (currentScene === 'idle') {
                if (islandNames.includes(name)) {
                    sceneStore.set(name);
                }
            } else if (islandNames.includes(currentScene)) {
                const [start, end] = artworkRanges[currentScene];
                const artworkNumber = parseInt(name.replace('artwork', ''), 10);

                if (artworkNames.includes(name) && artworkNumber >= start && artworkNumber <= end) {
                    sceneStore.set(name);
                }
            }
        }
    }

    dispose() {
        // Remove event listeners when disposing the class
        window.removeEventListener('mousemove', this.onMouseMove, false);
        window.removeEventListener('mousedown', this.onMouseDown, false);
        window.removeEventListener('mouseup', this.onMouseUp, false);
        window.removeEventListener('click', this.onMouseClick, false);
        window.removeEventListener('touchstart', this.onTouchStart, false);
        window.removeEventListener('touchend', this.onTouchEnd, false);
    }
}

export default RaycasterHandler;