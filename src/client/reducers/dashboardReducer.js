import { COMMIT_WIDGETS, SET_SHADOW_WIDGET } from '../actions/dashboadActions';
import generateGuid from '../lib/generateGuid';
import _ from 'underscore';

// default mockups
var defaultState =
    {
        panels: [
            {
                name: 'default',
                displayName: 'Default',
                containers: [
                    {
                        widgets: [
                            {
                                id: 'matters-by-status'
                            },
                            {
                                id: 'matters-by-nature'
                            }
                        ]
                    }
                ]
            }
        ]
    };

export default function dashboardReducer(state = defaultState, action) {
    switch (action.type) {
        case COMMIT_WIDGETS:         {
            break;
        }
        case SET_SHADOW_WIDGET: {
            break;
        }
        default:
            return state;
    }
}