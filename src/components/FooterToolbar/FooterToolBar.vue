<template>
  <div :class="prefixCls">
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="float: right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolBar',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-footer-toolbar'
    },
    extra: {
      type: [String, Object],
      default: ''
    },
    noPaddingToParent: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (!this.$props.noPaddingToParent) {
      this.$el.parentElement.style['paddingBottom'] = '60px'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
