/**
 * Created by Administrator on 2017/5/19.
 */
import screen from '../../../utils/screen'
import theme from '../../../utils/theme'

export default style = {
    container: {
        flex: 1,
    },
    info: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    infoLeft: {
        flex: 3,
    },
    infoRight: {
        flex: 2,
    },
    line: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    title: {
        color: '#333',
    },
    button: {
        flex: 1,
        width: screen/4,
        marginLeft: 8,
        marginRight: 8,
    },
    note: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        lineHeight: 25,
    },
    noteTitle: {
        color: '#333',
    },
    btn: {
        backgroundColor: theme.color,
        borderColor: theme.color,
    }
}