import GUI from 'lil-gui'; 

export default class Debug {

    constructor() {
        this.active = window.location.hash === '#debug';

        if (this.active) {
            this.ui = new GUI();
            this.preventClickPropagation()
        }
    }

    preventClickPropagation() {
        const domElement = this.ui.domElement;
        domElement.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
}