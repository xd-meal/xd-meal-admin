<template>
  <a-card
    :body-style="{padding: '24px 32px'}"
    :bordered="false"
  >
    <a-table
      :dataSource="dishList"
      rowKey="_id"
    >
      <a-table-column
        title="名称"
        dataIndex="title"
        key="title"
      />
      <a-table-column
        title="描述"
        dataIndex="desc"
        key="desc"
      />
      <a-table-column
        title="供应商"
        dataIndex="supplier"
        key="supplier"
      />
    </a-table>
  </a-card>
</template>
<script>
export default {
  name: 'DishList',
  computed: {
    dishList () {
      return this.$store.getters.dishList
    }
  }
}
</script>
