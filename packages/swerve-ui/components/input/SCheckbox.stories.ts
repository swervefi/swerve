import SCheckbox from './SCheckbox.vue'

export default {
  title: 'Components/Token Input',
  component: SCheckbox
}

export const Default = () => ({
  components: {
    SCheckbox
  },
  template: '<SCheckbox label="To" token="dai"></SCheckbox>'
})
