import { Position } from '@vue-flow/core'

export const initialElements = [
  {
    id: '1',
    type: 'toolbar',
    label: 'Node 1',
    position: { x: 0, y: 0 },
    data: { toolbarPosition: Position.Bottom },
    style: {
      border: '1px solid #10b981',
      background: '#ef467e',
      color: 'white',
      borderRadius: '99px',
    },
  },
]

export const getNewNode = (id: number, position: Record<string, number>) => {
  return {
    id: `${id}`,
    type: 'toolbar',
    label: `Node ${id}`,
    position: { x: position.x, y: position.y + 100 },
    data: { toolbarPosition: Position.Bottom },
    style: {
      border: '1px solid #10b981',
      background: '#ef467e',
      color: 'white',
      borderRadius: '99px',
    },
  }
}

export const getNewCondition = (id: number, position: Record<string, number>) => {
  return {
    id: `${id}`,
    type: 'condition',
    label: `Condition ${id}`,
    position: { x: position.x, y: position.y + 100 },
    style: {
      color: 'white',
      width: '120px',
      height: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    class: 'custom-border-node',
  }
}

export const getNewEdge = (id: number, parentId: number) => {
  return {
    id: `e${parentId}-${id}`,
    source: `${parentId}`,
    target: `${id}`,
    type: 'smoothstep',
  }
}
