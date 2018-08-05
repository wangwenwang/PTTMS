import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { login, setRegistrationID, localMemberInfo } from '../../services/my'
import JPush from 'react-native-jpush'

export default {
  namespace: 'login',
  state: {
      loginName: '',
      password: '',
      waybillList: [],
      loginLoading: false
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 登录
    *login({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ loginLoading: true }))
        const data = yield call(login, info)
        if (data.send) {
            yield put(createAction('save')({ loginLoading: false }))
            yield call(delay, 1000)
            yield put(NavigationActions.navigate({ routeName: 'HomeNavigator' }))
            const registrationId = yield JPush.getRegistrationID()
                .then(id => {
                    return id
                })
            yield call(setRegistrationID, registrationId)
            // yield call(setRegistrationID)
        } else {
            yield put(createAction('save')({ loginLoading: false }))
        }
    },
      *getLoginInfo({ payload }, { call, put, select }) {
          const loginInfo = yield storage.load({
              key: 'loginInfo',
          }).then(ret => {
              return ret
          }).catch(err => {
              console.warn('没有找到相关数据')
          })
          if (loginInfo) {
              yield put(createAction('save')(loginInfo))
          }
      },
  },
}
