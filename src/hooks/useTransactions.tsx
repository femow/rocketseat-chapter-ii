import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface ITransaction {
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    createdAt: string,
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionsProviderProps {
    children: ReactNode;
}

interface ITransactionProviderValueProps {
    transactions: ITransaction[];
    createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<ITransactionProviderValueProps>({} as ITransactionProviderValueProps);

export function TransactionsProvider ({ children }: ITransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: ITransactionInput) {
        const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date()});
        const { transaction } = response.data;
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }} >
            { children }
        </TransactionsContext.Provider>
    )
}

export function useTransactions () {
    const context = useContext(TransactionsContext);
    return context;
}