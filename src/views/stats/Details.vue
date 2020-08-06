<template>
  <page-view>
    <a-form-model
      layout="inline"
      slot="action"
    >
      <a-form-model-item>
        <a-select
          v-model="corp"
          :disabled="role < 2"
          style="width: 100px"
        >
          <a-select-option value="all">
            全部
          </a-select-option>
          <a-select-option value="xd">
            心动
          </a-select-option>
          <a-select-option value="xde">
            心动互娱
          </a-select-option>
          <a-select-option value="xc">
            心珹
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
      <a-form-model-item>
        <a-range-picker
          v-model="time"
          format="Y-MM-DD"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          @click="queryDining"
          :loading="loading"
        >
          查询
        </a-button>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          @click="exportXLSX"
          :loading="loading"
        >
          导出到 Excel
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-card
      :body-style="{padding: '24px 32px'}"
      :bordered="false"
    >
      <a-table
        :dataSource="list"
        rowKey="_id"
      >
        <a-table-column
          title="餐次"
          dataIndex="dining_title"
          width="200px"
        />
        <a-table-column
          title="选项"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.dish }}
            </div>
            <div>
              {{ scope.dish_desc }}
            </div>
          </template>
        </a-table-column>
        <a-table-column
          title="姓名"
          dataIndex="username"
          key="username"
          width="100px"
        />
        <a-table-column
          title="公司"
          dataIndex="corp"
          key="corp"
          width="100px"
        >
          <template slot-scope="scope">
            <span v-if="scope === 'xd'">心动</span>
            <span v-else-if="scope === 'xde'">心动互娱</span>
            <span v-else-if="scope === 'xc'">心珹</span>
            <span v-else-if="scope === 'tap'">Taptap</span>
            <span v-else-if="scope === 'xdg'">龙成</span>
            <span v-else-if="scope === 'fantablade'">幻刃</span>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
  </page-view>
</template>
<script>
import moment from 'moment'
import { PageView } from '@/layouts'
import { statPersonByTime } from '@/api/stats'
import { mapGetters } from 'vuex'
export default {
  name: 'DiningList',
  components: {
    PageView
  },
  computed: {
    ...mapGetters(['userInfo', 'role']),
    list () {
      const _ret = []
      this.rawList.forEach(_item => {
        const dishesByID = {}
        _item.dining[0].menu.forEach(el => {
          dishesByID[el._id] = el
        })
        _item.orderList.forEach(_menu => {
          _menu.orders.forEach(_order => {
            _ret.push({
              username: _order.userInfo.username,
              corp: _order.userInfo.corp,
              email: _order.userInfo.email,
              dining_title: _item.dining[0].title,
              dish: dishesByID[_menu.menu_id].title,
              dish_desc: dishesByID[_menu.menu_id].desc
            })
          })
        })
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
    if (this.role < 2) {
      this.corp = this.userInfo.channel
    }
  },
  data () {
    return {
      time: [
        moment().subtract(7, 'd').set('hour', 0).set('minute', 0).set('second', 0),
        moment().set('hour', 23).set('minute', 59).set('second', 59)
      ],
      rawList: [],
      corp: 'all',
      loading: false
    }
  },
  methods: {
    async queryDining () {
      this.loading = true
      this.rawList = []
      try {
        const _res = await statPersonByTime(this.corp, this.time[0].format('x'), this.time[1].format('x'))
        this.rawList = _res
      } catch (error) {
        this.$message.error('查询失败 ' + (error.isAxiosError ? JSON.stringify(error.response.data) : error.message))
      }
      this.loading = false
    },
    exportXLSX () {
      const book = this.$xlsx.utils.book_new()
      this.$xlsx.utils.book_append_sheet(
        book,
        this.$xlsx.utils.json_to_sheet(
          [
            {
              username: '姓名',
              corp: '企业',
              email: '邮箱',
              dining_title: '餐次',
              dish: '菜品',
              dish_desc: '详情'
            },
            ...this.list
          ],
          {
            header: [
              'username',
              'corp',
              'email',
              'dining_title',
              'dish',
              'dish_desc'
            ],
            skipHeader: true
          }
        ),
        'Sheet1'
      )
      this.$xlsx.writeFile(
        book,
        (
          this.time[0].format('Y-MM-DD') +
          ' - ' +
          this.time[1].format('Y-MM-DD') +
          ' 个人点餐明细.xlsx'
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
