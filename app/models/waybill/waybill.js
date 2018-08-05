import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getWaybill } from '../../services/waybill'

export default {
  namespace: 'waybill',
  state: {
    currentPage: 1,
    numberPerPage: 5,
    loading: false,
    refreshing: false,
    isOver: false,
    waybillList: [],
    searchValue: null,
  },
  reducers: {
    loginStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    loginEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取运单列表
    *getWaybill({ payload }, { call, put, select }) {
        // console.warn(searchValue)
        const info = yield select(state => state.waybill)
        yield put(createAction('save')({ loading: true }))

        let data     // 返回数据
        if (info.searchValue) {
            data = yield call(getWaybill, info.searchValue, info)
        } else {
            data = yield call(getWaybill, false, info)
        }

        if (data) {
            // console.warn('success')
            yield put(createAction('save')({
                waybillList: info.currentPage === 1 ? data.waybillList : [ ...info.waybillList, ...data.waybillList],
                loading: false,
                refreshing: false,
            }))
        } else {
            yield put(createAction('save')({
                loading: false,
                refreshing: false,
            }))
        }
    },
  },
}
