<style scoped></style>

<template>
    <div>
        <v-card v-if="!form.bool" flat>
            <v-card-text>
                <v-form ref="formControlExtruder">
                    <!-- TOOLHEAD CONTROL SETTINGS -->
                    <v-card-title class="mx-n4">{{ $t('Panels.ToolheadControlPanel.Headline') }}</v-card-title>
                    <settings-row :title="$t('Settings.ControlTab.Style').toString()">
                        <v-select
                            v-model="controlStyle"
                            :items="controlStyles"
                            outlined
                            dense
                            hide-details
                            attach></v-select>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <template v-if="['circle', 'cross'].includes(controlStyle) && actionOptions.length > 1">
                        <settings-row :title="'Overwrite action button'">
                            <v-select
                                v-model="actionButton"
                                :items="actionOptions"
                                outlined
                                dense
                                hide-details
                                attach></v-select>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                    </template>
                    <settings-row
                        :title="$t('Settings.ControlTab.EnableXYHoming').toString()"
                        :dynamic-slot-width="true">
                        <v-switch v-model="enableXYHoming" hide-details class="mt-0"></v-switch>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row
                        :title="$t('Settings.ControlTab.DisplayZOffset').toString()"
                        :sub-title="$t('Settings.ControlTab.DisplayZOffsetDescription').toString()"
                        :dynamic-slot-width="true">
                        <v-switch v-model="displayZOffsetStandby" hide-details class="mt-0"></v-switch>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <template v-if="['circle', 'cross'].includes(controlStyle)">
                        <settings-row
                            :title="$t('Settings.ControlTab.InvertXMovement').toString()"
                            :dynamic-slot-width="true">
                            <v-switch v-model="reverseX" hide-details class="mt-0"></v-switch>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                        <settings-row
                            :title="$t('Settings.ControlTab.InvertYMovement').toString()"
                            :dynamic-slot-width="true">
                            <v-switch v-model="reverseY" hide-details class="mt-0"></v-switch>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                        <settings-row
                            :title="$t('Settings.ControlTab.InvertZMovement').toString()"
                            :dynamic-slot-width="true">
                            <v-switch v-model="reverseZ" hide-details class="mt-0"></v-switch>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                    </template>
                    <settings-row :title="$t('Settings.ControlTab.SpeedXY').toString()">
                        <v-text-field
                            v-model="feedrateXY"
                            type="number"
                            suffix="mm/s"
                            hide-details="auto"
                            :rules="[(v) => v > 0 || $t('Settings.ControlTab.ValueGreaterThan', { value: '0' })]"
                            outlined
                            dense
                            hide-spin-buttons
                            @blur="blurFeedrateXY"></v-text-field>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row :title="$t('Settings.ControlTab.SpeedZ').toString()">
                        <v-text-field
                            v-model="feedrateZ"
                            type="number"
                            suffix="mm/s"
                            hide-details="auto"
                            :rules="[(v) => v > 0 || $t('Settings.ControlTab.ValueGreaterThan', { value: '0' })]"
                            outlined
                            dense
                            hide-spin-buttons
                            @blur="blurFeedrateZ"></v-text-field>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <!-- CONTROL STYLE CROSS SPECIFICS -->
                    <template v-if="controlStyle === 'cross'">
                        <settings-row
                            :title="$t('Settings.ControlTab.MoveDistancesInMm').toString()"
                            :mobile-second-row="true">
                            <v-combobox
                                v-model="stepsAll"
                                hide-selected
                                hide-details="auto"
                                multiple
                                small-chips
                                :deletable-chips="true"
                                append-icon=""
                                type="number"
                                :rules="[
                                    (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                    (v) =>
                                        v.length <= 9 ||
                                        $t('Settings.ControlTab.MaximumValuesVisibility', { maximum: '9' }),
                                ]"
                                dense
                                outlined
                                hide-spin-buttons></v-combobox>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                    </template>
                    <!-- CONTROL STYLE CIRCLE SPECIFICS -->
                    <template v-else-if="controlStyle === 'circle'">
                        <settings-row
                            :title="$t('Settings.ControlTab.MoveDistancesXYInMm').toString()"
                            :mobile-second-row="true">
                            <v-combobox
                                v-model="stepsCircleXY"
                                hide-selected
                                hide-details="auto"
                                multiple
                                small-chips
                                :deletable-chips="true"
                                append-icon=""
                                type="number"
                                :rules="[
                                    (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                    (v) => v.length <= 4 || $t('Settings.ControlTab.MaximumValues', { maximum: '4' }),
                                ]"
                                dense
                                outlined
                                hide-spin-buttons></v-combobox>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                        <settings-row
                            :title="$t('Settings.ControlTab.MoveDistancesZInMm').toString()"
                            :mobile-second-row="true">
                            <v-combobox
                                v-model="stepsCircleZ"
                                hide-selected
                                hide-details="auto"
                                multiple
                                small-chips
                                :deletable-chips="true"
                                append-icon=""
                                type="number"
                                :rules="[
                                    (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                    (v) => v.length <= 4 || $t('Settings.ControlTab.MaximumValues', { maximum: '4' }),
                                ]"
                                dense
                                outlined
                                hide-spin-buttons></v-combobox>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                    </template>
                    <!-- CONTROL STYLE BARS SPECIFICS -->
                    <template v-else>
                        <settings-row
                            :title="$t('Settings.ControlTab.MoveDistancesXYInMm').toString()"
                            :mobile-second-row="true">
                            <v-combobox
                                v-model="stepsXY"
                                hide-selected
                                hide-details="auto"
                                multiple
                                small-chips
                                :deletable-chips="true"
                                append-icon=""
                                type="number"
                                :rules="[
                                    (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                    (v) =>
                                        v.length <= 3 ||
                                        $t('Settings.ControlTab.MaximumValuesVisibility', { maximum: '3' }),
                                ]"
                                dense
                                outlined
                                hide-spin-buttons></v-combobox>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                        <settings-row
                            :title="$t('Settings.ControlTab.MoveDistancesZInMm').toString()"
                            :mobile-second-row="true">
                            <v-combobox
                                v-model="stepsZ"
                                hide-selected
                                hide-details="auto"
                                multiple
                                small-chips
                                :deletable-chips="true"
                                append-icon=""
                                type="number"
                                :rules="[
                                    (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                    (v) =>
                                        v.length <= 3 ||
                                        $t('Settings.ControlTab.MaximumValuesVisibility', { maximum: '3' }),
                                ]"
                                dense
                                outlined
                                hide-spin-buttons></v-combobox>
                        </settings-row>
                        <v-divider class="my-2"></v-divider>
                    </template>
                    <settings-row
                        :title="$t('Settings.ControlTab.ZOffsetIncrements').toString()"
                        :mobile-second-row="true">
                        <v-combobox
                            v-model="offsetsZ"
                            hide-selected
                            hide-details="auto"
                            multiple
                            small-chips
                            :deletable-chips="true"
                            append-icon=""
                            type="number"
                            :rules="[
                                (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                (v) =>
                                    v.length <= 4 ||
                                    $t('Settings.ControlTab.MaximumValuesVisibility', { maximum: '4' }),
                            ]"
                            dense
                            outlined
                            hide-spin-buttons />
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <!-- TOOLHEAD 3-DOT MENU CUSTOM BUTTONS -->
                    <div v-for="(button, index) in customButtons" :key="index">
                        <v-divider v-if="index" class="my-2"></v-divider>
                        <settings-row :title="button.name">
                            <v-btn small outlined class="ml-3" @click="editCustomButton(button)">
                                <v-icon left small>{{ mdiPencil }}</v-icon>
                                {{ $t('Settings.Edit') }}
                            </v-btn>
                            <v-btn
                                small
                                outlined
                                class="ml-3 minwidth-0 px-2"
                                color="error"
                                @click="deleteCustomButton(button.id)">
                                <v-icon small>{{ mdiDelete }}</v-icon>
                            </v-btn>
                        </settings-row>
                    </div>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn text color="primary" @click="createCustomButton">Add custom button</v-btn>
                    </v-card-actions>
                    <!-- EXTRUDER CONTROL SETTINGS -->
                    <v-card-title class="mx-n4">{{ $t('Panels.ExtruderControlPanel.Headline') }}</v-card-title>
                    <settings-row
                        :title="$t('Settings.ControlTab.MoveDistancesEInMm').toString()"
                        :mobile-second-row="true">
                        <v-combobox
                            v-model="feedamountsE"
                            hide-selected
                            hide-details="auto"
                            multiple
                            small-chips
                            :deletable-chips="true"
                            append-icon=""
                            type="number"
                            :rules="[
                                (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                (v) =>
                                    v.length <= 5 ||
                                    $t('Settings.ControlTab.MaximumValuesVisibility', { maximum: '5' }),
                            ]"
                            dense
                            outlined
                            hide-spin-buttons></v-combobox>
                    </settings-row>
                    <v-divider class="my-2"></v-divider>
                    <settings-row :title="$t('Settings.ControlTab.SpeedEInMms').toString()" :mobile-second-row="true">
                        <v-combobox
                            v-model="feedratesE"
                            hide-selected
                            hide-details="auto"
                            multiple
                            small-chips
                            :deletable-chips="true"
                            append-icon=""
                            type="number"
                            :rules="[
                                (v) => v.length > 0 || $t('Settings.ControlTab.MinimumValues', { minimum: '1' }),
                                (v) =>
                                    v.length <= 5 ||
                                    $t('Settings.ControlTab.MaximumValuesVisibility', { maximum: '5' }),
                            ]"
                            dense
                            outlined
                            hide-spin-buttons></v-combobox>
                    </settings-row>
                    <settings-row
                        :title="$t('Settings.ControlTab.EstimatedExtrusionInfo').toString()"
                        :sub-title="$t('Settings.ControlTab.EstimatedExtrusionInfoDescription').toString()"
                        :dynamic-slot-width="true">
                        <v-switch v-model="showEstimatedExtrusionInfo" hide-details class="mt-0"></v-switch>
                    </settings-row>
                </v-form>
            </v-card-text>
        </v-card>
        <v-card v-else flat>
            <v-form v-model="form.valid" @submit.prevent="saveCustomButton">
                <v-card-title>
                    {{ form.id === null ? 'Create Button' : 'Edit Button' }}
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col class="col-4">
                            <v-text-field
                                v-model="form.name"
                                label="Button name"
                                :rules="[rules.required, rules.unique]"
                                hide-details="auto"
                                dense
                                outlined></v-text-field>
                        </v-col>
                        <v-col class="col-8">
                            <v-text-field
                                v-model="form.command"
                                label="Command"
                                :rules="[rules.required]"
                                outlined
                                dense
                                hide-details="auto"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn text @click="form.bool = false">
                        {{ $t('Settings.Cancel') }}
                    </v-btn>
                    <v-btn color="primary" text type="submit">
                        {{ form.id === null ? 'Store Button' : 'Update Button' }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import ControlMixin from '@/components/mixins/control'
import SettingsRow from '@/components/settings/SettingsRow.vue'
import { mdiPencil, mdiDelete } from '@mdi/js'

interface customButtonForm {
    bool: boolean
    id: string | null
    valid: boolean
    name: string
    command: string
}

@Component({
    components: { SettingsRow },
})
export default class SettingsControlTab extends Mixins(BaseMixin, ControlMixin) {
    mdiPencil = mdiPencil
    mdiDelete = mdiDelete

    declare $refs: {
        formControlExtruder: HTMLFormElement
    }

    get controlStyles() {
        return [
            {
                text: this.$t('Settings.ControlTab.Bars'),
                value: 'bars',
            },
            {
                text: this.$t('Settings.ControlTab.Circle'),
                value: 'circle',
            },
            {
                text: this.$t('Settings.ControlTab.Cross'),
                value: 'cross',
            },
        ]
    }

    get controlStyle() {
        return this.$store.state.gui.control.style ?? 'bar'
    }

    set controlStyle(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'style', value: newVal })
    }

    get actionOptions() {
        let actions = [
            {
                text: this.$t('Settings.ControlTab.MotorsOff', {
                    isDefault: this.defaultActionButton === 'm84' ? this.$t('Settings.ControlTab.IsDefault') : '',
                }),
                value: 'm84',
            },
        ]
        if (this.existsQGL) {
            actions.push({
                text: this.$t('Settings.ControlTab.QuadGantryLevel', {
                    isDefault: this.defaultActionButton === 'qgl' ? this.$t('Settings.ControlTab.IsDefault') : '',
                }),
                value: 'qgl',
            })
        }
        if (this.existsZtilt) {
            actions.push({
                text: this.$t('Settings.ControlTab.ZTiltAdjust', {
                    isDefault: this.defaultActionButton === 'ztilt' ? this.$t('Settings.ControlTab.IsDefault') : '',
                }),
                value: 'ztilt',
            })
        }
        return actions
    }

    get actionButton(): string {
        return this.$store.state.gui.control.actionButton ?? this.defaultActionButton
    }

    set actionButton(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'actionButton', value: newVal })
    }

    get defaultActionButton() {
        return this.$store.getters['gui/control/getDefaultControlActionButton']
    }

    get enableXYHoming(): boolean {
        return this.$store.state.gui.control.enableXYHoming ?? false
    }

    set enableXYHoming(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'enableXYHoming', value: newVal })
    }

    get displayZOffsetStandby() {
        return this.$store.state.gui.uiSettings.displayZOffsetStandby
    }

    set displayZOffsetStandby(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'displayZOffsetStandby', value: newVal })
    }

    get reverseX() {
        return this.$store.state.gui.control.reverseX
    }

    set reverseX(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'reverseX', value: newVal })
    }

    get reverseY() {
        return this.$store.state.gui.control.reverseY
    }

    set reverseY(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'reverseY', value: newVal })
    }

    get reverseZ() {
        return this.$store.state.gui.control.reverseZ
    }

    set reverseZ(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'reverseZ', value: newVal })
    }

    get feedrateXY() {
        return this.$store.state.gui.control.feedrateXY
    }

    set feedrateXY(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'feedrateXY', value: newVal })
    }

    get feedrateZ() {
        return this.$store.state.gui.control.feedrateZ
    }

    set feedrateZ(newVal) {
        this.$store.dispatch('gui/control/saveSetting', { name: 'feedrateZ', value: newVal })
    }

    get offsetsZ() {
        const steps = this.$store.state.gui.control.offsetsZ
        return steps.sort(function (a: number, b: number) {
            return a - b
        })
    }

    set offsetsZ(steps) {
        // Use a set to prevent adding duplicate entries.
        const absSteps = new Set()
        for (const value of steps) absSteps.add(Math.abs(value))
        this.$store.dispatch('gui/control/saveSetting', { name: 'offsetsZ', value: Array.from(absSteps) })
    }

    get stepsAll() {
        const steps = this.$store.state.gui.control.stepsAll
        return (steps ?? []).sort(function (a: number, b: number) {
            return b - a
        })
    }

    set stepsAll(newVal) {
        const absSteps = []
        for (const value of newVal) absSteps.push(Math.abs(value))
        const steps = absSteps.filter(this.onlyUnique)

        this.$store.dispatch('gui/control/saveSetting', { name: 'stepsAll', value: steps })
    }

    get stepsXY() {
        const steps = this.$store.state.gui.control.stepsXY
        return steps.sort(function (a: number, b: number) {
            return b - a
        })
    }

    set stepsXY(newVal) {
        const absSteps = []
        for (const value of newVal) absSteps.push(Math.abs(value))
        const steps = absSteps.filter(this.onlyUnique)

        this.$store.dispatch('gui/control/saveSetting', { name: 'stepsXY', value: steps })
    }

    get stepsZ() {
        const steps = this.$store.state.gui.control.stepsZ
        return steps.sort(function (a: number, b: number) {
            return b - a
        })
    }

    set stepsZ(newVal) {
        const absSteps = []
        for (const value of newVal) absSteps.push(Math.abs(value))
        const steps = absSteps.filter(this.onlyUnique)

        this.$store.dispatch('gui/control/saveSetting', { name: 'stepsZ', value: steps })
    }

    get stepsCircleXY() {
        const steps = this.$store.state.gui.control.stepsCircleXY
        return steps.sort(function (a: number, b: number) {
            return b - a
        })
    }

    set stepsCircleXY(newVal) {
        const absSteps = []
        for (const value of newVal) absSteps.push(Math.abs(value))
        const steps = absSteps.filter(this.onlyUnique)

        this.$store.dispatch('gui/control/saveSetting', { name: 'stepsCircleXY', value: steps })
    }

    get stepsCircleZ() {
        const steps = this.$store.state.gui.control.stepsCircleZ
        return steps.sort(function (a: number, b: number) {
            return b - a
        })
    }

    set stepsCircleZ(newVal) {
        const absSteps = []
        for (const value of newVal) absSteps.push(Math.abs(value))
        const steps = absSteps.filter(this.onlyUnique)

        this.$store.dispatch('gui/control/saveSetting', { name: 'stepsCircleZ', value: steps })
    }

    get feedamountsE() {
        const steps = this.$store.state.gui.control.extruder.feedamounts
        return steps.sort(function (a: number, b: number) {
            return b - a
        })
    }

    set feedamountsE(newVal) {
        const absAmounts = []
        for (const value of newVal) absAmounts.push(Math.abs(value))
        const amounts = absAmounts.filter(this.onlyUnique)

        this.$store.dispatch('gui/control/saveSetting', { name: 'extruder.feedamounts', value: amounts })
    }

    get feedratesE() {
        const steps = this.$store.state.gui.control.extruder.feedrates
        return steps.sort(function (a: number, b: number) {
            return b - a
        })
    }

    set feedratesE(newVal) {
        const absRates = []
        for (const value of newVal) absRates.push(Math.abs(value))
        const rates = absRates.filter(this.onlyUnique)

        this.$store.dispatch('gui/control/saveSetting', { name: 'extruder.feedrates', value: rates })
    }

    get showEstimatedExtrusionInfo() {
        return this.$store.state.gui.control.extruder.showEstimatedExtrusionInfo
    }

    set showEstimatedExtrusionInfo(newVal) {
        this.$store.dispatch('gui/control/saveSetting', {
            name: 'extruder.showEstimatedExtrusionInfo',
            value: newVal,
        })
    }

    blurFeedrateXY() {
        if (!(this.feedrateXY > 0)) this.feedrateXY = 100
    }

    blurFeedrateZ() {
        if (!(this.feedrateZ > 0)) this.feedrateZ = 25
    }

    onlyUnique(value: any, index: any, self: any[]) {
        return self.indexOf(value) === index
    }

    mounted() {
        this.$refs.formControlExtruder.validate()
    }

    /**
     * Custom toolhead 3-dot menu button
     */
    private form: customButtonForm = {
        bool: false,
        valid: false,
        name: '',
        command: '',
        id: null,
    }

    private rules = {
        required: (value: string) => value !== '' || 'required',
        unique: (value: string) => !this.existsButtonName(value) || 'Name already exists',
    }

    get customButtons() {
        return this.$store.getters['gui/control/getCustomButtons'] ?? []
    }

    existsButtonName(name: string) {
        return this.customButtons.findIndex((button: any) => button.name === name && button.id !== this.form.id) >= 0
    }

    clearForm() {
        this.form.bool = false
        this.form.id = null
        this.form.name = ''
        this.form.command = ''
    }

    createCustomButton() {
        this.clearForm()
        this.form.bool = true
    }

    editCustomButton(button: any) {
        this.form.name = button.name
        this.form.id = button.id
        this.form.command = button.command

        this.form.bool = true
    }

    saveCustomButton() {
        if (this.form.valid) {
            const button = {
                name: this.form.name,
                bool: this.form.bool,
                command: this.form.command,
            }

            if (this.form.id)
                this.$store.dispatch('gui/control/customButtonUpdate', { id: this.form.id, values: button })
            else this.$store.dispatch('gui/control/customButtonStore', { values: button })

            this.clearForm()
        }
    }

    deleteCustomButton(id: string) {
        this.$store.dispatch('gui/control/customButtonDelete', id)
    }
}
</script>
