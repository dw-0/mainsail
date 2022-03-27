import { GetterTree } from 'vuex'
import { GuiControlState, GuiControlStateCustomButton } from '@/store/gui/control/types'

// eslint-disable-next-line
export const getters: GetterTree<GuiControlState, any> = {
    getDefaultControlActionButton: (state, getters, rootState, rootGetters) => {
        if (rootGetters['printer/existsQGL']) return 'qgl'
        else if (rootGetters['printer/existsZtilt']) return 'ztilt'

        return 'm84'
    },
    /**
     * Custom toolhead 3-dot menu button
     */
    getCustomButtons: (state) => {
        const customButtons: GuiControlStateCustomButton[] = []

        Object.keys(state.customButtons).forEach((id: string) => {
            customButtons.push({ ...state.customButtons[id], id })
        })

        return customButtons
    },
}
