<template>
  <j-modal v-if='listData != null' class="u-form" :width="600" title="添加商品" v-model="dialogShow" @on-cancel='oncancel' >
    <j-input style="margin: 10px 0;" size="small"  v-model='prodName' @on-change="searchName" placeholder='请输入商品名称或拼音'/>
    <div class='u-list'>
      <j-radio-group>
          <j-radio  v-for="(item, key) in listData" :label="key" :key='key' class='u-list-main'>
            <div class='u-bigbox' @click='getcode(item.barcode)'>
              <img class='u-list-img' :src='item.img_url'/>
              <div class='u-list-desc'>
                <p class='u-list-desc-one' :title='item.name'>{{item.name}}</p>
                <j-popover  v-if='item.lanes.length !== 0' style='width: 480px;' ref="pop" maxWidth="800" placement="top" trigger='hover'>
                  <div slot="content"><span v-for='items in item.lanes'>{{items.rack_id}}-{{items.row_no}}-{{items.column_no}},  </span></div>
                  <p><span>位置：</span><span v-for='items in item.lanes'>{{items.rack_id}}-{{items.row_no}}-{{items.column_no}}  </span></p>
                </j-popover>
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
          this.$Message.error('获取数据失败');
        })
    },
    searchName() {
      this.getDataList();
    },
    getcode(val) {
      this.barcode = val;
    },
    async onok() {
      this.dialogShow = false;
      this.$emit('cancelDialog', this.barcode);
      document.body.style='overflow-y: scroll;'
    },
    oncancel() {
      this.dialogShow = false;
      this.$emit('cancelDialog', 0);
      document.body.style='overflow-y: scroll;'
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
    overflow-x: hidden!important;
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
    height: 80px;
    display: flex!important;
    display: -webkit-flex!important;
    margin-top: 20px;
    position: relative;
  }
  .u-list-img {
    width: 80px;
    height: 80px;
    margin-right: 8px;
  }
  .u-list-main .jimu-radio-label {
    width: 100%!important;
    position: absolute;
    left: -50px;
    top: 0;
    padding-left: 40px;
  }
  .u-list-main .jimu-radio-label .u-bigbox {
    height: 80px!important;
    display: flex;
    display: -webkit-flex;
    left: 0;
    top: 0;
    padding-left: 40px;
  }
  .u-list-main .jimu-radio-icon { 
    margin-top: 40px;
    margin-right: 8px;
  }
  .u-list-desc {
    width: 380px;
  }
  .u-list-desc p {
    margin-top: 8px!important;
    margin-bottom: 0px!important;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
  }
  .u-list-desc-one {
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px!important;
  }
  .jimu-radio-icon {
    display:block!important;
    padding: 3px!important;
  }
  @media screen and (max-width: 1600px) {
    .u-list {
      height: 450px!important;
    }
  }
</style>
