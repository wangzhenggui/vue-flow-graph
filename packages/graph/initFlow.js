const uuid = () => {
    // credit: http://stackoverflow.com/posts/2117523/revisions
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    //   const r = (Math.random() * 16) | 0
    //   const v = c === 'x' ? r : (r & 0x3) | 0x8
    //   return v.toString(16)
    // })
  
    let res = ''
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  
    for (let i = 0, len = template.length; i < len; i += 1) {
      const s = template[i]
      const r = (Math.random() * 16) | 0
      const v = s === 'x' ? r : s === 'y' ? (r & 0x3) | 0x8 : s
      res += v.toString(16)
    }
    return res
  }
  
const startNodeToFlowNodeLineId = uuid();
const flowNodeToEndNodeLineId = uuid();
const startNodeCellId = uuid();
const flowNodeCellId = uuid();
const endNodeCellId = uuid();
const startNodeCellTop = uuid();
const startNodeCellLeft = uuid();
const startNodeCellRight = uuid();
const startNodeCellBottom = uuid();
const flowNodeCellTop = uuid();
const flowNodeCellLeft = uuid();
const flowNodeCellRight = uuid();
const flowNodeCellBottom = uuid();
const endNodeCellTop = uuid();
const endNodeCellLeft = uuid();
const endNodeCellRight = uuid();
const endNodeCellBottom = uuid();

export default {
  "cells":[
      {
          "shape":"edge",
          "attrs":{
              "line":{
                  "stroke":"#5F95FF",
                  "strokeWidth":1,
                  "targetMarker":{
                      "name":"block",
                      "width":12,
                      "height":8
                  }
              }
          },
          "id":startNodeToFlowNodeLineId,
          "zIndex":0,
          "source":{
              "cell":startNodeCellId,
              "port":startNodeCellBottom
          },
          "target":{
              "cell":flowNodeCellId,
              "port":flowNodeCellTop
          },
          "type": "line"
      },
      {
          "shape":"edge",
          "attrs":{
              "line":{
                  "stroke":"#5F95FF",
                  "strokeWidth":1,
                  "targetMarker":{
                      "name":"block",
                      "width":12,
                      "height":8
                  }
              }
          },
          "id":flowNodeToEndNodeLineId,
          "zIndex":0,
          "source":{
              "cell":flowNodeCellId,
              "port":flowNodeCellBottom
          },
          "target":{
              "cell":endNodeCellId,
              "port":endNodeCellTop
          },
          "type": "line"
      },
      {
          "position":{
              "x":240,
              "y":50
          },
          "size":{
              "width":160,
              "height":60
          },
          "attrs":{
              "body":{
                  "fill":"#F7F9FE",
                  "opacity":1,
                  "stroke":"#E1E3E5"
              },
              "label":{
                  "text":"开始节点",
                  "fill":"#000"
              }
          },
          "shape": "start-node",
          "type": "node",
          "ports":{
              "groups":{
                  "top":{
                      "position":"top",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "right":{
                      "position":"right",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "bottom":{
                      "position":"bottom",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "left":{
                      "position":"left",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  }
              },
              "items":[
                  {
                      "group":"top",
                      "id":startNodeCellTop
                  },
                  {
                      "group":"right",
                      "id":startNodeCellRight
                  },
                  {
                      "group":"bottom",
                      "id":startNodeCellBottom
                  },
                  {
                      "group":"left",
                      "id":startNodeCellLeft
                  }
              ]
          },
          "id":startNodeCellId,
          "zIndex":1
      },
      {
          "position":{
              "x":240,
              "y":181
          },
          "size":{
              "width":160,
              "height":60
          },
          "attrs":{
              "body":{
                  "fill":"#F7F9FE",
                  "opacity":1,
                  "stroke":"#E1E3E5"
              },
              "label":{
                  "text":"流程节点",
                  "fill":"#000"
              }
          },
          "shape": "flow-node",
          "type": "node",
          "ports":{
              "groups":{
                  "top":{
                      "position":"top",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "right":{
                      "position":"right",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "bottom":{
                      "position":"bottom",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "left":{
                      "position":"left",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  }
              },
              "items":[
                  {
                      "group":"top",
                      "id":flowNodeCellTop
                  },
                  {
                      "group":"right",
                      "id":flowNodeCellRight
                  },
                  {
                      "group":"bottom",
                      "id":flowNodeCellBottom
                  },
                  {
                      "group":"left",
                      "id":flowNodeCellLeft
                  }
              ]
          },
          "id":flowNodeCellId,
          "zIndex":2
      },
      {
          "position":{
              "x":240,
              "y":313
          },
          "size":{
              "width":160,
              "height":60
          },
          "attrs":{
              "body":{
                  "fill":"#F7F9FE",
                  "opacity":1,
                  "stroke":"#E1E3E5"
              },
              "label":{
                  "text":"结束节点",
                  "fill":"#000"
              }
          },
          "shape": "end-node",
          "type": "node",
          "ports":{
              "groups":{
                  "top":{
                      "position":"top",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "right":{
                      "position":"right",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "bottom":{
                      "position":"bottom",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  },
                  "left":{
                      "position":"left",
                      "attrs":{
                          "circle":{
                              "r":4,
                              "magnet":true,
                              "stroke":"#2695FA",
                              "strokeWidth":1,
                              "fill":"#fff",
                              "style":{
                                  "visibility":"hidden"
                              }
                          }
                      }
                  }
              },
              "items":[
                  {
                      "group":"top",
                      "id":endNodeCellTop
                  },
                  {
                      "group":"right",
                      "id":endNodeCellRight
                  },
                  {
                      "group":"bottom",
                      "id":endNodeCellBottom
                  },
                  {
                      "group":"left",
                      "id":endNodeCellLeft
                  }
              ]
          },
          "id":endNodeCellId,
          "zIndex":3
      }
  ]
}