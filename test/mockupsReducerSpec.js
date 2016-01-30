import mockupsReducer from '../src/client/reducers/mockupsReducer';
import deepFreeze from 'deep-freeze';
import chai from 'chai';
import { ADD_COMPONENT, MOVE_COMPONENT, SET_SELECTION, UPDATE_COMPONENT_SIZE } from '../src/client/actions/mockupActions';

var assert = chai.assert;

describe('mockupsReducer', function () {
    it('should return the default state', function () {
        let mockups = mockupsReducer(undefined, {});
        assert.strictEqual(mockups.length, 1);
        assert.strictEqual(mockups[0].name, 'default');
    });
    it('action: ADD_COMPONENT', function () {
        let state = [
            {
                name: 'default',
                components: [
                    {
                        id: '123',
                        type: 'texbox',
                        position: {x: 0, y: 0}
                    }
                ]
            }
        ];
        deepFreeze(state);
        let mockups = mockupsReducer(state, {
            type: ADD_COMPONENT,
            mockupName: 'default',
            componentType: 'textbox',
            componentPosition: {x: 10, y: 10}
        });
        mockups = mockupsReducer(mockups, {
            type: ADD_COMPONENT,
            mockupName: 'default',
            componentType: 'textbox',
            componentPosition: {x: 20, y: 20}
        });


        assert.strictEqual(mockups.length, 1);
        assert.strictEqual(mockups[0].name, 'default');
        assert.strictEqual(mockups[0].components.length, 3);

        assert.ok(mockups[0].components[1].id);
        assert.strictEqual(mockups[0].components[1].type, 'textbox');
        assert.strictEqual(mockups[0].components[1].position.y, 10);
        assert.strictEqual(mockups[0].components[1].position.x, 10);

        assert.ok(mockups[0].components[2].id);
        assert.strictEqual(mockups[0].components[2].type, 'textbox');
        assert.strictEqual(mockups[0].components[2].position.x, 20);
        assert.strictEqual(mockups[0].components[2].position.y, 20);

        // the selected component should be the last added component
        assert.strictEqual(mockups[0].selectedComponent, mockups[0].components[2].id);

    });
    it('action: MOVE_COMPONENT', function() {
        let state = [
            {
                name: 'default',
                components: [
                    {
                        id: '123',
                        type: 'texbox',
                        position: {x: 0, y: 0}
                    }
                ]
            }
        ];
        deepFreeze(state);
        let mockups = mockupsReducer(state, {
            type: MOVE_COMPONENT,
            mockupName: 'default',
            componentId: '123',
            componentPosition: {x: 10, y: 20}
        });
        assert.strictEqual(mockups[0].components[0].id, '123');
        assert.strictEqual(mockups[0].components[0].type, 'texbox');
        assert.strictEqual(mockups[0].components[0].position.x, 10);
        assert.strictEqual(mockups[0].components[0].position.y, 20);
        assert.strictEqual(mockups[0].selectedComponent, '123');
    });
    it('action: UPDATE_COMPONENT_SIZE', function() {
        let state = [
            {
                name: 'default',
                components: [
                    {
                        id: '123',
                        type: 'texbox',
                        position: {x: 0, y: 0}
                    }
                ]
            }
        ];
        deepFreeze(state);
        let mockups = mockupsReducer(state, {
            type: UPDATE_COMPONENT_SIZE,
            mockupName: 'default',
            componentId: '123',
            componentSize: {width: 100, height: 200}
        });
        assert.strictEqual(mockups[0].components[0].id, '123');
        assert.strictEqual(mockups[0].components[0].type, 'texbox');
        assert.strictEqual(mockups[0].components[0].size.width, 100);
        assert.strictEqual(mockups[0].components[0].size.height, 200);
        assert.strictEqual(mockups[0].selectedComponent, '123');
    });
    it('action: SET_SELECTION', function() {
        let state = [
            {
                name: 'default',
                components: [
                    {
                        id: '123',
                        type: 'texbox',
                        position: {x: 0, y: 0}
                    }
                ]
            }
        ];
        deepFreeze(state);
        let mockups = mockupsReducer(state, {
            type: SET_SELECTION,
            mockupName: 'default',
            componentId: '123'
        });
        assert.strictEqual(mockups[0].selectedComponent, '123');
    });

});