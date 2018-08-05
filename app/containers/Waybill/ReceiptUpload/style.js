/**
 * Created by Administrator on 2017/5/19.
 */
import theme from '../../../utils/theme'

export default style = {
    container: {
        flex: 1,
    },
    search: {
        width: 20,
        height: 20,
        tintColor: theme.color,
    },
    imageWrapper: {
        paddingLeft: 10,
    },
    images: {
        flexDirection:'row'
    },
    singleImage: {
        position: 'relative'
    },
    image: {
        marginRight: 5,
        width: 80,
        height: 80,
        borderRadius: 5
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 5,
    },
    deleteIcon: {
        width: 20,
        height: 20
    },
    picBtn: {
        width: 100,
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: theme.color,
        borderColor: theme.color,
    },
    scan: {
        backgroundColor: theme.color,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        color: '#fff',
    },
    btn: {
        backgroundColor: theme.color,
        borderColor: theme.color,
    },
    disableBtn: {
        backgroundColor: '#888',
        borderColor: '#888',
    },
}