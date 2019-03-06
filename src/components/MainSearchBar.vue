<template>
  <v-container
    fluid
    style="height: 55%; background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url('/assets/bridge.jpg')"
  >
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8 px-4 pt-4 pb-0 style="background: rgba(255,255,255,0.9);">
        <v-flex xs12 class="display-1">Search for Answers</v-flex>
        <v-flex
          xs12
          sm8
          class="body-2 font-weight-light"
          pa-1
        >Welcome to the EXAT Support Portal. Search for KM Notes, EXAT Knowledge Base Articles.</v-flex>
        <v-flex xs12 pt-3>
          <v-text-field solo placeholder="Enter keywords or KM Note">
            <v-btn color="info" slot="append" class="hidden-xs-only">Search</v-btn>
          </v-text-field>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
