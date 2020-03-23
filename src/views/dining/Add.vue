<template>
  <page-view>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入标题' }]}
            ]"
            name="name"
            placeholder="餐次标题" />
        </a-form-item>
        <a-form-item
          label="点餐时段"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-range-picker
            name="orderTimes"
            style="width: 100%"
            showTime
            v-decorator="[
              'orderTimes',
              {rules: [{ required: true, message: '请选择起止日期' }]}
            ]" />
        </a-form-item>
        <a-form-item
          label="取餐时段"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-range-picker
            name="pickTimes"
            style="width: 100%"
            showTime
            v-decorator="[
              'pickTimes',
              {rules: [{ required: true, message: '请选择起止日期' }]}
            ]" />
        </a-form-item>
        <a-form-item
          label="统计类型"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-radio-group v-model="stat_type">
            <a-radio :value="0">记名</a-radio>
            <a-radio :value="1">点餐</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="菜单列表"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
        </a-form-item>
      </a-form>
    </a-card>
  </page-view>
</template>
<script>
import moment from 'moment'
import { PageView } from '@/layouts'
export default {
  name: 'AddDining',
  components: {
    PageView
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
      form: this.$form.createForm(this),
      stat_type: 0
    }
  },
  methods: {
    handleSubmit () {}
  }
}
</script>
