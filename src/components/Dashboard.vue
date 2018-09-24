<template>
  <v-content>
    <v-container fluid fill-height class="pa-0">
      <v-layout class="fill-height" style="height: 100vh; min-height:100vh;">
        <v-flex v-bind:xs6="!$vuetify.breakpoint.xsOnly"
                v-bind:class="{ hidden: selectedSubject && $vuetify.breakpoint.xsOnly}"
                class="grey lighten-4 outer">
          <div class="middle">
            <div v-bind:class="{ 'pa-3': $vuetify.breakpoint.xsOnly,
                                 'pa-5': $vuetify.breakpoint.smAndUp }"
                 class="inner">
              <h1 class="pa-3">Dashboard</h1>
              <v-layout justify-space-between row>
                <v-flex xs12 lg5>
                  <v-card>
                    <v-layout row>
                      <v-flex xs6>
                        <v-card-title primary-title>
                          <h3 class="headline mb-2" style="font-size:2em">GPA</h3>
                          <v-select :items="terms" label="Term" v-model="selectedTerm"></v-select>
                        </v-card-title>
                      </v-flex>
                      <v-flex xs6 class="pt-3 pr-3">
                        <div class="right">
                          <v-progress-circular :rotate="360" :size="100" :width="15"
                                               :value="parseFloat(gpa)" color="teal"
                          >{{gpa}}
                          </v-progress-circular>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-flex xs12 lg6 v-if="versionStore.lastShownVersion !== version">
                  <v-card class="pa-1">
                    <v-card-title primary-title>
                      <h3 class="headline" style="font-size:2em">更新记录</h3>
                    </v-card-title>
                    <div class="pl-3 pb-3">
                      <p>目前版本: {{version}}</p>
                      <p>注意 SchoolPower Web 版仍处于 Beta 阶段，
                        若遇到 bug 请通过邮件<a href="mailto: harryyunull@gmail.com">反馈给我们</a>。</p>
                      <ul v-for="item in updates" v-bind:key="item">
                        <li>{{item}}</li>
                      </ul>
                    </div>

                    <v-card-actions>
                      <v-btn flat color="orange"
                             @click="dismissUpdate()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
              <div class="subject_list mt-3">
                <v-list two-line class="grey lighten-4">
                  <subject-item v-for="subject in studentInfo.subjects"
                                v-bind:subject="subject" :key="subject.name"
                                @subject-click="selectedSubject = subject">
                  </subject-item>
                </v-list>
              </div>
            </div>
          </div>

        </v-flex>

        <v-flex v-bind:xs6="!$vuetify.breakpoint.xsOnly" class="grey lighten-4 scroll_area pl-4"
                v-bind:class="{ hidden: !selectedSubject && $vuetify.breakpoint.xsOnly }">
          <div class="white elevation-15"
               v-bind:class="{'pa-3': $vuetify.breakpoint.xsOnly,
                              'pa-5': $vuetify.breakpoint.smAndUp}"
               style="min-height: 100%">
            <course-details v-if="selectedSubject"
                            v-bind:subject="selectedSubject"
                            @close-click="selectedSubject = null"></course-details>
            <div v-else>
              <h2>Select a course to view its details</h2>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import SubjectItem from './SubjectItem';
import CourseDetails from './CourseDetails';
import store from '../store';
import version from '../version';

export default {
  name: 'Dashboard',
  components: { CourseDetails, SubjectItem },
  data() {
    return {
      studentInfo: store.studentInfo,
      selectedSubject: null,
      selectedTerm: 'T1',
      version: version.Version,
      updates: version.Updates,
      versionStore: version.store,
    };
  },
  computed: {
    gpa() {
      if (!this.studentInfo.subjects) return 'N/A';
      let sum = 0;
      let num = 0;
      this.studentInfo.subjects.forEach((subject) => {
        if (!subject.finalGrades || !subject.finalGrades[this.selectedTerm] || subject.finalGrades[this.selectedTerm] === '') return;
        if (subject.name.includes('Homeroom')) return;
        sum += parseFloat(subject.finalGrades[this.selectedTerm].percent);
        num += 1;
      });
      return (sum / num).toFixed(2);
    },
    terms() {
      if (!this.studentInfo.subjects) return [];
      const ret = [];
      this.studentInfo.subjects.forEach((subject) => {
        if (!subject.finalGrades) return;
        Object.keys(subject.finalGrades).forEach((key) => {
          if (!ret.includes(key)) ret.push(key);
        });
      });
      return ret;
    },
  },
  methods: {
    dismissUpdate() {
      this.versionStore.lastShownVersion = version.Version;
      localStorage.lastShownVersion = version.Version;
    },
  },
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

  .scroll_area {
    height: 100%;
    overflow: auto;
  }

  .outer{
    flex: 1;
    display: flex;
    height: 100%;
    align-items: stretch;
  }

  .middle {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    margin-left: -17px;
  }

  .inner{
    position: relative;
    overflow-y: auto;
    flex-grow: 1;
    right: -17px;
  }
</style>

<style>
  html, body {
    overflow: hidden;
  }
</style>
