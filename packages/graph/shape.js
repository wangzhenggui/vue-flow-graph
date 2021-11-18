import { Graph } from '@antv/x6'

const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2695FA',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2695FA',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2695FA',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2695FA',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
  ],
}

Graph.registerNode('start-node', {
  inherit: 'rect',
  width: 30,
  height: 15,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: { ...ports },
  type: 'node'
})

Graph.registerNode('flow-node', {
  inherit: 'rect',
  width: 30,
  height: 15,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: { ...ports },
  type: 'node'
})

Graph.registerNode('end-node', {
  inherit: 'rect',
  width: 30,
  height: 15,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: { ...ports },
  type: 'node'
})