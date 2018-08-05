
import request from '../utils/request'
import { baseUrl, apiUrl } from '../utils/config'
import { Toast } from 'antd-mobile'
import { getNowFormatDate } from '../utils/base'
import { localMemberInfo } from './my'

// 获取竞价列表（含查询）
export async function getReleaseList(searchValue, info) {
    const memberInfo = await localMemberInfo()

    let params
    if (searchValue) {
        params = {
            currentPage: info.currentPage,                                                              // 当前第几页
            numberPerPage: info.numberPerPage,                                                         // 每页显示几条
            startDate: searchValue.startTime ? getNowFormatDate(searchValue.startTime) : '',           // 开始时间
            endDate: searchValue.endTime ? getNowFormatDate(searchValue.endTime) : '',                 // 结束时间
            status: searchValue.orderStatus ? searchValue.orderStatus.join() : null,                // 状态
            vicheNo: memberInfo.memberInfo.vicheNo,                                                  // 当前登录用户的车牌号
            loginName: memberInfo.memberInfo.loginName,                                              // 当前用户登录名
            vehicleType: memberInfo.memberInfo.vehicleType,                                         // 当前用户登录用户的车型
        }
    } else {
        params = {
            currentPage: info.currentPage,                         // 当前第几页
            numberPerPage: info.numberPerPage,                    // 每页显示几条
            vicheNo: memberInfo.memberInfo.vicheNo,              // 当前登录用户的车牌号
            loginName: memberInfo.memberInfo.loginName,         // 当前用户登录名
            vehicleType: memberInfo.memberInfo.vehicleType,     // 当前用户登录用户的车型
        }
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryGetOrderData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })

    // console.warn(data.status)
    if (data.status == 1) {
        // console.warn(data.data.length)
        const releaseList = data.data.map((item) => {
            let tradingType, status

            // 转换交易方式
            switch (item.tradingWay) {
                case 'designatedVehicle':
                    tradingType = '指定车辆'
                    break
                case 'priceGrab':
                    tradingType = '定价抢单'
                    break
                case 'competitiveBidding':
                    tradingType = '竞价抢单'
                    break
            }

            // 转换交易状态
            switch (item.status) {
                case 'UN_FINISH':
                    status = '竞价中'
                    break
                case 'YIJINGJIA':
                    status = '已竞价'
                    break
                case 'CANCEL':
                    status = '取消'
                    break
                case 'FINISH':
                    status = '完成'
                    break
                case 'JIJIASB':
                    status = '未被选用'
                    break
                case 'JIJIACG':
                    status = '被选用'
                    break
            }

            return {
                requireDate: item.requiredIssueDte.substring(0, 10),       // 日期
                bidNumber: item.tbNo,                      // 投标号
                startCity: item.issuePartyCity,            // 起点城市
                endCity: item.receivePartyCity,            // 终点城市
                address: item.address1,                    // 发货地址
                weight: item.orderWt,                       // 重量
                volume: item.orderVol,                      // 体积
                tradingType: tradingType,                  // 交易方式
                status: status,                              // 状态
                vehicle: item.vehicle,                      // 指定车辆
                vehicleType: item.customerVehicleType,       // 指定车型
                dispatchName: item.diaoDuName,               // 调度姓名
                dispatchPhone: item.diaoDuCellphone,         // 调度手机
                remark: item.customerRemark,                 // 备注
                price: item.recTotalMoney,                    // 价格
            }
        })
        return {
            releaseList: releaseList,
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 竞价提交
export async function bidding(info) {
    const memberInfo = await localMemberInfo()
    const params = {
        tbNo: info.vehicleCode,                     // 投标号
        price: parseInt(info.price),                // 竞价金额
        remark: info.remark ? info.remark : '',    // 备注
        phoneNumber: info.phone,                    // 手机号
        loginName: memberInfo.memberInfo.loginName,                  // 当前用户登录名（账号）
        userName: memberInfo.memberInfo.userName,                   // 当前登录用户名
    }

    const data = await request(`${apiUrl}bidding.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })

    if (data.status == 1) {
        Toast.success(data.Msg, 1, null, true)
        return {
            send: true
        }
    } else {
        Toast.offline('下手慢了，已被抢完', 1, null, true)
        return {
            send: false
        }
    }
}