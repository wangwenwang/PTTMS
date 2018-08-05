import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getIncomeList } from '../../services/my'

export default {
  namespace: 'incomeSearchResult',
  state: {
      incomeList: []
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取运单列表
    *getIncomeList({ payload: searchValue }, { call, put, select }) {
        const data = yield call(getIncomeList, searchValue)
        if (data) {
            yield put(createAction('save')(data))
        }
    },
  },
}
