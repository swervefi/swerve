import SBtn from './SBtn.vue'

export default {
  title: 'Components/Button',
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

export const Link = () => ({
  template: '<SBtn to="/styleguide">Styleguide</SBtn>'
})
