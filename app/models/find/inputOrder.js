import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { findOrder } from '../../services/find'
import { getVehicleType, localMemberInfo, getLocation } from '../../services/my'
import { Toast } from 'antd-mobile'

export default {
  namespace: 'inputOrder',
  state: {
    findList: [],
    vehicleTypeList: [],
    memberInfo: {},
    location: '',
    subLoading: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 发布空单
    *findOrder({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading: true }))
        const data = yield call(findOrder, info)
        if (data.send) {
            yield put(createAction('save')({ subLoading: false }))
            yield call(delay, 1000)
            // yield put(NavigationActions.back())
            yield put(NavigationActions.navigate({ routeName: 'Find' }))
        } else {
            yield put(createAction('save')({ subLoading: false }))
        }
    },
    // 获取车型
    *getVehicleType({ payload }, { call, put, select }) {
        const data = yield call(getVehicleType)
        if (data) {
            yield put(createAction('save')(data))
        }
    },
      // 获取个人信息
      *localMemberInfo({ payload }, { call, put, select }) {
          const data = yield call(localMemberInfo)
          if (data) {
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
