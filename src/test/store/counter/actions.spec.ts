import { ActionContext, Commit, Dispatch } from 'vuex';
import MockAdapter from 'axios-mock-adapter';
import { CounterDefaultState, ICounterState } from '@/store/counter/state';
// import { IState } from '@/app/state';
import { CounterActions } from '@/store/counter/actions';
import { HttpService } from '~/plugins/http-service/HttpService';

describe('CounterActions', () => {
  let testContext: ActionContext<ICounterState, ICounterState>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      state: CounterDefaultState(),
    } as ActionContext<ICounterState, ICounterState>;

    mockAxios = new MockAdapter(HttpService);
  });

  test('it should call INCREMENT action on success', async () => {
    const commitMock: jest.Mock = testContext.commit as jest.Mock;

    mockAxios.onPut('/counter/increment').reply(200, { count: 1337 });

    await CounterActions.increment(testContext);

    expect(commitMock.mock.calls[0]).toEqual(['SET_INCREMENT_PENDING', true]);
    expect(commitMock.mock.calls[1]).toEqual(['SET_COUNT', 1337]);
    expect(commitMock.mock.calls[2]).toEqual(['SET_INCREMENT_PENDING', false]);
  });

  test('it should set INCREMENT pending to false on fail', async () => {
    const commitMock: jest.Mock = testContext.commit as jest.Mock;

    mockAxios.onPut('/counter/increment').reply(500);

    try {
      await CounterActions.increment(testContext);
    } catch (e) {
      expect(commitMock.mock.calls[0]).toEqual(['SET_INCREMENT_PENDING', true]);
      expect(commitMock.mock.calls[1]).toEqual(['SET_INCREMENT_PENDING', false]);
    }
  });

  test('it should call DECREMENT action on success', async () => {
    const commitMock: jest.Mock = testContext.commit as jest.Mock;

    mockAxios.onPut('/counter/decrement').reply(200, { count: 1337 });

    await CounterActions.decrement(testContext);

    expect(commitMock.mock.calls[0]).toEqual(['SET_DECREMENT_PENDING', true]);
    expect(commitMock.mock.calls[1]).toEqual(['SET_COUNT', 1337]);
    expect(commitMock.mock.calls[2]).toEqual(['SET_DECREMENT_PENDING', false]);
  });

  test('it should set DECREMENT pending to false on fail', async () => {
    const commitMock: jest.Mock = testContext.commit as jest.Mock;

    mockAxios.onPut('/counter/decrement').reply(500);

    try {
      await CounterActions.decrement(testContext);
    } catch (e) {
      expect(commitMock.mock.calls[0]).toEqual(['SET_DECREMENT_PENDING', true]);
      expect(commitMock.mock.calls[1]).toEqual(['SET_DECREMENT_PENDING', false]);
    }
  });
});
