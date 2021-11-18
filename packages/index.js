import Graph from './graph/index.vue';

const components = [
  Graph
]
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}
  
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
  
export default {
  Graph,
  install
}
export {
  Graph,
  install
}
