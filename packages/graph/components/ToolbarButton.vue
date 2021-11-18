<template>
  <div
    class="actionWrap"
    v-bind:disabled="disabled"
    @click="handleClick(command)"
  >
    <span v-bind:class="['iconfont', iconfont]"></span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
import FlowGraph from '../flowGraph'
export default {
  name: 'ToolbarButton',
  props: ['command', 'iconfont', 'label', 'canZoomIn', 'canZoomOut', 'canUndo', 'canRedo', 'canDelete', 'canFit'],
  computed: {
    disabled() {
      return (!this.canZoomIn && this.command === 'zoomIn') || 
      (!this.canZoomOut && this.command === 'zoomOut') || 
      (!this.canUndo && this.command === 'undo') || 
      (!this.canRedo && this.command === 'redo') || 
      (!this.canDelete && this.command === 'delete') ||
      (!this.canFit && this.command === 'fit')
    }
  },
  data(){
    return {}
  },
  components: {

  },
  methods:{
    handleClick(commandName){
      const { graph } = FlowGraph
      this.$emit('handleEvent', graph, commandName)
    }
  }
}
</script>
<style lang="less" scoped>
.actionWrap {
  display: flex;
  flex-direction: column;
  cursor:pointer;
  width: 40px;
  height: 54px;
  margin-left: 16px;
  justify-content: center;
  align-items: center;
}
.label{
  font-size: 12px;
}
.iconfont-editor{
  font-size: 20px;
  width: 100%;
    float: left;
    height: 20px;
    margin-top: -8px;
}
div[disabled] span{
  color:#ccc;
  cursor: not-allowed;
}
</style>
