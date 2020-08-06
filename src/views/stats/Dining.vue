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
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="queryDining"
          :loading="loading"
        >
          查询
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          @click="exportXLSX"
          :loading="loading"
        >
          导出到 Excel
        </a-button>
      </a-form-item>
    </a-form>
    <a-card
      :body-style="{padding: '24px 32px'}"
      :bordered="false"
    >
      <div
        v-for="(item,index) in list"
        :key="index"
        class="dining-list"
      >
        <h1 class="dining-title">
          {{ item.info.title }}
        </h1>
        <a-table
          :dataSource="item.menu"
          rowKey="_id"
          :pagination="false"
        >
          <a-table-column
            title="选项"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.title }}
              </div>
              <div>
                {{ scope.desc }}
              </div>
            </template>
          </a-table-column>
          <a-table-column
            title="心动"
            dataIndex="xd"
            key="xd"
            width="100px"
          />
          <a-table-column
            title="心动互娱"
            dataIndex="xde"
            key="xde"
            width="100px"
          />
          <a-table-column
            title="心珹"
            dataIndex="xc"
            key="xc"
            width="100px"
          />
          <a-table-column
            title="Taptap"
            dataIndex="tap"
            key="tap"
            width="100px"
          />
          <a-table-column
            title="龙成"
            dataIndex="xdg"
            key="xdg"
            width="100px"
          />
          <a-table-column
            title="幻刃"
            dataIndex="fantablade"
            key="fantablade"
            width="100px"
          />
        </a-table>
      </div>
    </a-card>
  </page-view>
</template>
<script>
import moment from 'moment'
import { PageView } from '@/layouts'
import { statDiningByTime } from '@/api/stats'
export default {
  name: 'DiningList',
  components: {
    PageView
  },
  computed: {
    list () {
      const _ret = [...this.rawList]
      _ret.sort((a, b) => {
        return moment(a._id.pick_start) - moment(b._id.pick_start)
      })
      return _ret.map(el => {
        const _el = { info: el._id, menu: {} }
        el._id.menu.forEach(_menu => {
          _el.menu[_menu._id] = _menu
        })
        el.stat.forEach(_stat => {
          _el.menu[_stat.menu_id][_stat.channel] = _stat.count
        })
        _el.menu = Object.values(_el.menu)
        return _el
      })
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
        moment().subtract(7, 'd').set('hour', 0).set('minute', 0).set('second', 0),
        moment().set('hour', 23).set('minute', 59).set('second', 59)
      ],
      rawList: [],
      loading: false
    }
  },
  methods: {
    async queryDining () {
      this.loading = true
      this.rawList = []
      try {
        const _res = await statDiningByTime(this.time[0].format('x'), this.time[1].format('x'))
        this.rawList = _res
      } catch (error) {
        this.$message.error('查询失败 ' + (error.isAxiosError ? JSON.stringify(error.response.data) : error.message))
      }
      this.loading = false
    },
    exportXLSX () {
      const book = this.$xlsx.utils.book_new()
      const sheetDom = document.getElementsByClassName('dining-list')
      sheetDom.forEach(dom => {
        this.$xlsx.utils.book_append_sheet(
          book,
          this.$xlsx.utils.table_to_sheet(dom.querySelector('table')),
          dom.querySelector('h1').innerText
        )
      })
      this.$xlsx.writeFile(
        book,
        (
          this.time[0].format('Y-MM-DD') +
          ' - ' +
          this.time[1].format('Y-MM-DD') +
          ' 点餐统计.xlsx'
        )
      )
    }
  }
}
</script>
<style scoped>
.dining-list:not(:first-of-type) {
  margin-top: 50px;
}
</style>
