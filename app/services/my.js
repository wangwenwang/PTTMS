/**
 * Created by Administrator on 2017/5/25.
 */
import { Toast } from 'antd-mobile'
import { AsyncStorage } from 'react-native'
import request from '../utils/request'
import { baseUrl, apiUrl } from '../utils/config'
import moment from 'moment'
import { getNowFormatDate } from '../utils/base'
import { Geolocation } from 'react-native-baidu-map'
import { delay } from '../utils/index'

// 发送验证码
export async function sendCode(info, isChange) {
    // console.warn(JSON.stringify(info))
    Toast.loading('发送中...', 1, null, false);
    let params

    if (isChange) {
        params = {
            cellphone: info,                  // 登录名
            next_page: 'wangjimima',         // 忘记密码
        }
    } else {
        params = {
            cellphone: info,                 // 登录名
            next_page: 'zhucezhanghao',     // 注册账号
        }
    }

    // console.warn(JSON.stringify(params))
    // const data = await request(`${apiUrl}sendYzmToCellphone.do`, {
    const data = await request(`${apiUrl}sendYzmToCellphone.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.hide()
        Toast.success(data.Msg, 1, null, true)
        return true
    } else {
        Toast.hide()
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 验证验证码
export async function confirmCode(info) {
    // console.warn(JSON.stringify(info))
    const params = {
        cellphone: info.phone,                 // 登录名
        verificationCode: info.code,           // 密码
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}validateVerificationCode.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.success(data.Msg, 1, null, true)
        return info.phone
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 注册
export async function signUp(info) {
    // console.warn(JSON.stringify(info))
    const params = {
        loginname: info.loginName,               // 登录名
        username: info.name,                      // 用户名
        password: info.password,                 // 密码
        cellphone: info.phone,                   // 手机号
        vicheNo: info.vicheNo,                   // 车牌号
        vehicleType: info.vehicleType.join(),    // 车型
        vehicleLength: info.vehicleLength,     // 车长
        vehicleWide: info.vehicleWidth,        // 车宽
        vehicleHeight: info.vehicleHeight,     // 车高
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}registerAppUser.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.success(data.Msg, 1, null, true)
        return true
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 登录
export async function login(info) {
    const params = {
        loginName: info.loginName,           // 登录名
        password: info.password,              // 密码
        registrationID: 'dasfjasj',          // 极光推送用的手机识别号
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}login.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
         const memberInfo = {
             loginName: data.data.loginName,                  // 登录名
             userName: data.data.userName,                    // 用户名
             phone: data.data.cellphone,                      // 电话
             // enableFlag: data.enableFlag,                    // 启用标志
             // registerDate: data.registerDate,                // 注册时间
             // appVersion: data.appVersion,                    // 客户端版本
             vicheNo: data.data.vicheNo,                        // 车牌号
             vehicleType: data.data.vehicleType,                // 车型
             vehicleLength: data.data.vehicleLength,            // 车长
             vehicleWide: data.data.vehicleWide,                // 车宽
             vehicleHeight: data.data.vehicleHeight,            // 车高
             id: data.data.user_id,                               // 用户id
        }
        await storage.save({
            key: 'memberInfo',
            data: memberInfo,
        })
        await storage.save({
            key: 'loginInfo',
            data: {
                loginName: info.loginName,
                password: info.password,
            },
        })

        Toast.success(data.Msg, 1, null, true)
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

// 退出登录
export async function loginOut(info) {
    // Toast.loading('注销中...', null)
    const params = {
        loginName: info.memberInfo.loginName,           // 登录名
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}logoutUser.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status === 'success') {
        await storage.remove({
            key: 'memberInfo'
        });

        // Toast.hide()
        // Toast.success(data.Msg, 1, null, true)
        return true
    } else {
        // Toast.hide()
        return false
    }
}

// 查询个人信息
export async function getMemberInfo() {
    // console.warn(JSON.stringify(info))
    const memberInfo = await storage.load({
        key: 'memberInfo',
    }).then(ret => {
        return ret
    }).catch(err => {
        // console.warn('没有找到相关数据')
    })

    const params = {
        user_id: memberInfo.id,           // 用户ID
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryUserByUserId.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        const memberInfo = {
            loginName: data.data.loginName,                  // 登录名
            userName: data.data.userName,                    // 用户名
            phone: data.data.cellphone,                       // 电话
            vicheNo: data.data.vicheNo,                        // 车牌号
            vehicleType: data.data.vehicleType,                // 车型
            vehicleLength: data.data.vehicleLength,            // 车长
            vehicleWidth: data.data.vehicleWide,                // 车宽
            vehicleHeight: data.data.vehicleHeight,            // 车高
        }
        // AsyncStorage.setItem('memberInfo', JSON.stringify(memberInfo))
        // Toast.success(data.Msg, 2, null, true)
        return { memberInfo: memberInfo }
    } else {
        // Toast.hide()
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 修改个人信息
export async function changeInfo(info) {
    const memberInfo = await localMemberInfo()
    // console.warn(JSON.stringify(memberInfo))
    let params
    if (info.password) {
        params = {
            loginName: memberInfo.memberInfo.loginName,              // 登录名
            userName: info.name,                    // 用户名
            user_id: memberInfo.memberInfo.id,     // 用户ID
            password: info.password,                // 密码
            cellphone: info.phone,                   // 手机号
            vicheNo: info.vicheNo,                   // 车牌号
            vehicleType: info.vehicleType.join(),           // 车型
            vehicleLength: info.vehicleLength,       // 长
            vehicleWide: info.vehicleWidth,           // 宽
            vehicleHeight: info.vehicleHeight,       // 高
        }
    } else {
        params = {
            loginName: memberInfo.memberInfo.loginName,                // 登录名
            userName: info.name,                      // 用户名
            user_id: memberInfo.memberInfo.id,                            // 用户ID
            cellphone: info.phone,                    // 手机号
            vicheNo: info.vicheNo,                    // 车牌号
            vehicleType: info.vehicleType.join(),           // 车型
            vehicleLength: info.vehicleLength,       // 长
            vehicleWide: info.vehicleWidth,           // 宽
            vehicleHeight: info.vehicleHeight,        // 高
        }
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}regAppUserUpdate.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        const newMemberInfo = {
            loginName: memberInfo.memberInfo.loginName,                  // 登录名
            userName: info.name,                    // 用户名
            phone: info.phone,                       // 电话
            // enableFlag: data.enableFlag,                // 启用标志
            // registerDate: data.registerDate,            // 注册时间
            // appVersion: data.appVersion,                 // 客户端版本
            vicheNo: info.vicheNo,                        // 车牌号
            vehicleType: info.vehicleType.join(),                // 车型
            vehicleLength: info.vehicleLength,            // 车长
            vehicleWide: info.vehicleWidth,                // 车宽
            vehicleHeight: info.vehicleHeight,            // 车高
            id: memberInfo.memberInfo.id,                               // 用户id
        }
        await storage.save({
            key: 'memberInfo',
            data: newMemberInfo,
        })
        Toast.success(data.Msg, 1, null, true)
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

// 修改密码
export async function changePassword(info) {
    // console.warn(JSON.stringify(info))
    const params = {
        cellphone: info.phone,                   // 手机号
        password: info.password,                 // 密码
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}updateUserPassword.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.success(data.Msg, 2, null, true)
        return true
    } else {
        Toast.offline(data.Msg, 2, null, true)
        return false
    }
}

// 获取费用统计列表
export async function getIncomeList(searchValue, info) {
    // console.warn(JSON.stringify(searchValue))
    const memberInfo = await localMemberInfo()

    let params
    if (searchValue) {
        params = {
            currentPage: info.currentPage,                                                                                // 当前第几页
            numberPerPage: info.numberPerPage,                                                                             // 每页显示几条
            startDate: searchValue.startTime ? getNowFormatDate(searchValue.startTime) : '',             // 开始时间
            endDate: searchValue.endTime ? getNowFormatDate(searchValue.endTime) : '',                    // 结束时间
            bicChargeStatus: searchValue.balanceStatus ? searchValue.balanceStatus.join() : null,       // 结算状态
            code: searchValue.deliveryNo ? searchValue.deliveryNo : '',                                   // 运单号
            transportProtocol: searchValue.transAgreement ? searchValue.transAgreement : '',               // 运输协议号
            cellphone: memberInfo.memberInfo.phone,                                                                     // 用户账号
        }
    } else {
        params = {
            currentPage: info.currentPage,                  // 当前第几页
            numberPerPage: info.numberPerPage,               // 每页显示几条
            cellphone: memberInfo.memberInfo.phone,         // 用户账号
        }
    }
    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryBicChargeData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    if (data.status == 1) {
        // console.warn(data.data.length)
        const incomeList = data.data.map((item) => {
            let balanceStatus, feeProject

            // 转换结算状态
            switch (item.status) {
                case 'CONFIRM':
                    balanceStatus = '待结算'
                    break
                case 'NOT_ALL_CHARGE':
                    balanceStatus = '部分结算'
                    break
                case 'ALL_CHARGE':
                    balanceStatus = '结算完成'
                    break
                case 'NO_CONFIRM':
                    balanceStatus = '待确定'
                    break
            }

            // 转换费用项目
            switch (item.feeProject) {
                case 'MESSAGEFE':
                    feeProject = '信息费'
                    break
                case '装卸费':
                    feeProject = '装卸费'
                    break
                case '其他费用':
                    feeProject = '其他费用'
                    break
                case 'WAREHOUSEFEE':
                    feeProject = '进仓费'
                    break
                case 'ANOTHER':
                    feeProject = '附加费'
                    break
                case 'CASHSETTLEMENT':
                    feeProject = '现金'
                    break
                case 'OIL_CARD':
                    feeProject = '油卡'
                    break
                case 'ONDELIVERY':
                    feeProject = '货到付款'
                    break
                case 'RECEIPTSETTLEMENT':
                    feeProject = '回单结算'
                    break
                case 'MONTHLYFEE':
                    feeProject = '月结'
                    break
                case 'CDELIVERY':
                    feeProject = '代收货款'
                    break
            }

            return {
                shipmentTime: item.shipTime,                                // 发运时间
                balanceStatus: balanceStatus,                               // 结算状态
                shipmentCode: item.code,                                   // 运单号
                transAgreement: item.transportProtocol,                  // 运输协议号
                startCity: item.startCity,                                 // 起点城市
                endCity: item.endCity,                                      // 终点城市
                feeProject: feeProject,                                     // 费用项目
                money: item.chargeAmt,                                  // 金额
            }
        })
        return {
            incomeList: incomeList,
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 车型查询
export async function getVehicleType() {
    // console.warn(JSON.stringify(info))

    const params = {
        listName: 'CONTRACT_VECHIEVLETYPE',           // 固定值
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryCodeLukupData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        const vehicleTypeList = data.data.map((item) => {
            return {
                label: item.description,          // 名称
                value: item.description,          // 名称
                // code: item.code,                //
            }
        })
        return { vehicleTypeList: vehicleTypeList }
    } else {
        Toast.offline('车型数据获取失败', 2, null, true)
        return false
    }
}

// 本地获取个人信息
export async function localMemberInfo() {
    // console.warn(JSON.stringify(info))
    const memberInfo = await storage.load({
        key: 'memberInfo',
    }).then(ret => {
        return ret
    }).catch(err => {
        console.warn('没有找到相关数据')
    })
    console.log(JSON.stringify(memberInfo))
    return {
        memberInfo: memberInfo
    }
}

// 获取当前定位
export async function getLocation() {
    const location = await Geolocation.getCurrentPosition()
        .then(data => {
            // console.warn(JSON.stringify(data))
            return data
        })
        .catch(e =>{
            console.log(e, 'error')
        })
    console.warn(JSON.stringify(location))
    return location
}

// 上报位置
export async function submitLocation(info) {
    // console.warn(JSON.stringify(info))
    const params = {
        loginName: info.loginName,                // 登录名
        userName: info.userName,                  // 用户名
        cellphone: info.phone,                    // 手机号
        vicheNo: info.vicheNo,                    // 车牌号
        vehicleType: info.vehicleType,           // 车型
        lon: info.longitude.toString(),                      // 经度
        lat: info.latitude.toString(),                       // 纬度
        vehicleLocation: info.address,            // 经纬度对应的标准地址
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}uploadGPSLocation.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status === 'success') {
        if (info.type === 1) {
            Toast.success('位置上报成功', 1, null, true)
        }
        return {
            send: true
        }
    } else {
        if (info.type === 1) {
            Toast.offline('位置上报失败', 1, null, true)
        }
        return {
            send: false
        }
    }
}

// 设置极光推送手机识别号
export async function setRegistrationID(registrationID) {
    // console.warn(registrationID)
    const memberInfo = await localMemberInfo()
    // console.warn(memberInfo)

    const params = {
        loginName: memberInfo.memberInfo.loginName,                // 用户登录名
        registrationID: registrationID,                  // 用户名
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}setRegistrationID.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        return true
    } else {
        return false
    }
}

// 获取定时上传位置时间
export async function getTime() {
    const data = await request(`${apiUrl}getUploadGPSLocationTime.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        return {
            time: data.data.times
        }
    } else {
        return false
    }
}