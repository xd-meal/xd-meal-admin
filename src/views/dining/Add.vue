<template>
  <page-view>
    <a-card
      :body-style="{padding: '24px 32px'}"
      :bordered="false"
    >
      <a-form-model
        :model="form"
        :rules="rules"
        ref="addDiningForm"
        :labelCol="{xxl: {span: 7},lg: {span: 3}}"
        :wrapperCol="{xxl: {span: 10}, lg: {span: 21} }"
      >
        <a-form-model-item
          label="预设项"
        >
          <div>
            <a-date-picker v-model="preset" />
            <a-button-group style="margin-left: 5px;">
              <a-button
                type="primary"
                @click="setPreset(0)"
              >早</a-button>
              <a-button
                type="primary"
                @click="setPreset(1)"
              >中</a-button>
              <a-button
                type="primary"
                @click="setPreset(2)"
              >晚</a-button>
            </a-button-group>
            警告！加班餐切勿使用预设功能！
          </div>
        </a-form-model-item>
        <a-form-model-item
          label="标题"
          prop="title"
        >
          <a-input
            v-model="form.title"
            placeholder="餐次标题"
          />
        </a-form-model-item>
        <a-form-model-item
          label="点餐时段"
          prop="orderTimes"
        >
          <a-range-picker
            v-model="form.orderTimes"
            style="width: 100%"
            showTime
          />
        </a-form-model-item>
        <a-form-model-item
          label="取餐时段"
          prop="pickTimes"
        >
          <a-range-picker
            v-model="form.pickTimes"
            style="width: 100%"
            showTime
          />
        </a-form-model-item>
        <a-form-model-item
          label="统计类型"
          required
        >
          <a-radio-group v-model="form.stat_type">
            <a-radio :value="0">记名</a-radio>
            <a-radio :value="1">点餐</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          label="菜单列表"
          prop="menu"
        >
          <SelectMenu v-model="form.menu" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{lg: {offset: 7}, sm: {offset: 7}}">
          <a-button
            type="primary"
            @click="handleSubmit"
          >
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </page-view>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { PageView } from '@/layouts'
import SelectMenu from './SelectMenu'
export default {
  name: 'AddDining',
  components: {
    PageView,
    SelectMenu
  },
  computed: {
  },
  filters: {
    moment: function (date) {
      return moment(date).format('Y-MM-DD HH:mm:ss')
    }
  },
  data () {
    return {
      preset: moment().millisecond(0).second(0),
      form: {
        title: '',
        orderTimes: [],
        pickTimes: [],
        stat_type: 0,
        menu: []
      },
      rules: {
        title: [
          { required: true, trigger: 'blur' }
        ],
        orderTimes: [
          { required: true, trigger: 'change' }
        ],
        pickTimes: [
          { required: true, trigger: 'change' }
        ],
        menu: [
          { required: true, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['AppendDining']),
    async handleSubmit () {
      try {
        if (!await this.$refs.addDiningForm.validate()) return
        const _req = {
          title: this.form.title,
          order_start: parseInt(this.form.orderTimes[0].format('x')),
          order_end: parseInt(this.form.orderTimes[1].format('x')),
          pick_start: parseInt(this.form.pickTimes[0].format('x')),
          pick_end: parseInt(this.form.pickTimes[1].format('x')),
          stat_type: this.form.stat_type,
          menu: this.form.menu
        }
        const res = await this.AppendDining(_req)
        if (res._id) {
          this.$message.success('添加成功')
          this.resetForm()
        }
      } catch (error) {
        this.$message.error('添加失败 ' + (error.isAxiosError ? JSON.stringify(error.response.data) : error.message))
      }
    },
    resetForm () {

    },
    setPreset (type) {
      if (type < 0 || type > 2) {
        return
      }
      this.form.title = (this.preset.month() + 1) + '月'
      this.form.title += this.preset.date() + '日'
      this.form.pickTimes[0] = moment(this.preset)
      this.form.orderTimes[0] = moment(this.preset)
        .subtract(7, 'days')
        .weekday(3)
        .hour(10)
        .minute(0)
      this.form.orderTimes[1] = moment(this.form.orderTimes[0])
        .weekday(4)
        .hour(16)
      switch (type) {
        case 0:
          this.form.title += '早'
          this.form.pickTimes[0].hour(8).minute(25)
          this.form.pickTimes[1] = moment(this.form.pickTimes[0]).add(80, 'm')
          this.form.stat_type = 0
          break
        case 1:
          this.form.title += '中'
          this.form.pickTimes[0].hour(11).minute(45)
          this.form.pickTimes[1] = moment(this.form.pickTimes[0]).add(90, 'm')
          this.form.stat_type = 1
          break
        case 2:
          this.form.title += '晚'
          this.form.pickTimes[0].hour(17).minute(45)
          this.form.pickTimes[1] = moment(this.form.pickTimes[0]).add(90, 'm')
          this.form.stat_type = 1
          break
      }
      this.form.title += '餐'
    }
  }
}
</script>
