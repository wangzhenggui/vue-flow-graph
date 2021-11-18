import { Graph, Addon, Shape } from '@antv/x6';
import get from 'lodash/get'
import some from 'lodash/some'
import onFire from './events.js';
import './shape';
export default class FlowGraph {
    static submitEvent(cell) {
        onFire.fire('changed', cell)
    }
    static init() {
        this.graph = new Graph({
            container: document.getElementById('container'),
            width: 1000,
            height: 800,
            grid: {
                size: 10,
                visible: true,
                type: 'doubleMesh',
                args: [
                    {
                        color: '#E7E8EA',
                        thickness: 1,
                    },
                    {
                        color: '#CBCED3',
                        thickness: 1,
                        factor: 5,
                    },
                ],
            },
            panning: {
                enabled: true,
                eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel'],
                // modifiers: 'ctrl',
            },
            mousewheel: {
                enabled: true,
                zoomAtMousePosition: true,
                // modifiers: 'ctrl',
                minScale: 0.7,
                maxScale: 1.3,
            },
            // 连线规则
            connecting: {
                router: 'manhattan',
                connector: {
                    name: 'rounded',
                    args: {
                        radius: 8,
                    },
                },
                anchor: 'center',
                connectionPoint: 'anchor',
                allowBlank: false,
                allowLoop: false,
                allowNode: false,
                snap: {
                    radius: 20,
                },
                createEdge() {
                    const newEdge = new Shape.Edge({
                        shape: 'edge',
                        type: 'line',
                        attrs: {
                          line: {
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            targetMarker: {
                              name: 'classic',
                              size: 8,
                            },
                          },
                        },
                        router: {
                          name: 'manhattan',
                        },
                    })
                    return newEdge
                      
                },
                validateConnection({ sourceView, targetView }) {
                    // 1、source节点和target节点不能是同一个节点
                    // 2、source节点到target节点 不能同时出现俩条线
                    // 3、开始节点不能作为target节点
                    // 4、结束节点不能作为source节点
                    if (sourceView.cell.shape === 'end-node' || targetView.cell.shape === 'start-node') {
                        return false
                    }
                    // 当前所画线段的sourceNode和targetNode
                    const currentSourceNodeId = sourceView.cell.id
                    const currentTargetNodeId = targetView.cell.id
                    console.debug('currentSourceNodeId', currentSourceNodeId, 'currentTargetNodeId', currentTargetNodeId)
                    const edge = sourceView.graph.getConnectedEdges(targetView.cell, { incoming: true })
                    const result = edge.map(e => {
                        if (get(e, 'store.data.source.cell') === currentSourceNodeId && get(e, 'store.data.target.cell') === currentTargetNodeId) {
                            return true
                        }
                        return false
                    })
                    return !some(result, Boolean)
                  },
            },
            highlighting: {
                magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            fill: '#2695FA',
                            stroke: '#2695FA',
                        },
                    },
                },
            },
            resizing: false,
            rotating: false,
            selecting: {
                enabled: true,
                rubberband: false,
                multiple: false,
                showNodeSelectionBox: false,
            },
            snapline: true,
            keyboard: true,
            history: {
                enabled: true,
            },
            // minimap: {
            //     enabled: true,
            //     container: document.getElementById('minimap'),
            //     width: 198,
            //     height: 198,
            //     padding: 10,
            // },
            clipboard: true,
        });
        this.initStencil();
        this.initShape();
        this.initEvent();
        this.initKeyboard();
        return this.graph;
    }
    static initStencil() {
        this.stencil = new Addon.Stencil({
            title: '流程组件',
            target: this.graph,
            stencilGraphWidth: 214,
            stencilGraphHeight: document.body.offsetHeight - 54,
            layoutOptions: {
                columns: 2,
                // columnWidth: 40,
                rowHeight: 50,
                marginY: 20,
                marginX: -10,
            },
            getDropNode(node) {
                const size = node.size();
                node.setAttrs({
                    overwrite: true,
                    body: {
                        opacity: 1,
                        fill: '#F7F9FE',
                        stroke: '#E1E3E5',
                        strokeWidth: 1,
                    }
                })
                const cloneNode = node.clone({ keepId: true })
                    .size(size.width * 2, size.height * 1.5)
                return cloneNode;
            },
        });
        const stencilContainer = document.querySelector('#stencil');
        if (stencilContainer) {
            stencilContainer.appendChild(this.stencil.container);
        }
    }
    static initShape() {
        const { graph } = this;
        // const r1 = graph.createNode({
        //     shape: 'start-node',
        //     width: 80,
        //     height: 40,
        //     attrs: {
        //         body: {
        //             fill: "#2695FA", // 背景颜色
        //             opacity: 0.1,
        //         },
        //         label: {
        //             text: '开始节点',
        //             fill: '#000',
        //         },
        //     },
        // });
        const r2 = graph.createNode({
            shape: 'flow-node',
            type: "node",
            width: 80,
            height: 40,
            attrs: {
                body: {
                    fill: "#2695FA", // 背景颜色
                    opacity: 0.1,
                },
                label: {
                    text: '流程节点',
                    fill: '#000',
                },
            },
        });
        // const r3 = graph.createNode({
        //     shape: 'end-node',
        //     width: 80,
        //     height: 40,
        //     attrs: {
        //         body: {
        //             fill: "#2695FA", // 背景颜色
        //             opacity: 0.1,
        //         },
        //         label: {
        //             text: '结束节点',
        //             fill: '#000',
        //         },
        //     },
        // });
        this.stencil.load([r2]);
    }
    static showPorts(ports, show) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[i].style.visibility = show ? 'visible' : 'hidden';
        }
    }
    static cancelNodeSelectedStatus(node) {
        node.setAttrs({
            overwrite: true,
            body: {
                fill: '#F7F9FE',
                stroke: '#E1E3E5',
                class: ''
            }
        })
    }
    static addSelectedStatus(node) {
        node.setAttrs({
            overwrite: true,
            body: {
                stroke: '#76BBEB',
                fill: '#E3F6FF',
                class: 'selectedNode'
            },
        })
    }
    static cancelAllCellsStatus() {
        const { graph } = this;
        graph.getNodes().map(node => FlowGraph.cancelNodeSelectedStatus(node))
        graph.getEdges().map(edge => FlowGraph.cancelSelectedStatusByEdge(edge))
    }
    static addSelectedStatusByEdge(edge) {
        edge.setAttrs({
        overwrite: true,
        line: {
            stroke: "#7c68fc", // 指定 path 元素的填充色
            strokeWidth: 2,
            class: 'selectedNode'
        },
        })
    }
    static cancelSelectedStatusByEdge(edge) {
        edge.setAttrs({
        overwrite: true,
        line: {
            stroke: "#5F95FF", // 指定 path 元素的填充色
            strokeWidth: 1,
            class: ''
            },
        })
    }
    static initEvent() {
        const { graph } = this;
        const container = document.getElementById('container');
        graph.on('node:mouseenter', () => {
            const ports = container.querySelectorAll('.x6-port-body');
            this.showPorts(ports, true);
        });
        graph.on('node:mouseleave', () => {
            const ports = container.querySelectorAll('.x6-port-body');
            this.showPorts(ports, false);
        });
        graph.on('blank:click', () => {
            FlowGraph.cancelAllCellsStatus()
            FlowGraph.submitEvent({
                type: 'unSelected',
                id: '',
            })
        });
        // 选中节点
        graph.on('node:selected', ({ cell }) => {
            FlowGraph.cancelAllCellsStatus()
            FlowGraph.addSelectedStatus(cell)
            FlowGraph.submitEvent({
                type: 'selected',
                id: cell.id,
            })
        })
        // 取消选中节点
        graph.on('node:unselected', ({ cell }) => { 
            FlowGraph.cancelNodeSelectedStatus(cell)
            FlowGraph.submitEvent({
                type: 'unSelected',
                id: cell.id,
            })
        })
        // 线选中
        graph.on('edge:selected', ({ cell }) => {
            FlowGraph.cancelAllCellsStatus()
            FlowGraph.addSelectedStatusByEdge(cell)
            FlowGraph.submitEvent({
                type: 'selected',
                id: cell.id,
            })
        })
        // 取消选中节点
        graph.on('edge:unselected', ({ cell }) => {
            FlowGraph.cancelSelectedStatusByEdge(cell)
            FlowGraph.submitEvent({
                type: 'unSelected',
                id: cell.id,
            })
        })
        graph.on('node:added', ({ cell }) => {
            FlowGraph.cancelAllCellsStatus()
            FlowGraph.addSelectedStatus(cell);
            FlowGraph.submitEvent({
                type: 'add',
                id: cell.id,
            })
        })
        graph.on('edge:connected', ({ isNew, edge }) => {
            if (isNew) {
                FlowGraph.cancelAllCellsStatus()
                FlowGraph.addSelectedStatus(edge);
                FlowGraph.submitEvent({
                    type: 'add',
                    id: edge.id,
                })
            }
        })
    }
    static initKeyboard() {
        const { graph } = this;
        graph.bindKey(['meta+c', 'ctrl+c'], () => {
            const cells = graph.getSelectedCells();
            if (cells.length && !['start-node', 'end-node'].includes(get(cells, '0.shape'))) {
                graph.copy(cells);
            }
            return false;
        });
        graph.bindKey(['meta+v', 'ctrl+v'], () => {
            if (!graph.isClipboardEmpty()) {
                const cells = graph.paste({ offset: 32 });
                graph.cleanSelection();
                graph.select(cells);
            }
            return false;
        });
        //undo redo
        // graph.bindKey(['meta+z', 'ctrl+z'], () => {
        //     if (graph.history.canUndo()) {
        //         graph.history.undo();
        //     }
        //     return false;
        // });
        // graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        //     if (graph.history.canRedo()) {
        //         graph.history.redo();
        //     }
        //     return false;
        // });
        // select all
        // graph.bindKey(['meta+a', 'ctrl+a'], () => {
        //     const nodes = graph.getNodes();
        //     if (nodes) {
        //         graph.select(nodes);
        //     }
        // });
        //delete
        graph.bindKey('backspace', () => {
            const cells = graph.getSelectedCells();
            if (cells.length && !['start-node', 'end-node'].includes(get(cells, '0.shape'))) {
                graph.removeCells(cells);
            }
            FlowGraph.submitEvent({
                type: 'delete',
                id: cells.length > 0 ? cells[0]['id'] : '',
            })
        });
    }
}