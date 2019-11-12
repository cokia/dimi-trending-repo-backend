<template>
  <div id="app" style="background-color: #f0f2f5;">
    <vue-ads-layout :full-bar="true">

      <vue-ads-bar slot="toolbar" :fixed="true" class="bg-pink-200	" tyle="maring-left:3rem;">
        <div style="display: flex;">
        <vue-ads-hide-button
        style="margin-left: 1rem;margin-right: 1rem;"
        slot="first"
        :hidden="hiddenLeft"
        @clicked="hideLeft"
      />
        <v-img
          max-height="50"
          max-width="50"
          src="https://avatars0.githubusercontent.com/u/36081664?s=200&v=4"
        ></v-img>
        <p style="font-size:160%;margin-top:0.3rem;margin-left:1rem;color:#e64980;" class="font-bold">DIMI-Tranding-Repo</p>
        <!--<p> 19WP 한우영님 환영합니다</p>-->
      </div>
        
      </vue-ads-bar>
      <!-- <vue-ads-bar slot="footer" :fixed="true" :footer="true" class="bg-white" /> -->
      <vue-ads-drawer
        slot="left-drawer"
        :fixed="true"
        :minified="minifiedLeft"
        :hidden="hiddenLeft"
        class="bg-pink-300"
        @hide="hideLeft"
      >
        <div slot="top" style="margin: 3em; font-size: 1.25em">
          <v-btn rounded="true" style="margin-top: 2rem;">ALL</v-btn>
          <br />
          <v-btn rounded="true" style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'js-square']" size="x" />Javascript
          </v-btn>
          <br />
          <v-btn rounded="true" style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'python']" size="x" />Python
          </v-btn>
          <br />
          <v-btn rounded="true" style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'cuttlefish']" size="x" />C
          </v-btn>
          <br />
          <v-btn rounded="true" style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'java']" size="x" />JAVA
          </v-btn>
          <br />
          <v-btn rounded="true" style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'swift']" size="x" />SWIFT
          </v-btn>
          <br />
          <v-btn rounded="true" style="margin-top: 2rem;">
            <font-awesome-icon :icon="['fab', 'html5']" size="x" />HTML
          </v-btn>
          <br />
        </div>
      </vue-ads-drawer>
      <vue-ads-drawer
        style="display:flex;"
        v-if="!isPhone"
        slot="right-drawer"
        :fixed="true"
        :right="true"
        class="bg-pink-200"
      >
        <mycard></mycard> 
      </vue-ads-drawer>
      <maincard style="margin-left:1.5em;margin-right:1.5em;margin-top:1.5em;"></maincard>
      <br />
<maincard style="margin-left:1.5em;margin-right:1.5em;"></maincard><br />
      <maincard style="margin-left:1.5em;margin-right:1.5em;"></maincard>
      <br />
      <maincard style="margin-left:1.5em;margin-right:1.5em;"></maincard>
      <br />
    </vue-ads-layout>
  </div>
</template>

<script>
import VueAdsLayout from "./components/Layout";
import VueAdsBar from "./components/Bar";
import VueAdsDrawer from "./components/Drawer";
import VueAdsHideButton from "./components/buttons/Hide";
import maincard from "./components/maincard";
import mycard from "./components/mycard"

export default {
  name: "App",

  components: {
    VueAdsHideButton,
    VueAdsDrawer,
    VueAdsBar,
    VueAdsLayout,
    maincard,
    mycard
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
