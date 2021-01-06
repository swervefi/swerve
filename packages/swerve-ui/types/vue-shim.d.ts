import Vue, { Component } from 'vue'

declare module '*.vue' {
  export default Vue
}

declare module '*.svg' {
  const content: Component | string
  export default content
}

declare module '*.svg?raw' {
  const content: Component | string
  export default content
}
