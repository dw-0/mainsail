export interface GuiControlState {
    style: 'bars' | 'circle' | 'cross'
    actionButton: null | 'm84' | 'qgl' | 'ztilt'
    enableXYHoming: boolean
    displayZOffsetStandby: boolean
    feedrateXY: number
    stepsXY: number[]
    feedrateZ: number
    offsetsZ: number[]
    stepsZ: number[]
    stepsAll: number[]
    stepsCircleXY: number[]
    stepsCircleZ: number[]
    selectedCrossStep: null | number
    reverseX: boolean
    reverseY: boolean
    reverseZ: boolean
    extruder: {
        feedamount: number
        feedamounts: number[]
        feedrate: number
        feedrates: number[]
        showEstimatedExtrusionInfo: boolean
    }
    customButtons: {
        [key: string]: GuiControlStateCustomButton
    }
}
/**
 * Custom toolhead 3-dot menu button
 */
export interface GuiControlStateCustomButton {
    id?: string | null
    bool: boolean
    name: string
    command: string
}
