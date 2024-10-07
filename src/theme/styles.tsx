import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    message : {
        width: 428,
    },
    textRedirect: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
    },
    rootActivity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rootHome: {
        flex: 1,
        marginHorizontal:25,
        marginVertical: 50,
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    Icon: {
        alignItems: 'flex-end',
        flex: 1,
    },
    modal: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        gap: 10,
    },
    rootListProduct: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 10,
    },
    fabProduct : {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    rootInputsProducts: {
        flexDirection: 'row', justifyContent: 'space-around'
    },
    logoutButton: {
        margin: 16, 
    },
    rootDetail: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        gap: 20
    },
    bookListTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      },
      buttonEditProduct: {
        width: "50%",
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 5,
  },
    snackbarForm: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
});