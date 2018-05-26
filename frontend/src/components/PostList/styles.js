import { StyleSheet } from 'aphrodite';
import Colors from '../../config/Colors';

const styles = StyleSheet.create({
    addButton:{
        color: Colors.clear,
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        float: 'right',
        margin: "0 5% 2.5% 5%"
    },
    editButton:{
        color: Colors.clear,
        backgroundColor: Colors.warning,
        borderColor: Colors.warning,
    },
    deleteButton:{
        color: Colors.clear,
        backgroundColor: Colors.danger,
        borderColor: Colors.danger,
    },

    title: {
        color: Colors.secondary,
    },
    
    rank: {
        color: Colors.font,
    },
    text: {
        color: Colors.font,
    },

    link : {
        color: Colors.primary,
        textDecoration: 'none'
    }
})
export default styles;