<template>
    <v-content>
      <v-container fluid fill-height class="pa-0">
        <v-layout>

          <v-dialog v-model="showGPADialog" scrollable max-width="300px">
            <v-card>
              <v-card-title>选择课程</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px;">
                <v-checkbox v-for="subject in studentInfo.subjects"
                              :value="subject.name"
                              :key="subject.name" :label="subject.name"
                              v-model="settings.gpaSubjects"></v-checkbox>
                <v-text-field
                  label="额外科目分数 (逗号隔开)"
                  v-model="additionalGPAGradesText"
                ></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" flat
                       @click.native="hideGPADialog(false)">Close</v-btn>
                <v-btn color="blue darken-1" flat
                       @click.native="hideGPADialog(true)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-flex v-bind:class="{'pa-3': $vuetify.breakpoint.xsOnly,
            'pa-5': $vuetify.breakpoint.smAndUp}"
                  class="grey lighten-4">
            <h1 class="pa-3">Settings</h1>

              <v-list two-line subheader>
                <v-subheader>GPA</v-subheader>

                <v-list-tile avatar @click="showGPADialog = true">
                  <v-list-tile-content>
                    <v-list-tile-title>GPA 计算规则</v-list-tile-title>
                    <v-list-tile-sub-title>选择计算哪些课程的分数。
                      <span v-if="gpaSubjectCount !== 0">目前已选择 {{gpaSubjectCount}} 门科目。</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import store from '../store';

export default {
  name: 'Settings',
  data() {
    return {
      studentInfo: store.studentInfo,
      settings: store.settings,
      showGPADialog: false,
      additionalGPAGradesText: store.settings.additionalGPAGrades.join(','),
    };
  },
  computed: {
    gpaSubjectCount() {
      return (this.settings.gpaSubjects ? this.settings.gpaSubjects.length : 0)
         + (this.settings.additionalGPAGrades ? this.settings.additionalGPAGrades.length : 0);
    },
  },
  methods: {
    hideGPADialog(save) {
      this.showGPADialog = false;
      if (save) {
        this.settings.additionalGPAGrades = this.additionalGPAGradesText === '' ? [] : this.additionalGPAGradesText.split(',').map(Number);
        localStorage.gpaSubjects = JSON.stringify(this.settings.gpaSubjects);
        localStorage.additionalGPAGrades = JSON.stringify(this.settings.additionalGPAGrades);
      }
    },
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
