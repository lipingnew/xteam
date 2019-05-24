<template>
  <div class="common-main">
     <div class='u-header'>
       <h4 class='u-headerL text-alignL'>
        <span @click='back'>上架管理</span>>货架详情
       </h4>
      <div class='u-nav'>
        <p class='u-nav-item' v-for='(item, key) in navgator' @click='clickItem(item)'>
          <span :class="currentNav == item.index ? 'u-nav-item-active' : ''">
            {{item.index}}
          </span>
        </p>
      </div>
     </div>
     <div class="u-main u-mains">
        <div class="u-content">
          <div class="u-contents-item">
            <div class="u-item-box u-items-box" v-for='(item, key) in currentItem' @mouseenter='moveItem(key)' @mouseleave='outItem'>
              <div v-if='activeIndex === key && item.prod == null'  class="u-dialog">
                <j-button @click="addProds(item.gid)" type="primary">添加</j-button>
              </div>
              <div class='u-item-title u-items-title'>{{item['barcode']}}</div>
              <div class='u-item-contents'>
                <span v-if='item.prod != null' class='u-del' @click='delProd(item.gid)'>x</span>
                <img v-if='item.prod != null' class='u-item-img' :src='item.prod.img_url'/>
              </div>
            </div>
            <div class='u-foot'>注：底层货架限重6.5kg</div>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
// <j-button @click="() =>  {$Modal.info({title: '提示', content: '确认保存吗？', okText: '确认'})}" class='text-alignR' type="primary">保存</j-button>
export default { 
  props: ['currentNav', 'navgator', 'currentItem'],
  data () {
    return {
      isShowEdit: false,
      mockData: [1,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,],
      activeIndex: -1
    }
  },
  created() {
    console.log(this.currentItem);
    console.log('=====');
    if (localStorage.getItem('isSign') != 'true') {
      this.$router.push('/sign');
    }
  },
  methods: {
    clickItem(currentItem) {
      console.log(currentItem);
      this.$emit('changeNavIndex', currentItem);
    },
    back() {
      this.$emit('back');
    },
    editItem() {

    },
    moveItem(key) {
      this.activeIndex = key;
    },
    outItem() {
      this.activeIndex = -1;
    },
    delProd(gid) {
      this.$Modal.error({title: '删除', content: '确定删除该商品吗？', onOk:()=>{
        this.$http
          .post("/api/sku/updaterelation", {
            gid: gid,
            barcode: ''
          })
          .then(res => {
            if (res.data.data === 1) {
              this.$Message.success('删除成功');
              this.$emit('delSuccess');
            }
          })
          .catch(err => { 
            console.log(err);
            this.$Message.error('服务器出错！');
          })
      }})
    },
    addProds(gid) {
      this.$emit('addProds', gid);
    }
  }
}
</script>
<style scope="scope">
  .u-mains {
    min-height: 800px!important;
    padding-bottom: 50px;
  }
  .u-contents-item {
    width: 1000px;
    flex: 1;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .u-items-box {
    width: 160px;
    height: 180px;
    margin-right: 8px;
    display: flex;
    display: -webkit-flex;
    border: 3px solid #fff;
    flex-direction: column;
  }
  .u-foot {
    width: 100%;
    color: #f00;
    text-align: left!important;
    padding-left: 70px;
    margin-top: 10px;
    font-size: 14px;
  }
  .u-nav {
    display: flex;
    display: -webkit-flex;
  }
  .u-nav-item {
    padding: 0 8px;
    font-size: 14px;
    font-weight: normal;
  }
  .u-nav-item span {
    border-bottom: 3px solid transparent;
    padding-bottom: 5px;
  }
  .u-nav-item-active {
    border-bottom: 3px solid #00f!important;
    color: #00f;
  }
  .u-del {
    position: absolute;
    right: 8px;
    top: 32px;
  }
  .u-item-contents {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;
  }
  .u-item-img {
    width: 80px;
    height: 80px;
  }
  .u-items-title {
    background: #c9c9c9;
    color: #000;
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .u-dialog {
    width: 160px;
    height: 180px;
    text-align: center;
    line-height: 180px;
    background: rgba(0,0,0, .5)!important;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .u-items-box {
    position: relative;
  }
  .u-nav {
    background: #fff!important;
    text-align: left;
    color: #000;
    font-weight: bold;
  }
  .jimu-menu-item-active {
    color: #000!important;
  }
</style>