<template>

  <div>
    <v-list-tile :key="attendance.name">
      <v-chip v-bind:color="attendanceCodeToColor(attendance.code)"
              text-color="white" class="elevation-3 align-center justify-center mr-3"
              style="width: 2.5em;">
        <span>{{attendance.code}}</span>
      </v-chip>
      <v-list-tile-content v-bind:class="{'new-item': attendance.isUpdated}">
        <v-list-tile-title
          v-html="attendance.description + ': ' + attendance.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="toReadableDate(attendance.date)"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
  </div>
</template>

<script>
import colors from '../colors';

export default {
  name: 'AttendanceItem',
  props: ['attendance'],
  methods: {
    attendanceCodeToColor(code) {
      return {
        A: colors.colors.primary_dark,
        E: colors.colors.A_score_green_dark,
        L: colors.colors.Cp_score_yellow,
        R: colors.colors.Cp_score_yellow_dark,
        H: colors.colors.C_score_orange_dark,
        T: colors.colors.C_score_orange,
        S: colors.colors.primary,
        I: colors.colors.Cm_score_red,
        X: colors.colors.A_score_green,
        M: colors.colors.Cm_score_red_dark,
        C: colors.colors.B_score_green_dark,
        D: colors.colors.B_score_green,
        P: colors.colors.A_score_green,
        NR: colors.colors.C_score_orange,
        TW: colors.colors.primary,
        RA: colors.colors.Cp_score_yellow_darker,
        NE: colors.colors.Cp_score_yellow_light,
        U: colors.colors.Cp_score_yellow_lighter,
        RS: colors.colors.primary_light,
        ISS: colors.colors.primary,
        FT: colors.colors.B_score_green_dark,
      }[code];
    },
    toReadableDate(date) {
      return new Date(Date.parse(date)).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.new-item {
  font-weight: bold;
}
</style>
