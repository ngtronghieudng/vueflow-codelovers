<template>
<div class="el-tabs__inner">
  <el-row :gutter="10" class="row-bg">
    <draggable :list="fields" :clone="clone"
    class="dragArea"
    :group= "{ name:'formbuilder', pull:'clone', put:false }"
    :sort="false">
      <template #item="{element}">
        <el-col :span="12" :class="{ 'is-disabled': checkStopDragCondition(field) }" v-for="(field, index) in fields" :key="index">
        <el-button class="button__sidebar">
          {{ field.text }}
        </el-button>
      </el-col>
      </template>
    </draggable>
  </el-row>
</div>
</template>

<script>
import FormBuilder from '@/components/pages/form-builder/form_elements/formbuilder.vue';
import draggable from 'vuedraggable';
import _ from 'lodash'

export default {
  name: 'Elements',
  // store: ['forms'],
  components: {
    draggable,
  },
  data() {
    console.log(FormBuilder, '=========FormBuilder')
    return {
      forms: [],
      fields: FormBuilder.fields,
      dropElementOptions: FormBuilder.dropElementOptions
    };
  },
  methods: {
    clone(field) {
      return _.cloneDeep(field);
    },
    checkStopDragCondition(field) {
      var form = this.forms,
        formArray = [];

      for (var key in form) {
        formArray.push(form[key]['fieldType'])
      }
      // Check if the fieldname exist in formArray
      // And when the field.isUnique too
      return _.includes(formArray, field.name) && field.isUnique;
    }
  }
}
</script>

<style lang="scss" scoped>
.button__sidebar {
    width: 100%;
    margin-bottom: 5px;

    .is-disabled & {
        opacity: 0.4;
    }
}

// Display this ghost in <main> only
 .sortable__ghost {
    position: relative;
    width: 33.33%;
    border-bottom: 2px solid #3A8EE6;
    margin-top: 2px;
    margin-bottom: 2px;

    [type="button"] {
        display: none;
    }

    &:before {
        content: "Drag it here";
        background-color: #ECF5FF;
        color: #3A8EE6;
        position: absolute;
        left: 50%;
        font-size: 10px;
        border-radius: 10px;
        line-height: 15px;
        padding: 0 10px;
        top: -6px;
        transform: translateX(-50%);
    }
}
</style>
