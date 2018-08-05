import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getWaybillDetail } from '../../services/waybill'

export default {
  namespace: 'waybillDetail',
  state: {
      orderList: [],        // 送货单明细列表
      shipmentCode: '',     // 运单号
      barCode: '',           // 条形码
      loading: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取订单详情
    *getWaybillDetail({ payload }, { call, put, select }) {
        yield put(createAction('save')({ loading: true, orderList: [] }))
        const info = yield select(state => state.waybillDetail)
        const data = yield call(getWaybillDetail, info)
        if (data) {
            yield put(createAction('save')({ loading: false }))
            yield put(createAction('save')(data))
        } else {
            yield put(createAction('save')({ loading: false }))
        }
    },
  },
}
