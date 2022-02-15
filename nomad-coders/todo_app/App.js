import React, {Component} from 'react';
import {
    AsyncStorage,
    Dimensions,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import {AppLoading} from 'expo';
import ToDo from "./src/ToDo"
import uuidv1 from "uuid/v1"


const {width, height} = Dimensions.get("window");

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            newToDo: "",
            loadedToDos: false,
            toDos: {}
        };
    }

    componentDidMount() {
        this._loadToDos();
    };

    render() {
        const {newToDo, loadedToDos, toDos} = this.state;

        if (!loadedToDos)
            return <AppLoading/>;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Text style={styles.title}>To Do</Text>
                <View style={styles.card}>
                    <TextInput
                        style={styles.input}
                        placeholder={"할일 입력"}
                        placeholderTextColor={"#999"}
                        underlineColorAndroid="transparent"
                        value={newToDo}
                        onChangeText={this._controlNewToDo}
                        returnKeyType={"done"}
                        autoCorrect={false}
                        onEndEditing={this._addToDo}/>

                    <ScrollView
                        // 스크롤 뷰의 props로 style을 pass해준다
                        contentContainerStyle={styles.toDos}>
                        {
                            // toDos.map(toDo => <ToDo/>)
                            // 배열이었다면 위와 같이 했을테지만, Object 형식이므로 아래와 같이 한다
                            Object.values(toDos).map(toDo =>
                                <ToDo
                                    key={toDo.id}
                                    {...toDo}
                                    deleteToDo={this._deleteTodo}
                                    toggleCompleteToDo={this._toggleCompleteToDo}
                                    updateToDo={this._updateToDo}
                                />)
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }

    _controlNewToDo = text => {
        this.setState({
            newToDo: text
        })
    };

    _loadToDos = async () => {
        try {
            const toDos = await AsyncStorage.getItem("toDos");
            const parsedToDos = JSON.parse(toDos) || {};
            this.setState({
                loadedToDos: true,
                toDos: parsedToDos
            });
        } catch (e) {
            console.log(e);
        }
    };

    _addToDo = () => {
        const {newToDo} = this.state;
        if (newToDo !== "") {
            // 단순히 배열에 넣어서 관리해도 되지만, 수정과 삭제가 용이하게 Object 형태로 관리하는 것이 바람직하
            this.setState(prevState => {
                const ID = uuidv1();
                const newTodoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newToDo,
                        createdAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newToDo: "",
                    toDos: {
                        ...newTodoObject,
                        ...prevState.toDos
                    }
                };
                this._saveToDos(newState.toDos);
                return {...newState};
            })
        }
    };

    _deleteTodo = (id) => {
        this.setState(prevState => {
            const toDos = prevState.toDos;
            delete toDos[id];
            const newState = {
                ...prevState,
                ...toDos
            };
            this._saveToDos(newState.toDos);
            return {...newState};
        })
    };

    _toggleCompleteToDo = (id, isCompleted) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: isCompleted
                    }
                }
            };
            this._saveToDos(newState.toDos);
            return {...newState};
        })
    };

    _updateToDo = (id, text) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        text: text
                    }
                }
            };
            this._saveToDos(newState.toDos);
            return {...newState};
        })
    };

    _saveToDos = (newToDos) => {
        const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F23657',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 50,
        fontWeight: '200',
        marginBottom: 30
    },
    card: {
        backgroundColor: 'white',
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({ // 플랫폼마다 다르게 적용해야할 때 사용
            ios: {
                shadowColor: 'rgb(50, 50, 50)',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: '#BBB',
        borderBottomWidth: 1,
        fontSize: 25,
    },
    toDos: {
        alignItems: 'center'
    }
});
