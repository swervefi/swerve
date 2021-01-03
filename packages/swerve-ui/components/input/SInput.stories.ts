import SInput from './SInput.vue'

export default {
  title: 'Input',
  component: SInput
}

export const Default = () => ({
  components: {
    SInput
  },
  template: '<SInput label="Default"></SInput>'
})
