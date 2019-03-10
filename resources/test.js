// test.js

import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';

import App       from '@/js/views/App.vue';
import Auth      from '@/js/pages/Auth.vue';
import Home      from '@/js/pages/Home.vue';
import Favorites from '@/js/components/Favorites.vue';
import EditModal from '@/js/components/EditModal.vue';
import UserPlugin from '@/js/plugins/user';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(VueRouter);
localVue.use(UserPlugin);
// jest.mock('axios');

describe('App', () => {
    const $user = { email: 'test@mail.com' };
    const wrapper = mount(App, {
        stubs: ['router-view'], 
        localVue
    });
  
    it('renders a div', () => {
        expect(wrapper.contains('div')).toBe(true)
    });
    it('has a nav', () => {
      expect(wrapper.contains('nav')).toBe(true)
    });
});

describe('Home', () => {
    // somewhere here favorites is not getting defined properly I think
    const favorites = ['',''];
    const wrapper = shallowMount(Home, { 
        localVue,
        propsData: { favorites }
    });
    wrapper.setProps({ favorites })
    it('fetches async when a button is clicked', (done) => {
        // this is likely horribly improper
        // not sure how to test an async loaded page
        wrapper.find('button').trigger('click') // a hidden button in Home.vue 
        wrapper.vm.$nextTick(() => {
            console.log("VM", wrapper.vm.favorites) // returns []
            expect(wrapper.vm.favorites).toEqual([])
            done()
        })
    });
});

describe('Auth', () => {
    const wrapper = mount(Auth, { localVue });

    it('renders login form', () => {
        expect(wrapper.contains('form')).toBe(true)
    });
});

describe('EditModal', () => {
    const wrapper = mount(EditModal, { localVue });

    it('renders modal header', () => {
        expect(wrapper.contains('header')).toBe(true)
    });
});

describe('Favorites', () => {
    const favorites = ['',''];
    const wrapper = shallowMount(Favorites, { 
        localVue,
        propsData: { favorites }
     });
    const divs = wrapper.findAll('div')
    const div = divs.at(0)

    it('renders list tag', () => {
        expect(div.classes()).toContain('testref')
    }); 
});