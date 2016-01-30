import { ADD_COMPONENT, MOVE_COMPONENT, SET_SELECTION, UPDATE_COMPONENT_SIZE } from '../actions/mockupActions';
import generateGuid from '../lib/generateGuid';
import _ from 'underscore';

// default mockups
var defaultState = [
    {
        name: 'default',
        size: {
            width: 1920,
            height: 1080
        },
        components: []
    }
];

export default function mockupsReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_COMPONENT:
        {
            let mockups = state.slice(0); // mockups is now a copy of the state

            let mockupIndex = _.findIndex(mockups, (m) => m.name == action.mockupName);
            if (mockupIndex == -1) {
                throw Error(`Could not find mockup. Mockup name: ${action.mockupName}`);
            }

            mockups[mockupIndex] = Object.assign({}, state[mockupIndex]);
            mockups[mockupIndex].components = state[mockupIndex].components.slice(0);

            let newComponent = {
                id: generateGuid(),
                type: action.componentType,
                props: {
                    x: action.componentPosition.x,
                    y: action.componentPosition.y
                }
            };

            mockups[mockupIndex].components.push(newComponent);
            mockups[mockupIndex].selectedComponent = newComponent.id;

            return mockups;
        }
        case MOVE_COMPONENT:
        {
            let mockups = state.slice(0); // mockups is now a copy of the state

            let mockupIndex = _.findIndex(mockups, (m) => m.name == action.mockupName);
            if (mockupIndex == -1) {
                throw Error(`Could not find mockup. Mockup name: ${action.mockupName}`);
            }

            mockups[mockupIndex] = Object.assign({}, state[mockupIndex]);
            mockups[mockupIndex].selectedComponent = action.componentId;
            mockups[mockupIndex].components = state[mockupIndex].components.slice(0);

            let existingComponentIndex = _.findIndex(mockups[mockupIndex].components, c => c.id == action.componentId);
            if (existingComponentIndex == -1) {
                throw Error(`Could not find component. Mockup name: ${action.mockupName}. Component id: ${action.componentId}`);
            }
            mockups[mockupIndex].components[existingComponentIndex] = Object.assign({}, mockups[mockupIndex].components[existingComponentIndex]);
            mockups[mockupIndex].components[existingComponentIndex].props.x = action.componentPosition.x;
            mockups[mockupIndex].components[existingComponentIndex].props.y = action.componentPosition.y;

            return mockups;
        }
        case SET_SELECTION:
        {
            let mockups = state.slice(0); // mockups is now a copy of the state

            let mockupIndex = _.findIndex(mockups, (m) => m.name == action.mockupName);
            if (mockupIndex == -1) {
                throw Error(`Could not find mockup. Mockup name: ${action.mockupName}`);
            }
            mockups[mockupIndex] = Object.assign({}, state[mockupIndex]);
            mockups[mockupIndex].selectedComponent = action.componentId;
            return mockups;
        }
        case UPDATE_COMPONENT_SIZE:
        {
            let mockups = state.slice(0); // mockups is now a copy of the state

            let mockupIndex = _.findIndex(mockups, (m) => m.name == action.mockupName);
            if (mockupIndex == -1) {
                throw Error(`Could not find mockup. Mockup name: ${action.mockupName}`);
            }

            mockups[mockupIndex] = Object.assign({}, state[mockupIndex]);
            mockups[mockupIndex].selectedComponent = action.componentId;
            mockups[mockupIndex].components = state[mockupIndex].components.slice(0);

            let existingComponentIndex = _.findIndex(mockups[mockupIndex].components, c => c.id == action.componentId);
            if (existingComponentIndex == -1) {
                throw Error(`Could not find component. Mockup name: ${action.mockupName}. Component id: ${action.componentId}`);
            }
            mockups[mockupIndex].components[existingComponentIndex] = Object.assign({}, mockups[mockupIndex].components[existingComponentIndex]);
            mockups[mockupIndex].components[existingComponentIndex].computedSize = {
                width: action.componentSize.width,
                height: action.componentSize.height
            };

            return mockups;
        }
        default:
            return state;
    }
}