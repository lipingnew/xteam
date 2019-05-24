<template>
  <div class="common-main" v-if="isSign == 'true'">
    <formDialog
    v-if='dialogShow'
    :addOrEdit='addOrEdit'
    :oldForm='oldForm'
    @cancelDialog='cancelAdd'></formDialog>
    <div class='common-title text-alignL'>入库管理</div>
    <div class='w-search text-alignL'>
      <j-input class='w-input' v-model='prodName' @on-change="searchName" search clearable style="width: 200px;" placeholder='请输入商品名称'/>
      <j-button @click='addList' class='text-alignR' type="primary">添加</j-button>
    </div>
    <div class='w-main'>
      <j-table v-if='listData != null' :data="listData.prods">
        <j-table-column showTitle label="序号" width='80'>
          <template slot-scope="scope">
              {{scope.row.id}}
          </template>
        </j-table-column>
        <j-table-column showTitle label="缩略图" width='100' style='taxt-align: center'>
          <template slot-scope="scope">
              <img class='w-img' :src='scope.row.img_url'/>
          </template>
        </j-table-column>
        <j-table-column showTitle :key="item.label" v-for="item in column" :prop="item.name" :label="item.label"/>

        <j-table-column showTitle label="状态" style='taxt-align: center'>
          <template slot-scope="scope">
              {{scope.row.online === 0 ? '默认值' : '上架'}}
          </template>
        </j-table-column>
        <j-table-column showTitle label="位置" style='taxt-align: center'>
          <template slot-scope="scope">
            <j-popover ref="pop" maxWidth="100" placement="top" trigger='hover'>
              <div v-for='item in scope.row.lanes' slot="content">{{item.rack_id}}-{{item.row_no}}-{{item.column_no}}</div>
              <span v-for='item in scope.row.lanes'>{{item.rack_id}}-{{item.row_no}}-{{item.column_no}},</span>
            </j-popover>
          </template>
        </j-table-column>
        <j-table-column label="操作">
          <template slot-scope="scope">
              <j-button @click="editList(scope)" type="text">编辑</j-button>
              <j-button @click="delList(scope)" type="text">删除</j-button>
          </template>
        </j-table-column>
      </j-table>
      <j-pagination v-if='listData != null' class="w-pagination" align="right" showGoto 
      showTotal style="marginTop:20px;" :total="listData.all_count" :step="steps" @on-change='changePage'/>
    </div>
  </div>
</template>
<script>
// <j-select class='w-select' @on-change="searchType" :options="options1" bordered style="width: 200px;" placeholder='请输入商品类别' />
import formDialog from './warehousing/form';

export default {
  data () {
    return {
      column: [
        {name: 'name', label: '商品名称'},
        {name: 'barcode', label: '编码'},
        {name: 'grade', label: '等级'},
        {name: 'sale_price', label: '标价'},
        {name: 'real_sale_price', label: '实际售价'}
      ],
      options1: ['AI', 'Apollo', 'DuerOS'],
      steps: 8,
      listData: null,
      prodName: '',
      currentPage: 0,
      addOrEdit: '',
      dialogShow: false,
      oldForm: null
    }
  },
  created() {
    if (localStorage.getItem('isSign') != 'true') {
      this.$router.push('/sign');
    }
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$http
        .post("/api/sku/getdata", {
          pn: this.currentPage,
          rn: 8,
          prod_name: this.prodName
        })
        .then(res => {
          this.listData = res.data.data;
        })
        .catch(err => { 
          this.$Message.error('服务器出错！');
        })
    },
    searchName() { 
      this.getDataList();
    },
    searchType() {
      
    },
    addList() {
      this.dialogShow = true;
      this.addOrEdit = 'add';
    },
    cancelAdd() {
      this.dialogShow = false;
      this.getDataList();
    },
    editList(scope) {
      console.log(scope.row.id);
      console.log(this.listData.prods);
      this.listData.prods.forEach(val => {
        if (val.id === scope.row.id) {
          this.oldForm = val;
        }
      })
      this.dialogShow = true;
      this.addOrEdit = 'edit';
    },
    changePage(val) {
      this.currentPage = (val * 8) - 8;
      this.getDataList();
    },
    delList(scope) {
      this.$Modal.error({title: '删除', content: '删除后将不可恢复，是否删除' + scope.row.id, onOk: () => {
      this.$http
        .post("/api/sku/del", {
          id: scope.row.id
        })
        .then(res => {
          if (res.data.data === 1) {
            this.$Message.success('删除成功');
            this.getDataList();
          }
        })
        .catch(err => { 
          console.log(err);
          this.$Message.error('服务器出错！');
        })
      }, onCancel: () => {
        this.$Message.success('取消删除');
      }});
    }
  },
  components: {
    formDialog
  }
}
</script>
<style scope>
  .w-search {
    padding: 20px 50px 20px 0;
  }
  .w-input {
    margin-left: 30px;
  }
  .w-main {
    flex: 1;
    padding-right: 50px;
  }
  .w-img {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }
  tr .jimu-table-td:nth-child(2) {
    text-align: center;
  }
  .w-select span {
    color: #ccc;
  }
  .w-pagination {
    margin: 30px 0 50px 0!important;
  }
</style>
