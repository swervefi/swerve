import SInput from './SInput.vue'

export default {
  title: 'Components/Input',
  component: SInput
}

export const Default = () => ({
  components: {
    SInput
  },
  template: '<SInput label="Default"></SInput>'
})

export const Disabled = () => ({
  components: {
    SInput
  },
  template: '<SInput label="Disabled" disabled></SInput>'
})
