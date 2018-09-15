<template>
  <div>
    <v-layout fill-height>
      <v-flex xs1 class="hidden-sm-and-up">
        <v-btn flat icon class="d-inline" @click="$emit('close-click')">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex class="mt-2 ml-5">
        <h2>Assignments - {{subject.name}}</h2>
      </v-flex>
    </v-layout>
    <div class="assignments_list mt-3">
      <v-list two-line>
        <assignment-item v-for="assignment in subject.assignments"
                         v-bind:assignment="assignment" :key="assignment.name">
        </assignment-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import AssignmentItem from './AssignmentItem';

export default {
  components: { AssignmentItem },
  name: 'CourseDetails',
  props: ['subject'],
};
</script>

<style scoped>

</style>
