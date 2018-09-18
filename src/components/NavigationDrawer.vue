<template>
  <v-navigation-drawer
    :mini-variant.sync="mini_drawer"
    mini-variant-width="60"
    v-model="drawer"
    fixed floating permanent clipped
    class="blue lighten-1" app>

    <v-toolbar flat class="transparent">
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <img v-bind:src="getAvatar()">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              {{information.lastName}}, {{information.firstName}}
            </v-list-tile-title>
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
      <v-list-tile @click="$router.push('/dashboard')">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="$router.push('/attendance')">
        <v-list-tile-action>
          <v-icon>beenhere</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Attendance</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="$router.push('/settings')">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: ['information', 'additional'],
  data() {
    return {
      drawer: true,
      mini_drawer: true,
    };
  },
  methods: {
    getAvatar() {
      if (this.additional && this.additional.avatar) return this.additional.avatar;
      return '/static/icon.png';
    },
  },
};
</script>

<style scoped>

</style>

<style>
  .v-navigation-drawer--mini-variant .v-list__tile {
    padding-left: 6px;
  }
</style>
