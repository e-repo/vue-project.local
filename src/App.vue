<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          :to="link.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Vue project</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(link, index) in links"
          :key="index"
          :to="link.url"
          text
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- If using vue-router -->
      <router-view></router-view>

    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => {
    return {
      drawer: false,
      links: [
        {title: 'Login', icon: 'mdi-lock', url: '/login'},
        {title: 'Registration', icon: 'mdi-face', url: '/registration'},
        {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders'},
        {title: 'New ad', icon: 'mdi-note-plus', url: '/new'},
        {title: 'My ads', icon: 'mdi-format-list-bulleted-square', url: '/list'},
      ]
    }
  },
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
