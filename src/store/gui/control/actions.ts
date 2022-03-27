import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import { GuiControlState } from '@/store/gui/control/types'

export const actions: ActionTree<GuiControlState, RootState> = {
    reset({ commit }) {
        commit('reset')
    },

    saveSetting({ dispatch }, payload) {
        dispatch(
            'gui/saveSetting',
            {
                name: 'control.' + payload.name,
                value: payload.value,
            },
            { root: true }
        )
    },
    /**
     * Custom toolhead 3-dot menu button
     */
    customButtonUpload(_, payload) {
        Vue.$socket.emit('server.database.post_item', {
            namespace: 'mainsail',
            key: 'control.customButtons.' + payload.id,
            value: payload.value,
        })
    },

    customButtonStore({ commit, dispatch, state }, payload) {
        const id = uuidv4()

        commit('customButtonStore', { id, values: payload.values })
        dispatch('customButtonUpload', {
            id,
            value: state.customButtons[id],
        })
    },

    customButtonUpdate({ commit, dispatch, state }, payload) {
        commit('customButtonUpdate', payload)
        dispatch('customButtonUpload', {
            id: payload.id,
            value: state.customButtons[payload.id],
        })
    },

    customButtonDelete({ commit }, payload) {
        commit('customButtonDelete', payload)
        Vue.$socket.emit('server.database.delete_item', {
            namespace: 'mainsail',
            key: 'control.customButtons.' + payload,
        })
    },
}
