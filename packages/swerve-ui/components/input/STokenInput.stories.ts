import STokenInput from './STokenInput.vue'

export default {
  title: 'Components/Token Input',
  component: STokenInput
}

export const Default = () => ({
  components: {
    STokenInput
  },
  template: '<STokenInput label="To" token="dai"></STokenInput>'
})
