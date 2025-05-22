import React, { useEffect, useReducer, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import HeaderCard from '../Widget/HeaderCard';
import TransactionTile from '../Transaction/TransactionTile';

const initialState = {
    loading: true,
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [],
    filtered: [],
    filter: 'All',
    keyword: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'LOAD':
            return {
                ...state,
                ...action.payload,
                loading: false,
                filtered: action.payload.transactions,
            };
        case 'SEARCH':
            return {
                ...state,
                keyword: action.payload,
                filtered: filterData(state.transactions, state.filter, action.payload),
            };
        case 'FILTER':
            return {
                ...state,
                filter: action.payload,
                filtered: filterData(state.transactions, action.payload, state.keyword),
            };
        default:
            return state;
    }
}

const filterData = (data, filter, keyword) => {
    return data
        .filter((tx) => filter === 'All' || tx.type === filter)
        .filter((tx) =>
            keyword.trim() === ''
                ? true
                : tx.title.toLowerCase().includes(keyword.toLowerCase())
        );
};

const WalletScreen = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const data = generateDummyTransactions();
            dispatch({ type: 'LOAD', payload: data });
        }, 800);
    }, []);

    const today = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (state.loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6A1B9A" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
            <HeaderCard name="Supriyadi" />
            <Text style={[styles.grey14, { marginTop: 24 }]}>Your Balance Is</Text>
            <Text style={styles.bigNumber}>${state.balance.toFixed(2)}</Text>
            <Text style={styles.grey14}>
                Today {today.getDate()} {monthNames[today.getMonth() + 1]} {today.getFullYear()}
            </Text>
            <View style={styles.lottieWrapper}>
                <LottieView
                    source={require('../../assets/lottie/wallet.json')}
                    autoPlay
                    loop
                    style={{ width: 180, height: 140 }}
                />
            </View>

            <View style={styles.cardRow}>
                <AmountCard title="Income" amount={`+$${state.income.toFixed(2)}`} color="green" />
                <View style={{ width: 12 }} />
                <AmountCard title="Expense" amount={`-$${state.expense.toFixed(2)}`} color="red" />
            </View>

            <Text style={styles.sectionTitle}>Transactions</Text>

            <View style={styles.searchRow}>
                <TextInput
                    placeholder="Search transactions..."
                    style={styles.input}
                    value={state.keyword}
                    onChangeText={(txt) => dispatch({ type: 'SEARCH', payload: txt })}
                />
                <TouchableOpacity
                    style={styles.filterBtn}
                    onPress={() => setFilterMenuOpen(!filterMenuOpen)}
                >
                    <Text>≡</Text>
                </TouchableOpacity>
            </View>

            {filterMenuOpen && (
                <View style={styles.filterMenu}>
                    {['All', 'Income', 'Expense'].map((f) => (
                        <TouchableOpacity
                            key={f}
                            onPress={() => {
                                dispatch({ type: 'FILTER', payload: f });
                                setFilterMenuOpen(false);
                            }}
                            style={[
                                styles.filterItem,
                                state.filter === f && { backgroundColor: '#EEE' },
                            ]}
                        >
                            <Text>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {state.filtered.map((tx) => (
                <TransactionTile key={tx.id} {...tx} />
            ))}
        </ScrollView>
    );
};

const AmountCard = ({ title, amount, color }) => (
    <View style={[styles.amountCard, { borderColor: color, backgroundColor: `${color}10` }]}>
        <Text style={{ color, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ color, fontWeight: 'bold', fontSize: 18 }}>{amount}</Text>
    </View>
);

const generateDummyTransactions = () => {
    const icons = {
        'Netflix': require('../../assets/img/netflix.png'),
        'Apple': require('../../assets/img/apple.png'),
        'Instagram': require('../../assets/img/instagram.png'),
        'Spotify': require('../../assets/img/spotify.png'),
        'Amazon': require('../../assets/img/amazon.png'),
    };

    const names = Object.keys(icons);
    const transactions = [];

    let income = 0;
    let expense = 0;

    for (let i = 0; i < 12; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const isIncome = Math.random() < 0.5;
        const amount = parseFloat((Math.random() * 200 + 10).toFixed(2));
        const now = new Date(Date.now() - Math.random() * 10 * 86400000);
        const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const tx = {
            id: `${i}`,
            title: name,
            icon: icons[name],
            amount: `${isIncome ? '+' : '-'}$${amount}`,
            type: isIncome ? 'Income' : 'Expense',
            date,
            time,
        };

        if (isIncome) income += amount;
        else expense += amount;

        transactions.push(tx);
    }

    const balance = income - expense;
    return { balance, income, expense, transactions };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieWrapper: {
        alignItems: 'center',
        marginVertical: 20,
    },
    cardRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    amountCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    searchRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 40,
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        backgroundColor: '#FFF',
    },
    filterMenu: {
        position: 'absolute',
        top: 430, // Atur sesuai kebutuhan UI kamu
        right: 24,
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        backgroundColor: '#FFF',
        width: 120,
        elevation: 5,
    },
    filterItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    grey14: {
        fontSize: 14,
        color: '#666',
    },
    bigNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 4,
    },
});

export default WalletScreen;
