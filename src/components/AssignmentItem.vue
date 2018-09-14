<template>

  <div>
    <v-list-tile :key="assignment.name" avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="assignment.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="assignment.description"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-chip v-if="assignment.percent"
              v-bind:color="gradeLetterToColor(assignment.letterGrade)"
              text-color="white" class="elevation-5 align-end justify-center">
        <v-avatar class="darken-4">{{assignment.letterGrade}}</v-avatar>
        {{assignment.percent}}
      </v-chip>
    </v-list-tile>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'AssignmentItem',
  props: ['assignment'],
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

<style scoped>

</style>
