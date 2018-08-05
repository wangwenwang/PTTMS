import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getIncomeList } from '../../services/my'

export default {
  namespace: 'income',
  state: {
      currentPage: 1,
      numberPerPage: 5,
      loading: false,
      refreshing: false,
      isOver: false,
      incomeList: [],
      searchValue: null,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 查询费用统计
    *getIncomeList({ payload }, { call, put, select }) {
        const info = yield select(state => state.income)
        // alert(JSON.stringify(info))
        yield put(createAction('save')({ loading: true }))

        let data     // 返回数据
        if (info.searchValue) {
            data = yield call(getIncomeList, info.searchValue, info)
        } else {
            data = yield call(getIncomeList, false, info)
        }

        if (data) {
            // console.warn('success')
            // console.warn(JSON.stringify(info))
            yield put(createAction('save')({
                incomeList: info.currentPage === 1 ? data.incomeList : [ ...info.incomeList, ...data.incomeList],
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
