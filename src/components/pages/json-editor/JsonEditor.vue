<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

const JE = reactive({ value: null })
const valueChange = ref('')

onMounted(() => {
  JE.value = JSONEditor

  // Initialize the editor
  const editor = new JE.value(document.getElementById('editor_holder'), {
    disable_edit_json: true,
    iconlib: 'fontawesome4',
    theme: 'bootstrap3',
    schema: {
      title: 'Properties Conditons Node',
      type: 'array',
      uniqueItems: true,
      // Self-referential schema in array items
      items: {
        type: 'object',
        properties: {
          condition: {
            $ref: '#/definitions/condition',
          },
          block_condition: {
            type: 'string',
            enum: ['', 'AND', 'OR'],
          },
        },
        required: ['condition'],
        dependentRequired: {
          block_condition: ['condition'],
        },
      },
      definitions: {
        condition: {
          type: 'object',
          id: 'condition',
          // The object will start with only these properties
          defaultProperties: [
            'left_condition',
            'inner_operator',
            'right_condition',
            'logic_condition',
            'child_condition',
          ],
          properties: {
            logic_condition: {
              type: 'string',
              enum: ['', 'AND', 'OR'],
              default: '',
            },
            left_condition: {
              title: 'Left Condition',
              type: 'string',
            },
            inner_operator: {
              type: 'string',
              enum: ['==', '!=', '>', '>=', '<', '<='],
            },
            right_condition: {
              title: 'Right Condition',
              type: 'string',
            },

            child_condition: {
              title: 'Child Condition',
              type: 'array',
              uniqueItems: true,
              maxContains: 3,
              items: {
                title: 'condition',
                $ref: '#/definitions/condition',
              },
            },
          },
        },
      },
    },
  })

  editor.on('change', () => {
    const watcherCallback = function (path) {
      const data = editor.getEditor(path).getValue()
      if (!Object.prototype.hasOwnProperty.call(data, 'block_condition')) {
        return
      }
      console.log(data, '======data')

      const item = itemCondition(data)
      valueChange.value = `(${item}) ${data?.block_condition}`
    }

    for (let key in editor.editors) {
      if (Object.prototype.hasOwnProperty.call(editor.editors, key) && key !== 'root') {
        editor.watch(key, watcherCallback.bind(editor, key))
      }
    }
  })
})

const getCondition = computed(() => {
  return valueChange.value
})

const itemCondition = (data) => {
  return `(${data?.condition.left_condition} ${data?.condition.inner_operator} ${
    data?.condition.right_condition
  }) ${data?.condition.logic_condition} (${childCondition(data)})`
}

const childCondition = (data) => {
  let result = ''
  const arr = data.condition.child_condition
  console.log(arr, '=====arr')

  if (arr.length) {
    result = recursive(arr)
  }

  return result
}

const recursive = (arr) => {
  let result = ''

  for (let element of arr) {
    const childArr = element.child_condition
    result += `(${element.left_condition} ${element.inner_operator} ${element.right_condition} ${
      childArr.length > 0 ? `(${recursive(childArr)})` : ''
    }) ${element.logic_condition} `
  }

  return result
}
</script>

<template>
  <div>{{ getCondition }}</div>
  <el-divider />
  <div class="row">
    <div class="col-md-12">
      <div id="editor_holder"></div>
    </div>
  </div>
</template>
