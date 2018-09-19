<template>
  <v-app id="schoolpower">
    <NavigationDrawer v-bind:information="studentInfo.information"
                      v-bind:additional="studentInfo.additional"/>
    <router-view/>
  </v-app>
</template>

<script>
import NavigationDrawer from './NavigationDrawer';
import store from '../store';
import version from '../version';

export default {
  name: 'Main',
  components: { NavigationDrawer },
  data() {
    return {
      studentInfo: store.studentInfo,
    };
  },
  created() {
    const username = this.$cookie.get('username');
    const password = this.$cookie.get('password');
    if (!username || !password) this.$router.replace({ path: 'login' });
    else this.updateGradeFromServer(username, password);
  },
  methods: {
    updateGradeFromServer(username, password) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('os', 'web');
      formData.append('version', version.Version);
      formData.append('action', 'manual_get_data');
      fetch('https://api.schoolpower.tech/api/2.0/get_data.php',
        {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then((json) => {
          if (json.err === '100' || json.err === '200') {
            this.$cookie.delete('username');
            this.$cookie.delete('password');
            this.$router.replace({ path: 'login' });
            return;
          } else if (json.err) {
            return;
          }
          const newSubjects = json.sections;
          if (this.studentInfo.subjects) {
            newSubjects.forEach((subject, index) => {
              this.markNewAssignments(subject,
                this.studentInfo.subjects.find(element => element.name === subject.name));
              newSubjects[index] = subject;
            });
          }
          this.studentInfo.subjects = newSubjects;
          this.studentInfo.information = json.information;
          this.studentInfo.attendances = json.attendances;
          this.studentInfo.additional = json.additional;
          if (!this.studentInfo.additional) this.additional = {};
          localStorage.information = JSON.stringify(this.studentInfo.information);
          localStorage.subjects = JSON.stringify(this.studentInfo.subjects);
          localStorage.attendances = JSON.stringify(this.studentInfo.attendances);
          localStorage.additional = JSON.stringify(this.studentInfo.additional);
        });
    },
    markNewAssignments(subject, subjectOld) {
      // Mark new or changed assignments
      const newAssignments = subject.assignments;
      const oldAssignments = subjectOld.assignments;
      if (!newAssignments) return;
      newAssignments.forEach((item, index) => {
        // if no item in oldAssignments has the same title, score and date as those of the new one,
        // then the assignment should be marked.
        let found = false;
        if (oldAssignments) {
          oldAssignments.forEach((it) => {
            if (it.title === item.title && it.score === item.score && it.date === item.date) {
              found = true;
            }
          });
        }

        newAssignments[index].isUpdated = !found;
        // eslint-disable-next-line no-param-reassign
        if (!found) subject.isUpdated = true;
        // TODO: margin
      });
    },
  },
};
</script>

<style scoped>

</style>
