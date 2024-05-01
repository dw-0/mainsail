<template>
    <v-dialog v-model="show" :max-width="600" persistent @keydown.esc="closeDialog">
        <panel
            :title="$t('History.JobDetails').toString()"
            :icon="mdiUpdate"
            card-class="history-detail-dialog"
            :margin-bottom="false">
            <template #buttons>
                <v-btn icon tile @click="closeDialog">
                    <v-icon>{{ mdiCloseThick }}</v-icon>
                </v-btn>
            </template>
            <v-card-text class="pa-0">
                <overlay-scrollbars style="height: 350px" class="px-6">
                    <template v-for="(entry, index) in entries">
                        <v-divider v-if="index > 0" :key="'history_detail_entry_divider_' + index" class="my-3" />
                        <v-row :key="'history_detail_entry_' + index">
                            <v-col>{{ entry.name }}</v-col>
                            <v-col class="text-right">{{ entry.value }}</v-col>
                        </v-row>
                    </template>
                </overlay-scrollbars>
            </v-card-text>
        </panel>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import SettingsRow from '@/components/settings/SettingsRow.vue'
import Panel from '@/components/ui/Panel.vue'
import { ServerHistoryStateJob } from '@/store/server/history/types'
import { mdiCloseThick, mdiUpdate } from '@mdi/js'
import { formatFilesize, formatPrintTime } from '@/plugins/helpers'

@Component({
    components: {
        Panel,
        SettingsRow,
    },
})
export default class HistoryListPanelDetailsDialog extends Mixins(BaseMixin) {
    mdiCloseThick = mdiCloseThick
    mdiUpdate = mdiUpdate

    formatFilesize = formatFilesize
    formatPrintTime = formatPrintTime

    @Prop({ type: Boolean, required: true }) readonly show!: boolean
    @Prop({ type: Object, required: true }) readonly job!: ServerHistoryStateJob

    get entries() {
        let entries: { name: string; value: string | null; exists: boolean }[] = [
            {
                name: this.$t('History.Filename').toString(),
                value: this.job.filename,
                exists: true,
            },
            {
                name: this.$t('History.Filesize').toString(),
                value: formatFilesize(this.job.metadata?.filesize ?? 0),
                exists: (this.job.metadata?.filesize ?? 0) > 0,
            },
            {
                name: this.$t('History.LastModified').toString(),
                value: this.formatDateTime((this.job.metadata?.modified ?? 0) * 1000),
                exists: (this.job.metadata?.modified ?? 0) > 0,
            },
            {
                name: this.$t('History.Status').toString(),
                value: this.$te(`History.StatusValues.${this.job.status}`, 'en')
                    ? this.$t(`History.StatusValues.${this.job.status}`).toString()
                    : this.job.status,
                exists: true,
            },
            {
                name: this.$t('History.StartTime').toString(),
                value: this.formatDateTime(this.job.start_time * 1000),
                exists: true,
            },
            {
                name: this.$t('History.EndTime').toString(),
                value: this.formatDateTime(this.job.end_time * 1000),
                exists: this.job.end_time > 0,
            },
            {
                name: this.$t('History.EstimatedTime').toString(),
                value: this.formatPrintTime(this.job.metadata?.estimated_time ?? 0),
                exists: this.job.metadata && 'estimated_time' in this.job.metadata,
            },
            {
                name: this.$t('History.PrintDuration').toString(),
                value: this.formatPrintTime(this.job.print_duration ?? 0),
                exists: this.job.print_duration > 0,
            },
            {
                name: this.$t('History.TotalDuration').toString(),
                value: this.formatPrintTime(this.job.total_duration ?? 0),
                exists: this.job.total_duration > 0,
            },
            {
                name: this.$t('History.EstimatedFilamentWeight').toString(),
                value: `${Math.round((this.job.metadata?.filament_weight_total ?? 0) * 100) / 100} g`,
                exists: this.job.metadata && 'filament_weight_total' in this.job.metadata,
            },
        ]

        return entries.filter((entry) => entry.exists)
    }

    closeDialog() {
        this.$emit('close-dialog')
    }
}
</script>

<style scoped>
::v-deep .os-content .row:first-child {
    margin-top: 1em !important;
}

::v-deep .os-content .row:last-child {
    margin-bottom: 1em !important;
}
</style>