import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import HeaderCard from '../Widget/HeaderCard';
import HomeInfoCard from './HomeInfoCard';
import QuickInfoItem from './QuickInfoItem';

const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [monthlyBalance, setMonthlyBalance] = useState(0);
    const [billAmount, setBillAmount] = useState(0);
    const [goalPercent, setGoalPercent] = useState(0);

    useEffect(() => {
        // Simulasi Bloc loading
        setTimeout(() => {
            const data = getRandomHomeData();
            setMonthlyBalance(data.monthlyBalance);
            setBillAmount(data.billAmount);
            setGoalPercent(data.goalPercent);
            setLoading(false);
        }, 800);
    }, []);

    const monthName = (monthIndex) => {
        const names = [
            '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return names[monthIndex];
    };

    const today = new Date();

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6A1B9A" />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 60 }}
        >

            <HeaderCard
                name="Supriyadi"
                onAction={() => alert('This is not implemented yet')}
            />

            <Text style={styles.sectionTitle}>This Month Summary</Text>
            <Text style={styles.bigNumber}>${monthlyBalance.toFixed(2)}</Text>
            <Text style={styles.date}>
                Today {today.getDate()} {monthName(today.getMonth() + 1)} {today.getFullYear()}
            </Text>

            <View style={styles.lottieContainer}>
                <LottieView
                    source={require('../../assets/lottie/finance3.json')}
                    autoPlay
                    loop
                    style={{ width: 180, height: 160 }}
                />
            </View>

            <View style={styles.cardRow}>
                <HomeInfoCard
                    title="Upcoming Bill"
                    subtitle={`Electricity - $${billAmount.toFixed(2)}`}
                    color="#FFA726"
                    icon="flash-on"
                />
                <HomeInfoCard
                    title="Goal Savings"
                    subtitle={`Savings Goal\n${goalPercent.toFixed(0)}% reached`}
                    color="#42A5F5"
                    icon="savings"
                />
            </View>

            <Text style={styles.sectionTitle}>Quick Info</Text>
            <QuickInfoItem icon="card-giftcard" text="You have 3 active promos!" />
            <QuickInfoItem icon="tips-and-updates" text="Tip: Set budgets for categories to avoid overspending." />
        </ScrollView>
    );
};

// Simulasi logic Bloc
const getRandomHomeData = () => {
    const monthlyBalance = 30000 + Math.random() * 20000;
    const goalPercent = 50 + Math.floor(Math.random() * 50);
    const billAmount = 50 + Math.random() * 100;

    return {
        monthlyBalance,
        goalPercent,
        billAmount,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
        color: '#666',
    },
    bigNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    lottieContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
