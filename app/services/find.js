/**
 * Created by Administrator on 2017/5/22.
 */
/**
 * Created by Administrator on 2017/5/20.
 */
import request from '../utils/request'
import { baseUrl, apiUrl } from '../utils/config'
import { Toast } from 'antd-mobile'
import { getNowFormatDate } from '../utils/base'
import moment from 'moment'
import { localMemberInfo } from './my'

// 获取找货列表（含查询）
export async function getFindLists(searchValue, info) {
    const memberInfo = await localMemberInfo()

    let params
    if (searchValue) {
        params = {
            currentPage: info.currentPage,                                                              // 当前第几页
            numberPerPage: info.numberPerPage,                                                         // 每页显示几条
            startDate: searchValue.startTime ? getNowFormatDate(searchValue.startTime) : '',                  // 开始时间
            endDate: searchValue.endTime ? getNowFormatDate(searchValue.endTime) : '',                    // 结束时间
            findGoodsStatus: searchValue.orderStatus ? searchValue.orderStatus.join() : null,                     // 状态
            loginName: memberInfo.memberInfo.loginName,        // 当前用户登录名
        }
    } else {
        params = {
            currentPage: info.currentPage,                     // 当前第几页
            numberPerPage: info.numberPerPage,                  // 每页显示几条
            loginName: memberInfo.memberInfo.loginName,        // 当前用户登录名
        }
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryFindGoodsData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        const findList = data.data.map((item) => {
            // console.log(item.vehicleType)
            // 转换空单状态
            let status
            switch (item.status) {
                case 'UN_FINISH':
                    status = '未选用'
                    break
                case 'FINISH':
                    status = '已选用'
                    break
                case 'CANCEL':
                    status = '已作废'
                    break
            }
            // console.warn(item.operationDate)
            return {
                operationDate: item.operationDate,       // 发布时间
                vehicleCode: item.vehicleNo,               // 车牌号
                startCity: item.fromCity,                  // 起点城市
                endCity: item.toCity,                      // 终点城市
                vehicleType: item.vehicleType,            // 规格
                price: item.price,                         // 价格
                phone: item.cellphone,                     // 手机号
                remark: item.remark,                       // 备注
                currentLocation: item.currentLocation,   // 当前位置
                dispatchName: item.diaoDuName,             // 调度人姓名
                dispatchPhone: item.diaoDuCellphone,       // 调度人手机
                selectDate: item.selectDate,               // 选用时间
                status: status,                              // 状态
                id: item.id,                                  // id
            }
        })
        return {
            findList: findList,
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 发布空车
export async function findOrder(info) {
    const memberInfo = await localMemberInfo()

    let vehicleType
    // 转换车辆车型
    if(typeof(info.vehicleType) === 'string') {
        vehicleType = info.vehicleType
    } else if (typeof(info.vehicleType) === 'object') {
        vehicleType = info.vehicleType.join()
    }
    // 时间处理
    const time = moment(new Date(info.time)).utcOffset(8).format().substring(0, 10).replace('T', ' ')

    // console.warn(JSON.stringify(info))
    const params = {
        operationDate: time,                            // 日期
        expiryDate: parseInt(info.validity),                     // 有效时间（小时）
        fromCity: info.startCity,                      // 起点城市
        toCity: info.endCity,                           // 终点城市
        vehicleNo: info.vehicleCode,                   // 车牌号
        vehicleType: vehicleType,                       // 车型
        currentLocation: info.position,                 // 当前位置
        cellphone: info.phone,                          // 手机号
        remark: info.remark ? info.remark : '',         // 备注
        price: info.price ? parseInt(info.price) : null,            // 价格
        userName: memberInfo.memberInfo.userName,                       // 当前登录用户名
        loginName: memberInfo.memberInfo.loginName,                      // 当前用户登录名
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}saveFindGoods.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.success('发布成功', 1, null, true)
        return {
            send: true
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return {
            send: false
        }
    }
}

// 空单作废
export async function cancleOrder(id) {
    Toast.loading('加载中...', 0)
    const params = {
        id: id,    // 空单id
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}cancelFindGoodsData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.hide()
        Toast.success(data.Msg, 2, null, true)
        return true
    } else {
        Toast.hide()
        Toast.offline(data.Msg, 2, null, true)
        return false
    }
}