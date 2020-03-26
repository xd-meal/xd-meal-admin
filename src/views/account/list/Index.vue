<template>
  <page-view>
    <a-button
      slot="action"
      type="primary"
      @click="addDialogVisible = true"
    >
      添加帐号
    </a-button>
    <a-card
      :body-style="{padding: '24px 32px'}"
      :bordered="false"
    >
      <a-table :dataSource="list">
        <a-table-column
          title="姓名"
          dataIndex="address"
          key="address"
        />
        <a-table-column
          title="公司"
          dataIndex="tags"
          key="tags"
        >
          <template slot-scope="tags">
            <span>
              <a-tag
                v-for="tag in tags"
                color="blue"
                :key="tag"
              >{{ tag }}</a-tag>
            </span>
          </template>
        </a-table-column>
        <a-table-column
          title="操作"
          key="action"
        >
          <!-- <template slot-scope="text, record"> -->
          <template>
            <span>
              <!-- <a>Action 一 {{ record.firstName }}</a>
              <a-divider type="vertical" /> -->
              <a>删除</a>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
    <addDialog v-model="addDialogVisible" />
  </page-view>
</template>
<script>
import moment from 'moment'
import { PageView } from '@/layouts'
import addDialog from './Add'
export default {
  name: 'AccountList',
  components: {
    PageView,
    addDialog
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
      list: [],
      addDialogVisible: false
    }
  },
  methods: {
    async handleSubmit () {},
    resetForm () {

    }
  }
}
</script>
