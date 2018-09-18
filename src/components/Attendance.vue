<template>
    <v-content>
      <v-container fluid fill-height class="pa-0">
        <v-layout>
          <v-flex v-bind:class="{'pa-3': $vuetify.breakpoint.xsOnly,
            'pa-5': $vuetify.breakpoint.smAndUp}"
                  class="grey lighten-4">
            <h1 class="pa-3">Attendance</h1>

            <div class="attendance_list mt-3">
              <v-list two-line class="grey lighten-4">
                <attendance-item v-for="attendance in studentInfo.attendances"
                              v-bind:attendance="attendance" :key="attendance.name">
                </attendance-item>
              </v-list>
            </div>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import AttendanceItem from './AttendanceItem';
import store from '../store';

export default {
  name: 'Dashboard',
  components: { AttendanceItem },
  data() {
    return {
      studentInfo: store.studentInfo,
    };
  },
};
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

<style>
  .v-navigation-drawer--mini-variant .v-list__tile {
    padding-left: 6px;
  }
</style>
