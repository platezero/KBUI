<template>
  <v-layout
    align-center
    justify-end
    row
    wrap
    order-xs1
    style="width:75%; float:left; background-color:white; padding-left:70px; padding-right:70px; padding-top:15px"
  >
    <v-flex xs12 sm6 v-for="i in 6" :key="`6${i}`">
      <v-layout align-center row wrap fill-height>
        <v-flex xs1>
          <v-icon>home</v-icon>
        </v-flex>
        <v-flex xs11 style="padding-left: 20px">
          <div class="subheading">Lorem Ipsum</div>
          <div
            class="body-2 font-weight-light"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
