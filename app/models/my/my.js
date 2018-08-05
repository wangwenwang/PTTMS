import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { getMemberInfo, getLocation, submitLocation, setRegistrationID, getTime, loginOut } from '../../services/my'
import { Toast } from 'antd-mobile'
import JPush from 'react-native-jpush'

export default {
  namespace: 'my',
  state: {
      memberInfo: {},
      subLocationLoading: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 查询用户信息
    *getMemberInfo({ payload }, { call, put, select }) {
        const data = yield call(getMemberInfo)
        if (data) {
            // console.warn(data.memberInfo)
            yield put(createAction('save')(data))
        }
    },
      // 上报位置
      *submitLocation({ payload: type }, { call, put, select }) {
          console.warn('1')
          yield put(createAction('save')({ subLocationLoading: true }))
          const data = yield call(getLocation)
          if (data) {
              const { memberInfo } = yield select(state => state.my)
              const submitData = yield call(submitLocation, { ...data, ...memberInfo, type: type })
              if (submitData.send) {
                  console.warn('2')
                  yield put(createAction('save')({ subLocationLoading: false }))
              }
          }
      },
      // 设置极光推送id
      *setRegistrationID({ payload }, { call, put, select }) {
          const registrationId = yield JPush.getRegistrationID()
              .then(id => {
                  return id
              })
          yield call(setRegistrationID, registrationId)
      },
      // 获取定时上传位置时间
      *getTime({ payload }, { call, put, select }) {
          const data = yield call(getTime)
          if (data) {
              while (true) {
                  console.warn('-1')
                  yield put(createAction('submitLocation')(2))
                  yield call(delay, data.time)
              }
          }
      },
      // 退出登录
      *loginOut({ payload }, { call, put, select }) {
          // 清除数据
          storage.remove({
              key: 'memberInfo'
          });

          yield put(NavigationActions.navigate({ routeName: 'Login' }))

          const info = yield select(state => state.my)
          const data = yield call(loginOut, info)
          if (data) {

          }
      }
  }
}
