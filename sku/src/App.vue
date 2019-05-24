<template>
  <j-layout id='app' class="layout-demo">
      <j-header style="height: 64px; backgroundColor: #000; color: #fff;margin-bottom: 2px;">
          <j-row  v-if="isSign == 'true'">
              <j-col style="width: 50%; textAlign: left; paddingLeft: 16px;" class='sku-common-H'>
                  <div class="layout-demo-logo">
                      百度AIR智慧零售店后台商品管理系统
                  </div>
              </j-col>
              <j-col style="width: 50%; textAlign: right; paddingRight: 16px;" class='sku-common-H'>
                  {{username}}
              </j-col>
          </j-row>
      </j-header>
      <j-layout v-if="isSign == 'true'">
          <j-sider :style="{height: 'auto', background: '#ccc', marginBottom: '-900px', paddingBottom: '900px'}">
              <j-menu showCollapseButton :activeName="activeName" :openNames="['1', '2']">
                  <j-menu-item name="1-1" to='warehousing' icon="yingyonggaikuang">
                      入库管理
                  </j-menu-item>
                  <j-menu-item name="1-2" to='uppershelf' icon="yonghufenxi">
                      上架管理
                  </j-menu-item>
              </j-menu>
          </j-sider>
          <transition>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
      </j-layout>
      <j-layout v-if="isSign != 'true'">
        <transition v-else-if=''>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </j-layout>
  </j-layout>
</template>

<script>
  export default {
    name: 'App',
    watch: {
      $route() {
        this.activeName = this.$route.path === '/warehousing' ? '1-1' : '1-2';
      }
    },
    data(){
      return {
        username: localStorage.getItem('username'),
        activeName: this.$route.path === '/warehousing' ? '1-1' : '1-2'
      }
    },
    created() {
    }
  }
</script>
<style>
  html, body, #app {
    padding: 0px;
    margin: 0px;
    height: auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  ul, li { 
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .sku-common-H {
    line-height: 64px;
  }
  .jimu-menu-wrap, .jimu-menu, .jimu-menu-wrap-collap-btn, .jimu-menu-item {
    background: #ccc!important;
    border-color: #ccc!important;
  }
  .jimu-layout {
    overflow: hidden;
  }
  /*公共样式*/
  .text-alignL {
    text-align: left;
  }
  .common-main {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    flex: 1;
    padding-left: 8px;
    border-bottom: 1px solid #ccc;
  }
  .common-title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    border-bottom: 3px solid #f2f2f2;
  }
  .text-alignR {
    float: right;
  }
</style>
