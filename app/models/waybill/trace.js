import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { trace } from '../../services/waybill'
import { localMemberInfo, getMemberInfo, getLocation } from '../../services/my'

export default {
  namespace: 'trace',
  state: {
    memberInfo: {},
    waybillList: [],
    subLoading: false,
    trackType: '追踪信息',
    location: ''
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 交货确认
    *trace({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading: true }))
        const data = yield call(trace, info)
        if (data.send) {
            yield put(createAction('save')({ subLoading: false }))
            yield call(delay, 1000)
            yield put(NavigationActions.back())
            // yield put(NavigationActions.navigate({ routeName: 'Waybill' }))
            // yield put(createAction('save')(data))
        } else {
            yield put(createAction('save')({ subLoading: false }))
        }
    },

      // 查询用户信息
      *getMemberInfo({ payload }, { call, put, select }) {
          const data = yield call(getMemberInfo)
          if (data) {
              // console.warn(data.memberInfo)
              yield put(createAction('save')(data))
          }
      },

      // 获取当前位置
      *getLocation({ payload }, { call, put, select }) {
          const data = yield call(getLocation)
          if (data) {
              // console.warn(data.address)
              yield put(createAction('save')({ location: data.address }))
          }
      },
  },
}
