import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getWaybill } from '../../services/waybill'

export default {
  namespace: 'waybillSearch',
  state: {
      startTime: null,
      endTime: null,
      stateOrderStatus: null,
      stateBalanceStatus: null,
      businessType: null,
      deliveryNoinput: null,
      shipmentCodeinput: null,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {

  },
}
