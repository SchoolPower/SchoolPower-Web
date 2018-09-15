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
    <v-chip v-if="subject.finalGrades && subject.finalGrades['T1']"
            v-bind:color="gradeLetterToColor(subject.finalGrades['T1'].letter)"
            text-color="white" class="elevation-3 align-end justify-center">
    <v-avatar class="darken-4">{{subject.finalGrades['T1'].letter}}</v-avatar>
    {{subject.finalGrades["T1"].percent}}
  </v-chip>
  </v-list-tile>
  <v-divider></v-divider>
</div>
</template>

<script>
export default {
  name: 'SubjectItem',
  props: ['subject'],
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
