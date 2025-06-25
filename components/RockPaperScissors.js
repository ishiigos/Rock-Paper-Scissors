import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Animated } from 'react-native';
import Constants from 'expo-constants';
import DisplayResult from './DisplayResult';
import Actions from './Actions';
import Header from './Header';

export default function RockPaperScissors(){
    const [userChoice, setUserChoice] = useState(0);
    const [computerChoice, setComputerChoice] = useState(0);
    const [result, setResult] = useState("");
    const [canPlay, setPlay] = useState(true);

    // for Animation
    const fadeAnimation = useRef(new Animated.Value(1)).current;

    function play(choice){
        // We have 3 choices:
        // 1 = Rock
        // 2 = Paper
        // 3 = Scissors

        const randomComputerChoice = Math.floor(Math.random() * 3 ) + 1;
        let resultString = "";

        if (choice === 1){
            resultString = randomComputerChoice === 3 ? "WIN" : "LOSE";
        }
        else if (choice === 2){
            resultString = randomComputerChoice === 1 ? "WIN" : "LOSE";
        }
        else {
            resultString = randomComputerChoice === 2 ? "WIN" : "LOSE";
        }

        if (choice === randomComputerChoice) {
            resultString = "DRAW";
        }

        setUserChoice(choice);
        setComputerChoice(randomComputerChoice);

        // Wait animation hide old result
        setTimeout(() => {
            setResult(resultString);
        }, 300);

        // Animation hide old result
        Animated.sequence([
            Animated.timing(fadeAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Disable action when animation running
        setPlay(false);
        setTimeout(() => {
            setPlay(true);
        }, 600);
    }

    // Return the view
    return(
        <SafeAreaView style={styles.container}>
            <Header/>
            <View style={styles.content}>
                <View style={styles.result}>
                    <Animated.Text 
                        style={[styles.resultText, {opacity: fadeAnimation}]}
                    >
                        {result}
                    </Animated.Text>
                </View>
                <View style={styles.screen}>
                    {!result ? (
                        <Text style={styles.readyText}>Let's Play</Text>
                    ) : (
                        <DisplayResult
                            userChoice={userChoice}
                            computerChoice={computerChoice}      
                        />
                    )}
                </View>
                <View style={styles.actionsWrapper}>
                    <Actions play={play} canPlay={canPlay} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    content: {
        flex: 1,
        marginBotton: 50, 
        justifyContent: 'space-between',
        backgroundColor: '#e8eaed',
    },
    actionsWrapper: {
        height: 100,
        width: 400,
    },
    result: {
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    resultText : {
        fontSize: 48,
        fontWeight: 'bold',
    },
    screen:{
        flex: 1,
        flexDirection: 'row',
    },
    readyText : {

        marginTop: -48,
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',
        fontSize: 48,
        fontWeight: 'bold',
    }
});