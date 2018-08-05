import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { changeInfo, getVehicleType } from '../../services/my'

export default {
  namespace: 'myInfo',
  state: {
      vehicleTypeList: [],
      subLoading: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 修改用户信息
    *changeInfo({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading: true }))
        const data = yield call(changeInfo, info)
        if (data.send) {
            yield put(createAction('save')({ subLoading: false }))
            yield call(delay, 1000)
            // yield put(NavigationActions.back())
            yield put(NavigationActions.navigate({ routeName: 'My' }))
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
  },
}
