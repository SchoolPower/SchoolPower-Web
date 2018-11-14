<template>
<div>
  <v-list-tile :key="subject.name" avatar @click="$emit('subject-click')">
    <v-list-tile-content v-bind:class="{'new-item': subject.isUpdated}">
      <v-list-tile-title v-html="subject.name"></v-list-tile-title>
      <v-list-tile-sub-title
        v-html="subject.expression+ ' ' +
        subject.teacher.firstName + ' ' + subject.teacher.lastName">
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-chip v-if="subject.finalGrades && subject.finalGrades[latestTerm]"
            v-bind:color="gradeLetterToColor(subject.finalGrades[latestTerm].letter)"
            text-color="white" class="elevation-3 align-end justify-center">
    <v-avatar class="darken-4">{{subject.finalGrades[latestTerm].letter}}</v-avatar>
    {{subject.finalGrades[latestTerm].percent}}
  </v-chip>
  </v-list-tile>
  <v-divider></v-divider>
</div>
</template>

<script>
export default {
  name: 'SubjectItem',
  props: ['subject'],
  computed: {
    latestTerm() {
      const fg = this.subject.finalGrades;
      const termList = ['T4', 'T3', 'T2', 'T1', 'Q4', 'Q3', 'Q2', 'Q1', 'Y1'];
      return termList.find(it => fg[it] && fg[it].letter !== '--');
    },
  },
  methods: {
    gradeLetterToColor(letter) {
      return {
        A: '#00796B',
        B: '#388E3C',
        'C+': '#ffb300',
        C: '#FF5722',
        'C-': '#D32F2F',
        F: '#07263b',
        I: '#09314b',
        '--': '#09314b',
      }[letter];
    },
  },
};
</script>

<style>
  .new-item {
    font-weight: bold;
  }
</style>
