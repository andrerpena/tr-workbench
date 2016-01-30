export const COMMIT_WIDGETS = 'ADD_WIDGET';
export const SET_SHADOW_WIDGET = 'SET_SHADOW_WIDGET';

/**
 * Commits the widgets. That is: The shadow, if any, is promoted to an action widget
 * @returns {{type: string}}
 */
export function commitWidgets() {
    return {
        type: COMMIT_WIDGETS
    };
}

/**
 * Sets a shadow widget in the given position
 * @param panelIndex
 * @param containerIndex
 * @param widgetIndex
 * @param widgetId
 * @returns {{type: string, panelIndex: *, containerIdex: *, widgetIndex: *, widgetId: *}}
 */
export function setShadowWidget(panelIndex, containerIndex, widgetIndex, widgetId) {
    return {
        type: SET_SHADOW_WIDGET,
        panelIndex: panelIndex,
        containerIdex: containerIndex,
        widgetIndex: widgetIndex,
        widgetId: widgetId
    };
}