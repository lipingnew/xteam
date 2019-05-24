<template>
  <div class='u-warp'>
    <div class="common-main" v-if='isDetail'>
      <div class='u-header'>
        <h4 class='u-headerL text-alignL'>
          上架管理
        </h4>
        <h5 class="u-desc text-alignL">均为<span>面向货架</span>视角，点击货架可进行编辑</h5>
      </div>
      <div class="u-main">
          <div class="u-content">
            <div class="u-content-item">
              <div class="u-item-box" @mouseover="showEdit(key)" @mouseleave='hideEdit()' v-for='(item, key) in prodArr' v-if='key <= 4' :key='key'>
                <div class='u-item-title'>后侧货架{{key}}</div>
                <div class='u-item-content'>
                  <div class='u-content-box' v-for='(items, keys) in  item' :key='keys'>
                    <img v-if='items.prod != null' :src='items.prod.img_url'/>
                  </div>
                </div>
                <div class='u-item-footer'></div>
                <div :class='currentIndex === key ? "u-item-btn u-btn-active" : "u-item-btn"'>
                  <j-button @click="editItem('后侧货架'+ key, item)" type="primary">编辑</j-button>
                </div>
              </div>
            </div>


            <div class="u-content-item">
              <div class="u-item-box" @mouseover="showEdit(key)" @mouseleave='hideEdit()' v-for='(item, key) in prodArr' v-if='8 <= key && key <= 9' :key='key'>
                <div class='u-item-title'>左侧货架{{key}}</div>
                <div class='u-item-content'>
                  <div class='u-content-box' v-for='(items, keys) in  item' :key='keys'>
                    <img v-if='items.prod != null' :src='items.prod.img_url'/>
                  </div>
                </div>
                <div class='u-item-footer'></div>
                <div  :class='currentIndex === key ? "u-item-btn u-btn-active" : "u-item-btn"'>
                  <j-button @click="editItem('左侧货架'+ key, item)" type="primary">编辑</j-button>
                </div>
              </div>

              <div class="u-item-box" @mouseover="showEdit(key)" @mouseleave='hideEdit()' v-for='(item, key) in prodArr' v-if='10 <= key && key <= 11' :key='key'>
                <div class='u-item-title'>中岛正面{{key}}</div>
                <div class='u-item-content'>
                  <div class='u-content-box' v-for='(items, keys) in  item' :key='keys'>
                    <img v-if='items.prod != null' :src='items.prod.img_url'/>
                  </div>
                </div>
                <div class='u-item-footer'></div>
                <div  :class='currentIndex === key ? "u-item-btn u-btn-active" : "u-item-btn"'>
                  <j-button @click="editItem('中岛正面'+ key, item)" type="primary">编辑</j-button>
                </div>
              </div>

              <div class="u-item-box" @mouseover="showEdit(key)" @mouseleave='hideEdit()' v-for='(item, key) in prodArr' v-if='5 <= key && key <= 7' :key='key'>
                <div class='u-item-title'>左侧货架{{key}}</div>
                <div class='u-item-content'>
                  <div class='u-content-box' v-for='(items, keys) in  item' :key='keys'>
                    <img v-if='items.prod != null' :src='items.prod.img_url'/>
                  </div>
                </div>
                <div class='u-item-footer'></div>
                <div  :class='currentIndex === key ? "u-item-btn u-btn-active" : "u-item-btn"'>
                  <j-button @click="editItem('左侧货架'+ key, item)" type="primary">编辑</j-button>
                </div>
              </div>
            </div>

            <div class="u-content-item">
              <div class="u-item-box" @mouseover="showEdit(key)" @mouseleave='hideEdit()' v-for='(item, key) in prodArr' v-if='12 <= key && key <= 13' :key='key'>
                <div class='u-item-title'>中岛正面{{key}}</div>
                <div class='u-item-content'>
                  <div class='u-content-box' v-for='(items, keys) in  item' :key='keys'>
                    <img v-if='items.prod != null' :src='items.prod.img_url'/>
                  </div>
                </div>
                <div class='u-item-footer'></div>
                <div  :class='currentIndex === key ? "u-item-btn u-btn-active" : "u-item-btn"'>
                  <j-button @click="editItem('中岛正面'+ key, item)" type="primary">编辑</j-button>
                </div>
              </div>
            </div>
          </div>
          <div class="u-footer">
            <p>入口</p>
            <p>出口</p>
          </div>
      </div>
    </div>
    <Detail 
    v-else
    :navgator='navgator'
    :currentNav='currentNav'
    :currentItem='currentItem'
    @back='back'
    @changeNavIndex='changeNavIndex'
    @addProds='addProds'
    @delSuccess='delSuccess'/>
    <AddList
    v-if='isOpenForm'
    @cancelDialog='cancelAdd'
    />
  </div>
</template>

<script>
import AddList from './uppershelf/addList';
import Detail from './uppershelf/detail';
import Vue from 'vue';
// <j-button @click="() =>  {$Modal.info({content: '确认导出吗？', okText: '确认'})}" class='text-alignR' type="primary">导出</j-button>
export default { 
  data () {
    return {
      isShowEdit: false,
      isDetail: true,
      navgator: [],
      currentNav: -1,
      currentItem: null,
      isOpenForm: false,
      prodArr: null,
      currentIndex: -1,
      gid: -1,
      currentCode: ''
    }
  },
  created() {
    if (localStorage.getItem('isSign') != 'true') {
      this.$router.push('/sign');
      return;
    }
    this.getProd();
  },
  methods: {
    getProd() {
      this.$http
        .post("/api/sku/allrelation")
        .then(res => {
          this.prodArr = res.data.data.relation;
          if (this.currentCode !== '') {
            for(let key in this.prodArr) {
              if (this.currentNav.split('货架')[1] === key) {
              console.log(key);
              console.log(this.currentNav);
                this.currentItem = this.prodArr[key];
                this.editItem(this.currentNav, this.prodArr[key]);
              }
            }
          }
        })
        .catch(err => { 
          console.log(err);
          this.$Message.error('服务器出错！');
        })
        
    },
    delSuccess() {
      this.currentCode = 1;
      this.getProd();
    },
    cancelAdd(code) {
      this.currentCode = code;
      if (code !== 0) {
        this.$http
          .post("/api/sku/updaterelation", {
            gid: this.gid,
            barcode: code
          })
          .then(res => {
            if (res.data.data === 1) {
              this.$Message.success('添加成功');
              this.getProd();
            }
          })
          .catch(err => { 
            console.log(err);
            this.$Message.error('服务器出错！');
          })
      }
      this.isOpenForm = false;
    },
    addProds(gid) {
      this.gid = gid;
      this.isOpenForm = true;
    },
    editItem(indexs, item) {
      this.currentNav = indexs;
      this.currentItem = item;
      if (this.navgator.length === 0) {
        this.navgator.push({
          index: indexs,
          item: item
        });
      } else {
        let arr = [];
        this.navgator.forEach((val) => {
            arr.push(val.index)
        })
        if (arr.indexOf(indexs) == -1) {
          this.navgator.push({
            index: indexs,
            item: item
          });
        }
      }
      this.currentCode = '';
      this.isDetail = false;
    },
    changeNavIndex(changeNavIndex) {
      this.currentNav = changeNavIndex.index;
      this.currentCode = 1;
      this.getProd();
    },
    showEdit(key) {
      this.currentIndex = key;
    },
    hideEdit() {
      this.currentIndex = -1;
    },
    back() {
      this.isDetail = true;
    }
  },
  components: {
    Detail,
    AddList
  }
}
</script>
<style>
  .u-warp {
    width: 100%;
    padding-right: 50px;
  }
  .u-desc span {
    color: #f00;
  }
  .u-main {
    min-height: 800px;
    height: auto;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
  .u-content {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
  .u-content-item {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .u-item-box {
    width: 210px;
    height: 100%;
    margin-right: 8px;
    display: flex;
    display: -webkit-flex;
    border: 3px solid #fff;
    flex-direction: column;
  }
  .u-item-box:hover {
    border: 3px solid #00f;
  }
  .u-item-title {
    width: 100%;
    height: 24px;
    line-height: 24px;
    background: #777;
    color: #fff;
  }
  .u-item-content {
    flex: 1;
  }
  .u-content-box {
    border: 1px solid #fff;
    background: #ddd;
    width: 40px;
    height: 40px;
    float: left;
  }
  .u-content-box img {
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }
  .u-item-footer {
    border: 3px solid #000;
  }
  .u-item-btn {
    height: 40px;
    line-height: 40px;
    opacity: 0;
  }
  .u-btn-active {
    opacity: 1;
  }
  .u-footer {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    height: 40px;
    border-top: 1px solid #ccc;
    align-items:center;
  }
  .u-footer p {
    flex: 1;
  }
  .u-footer p:first-child {
    flex: 1;
    border-right: 2px solid #ccc;
  }
</style>