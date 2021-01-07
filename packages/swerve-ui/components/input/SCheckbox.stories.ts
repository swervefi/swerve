import SCheckbox from './SCheckbox.vue'

export default {
  title: 'Components/Checkbox',
  component: SCheckbox,
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    label: {
      control: {
        control: 'text',
        defaultValue: 'Sweet Input'
      }
    },
    name: {
      control: {
        control: 'text',
        defaultValue: 'field1'
      }
    }
  }
}

const Template = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { SCheckbox },
  template: '<SCheckbox @onClick="onClick" v-bind="$props" />'
})

export const Default = Template.bind({})
