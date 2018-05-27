import { StyleSheet } from 'aphrodite';
import Colors from '../../config/Colors';

const styles = StyleSheet.create({

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
        color: Colors.primary,
    },
    text: {
        color: Colors.font,
    },
    
})
export default styles;