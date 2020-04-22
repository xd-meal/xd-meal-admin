<template>
  <page-view>
    <a-form
      layout="inline"
      slot="action"
    >
      <a-form-item>
        <a-range-picker
          v-model="time"
          format="Y-MM-DD"
          @change="queryDining"
        />
      </a-form-item>
      <!-- <a-form-item>
        <a-button type="primary" @click="queryDining">
          查询
        </a-button>
      </a-form-item> -->
    </a-form>
    <a-card
      :body-style="{padding: '24px 32px'}"
      :bordered="false"
    >
      <a-table
        :dataSource="list"
        rowKey="_id"
      >
        <a-table-column
          title="名称"
          dataIndex="title"
          key="title"
        />
        <a-table-column
          title="统计类型"
          dataIndex="stat_type"
        >
          <template slot-scope="scope">
            <a-tag
              color="green"
              v-if="scope"
            >点餐</a-tag>
            <a-tag
              color="blue"
              v-else
            >记名</a-tag>
          </template>
        </a-table-column>
        <a-table-column
          title="点餐时间"
          dataIndex="order_start"
          key="order_start"
        >
          <template slot-scope="order_start, record">
            <div>{{ order_start | moment }}</div>
            <div>{{ record.order_end | moment }}</div>
          </template>
        </a-table-column>
        <a-table-column
          title="就餐时间"
          dataIndex="pick_start"
          key="pick_start"
        >
          <template slot-scope="pick_start, record">
            <div>{{ pick_start | moment }}</div>
            <div>{{ record.pick_end | moment }}</div>
          </template>
        </a-table-column>
        <a-table-column
          title="菜单"
          dataIndex="menu"
          key="menu"
        >
          <template slot-scope="menu">
            <a-tooltip placement="left">
              <template slot="title">
                <div
                  v-for="(item, index) in menu"
                  :key="index"
                >
                  <br v-if="index !== 0">
                  <div style="border-left: 3px solid #00b0ff;padding-left: 5px;">
                    <div>
                      {{ item.title }}
                    </div>
                    <div>
                      {{ item.desc }}
                    </div>
                    <div>
                      {{ item.supplier }}
                    </div>
                  </div>
                </div>
              </template>
              <a-button>菜单详情</a-button>
            </a-tooltip>
          </template>
        </a-table-column>
        <a-table-column
          title="操作"
          key="action"
        >
          <template slot-scope="{record}">
            <a-button-group>
              <a-button @click="editDining(record)">编辑</a-button>
              <a-popconfirm @confirm="deleteDining(record)">
                <template slot="title">
                  <p>确定要删除该餐次吗？</p>
                </template>
                <a-button type="danger">删除</a-button>
              </a-popconfirm>
            </a-button-group>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
  </page-view>
</template>
<script>
import moment from 'moment'
import { PageView } from '@/layouts'
export default {
  name: 'DiningList',
  components: {
    PageView
  },
  computed: {
    list () {
      const _ret = []
      const dinings = this.$store.getters.diningListArray
      dinings.forEach(el => {
        const startTime = moment(el.pick_start)
        const endTime = moment(el.pick_end)
        if (startTime.isSameOrAfter(this.time[0], 'date') && endTime.isSameOrBefore(this.time[1], 'date')) {
          _ret.push(el)
        }
      })
      return _ret
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('Y-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.queryDining()
  },
  data () {
    return {
      time: [
        moment().set('date', 1).set('hour', 0).set('minute', 0).set('second', 0),
        moment().set('hour', 23).set('minute', 59).set('second', 59)
      ]
    }
  },
  methods: {
    queryDining () {
      this.$store.dispatch('FetchDiningList', [
        this.time[0].set('hour', 0).set('minute', 0).set('second', 0).format('x'),
        this.time[1].set('hour', 0).set('minute', 0).set('second', 0).format('x')
      ])
    },
    editDining (record) {

    },
    deleteDining (record) {

    }
  }
}
</script>
