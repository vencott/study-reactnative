import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        toggleCompleteToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            toDoValue: props.text,
        };
    }

    render() {
        const {isEditing, toDoValue} = this.state;
        const {text, id, deleteToDo, isCompleted} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[
                            styles.circle,
                            isCompleted ? styles.completedCircle : styles.uncompletedCircle]}/>
                    </TouchableOpacity>

                    {isEditing ?
                        (<TextInput
                            style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]}
                            multiline={true}
                            value={toDoValue}
                            onChangeText={this._controlInput}
                            returnKeyType={"done"}
                            underlineColorAndroid="transparent"
                            onBlur={this._finishEditing}>
                        </TextInput>)
                        :
                        (<Text
                            style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                            {text}
                        </Text>)
                    }
                </View>

                {isEditing ?
                    (<View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
                    :
                    (<View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPressOut={(event) => {
                            event.stopPropagation();
                            deleteToDo(id)
                        }}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌️</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)}
            </View>
        )
    }

    _toggleComplete = (event) => {
        event.stopPropagation();
        const {toggleCompleteToDo, id, isCompleted} = this.props;
        toggleCompleteToDo(id, !isCompleted);
    };

    _startEditing = (event) => {
        event.stopPropagation();
        this.setState({
            isEditing: true,
        })
    };

    _finishEditing = (event) => {
        event.stopPropagation();
        const {toDoValue} = this.state;
        const {updateToDo, id} = this.props;

        updateToDo(id, toDoValue);

        this.setState({
            isEditing: false
        })
    };

    _controlInput = (text) => {
        this.setState({
            toDoValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#BBB',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20,
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    },
    completedCircle: {
        borderColor: '#BBB'
    },
    uncompletedCircle: {
        borderColor: '#F23657'
    },
    completedText: {
        color: '#BBB',
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: '#353839',
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 2,
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {
        margin: 10
    },
    input: {
        marginVertical: 15,
        paddingBottom: 5,
        width: width / 2
    }
});