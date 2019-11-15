<template>
  <v-card
    class="mx-auto"
    width="256"
    height="100%"
    tile
  >
    <v-navigation-drawer permanent >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/73047026_2238871522884408_8958214426880638976_o.jpg?_nc_cat=104&_nc_oc=AQkAG_8obq_dhUFqqfwVpR2IN5BAri_Re5VveMRWr32uErlBA9MCjXQi_Uz7-u8X084&_nc_ht=scontent-icn1-1.xx&oh=255d635d33bb51c2236d761cebf35170&oe=5E47FD28"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">cokia(한우영)</v-list-item-title>
            <v-list-item-subtitle>KDMHS WP19</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-container>
  <v-card
    class="mx-auto"
    max-width="1200"
    tile
    
  >
    


    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">내 등수보기</div>

        <v-list-item-title style="margin-top:1em;" class="headline mb-1">cokia/dimi-tranding-repo</v-list-item-title>
        <v-list-item-subtitle>"디미고의 핫한 레포들을 모아서 보여주는 프로젝트입니다. 뷰는 정말 어렵고 짜증나고 무지 귀찮군요. 으아아악 반응형 극혐 프론트엔드 개발자 존경합니다."</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>


  </v-card>
</v-container>
      <v-divider></v-divider>
      <v-list 
        nav
        dense
      >
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      item: 0,
      items: [
        { text: 'ALL'},
        { text: 'Python', icon: 'mdi-language-python' },
        { text: 'JavaScript', icon: 'mdi-language-javascript' },
        { text: 'C', icon: 'mdi-language-c' },
        { text: 'HTML5', icon: 'mdi-language-html5' },
        { text: 'JAVA', icon: 'mdi-language-java' },
        { text: 'ShellScript', icon: 'mdi-console-line' },
      ],
    }),
  }
</script>