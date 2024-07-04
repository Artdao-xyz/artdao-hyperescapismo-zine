// store.js
import { writable } from 'svelte/store';

export const loadingStore = writable(null);

export const sceneStore = writable('idle');

export const transitionStore = writable(false);
