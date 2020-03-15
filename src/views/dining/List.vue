<template>
  <page-view>
    <div slot="action">
      <a-range-picker
        :showTime="true"
        :allowClear="false"
        format="X"
      />
      <a-button type="primary">提交</a-button>
    </div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-table :dataSource="dishList">
        <a-table-column title="名称" dataIndex="title" key="title" />
        <a-table-column title="描述" dataIndex="desc" key="desc" />
        <a-table-column title="供应商" dataIndex="supplier" key="supplier" />
      </a-table>
    </a-card>
  </page-view>
</template>
<script>
import moment from 'moment'
import DescriptionList from '@/components/DescriptionList'
import { mixin, mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
export default {
  name: 'DiningList',
  moment,
  mixins: [mixin, mixinDevice],
  components: {
    DescriptionList,
    PageView
  },
  computed: {
    dishList () {
      return this.$store.getters.dishList
    }
  }
}
</script>
