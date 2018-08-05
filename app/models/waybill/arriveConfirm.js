import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { arriveConfirm, arriveRDC } from '../../services/waybill'

export default {
  namespace: 'arriveConfirm',
  state: {
    RDCList: [],       // RDCList
    subLoading: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 到站确认
    *arriveConfirm({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading: true }))
        const data = yield call(arriveConfirm, info)
        if (data.send) {
            yield put(createAction('save')({ subLoading: false }))
            yield call(delay, 1000)
            // yield put(NavigationActions.back())
            yield put(NavigationActions.navigate({ routeName: 'Waybill' }))
            // yield put(createAction('save')(data))
        } else {
            yield put(createAction('save')({ subLoading: false }))
        }
    },
      // 到站RDC查询
      *arriveRDC({ payload: id }, { call, put, select }) {
          const data = yield call(arriveRDC, id)
          if (data) {
              yield put(createAction('save')(data))
          }
      },
  },
}
