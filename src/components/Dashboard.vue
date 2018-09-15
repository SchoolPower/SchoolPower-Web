<!--<template>
  <div class="dashboard">
    <div class="subject_list">
      <subject-item v-for="subject in subjects" v-bind:subject="subject" :key="subject.name">
      </subject-item>
    </div>
  </div>
</template>
-->
<template>
  <v-app id="schoolpower">
    <v-navigation-drawer
      :mini-variant.sync="mini_drawer"
      mini-variant-width="60"
      v-model="drawer"
      fixed floating permanent clipped
      class="blue lighten-1" app>

      <v-toolbar flat class="transparent">
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.stop="mini_drawer = !mini_drawer">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="mt-2">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!--
    <v-toolbar color="amber" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">SchoolPower</span>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    -->

    <v-content>
      <v-container fluid fill-height class="pa-0">
        <v-layout>
          <v-flex v-bind:xs6="!$vuetify.breakpoint.xsOnly"
                  v-bind:class="{ hidden: selectedSubject && $vuetify.breakpoint.xsOnly,
                  'pa-3': $vuetify.breakpoint.xsOnly, 'pa-5': $vuetify.breakpoint.smAndUp}"
                  class="grey lighten-4">
            <h1 class="pa-3">Dashboard</h1>
            <div class="subject_list mt-3">
              <v-list two-line class="grey lighten-4">
                <subject-item v-for="subject in subjects"
                              v-bind:subject="subject" :key="subject.name"
                              @subject-click="selectedSubject = subject">
                </subject-item>
              </v-list>
            </div>
          </v-flex>

          <v-flex v-bind:xs6="!$vuetify.breakpoint.xsOnly" class="elevation-20 white"
                  v-bind:class="{ hidden: !selectedSubject && $vuetify.breakpoint.xsOnly,
                  'pa-3': $vuetify.breakpoint.xsOnly, 'pa-5': $vuetify.breakpoint.smAndUp}">
            <course-details v-if="selectedSubject"
                            v-bind:subject="selectedSubject"
                            @close-click="selectedSubject = null"></course-details>
            <div v-else>
              <h2>Select a course to view its details</h2>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SubjectItem from './SubjectItem';
import CourseDetails from './CourseDetails';

export default {
  name: 'Dashboard',
  components: { CourseDetails, SubjectItem },
  data() {
    return {
      information: [],
      subjects: [],
      attendances: [],
      additional: [],
      drawer: true,
      mini_drawer: true,
      selectedSubject: null,
    };
  },
  created() {
    const username = this.$cookie.get('username');
    const password = this.$cookie.get('password');
    if (!username || !password) this.$router.replace({ path: 'login' });
    fetch('http://127.0.0.1:8080/static/test.json')
      .then(response => response.json())
      .then((json) => {
        this.information = json.information;
        this.subjects = json.sections;
        this.attendances = json.attendances;
        this.additional = json.additional;
      });
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .hidden {
    display: none;
  }

</style>

<style>
  .v-navigation-drawer--mini-variant .v-list__tile {
    padding-left: 6px;
  }
</style>
