<template>
  <div class="wrap">
    <ToolbarButton
      command="undo"
      label="撤销"
      iconfont="icon-fanhui"
      @handleEvent="handleClick"
      :canUndo="canUndo"
    />
    <ToolbarButton
      command="redo"
      label="回退"
      iconfont="icon-qianjin"
      @handleEvent="handleClick"
      :canRedo="canRedo"
    />
    <ToolbarButton
      command="zoomIn"
      label="放大"
      iconfont="icon-fangda"
      @handleEvent="handleClick"
      :canZoomIn="canZoomIn"
    />
    <ToolbarButton
      command="zoomOut"
      label="缩小"
      iconfont="icon-suoxiao"
      @handleEvent="handleClick"
      :canZoomOut="canZoomOut"
    />
    <ToolbarButton
      command="fit"
      label="自适应"
      iconfont="icon-zishiying"
      @handleEvent="handleClick"
      :canFit="canFit"
    />
    <ToolbarButton
      command="delete"
      label="删除"
      iconfont="icon-delete"
      @handleEvent="handleClick"
      :canDelete="canDelete"
    />
  </div>
</template>

<script>
  import FlowGraph from '../flowGraph'
  import ToolbarButton from './ToolbarButton'
  import isEmpty from 'lodash/isEmpty'
  import get from 'lodash/get'
  export default {
    name: 'ToolBar',
    data() {
      return {
        canZoomIn: true,
        canZoomOut: true,
        canUndo: false,
        canRedo: false,
        canDelete: false,
        canFit: true
      }
    },
    components: {
      ToolbarButton,
    },
    computed: {
    },
    methods: {
      emmitEvent(type) {
        // 判断是线选中还是节点选中
        const nodes = document.querySelector('[class="selectedNode"]'); // TODO: 选中节点的唯一特征
        let id = '';
        if (nodes) {
          id = nodes.parentElement.getAttribute('data-cell-id')
        }
        FlowGraph.submitEvent({
          type,
          id,
        })
      },
      handleClick(graph, command) {
        const selectedCells = graph.getSelectedCells();
        switch (command) {
        case 'undo':
          if (!graph.history.canUndo()) return
          graph.history.undo()
          this.emmitEvent('undo')
          break
        case 'redo':
          if (!graph.history.canRedo()) return
          graph.history.redo()
          this.emmitEvent('redo')
          break
        case 'delete':
          if (!isEmpty(selectedCells) && ['start-node', 'end-node'].includes(get(selectedCells, '0.shape'))) return
          graph.removeCells(selectedCells)
          FlowGraph.submitEvent({
            type: 'delete',
            id: selectedCells[0]['id'],
          })
          break
        case 'zoomIn':
          if (graph.zoom() > 1.3) return;
          graph.zoom(0.1);
          break
        case 'zoomOut':
          if (graph.zoom() < 0.7) return;
          graph.zoom(-0.1);
          break
        case 'fit':
          graph.zoomToFit({
            minScale: 0.7,
            maxScale: 1.4
          });
          break
        default:
          break
        }
        this.canZoomIn = graph.zoom() <= 1.3
        this.canZoomOut = graph.zoom() >= 0.7
        const myCells = graph.getSelectedCells()
        this.canDelete = !isEmpty(myCells) && !['start-node', 'end-node'].includes(get(myCells, '0.shape'))
      }
    },
    created() {
      this.$nextTick(()=>{
      const { graph } = FlowGraph
      // TODO: https://antv-x6.gitee.io/zh/docs/tutorial/basic/selection/#selectionchanged
      graph.on('selection:changed', () => {
        this.canZoomIn = graph.zoom() <= 1.3
        this.canZoomOut = graph.zoom() >= 0.7
        const myCells = graph.getSelectedCells()
        this.canDelete = !isEmpty(myCells) && !['start-node', 'end-node'].includes(get(myCells, '0.shape'))
      })
      graph.history.on('change', () => {
        this.canUndo = graph.history.canUndo()
        this.canRedo = graph.history.canRedo()
      })
    })
    },
    mounted() {
      
    }
  }
</script>

<style scoped>
.wrap {
  display: flex;
}
</style>
