import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { i18n } from '@/test/test-utils';
import Home from '@/pages/index.vue';
import Stage from '@/components/home/Stage/Stage.vue';
import HomeSection from '@/components/home/HomeSection/HomeSection.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Home.vue', () => {
  test('renders component', () => {
    const store = new Vuex.Store({
      state: {
        app: {
          config: {
            features: {
              disableParticles: false,
            },
          },
        },
      },
    });
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.findAllComponents(Stage)).toHaveLength(1);
    expect(wrapper.findAllComponents(HomeSection)).toHaveLength(4);
  });
});
