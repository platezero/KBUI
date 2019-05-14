<template >
  <v-app style="background-color:rgba(0, 0, 0, 0.0);">
    <router-view :key="$route.fullPath"></router-view>
  </v-app>
</template>