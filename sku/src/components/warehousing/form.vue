<template>
  <j-modal class="W-form" :width="600" :title="addOrEdit === 'add' ? '添加商品' : '编辑商品'" v-model="dialogShow" @on-cancel='oncancel' 
  >
      <j-form :model="form" :rules="rules" ref="form" style="width: 100%; margin-top: 30px;">
        <j-form-item prop="name" label="商品名称">
          <j-input v-model="form.name" placeholder="请输入商品名称"/>
        </j-form-item>
        <j-form-item prop="pinyin" label="商品拼音">
          <j-input v-model="form.pinyin" placeholder="请输入拼音"/>
        </j-form-item>
        <j-form-item prop="barcode" label="商品编码">
          <j-input v-model="form.barcode" placeholder="请输入商品编码"/>
        </j-form-item>
        <j-form-item prop="unit" label="单位">
          <j-input v-model="form.unit" placeholder="请输入商品单位，如xxxx"/>
        </j-form-item>
        <j-form-item prop="spec" label="规格">
          <j-input v-model="form.spec" placeholder="请输入商品规格，如草莓味"/>
        </j-form-item>
        <j-form-item prop="origin" label="原产地">
          <j-input v-model="form.origin" placeholder="请输入原产地"/>
        </j-form-item>
        <j-form-item prop="sale_price" label="标价">
          <j-input class='w-Swidth' v-model="form.sale_price" placeholder="请输入标价"/>元
        </j-form-item>
        <j-form-item prop="real_sale_price" label="真实售价">
          <j-input class='w-Swidth' v-model="form.real_sale_price" placeholder="请输入真实售价"/>元
        </j-form-item>
        <j-form-item prop="img_url" label="图片">
          <div v-if="!changeStatus" class='w-picture'>
            <em @click='delPic'>x</em>
            <img :src='form.img_url'/>
          </div>
          <div class="w-image" v-if="!changeStatus">
            图片格式jpg.png.建议尺寸80*80
          </div>
          <form class="w-fileForm"  id="file" method="post" enctype="multipart/form-data"> 
            <j-button style="color: #396fff;" class="w-file" size="medium" icon="daochu">{{changeStatus ? '上传图片' : '重新上传'}}</j-button>
            <input type="file" @change='choiceFile($event)' name="select_mark_result" class="w-file w-file-hidden"/>
          </form>
        </j-form-item>
        <j-form-item class="w-footer">
            <j-button class="w-footer-r" @click="oncancel" to='' size='small'>取消</j-button>
            <j-button @click="onok" to='' type="primary" size='small'>提交</j-button>
        </j-form-item>
      </j-form>
      <div slot="footer"></div>
  </j-modal>
</template>
<script>
export default {
  props: ['addOrEdit', 'oldForm'],
  data () {
    let validator1 = (val, rule, callback) => {
      return val !== '';
    };
    return {
      changeStatus: this.addOrEdit === 'add' ? true : false,
      dialogShow: false,
      form: {
        name: '',
        pinyin: '',
        barcode: '',
        unit: '',
        origin: '',
        sale_price: '',
        img_url: '',
        real_sale_price: '',
        spec: '',
      },
      picture: '',
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'change'},
          {validator: validator1, message: '商品名称错误', trigger: 'change'}
        ],
        pinyin: [
          {required: true, message: '请输入拼音', trigger: 'change'},
          {validator: validator1, message: '拼音错误', trigger: 'change'}
        ],
        barcode: [
          {required: true, message: '请输入商品编码', trigger: 'change'},
          {validator: validator1, message: '商品编码错误', trigger: 'change'}
        ],
        unit: [
          {required: true, message: '请输入单位', trigger: 'change'},
          {validator: validator1, message: '单位错误', trigger: 'change'}
        ],
        spec: [
          {required: true, message: '请输入规格', trigger: 'change'},
          {validator: validator1, message: '规格错误', trigger: 'change'}
        ],
        origin: [
          {required: true, message: '请输入原产地', trigger: 'change'},
          {validator: validator1, message: '原产地错误', trigger: 'change'}
        ],
        sale_price: [
          {required: true, message: '请输入标价', trigger: 'change'},
          {validator: validator1, message: '标价错误', trigger: 'change'}
        ],
        real_sale_price: [
          {required: true, message: '请输入真实售价', trigger: 'change'},
          {validator: validator1, message: '真实售价错误', trigger: 'change'}
        ],
        img_url: [
          {required: true, message: '请上传商品图片', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    this.dialogShow = true;
    if (this.addOrEdit !== 'add') {
      this.form = this.oldForm;
    }
  },
  methods: {
    delPic() {
      this.form.img_url = '';
    },
    choiceFile(event) {
      let file = event.target.files[0];
      let a = new FileReader();
      let that = this;
      a.onload = function (e) {
        let params = {
          filename: event.target.files[0].name,
          img: e.target.result.split(',')[1]
        }
        that.$http
          .post("/api/sku/upload", params)
          .then(res => {
            that.form.img_url = res.data.data.url;
            that.picture = e.target.result;
            that.changeStatus = false;
          })
          .catch(err => { 
            that.$Message.error('服务器出错！');
          });
          
      }
      a.readAsDataURL(file);
    },
    async onok() {
      let res = await this.$refs.form.validate();
      if (res) {
        let params = {
          name: this.form.name,
          pinyin: this.form.pinyin,
          barcode: this.form.barcode,
          unit: this.form.unit,
          spec: this.form.spec,
          origin: this.form.origin,
          sale_price: this.form.sale_price * 1,
          real_sale_price: this.form.real_sale_price * 1,
          img_url: this.form.img_url,
          stock: 0,
          cost_price: 0
        }
        let url;
        if (this.addOrEdit === 'add') {
          url = "/api/sku/add";
        } else {
          url = '/api/sku/update';
          params.id = this.form.id;
        }
        this.$http
          .post(url, params)
          .then(res => {
            if (res.data.data === 1) {
              if (this.addOrEdit === 'add') {
                this.$Message.info('添加成功');
              } else {
                this.$Message.info('修改成功');
              }
              this.sure();
            }
          })
          .catch(err => { 
            this.$Message.error('服务器出错！');
          });
        this.dialogShow = false;
        this.$emit('cancelDialog');
      }
    },
    sure() {
      this.$emit('cancelDialog');
    },
    oncancel() {
      this.dialogShow = false;
      this.$emit('cancelDialog');
    }
  }
}
</script>
<style scope="scope">
  .W-form .jimu-modal-content {
    padding-left: 30px;
  }
  .w-file {
    width: 99px;
    height: 30px;
    position: absolute;
    left: 0;
    z-index: 99;
  }
  .w-Swidth {
    width: 95%!important;
    margin-right: 8px;
  }
  .w-footer-r {
    margin-right: 10px;
  }
  .w-footer {
    text-align: right;
    margin-top: 10px;
  }
  .w-file-hidden {
    opacity: 0;
  }
  .w-picture {
    width: 80px;
    height: 80px;
    float: left;
    margin-right: 8px;
    border: 1px solid #ccc;
    position: relative;
  }
  .w-picture img {
    width: 100%;
    height: 100%;
  }
  .w-picture em {
    position: absolute;
    right: 0;
    top: -10px;
    font-style: normal;
    color: #f00;
    font-size: 16px;
  }
  .w-image {
    color: #ccc;
    margin-bottom: 20px;
  }
  .w-fileForm {
    width: 99px;
    height: 30px;
    float: left;
    position: relative;
  }
</style>
