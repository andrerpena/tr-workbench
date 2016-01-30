export const ADD_COMPONENT = 'ADD_COMPONENT';
export const MOVE_COMPONENT = 'MOVE_COMPONENT';
export const SET_SELECTION = 'SET_SELECTION';
export const UPDATE_COMPONENT_SIZE = 'UPDATE_COMPONENT_SIZE';

export function addComponent(mockupName, componentType, position) {
    return {
        type: ADD_COMPONENT,
        mockupName: mockupName,
        componentType: componentType,
        componentPosition: position
    };
}

export function moveComponent(mockupName, componentId, position) {
    return {
        type: MOVE_COMPONENT,
        mockupName: mockupName,
        componentId: componentId,
        componentPosition: position
    };
}

export function setSelection(mockupName, componentId) {
    return {
        type: SET_SELECTION,
        mockupName: mockupName,
        componentId: componentId
    }
}

export function updateComponentSize(mockupName, componentId, size) {
    return {
        type: UPDATE_COMPONENT_SIZE,
        mockupName: mockupName,
        componentId: componentId,
        componentSize: size
    }
}