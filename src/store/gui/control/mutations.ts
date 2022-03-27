import { getDefaultState } from './index'
import { MutationTree } from 'vuex'
import Vue from 'vue'
import { GuiControlState } from '@/store/gui/control/types'

export const mutations: MutationTree<GuiControlState> = {
    reset(state) {
        Object.assign(state, getDefaultState())
    },

    /**
     * Custom toolhead 3-dot menu button
     */
    customButtonStore(state, payload) {
        Vue.set(state.customButtons, payload.id, payload.values)
    },

    customButtonUpdate(state, payload) {
        if (payload.id in state.customButtons) {
            const preset = { ...state.customButtons[payload.id] }
            Object.assign(preset, payload.values)

            Vue.set(state.customButtons, payload.id, preset)
        }
    },

    customButtonDelete(state, payload) {
        if (payload in state.customButtons) {
            Vue.delete(state.customButtons, payload)
        }
    },
}
