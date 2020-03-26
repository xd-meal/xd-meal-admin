<template>
  <a-modal
    v-model="$attrs.value"
    title="添加帐号"
    :footer="false"
    destroy-on-close
    width="1000px"
    @cancel="closeDialog"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{span:4}"
      :wrapper-col="{span:18}"
    >
      <a-form-model-item
        label="姓名"
        prop="username"
      >
        <a-input v-model="form.username" />
      </a-form-model-item>
      <a-form-model-item
        label="邮箱"
        prop="email"
      >
        <a-input v-model="form.email" />
      </a-form-model-item>
      <a-form-model-item
        label="公司"
        prop="wechat_corpid"
        :extra="role < 2 ? '分管只能添加同公司的帐号' : ''"
      >
        <a-select
          v-model="form.wechat_corpid"
          :disabled="role < 2"
        >
          <a-select-option value="xd">
            心动
          </a-select-option>
          <a-select-option value="tap">
            Taptap
          </a-select-option>
          <a-select-option value="xdg">
            龙成
          </a-select-option>
          <a-select-option value="fantablade">
            幻刃
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          @click="onSubmit"
        >
          提交
        </a-button>
        <a-button
          style="margin-left: 10px;"
          @click="closeDialog"
        >
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { mapGetters } from 'vuex'
import { addUsers } from '@/api/account'
export default {
  name: 'AddAccountDialog',
  components: {
  },
  props: {
  },
  watch: {
    '$attrs.value' (val) {
      if (this.role < 2) {
        this.form.wechat_corpid = this.userInfo.wechat_corpid
      }
    }
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        wechat_corpid: '',
        department: '1'
      },
      rules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur' }
        ],
        wechat_corpid: [
          { required: true, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'role'])
  },
  mounted () {
    if (this.role < 2) {
      this.form.wechat_corpid = this.userInfo.wechat_corpid
    }
  },
  methods: {
    addUsers,
    async onSubmit () {
      try {
        if (!await this.$refs.form.validate()) return
        const res = await this.addUsers({ list: [this.form] })
        if (res.length) {
          this.$success({
            title: '添加成功',
            content: '密码：' + res[0].password,
            onOk: () => { this.form.username = ''; this.form.email = '' },
            onCancel: () => { this.form.username = ''; this.form.email = '' }
          })
        }
      } catch (error) {
        this.$message.error('添加失败 ' + (error.isAxiosError ? JSON.stringify(error.response.data) : error.message))
      }
    },
    closeDialog () {
      this.form = {
        username: '',
        email: '',
        wechat_corpid: '',
        department: 1
      }
      this.$emit('input', false)
    }
  }
}
</script>
