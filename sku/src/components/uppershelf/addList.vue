<template>
  <j-modal v-if='listData != null' class="u-form" :width="600" title="添加商品" v-model="dialogShow" @on-cancel='oncancel' >
    <j-input style="margin: 10px 0;" size="small"  v-model='prodName' @on-change="searchName" placeholder='请输入商品名称或拼音'/>
    <div class='u-list'>
      <j-radio-group>
          <j-radio class='u-list-main' v-for="(item, key) in listData" :label="key" :key='key' @click='getcode(item.barcode)'>
            <div class='u-bigbox' @click='getcode(item.barcode)'>
              <img class='u-list-img' :src='item.img_url'/>
              <div class='u-list-desc'>
                <p>{{item.name}}</p>
                <p>{{item.grade}}</p>
              </div>
            </div>
          </j-radio>
      </j-radio-group>
    </div>
    <div class="u-dialog-footer">
        <j-button class="u-dialog-footer-r" @click="oncancel" to='' size='small'>取消</j-button>
        <j-button @click="onok" to='' type="primary" size='small'>确定</j-button>
    </div>
    <div slot="footer"></div>
  </j-modal>
</template>
<script>
import Vue from 'vue';

export default {
  data () {
    return {
      dialogShow: false,
      prodName: '',
      currentPage: 0,
      listData: null,
      barcode: ''
    }
  },
  created() {
    this.dialogShow = true;
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$http
        .post("/api/sku/getdata", {
          pn: this.currentPage,
          rn: Vue.prototype.$total,
          prod_name: this.prodName
        })
        .then(res => {
          this.listData = res.data.data.prods;
        })
        .catch(err => { 
          this.$Message.error('服务器出错！');
        })
    },
    searchName() {
      this.getDataList();
    },
    getcode(val) {
      this.barcode = val;
      console.log('=====');
      console.log(val);
      console.log('=====');
    },
    async onok() {
      this.dialogShow = false;
      this.$emit('cancelDialog', this.barcode);
    },
    oncancel() {
      this.dialogShow = false;
      this.$emit('cancelDialog', 0);
    }
  }
}
</script>
<style scope="scope">
  .u-form .jimu-modal-content {
    padding-left: 30px;
    overflow: hidden!important;
  }
  .u-list {
    width: 100%;
    height: 600px;
    margin-bottom: 20px;
    overflow-y: scroll!important;
  }
  .u-dialog-footer-r {
    margin-right: 10px;
  }
  .u-dialog-footer {
    text-align: right;
    margin-top: 10px;
    position: absolute;
    bottom: 20px;
    right: 50px;
  }
  .u-list-main {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    margin-top: 20px;
  }
  .u-list-img {
    width: 80px;
    height: 80px;
    margin-right: 8px;
  }
  .u-list-main .jimu-radio-label .u-bigbox {
    height: 80px!important;
    display: flex;
    display: -webkit-flex;
  }
  .u-list-main .jimu-radio-icon { 
    margin-top: 40px;
    margin-right: 8px;
  }
  .u-list-desc p:first-child {
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px!important;
  }
  .u-list-desc p {
    margin-top: 8px!important;
    margin-bottom: 0px!important;
  }
</style>
