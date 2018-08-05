import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getFindLists, cancleOrder } from '../../services/find'

export default {
  namespace: 'find',
  state: {
    currentPage: 1,
    numberPerPage: 5,
    loading: false,
    refreshing: false,
    isOver: false,
    findList: [],
    searchValue: null,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取找货列表
    *getFindList({ payload }, { call, put, select }) {
        const info = yield select(state => state.find)
        yield put(createAction('save')({ loading: true }))

        let data     // 返回数据
        if (info.searchValue) {
            data = yield call(getFindLists, info.searchValue, info)
        } else {
            data = yield call(getFindLists, false, info)
        }

        if (data) {
            // console.warn('success')
            // console.warn(JSON.stringify(info))
            // console.warn(JSON.stringify(data))
            yield put(createAction('save')({
                findList: info.currentPage === 1 ? data.findList : [ ...info.findList, ...data.findList],
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
      // 空单作废
      *cancleOrder({ payload: id }, { call, put, select }) {
          const data = yield call(cancleOrder, id)
          if (data) {
              yield put(createAction('save')({
                  currentPage: 1,
                  numberPerPage: 5,
                  loading: false,
                  refreshing: false,
                  isOver: false,
              }))
              yield put(createAction('find/getFindList')())
          }
      },
  },
}
