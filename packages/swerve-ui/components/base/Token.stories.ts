import SToken from './SToken.vue'

export default {
  title: 'Components/Token',
  component: SToken,
  argTypes: {
    token: {
      control: {
        type: 'select',
        options: ['dai', 'usdc', 'usdt', 'tusd']
      }
    }
  }
}

const Template = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { SToken },
  template: '<SToken @onClick="onClick" v-bind="$props" />'
})

export const Default = Template.bind({})

// export const Eth = () => ({
//   components: {
//     SToken
//   },
//   template: '<SToken token="`Eth`"></SToken>'
// })

// export const Usdc = () => ({
//   components: {
//     SToken
//   },
//   template: '<SToken token="`Usdc`"></SToken>'
// })
