import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { signUp, sendCode, confirmCode, getVehicleType } from '../../services/my'

export default {
  namespace: 'signUp',
  state: {
    isSend: false,
    waybillList: [],
    vehicleTypeList: [],
      subLoading: false,
      subLoading1: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
      // 发送验证码
      *sendCode({ payload: info }, { call, put, select }) {
          const data = yield call(sendCode, info)
          if (data) {
              yield put(createAction('save')({ isSend: true }))
          }
      },

    // 验证验证码
      *confirmCode({ payload: info }, { call, put, select }) {
          yield put(createAction('save')({ subLoading: true }))
          const data = yield call(confirmCode, info)
          if (data) {
              yield put(createAction('save')({ subLoading: false }))
              yield put(NavigationActions.navigate({ routeName: 'SignUpNext', params: { phone: data } }))
          } else {
              yield put(createAction('save')({ subLoading: false }))
          }
      },

    // 注册
    *signUp({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading1: true }))
        const data = yield call(signUp, info)
        if (data) {
            yield put(createAction('save')({ subLoading1: false }))
            yield put(NavigationActions.navigate({ routeName: 'Login' }))
        } else {
            yield put(createAction('save')({ subLoading1: false }))
        }
    },
      // 获取车型
      *getVehicleType({ payload }, { call, put, select }) {
          const data = yield call(getVehicleType)
          if (data) {
              yield call(delay, 1000)
              yield put(createAction('save')(data))
          }
      },
  },
}
