import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { deliveryConfirm, deliveryRDC } from '../../services/waybill'

export default {
  namespace: 'deliveryConfirm',
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
    // 交货确认
    *deliveryConfirm({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading: true }))
        const data = yield call(deliveryConfirm, info)
        if (data.send) {
            yield put(createAction('save')({ subLoading: false }))

            // 刷新上一个页面
            if (!info.deliveryId) {
                yield put(createAction('waybill/getWaybill')())
            } else {
                yield put(createAction('waybillDetail/getWaybillDetail')())
            }

            yield call(delay, 1000)
            yield put(NavigationActions.back())
            // yield put(NavigationActions.navigate({ routeName: 'Waybill' }))
        } else {
            yield put(createAction('save')({ subLoading: false }))
        }
    },
      // ss
      *deliveryRDC({ payload: info }, { call, put, select }) {
          const data = yield call(deliveryRDC, info)
          if (data) {
              yield put(createAction('save')(data))
          }
      },
  },
}
