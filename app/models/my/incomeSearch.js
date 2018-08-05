import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getWaybill } from '../../services/waybill'

export default {
  namespace: 'incomeSearch',
  state: {
      startTime: null,
      endTime: null,
      stateBalanceStatus: null,
      transAgreement: null,
      deliveryNo: null,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {

  },
}
