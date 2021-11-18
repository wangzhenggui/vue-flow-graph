<template>
  <div class="wrap">
    <div class="toolbar" v-if="isReady"><ToolBar /></div>
    <div class="content">
      <div id="stencil" class="shapes"></div>
      <div id="container" class="x6-graph" />
    </div>
  </div>
</template>

<script>
import isEmpty from "lodash/isEmpty";
import FlowGraph from "./flowGraph";
import initFlowJson from "./initFlow";
import ToolBar from "./components/Toolbar";
import groupBy from "lodash/groupBy";
import some from "lodash/some";
import every from "lodash/every";
import onFire from "./events.js";

const Graph = {
  name: "Graph",
  data() {
    return {
      isReady: false,
    };
  },
  props: {
    initData: Object,
    width: Number,
    height: Number,
  },
  components: {
    ToolBar,
  },
  computed: {},
  watch: {
    initData: {
      handler() {
        const { graph } = FlowGraph;
        if (!isEmpty(this.initData)) {
          graph?.fromJSON(this.initData);
        } else {
          graph?.fromJSON(initFlowJson);
        }
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    reRender() {
      const { graph } = FlowGraph;
      graph?.fromJSON(graph?.toJSON());
    },
    exportSchema() {
      const { graph } = FlowGraph;
      return graph.toJSON();
    },
    getContainerSize() {
      return {
        width: this.width || document.body.offsetWidth - 214,
        height: this.height || document.body.offsetHeight - 54,
      };
    },
    resizeFn() {
      const { graph } = FlowGraph;
      const { width, height } = this.getContainerSize();
      graph.resize(width, height);
    },
    //  开始节点 至少有一个输出线
    //  结束节点 至少有一个输入线
    //  流程节点 至少一个输入一个输出
    verifySchema() {
      const { graph } = FlowGraph;
      const dataSource = graph.toJSON()
      const nodesGroup = groupBy(dataSource.cells, (cell) => {
        return cell.type;
      });
      const errorList = nodesGroup.node.map((node) => {
        if (node.shape === "start-node") {
          return some(nodesGroup.line, (line) => line.source.cell === node.id);
        } else if (node.shape === "end-node") {
          return some(nodesGroup.line, (line) => line.target.cell === node.id);
        } else if (node.shape === "flow-node") {
          // 输入项
          const input = some(
            nodesGroup.line,
            (line) => line.target.cell === node.id
          );
          const output = some(
            nodesGroup.line,
            (line) => line.source.cell === node.id
          );
          return input && output;
        }
      });
      console.debug("校验连线结果", every(errorList, Boolean));
      return every(errorList, Boolean);
    },
    setNodeText(id, text) {
      const { graph } = FlowGraph;
      const cell = graph.getCellById(id);
      if (cell.getAttrByPath('label/text') === text) return
      cell.setAttrByPath("label", { text }, { silent: true });
      console.debug("改变文本信息", cell.getAttrs());
    },
    setNodeData(id, data) {
      const { graph } = FlowGraph;
      const cell = graph.getCellById(id);
      cell.setData(data, { overwrite: true, silent: true });
      console.debug("改变节点数据", cell.getData());
    },
  },
  created() {
    onFire.on("changed", (items) => {
      const { graph } = FlowGraph;
      this.$emit("onChange", { ...items, data: graph.toJSON() });
      console.debug("items", { ...items, data: graph.toJSON() });
    });
  },
  mounted() {
    const graph = FlowGraph.init();
    if (!isEmpty(this.initData)) {
      graph.fromJSON(this.initData);
    } else {
      graph.fromJSON(initFlowJson);
    }
    this.isReady = true;
    this.resizeFn();
    window.addEventListener("resize", this.resizeFn);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeFn);
  },
};
export default Graph;
</script>
<style lang="less">
.wrap {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    padding-left: 16px;
    padding-right: 32px;
    background: #fafbfc;
    border-bottom: 1px solid #dfe3e8;
    position: relative;
    color: rgba(0, 0, 0, 0.45);
    .text {
      font-size: 24px;
    }
  }
  .toolbar {
    display: flex;
    align-items: center;
    height: 54px;
    background: #f4f6fc;
    border-radius: 2px;
  }
  .content {
    display: flex;
    height: calc(100% - 105px);
    position: relative;
    .shapes {
      width: 214px;
      height: 100%;
      border-right: 1px solid #dfe3e8;
    }
    .config {
      box-sizing: border-box;
      width: 290px;
      height: 100%;
      padding: 0 24px;
      border-left: 1px solid rgba(0, 0, 0, 0.08);
    }
    .minimap {
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 200px;
      height: 200px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #fafbfc;
    }
  }
}
@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url('../../assets/fonts/iconfont.ttf?t=1637044297034') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-suoxiao:before {
  content: "\f01b4";
}

.icon-fangda:before {
  content: "\f01b5";
}

.icon-delete:before {
  content: "\e67e";
}

.icon-shengpi:before {
  content: "\e63b";
}

.icon-chukuliucheng:before {
  content: "\e613";
}

.icon-zishiying:before {
  content: "\e64d";
}

.icon-fanhui:before {
  content: "\e68b";
}

.icon-qianjin:before {
  content: "\e68c";
}

.icon-shenpi:before {
  content: "\e68d";
}

.icon-kaishi:before {
  content: "\e68e";
}

.icon-chaosong:before {
  content: "\e68f";
}

.icon-ziliucheng:before {
  content: "\e690";
}
.x6-widget-stencil {
  background-color: #fff;
  .x6-widget-stencil-title {
    background-color: #fff;
  }
}

// resizing
.x6-widget-transform {
  margin: -1px 0 0 -1px;
  padding: 0px;
  border: 1px solid #239edd;
  > div {
    border: 1px solid #239edd;
  }
  > div:hover {
    background-color: #3dafe4;
  }
  .x6-widget-transform-active-handle {
    background-color: #3dafe4;
  }
}
.x6-widget-transform-resize {
  border-radius: 0;
}

// selection
.x6-widget-selection-inner {
  border: 1px solid #239edd;
}
.x6-widget-selection-box {
  opacity: 0;
}

// snapline
.x6-widget-snapline-vertical {
  border-right-color: #239edd;
}
.x6-widget-snapline-horizontal {
  border-bottom-color: #239edd;
}

// minimap
.x6-widget-minimap-viewport,
.x6-widget-minimap-viewport-zoom {
  border: 2px solid #3371dd;
}

</style>