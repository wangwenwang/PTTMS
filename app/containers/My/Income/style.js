/**
 * Created by Administrator on 2017/5/19.
 */
import screen from '../../../utils/screen'

export default style = {
    container: {
        flex: 1,
    },
    search: {
        width: 20,
        height: 20,
        tintColor: theme.color,
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
    button: {
        flex: 1,
        height: 30,
        marginLeft: 8,
        marginRight: 8,
    }
}