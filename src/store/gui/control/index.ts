import { Module } from 'vuex'
import { actions } from '@/store/gui/control/actions'
import { mutations } from '@/store/gui/control/mutations'
import { getters } from '@/store/gui/control/getters'
import { GuiControlState } from '@/store/gui/control/types'

export const getDefaultState = (): GuiControlState => {
    return {
        style: 'bars',
        actionButton: null,
        enableXYHoming: false,
        displayZOffsetStandby: false,
        feedrateXY: 100,
        stepsXY: [100, 10, 1],
        feedrateZ: 25,
        offsetsZ: [0.005, 0.01, 0.025, 0.05],
        stepsZ: [25, 1, 0.1],
        stepsAll: [0.1, 1, 10, 25, 50, 100],
        stepsCircleXY: [1, 10, 50, 100],
        stepsCircleZ: [0.1, 1, 10, 50],
        selectedCrossStep: null,
        reverseX: false,
        reverseY: false,
        reverseZ: false,
        extruder: {
            feedamount: 25,
            feedamounts: [50, 10, 5, 1],
            feedrate: 5,
            feedrates: [10, 5, 2, 1],
            showEstimatedExtrusionInfo: true,
        },
        customButtons: {},
    }
}

// initial state
const state = getDefaultState()

// eslint-disable-next-lineGuiControlState
export const control: Module<GuiControlState, any> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
