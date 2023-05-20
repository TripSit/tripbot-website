import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// import { useI18n } from 'vue-i18n'

// vi.mock("vue-i18n");

import HomePage from '../../views/HomePage.vue'

// const wrapperFactory = () => {
//   const i18n = useI18n(app)
//   i18n.global.mocks.$t = (msg: string) => msg

//   const wrapper = mount(HomePage, {
//     global: {
//       plugins: [i18n],
//     },
//   })

//   return wrapper
// }

// const wrapper = wrapperFactory();

describe('DashboardHome', () => {
  it('renders properly', () => {
    const wrapper = mount(HomePage, { props: { msg: 'Hello Vitest' } })

    // Access component instance
    const vm = wrapper.vm

    // Access properties from setup()
    expect(vm.$t('sidebar.dashboard')).toBe('Expected Sidebar Dashboard Text')
    expect(vm.username).toBe('Expected Username')

    // Access elements in the template
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})