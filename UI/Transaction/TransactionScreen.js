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
import TransactionTile from './TransactionTile';

const initialState = {
    loading: true,
    balance: 0,
    transactions: [],
    filtered: [],
    filter: 'All',          // All | Income | Expense
    keyword: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'LOAD':
            return {
                ...state,
                loading: false,
                balance: action.payload.balance,
                transactions: action.payload.transactions,
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
        .filter((tx) =>
            filter === 'All' ? true : tx.type === filter
        )
        .filter((tx) =>
            keyword.trim() === ''
                ? true
                : tx.title.toLowerCase().includes(keyword.toLowerCase())
        );
};

const TransactionScreen = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false); // sederhana

    // simulasi Bloc load
    useEffect(() => {
        setTimeout(() => {
            const data = generateDummyTransactions();
            dispatch({
                type: 'LOAD',
                payload: data,
            });
        }, 800);
    }, []);

    /* ---------- UI ---------- */
    if (state.loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6A1B9A" />
            </View>
        );
    }

    const today = new Date();
    const monthNames = [
        '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 60 }}
        >
            <HeaderCard name="Supriyadi" />

            {/* Balance header */}
            <Text style={[styles.grey14, { marginTop: 24 }]}>Your Balance Is</Text>
            <Text style={styles.bigNumber}>${state.balance.toFixed(2)}</Text>
            <Text style={styles.grey14}>
                Today {today.getDate()} {monthNames[today.getMonth() + 1]} {today.getFullYear()}
            </Text>

            {/* Lottie */}
            <View style={styles.lottieWrapper}>
                <LottieView
                    source={require('../../assets/lottie/transaction.json')}
                    autoPlay
                    loop
                    style={{ width: 180, height: 160 }}
                />
            </View>

            {/* Search & Filter */}
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

            {/* Simple filter menu */}
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

            {/* Transaction list */}
            <Text style={styles.sectionTitle}>Transactions</Text>
            {state.filtered.map((tx) => (
                <TransactionTile key={tx.id} {...tx} />
            ))}
        </ScrollView>
    );
};

/* ---------- Dummy data ---------- */
function generateDummyTransactions() {
    const iconMap = {
        'Netflix': require('../../assets/img/netflix.png'),
        'Apple': require('../../assets/img/apple.png'),
        'Instagram': require('../../assets/img/instagram.png'),
        'Spotify': require('../../assets/img/spotify.png'),
        'Amazon': require('../../assets/img/amazon.png'),
    };

    const names = Object.keys(iconMap);
    const transactions = [];

    for (let i = 0; i < 12; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const isIncome = Math.random() < 0.5;
        const amount = (Math.random() * 200 + 10).toFixed(2);
        const now = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000); // up to 10 days ago
        const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        transactions.push({
            id: `${i}`,
            title: name,
            icon: iconMap[name],
            amount: `${isIncome ? '+' : '-'}$${amount}`,
            type: isIncome ? 'Income' : 'Expense',
            date,
            time,
        });
    }

    const balance = transactions.reduce((acc, t) => {
        const val = parseFloat(t.amount.replace(/[+$]/g, ''));
        return t.amount.startsWith('-') ? acc - val : acc + val;
    }, 0);

    return { balance, transactions };
}


/* ---------- Styles ---------- */
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
    grey14: {
        fontSize: 14,
        color: '#666',
    },
    bigNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 4,
    },
    lottieWrapper: {
        alignItems: 'center',
        marginVertical: 24,
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
    },
    filterMenu: {
        position: 'absolute',
        top: 430, // <- sesuaikan dengan posisi filterBtn
        right: 0, // <- padding kanan container utama
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
});

export default TransactionScreen;
