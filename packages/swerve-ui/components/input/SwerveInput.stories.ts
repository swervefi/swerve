import SwerveInput from './SwerveInput.vue'

export default {
  title: 'Input',
  component: SwerveInput
}

export const Default = () => ({
  components: {
    SwerveInput
  },
  template: '<SwerveInput label="Default"></SwerveInput>'
})
