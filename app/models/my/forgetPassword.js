import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { sendCode, confirmCode, changePassword } from '../../services/my'

export default {
  namespace: 'forgetPassword',
  state: {
      isSend: false,
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
          const data = yield call(sendCode, info, true)
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
              yield put(NavigationActions.navigate({ routeName: 'ForgetPassword', params: { phone: data } }))
          } else {
              yield put(createAction('save')({ subLoading: false }))
          }
      },

      // 修改密码
      *changePassword({ payload: info }, { call, put, select }) {
          yield put(createAction('save')({ subLoading1: true }))
          const data = yield call(changePassword, info)
          if (data) {
              yield put(createAction('save')({ subLoading1: false }))
              yield put(NavigationActions.navigate({ routeName: 'Login' }))
          } else {
              yield put(createAction('save')({ subLoading1: false }))
          }
      },
  },
}
