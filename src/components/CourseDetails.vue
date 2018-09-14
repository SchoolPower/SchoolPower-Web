<template>
<div>
  <h2>Assignments - {{subject.name}}</h2>
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
