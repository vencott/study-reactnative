import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default function Loading({error}) {
    return (
        <View style={styles.container}>
            <Text style={styles.loadingText}>Getting the weather now...</Text>
            {error ?
                <Text style={styles.errorText}>{error}</Text>
                :
                null}
            <ActivityIndicator/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF6AA',
        justifyContent: 'flex-end',
        paddingBottom: 14
    },
    loadingText: {
        fontSize: 38,
        paddingLeft: 25,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        backgroundColor: 'transparent',
        marginBottom: 40,
        paddingLeft: 25
    }
});