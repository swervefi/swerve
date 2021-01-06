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

// TODO: make input active
export const Active = () => ({
  components: {
    SInput
  },
  template: '<SInput label="Active"></SInput>'
})

export const Complete = () => ({
  components: {
    SInput
  },
  template: '<SInput label="Disabled"></SInput>'
})

export const Error = () => ({
  components: {
    SInput
  },
  template: '<SInput label="Error"></SInput>'
})
