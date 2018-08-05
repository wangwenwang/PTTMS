import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getWaybill } from '../../services/waybill'

export default {
  namespace: 'waybillSearchResult',
  state: {
    waybillList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取运单列表
    *getWaybill({ payload: searchValue }, { call, put, select }) {
        const data = yield call(getWaybill, searchValue)
        if (data) {
            yield put(createAction('save')(data))
        }
    },
  },
}
