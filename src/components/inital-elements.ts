import { MarkerType, Position } from '@vue-flow/core'

export const initialElements = [
  {
    id: '1',
    type: 'toolbar',
    label: 'Submiter',
    position: { x: 0, y: 0 },
    data: { toolbarPosition: Position.Bottom },
    style: {
      border: '1px solid #fff',
      background: '#740fad',
      color: 'white',
      borderRadius: '99px',
    },
  },
]

export const getNewNode = (id: number, parentId: number, position: Record<string, number>) => {
  return {
    id: `${id}`,
    type: 'toolbar',
    label: `Node ${id}`,
    position: { x: position.x + 150, y: position.y },
    data: { toolbarPosition: Position.Bottom },
    style: {
      border: '1px solid #fff',
      background: '#740fad',
      color: 'white',
      borderRadius: '99px',
    },
    parentNode: '' + parentId,
  }
}

export const getNewCondition = (id: number, parentId: number, position: Record<string, number>) => {
  return {
    id: `${id}`,
    type: 'condition',
    label: `Condition ${id}`,
    position: { x: position.x + 150, y: position.y - 38.2 },
    style: {
      color: 'white',
      width: '120px',
      height: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    class: 'custom-border-node',
    parentNode: '' + parentId,
  }
}

export const getNewEdge = (id: number, parentId: number) => {
  return {
    id: `e${parentId}-${id}`,
    source: `${parentId}`,
    target: `${id}`,
    type: 'smoothstep',
    markerEnd: MarkerType.Arrow,
    style: { stroke: '#10b981' },
  }
}
