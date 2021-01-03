import SBtn from './SBtn.vue'

export default {
  title: 'Button',
  component: SBtn
}

/**
 * Default a.k.a. outline
 */
export const Default = () => ({
  components: {
    SBtn
  },
  template: '<SBtn>Default</SBtn>'
})

export const Filled = () => ({
  components: {
    SBtn
  },
  template: '<SBtn fill>Filled</SBtn>'
})
