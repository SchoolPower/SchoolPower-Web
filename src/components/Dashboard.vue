<template>
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
              <subject-item v-for="subject in studentInfo.subjects"
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
</template>

<script>
import SubjectItem from './SubjectItem';
import CourseDetails from './CourseDetails';
import store from '../store';

export default {
  name: 'Dashboard',
  components: { CourseDetails, SubjectItem },
  data() {
    return {
      studentInfo: store.studentInfo,
      selectedSubject: null,
    };
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

</style>
