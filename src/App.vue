<template>
  <div id="app" style="background-color: #f0f2f5;">
    <vue-ads-layout :full-bar="true">
      <vue-ads-bar slot="toolbar" :fixed="true" class="bg-red-600">
      
        <vue-ads-hide-button slot="first" :hidden="hiddenLeft" @clicked="hideLeft" />
      </vue-ads-bar>
      <vue-ads-bar slot="footer" :fixed="true" :footer="true" class="bg-green-600" />
      <vue-ads-drawer
        slot="left-drawer"
        :fixed="true"
        :minified="minifiedLeft"
        :hidden="hiddenLeft"
        class="bg-yellow-500"
        @hide="hideLeft"
      >
        <div slot="top" style="margin: 3em; font-size: 1.25em">
          <v-btn style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'js-square']" size="x" />Javascript
          </v-btn>
          <br />
          <v-btn style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'python']" size="x" />Python
          </v-btn>
          <br />
          <v-btn style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'cuttlefish']" size="x" />C
          </v-btn>
          <br />
          <v-btn style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'java']" size="x" />JAVA
          </v-btn>
          <br />
          <v-btn style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'swift']" size="x" />SWIFT
          </v-btn>
          <br />
        </div>
      </vue-ads-drawer>
      <vue-ads-drawer
        v-if="!isPhone"
        slot="right-drawer"
        :fixed="true"
        :right="true"
        class="bg-blue-600"
      >
        <div slot="top">new</div>
      </vue-ads-drawer>
        <maincard></maincard>
        <br />
         <maincard></maincard>
         <br />
          <maincard></maincard>
          <br />
           <maincard></maincard>
           <br />
    </vue-ads-layout>
  </div>
</template>

<script>
import VueAdsLayout from "./components/Layout";
import VueAdsBar from "./components/Bar";
import VueAdsDrawer from "./components/Drawer";
import VueAdsHideButton from "./components/buttons/Hide";
import maincard from './components/maincard';


export default {
  name: "App",

  components: {
    VueAdsHideButton,
    VueAdsDrawer,
    VueAdsBar,
    VueAdsLayout,
    maincard
  },

  data() {
    return {
      minifiedLeft: null,
      minifiedRight: false,
      hiddenLeft: null,
      hiddenRight: false,
      isPhone: window.innerWidth <= 600
    };
  },
  methods: {
    minifyLeft(minified) {
      this.minifiedLeft = minified;
    },

    hideLeft(hidden) {
      this.hiddenLeft = hidden;
    },

    minifyRight(minified) {
      this.minifiedRight = minified;
    },

    hideRight(hidden) {
      this.hiddenRight = hidden;
    }
  }
};
</script>
