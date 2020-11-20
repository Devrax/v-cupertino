/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import VCupertino from "./components/VCupertino.vue";

declare var global: any;
declare var window: any;

// Declare install function executed by Vue.use()
export function install(Vue: any): any {
	if ((install as any).installed) return;
	(install as any).installed = true;
	Vue.component('VCupertino', VCupertino);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export VCupertino
export default VCupertino;