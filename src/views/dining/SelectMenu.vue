<template>
  <a-list bordered>
    <draggable
      :list="$props.value"
      draggable=".item"
      filter=".drag-ignore"
      :preventOnFilter="false"
    >
      <a-list-item
        class="list-group-item item"
        v-for="(dishId, index) in $props.value"
        :key="dishId"
      >
        <a-list-item-meta
          :description="dishInfoById(dishId).desc"
        >
          <span slot="title">{{ dishInfoById(dishId).title }}</span>
        </a-list-item-meta>
        <span slot="actions">{{ dishInfoById(dishId).supplier }}</span>
        <a-input-number
          v-model="$props.limits[dishId]"
          :disabled="dishId === skipMealId"
          :min="0"
          slot="actions"
          class="drag-ignore"
        />
        <a-button
          slot="actions"
          type="danger"
          shape="circle"
          icon="delete"
          size="small"
          @click="$props.value.splice(index,1)"
        />
      </a-list-item>

    </draggable>
    <div
      slot="header"
      class="menu-tools"
    >
      <a-select
        showSearch
        :value="searchText"
        placeholder="Select users"
        :defaultActiveFirstOption="false"
        :filterOption="false"
        @search="handleSearch"
        @change="handleChange"
      >
        <a-select-option
          v-for="item in filtedDish"
          :title="item.desc"
          :key="item._id"
        >
          <div>
            {{ item.title }}
          </div>
          <div>
            {{ item.desc }}
          </div>
        </a-select-option>
      </a-select>
      <a-button
        type="primary"
        @click="addDishModal.visible = true"
      >新增菜品并添加</a-button>
      <a-button
        type="primary"
        @click="addSkipMeal"
        :disabled="skipMealAdded"
      >添加今天不吃饭</a-button>
      <a-button
        type="primary"
        @click="clearExceptSkipMeal"
      >清除非不吃饭选项</a-button>
    </div>
    <a-modal
      title="Title"
      :visible="addDishModal.visible"
      @ok="addAndAppendDish"
      @cancel="addDishModal.visible = false"
      @afterClose="resetAppendDishForm"
    >
      <a-form-model
        ref="addDishForm"
        :model="addDishModal.form"
        :label-col="{span:4}"
        :rules="{
          title: [
            {required: true, trigger: 'blur'}
          ],
          desc: [
            {required: true, trigger: 'blur'}
          ],
          supplier: [
            {required: true, trigger: 'blur'}
          ]
        }"
      >
        <a-form-model-item
          label="名称"
          prop="title"
          :wrapper-col="{span: 18}"
        >
          <a-input v-model="addDishModal.form.title" />
        </a-form-model-item>
        <a-form-model-item
          label="描述"
          prop="desc"
          :wrapper-col="{span: 18}"
        >
          <a-input
            type="textarea"
            v-model="addDishModal.form.desc"
          />
        </a-form-model-item>
        <a-form-model-item
          label="供应商"
          prop="supplier"
          :wrapper-col="{span: 18}"
        >
          <a-input v-model="addDishModal.form.supplier" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-list>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
export default {
  name: 'SelectMenu',
  components: {
    draggable
  },
  computed: {
    ...mapGetters(['dishLastFifty', 'dishList', 'dishInfoById']),
    skipMealId () {
      return this.$store.getters.dishSkipMealId?._id
    },
    skipMealAdded () {
      return this.$props.value.includes(this.skipMealId)
    },
    filtedDish () {
      const _search = this.searchText.trim()
      if (!_search || _search === '+') {
        return this.dishLastFifty
          .filter(el => !this.$props.value.includes(el._id))
      }
      return this.dishList
        .filter(el => (el.title.includes(_search) ||
          el.desc.includes(_search)
        ))
    }
  },
  props: {
    value: {
      type: Array,
      default: Array
    },
    limits: {
      type: Object,
      default: Object
    }
  },
  data () {
    return {
      searchText: '',
      addDishModal: {
        visible: false,
        form: {
          title: '',
          desc: '',
          supplier: ''
        }
      }
    }
  },
  methods: {
    ...mapActions(['AppendDish']),
    async addAndAppendDish () {
      try {
        if (!await this.$refs.addDishForm.validate()) return
        const res = await this.AppendDish(this.addDishModal.form)
        this.addDish(res._id)
      } catch (error) {

      }
    },
    resetAppendDishForm () {
      this.addDishModal.form = {
        title: '',
        desc: '',
        supplier: ''
      }
    },
    filterOption (input, option) {
      return option.title.includes(input) || option.desc.includes(input)
    },
    addSkipMeal () {
      this.addDish(this.skipMealId)
    },
    handleSearch (value) {
      this.searchText = value
    },
    handleChange (value) {
      this.searchText = ''
      this.addDish(value)
    },
    addDish (id) {
      if (this.$props.value.includes(id)) {
        return
      }
      this.$props.value.push(id)
      this.$set(this.$props.limits, id, 0)
    },
    clearExceptSkipMeal () {
      this.$emit('input', this.$props.value.filter(el => el === this.skipMealId))
      this.$set(this.$props, 'limits', {})
      this.$set(this.$props.limits, this.skipMealId, 0)
    }
  }
}
</script>
<style scoped>
.menu-tools {
  display: flex;
}
.menu-tools > * {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
