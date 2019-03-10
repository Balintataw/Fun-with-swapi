// test.js

// Import the `mount()` method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';

import App from '@/js/views/App.vue';
import Home from '@/js/pages/Home.vue';
import { JestEnvironment } from '@jest/environment';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(VueRouter);
// jest.mock('axios');

describe('App', () => {
    // Now mount the component and you have the wrapper
    const wrapper = mount(App, {stubs: ['router-view'], localVue });
    // console.log(wrapper);
  
    // it('renders the correct markup', () => {
    //   expect(wrapper.html()).toContain('<span class="count">0</span>')
    // });
    it('renders a div', () => {
        expect(wrapper.contains('div')).toBe(true)
    });
    // it's also easy to check for the existence of elements
    it('has a nav', () => {
      expect(wrapper.contains('nav')).toBe(true)
    });
});

describe('Home', () => {
    const wrapper = mount(Home, { localVue });

    it('fetches async when a button is clicked', (done) => {
        const wrapper = shallowMount(Home, { localVue })
        wrapper.find('button').trigger('click')
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.favorites).toEqual([])
            done()
        })
    })
})