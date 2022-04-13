import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface ITransaction {
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    createdAt: string,
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map(tr => (
                            <tr key={tr.id}>
                                <td>{tr.title}</td>
                                <td className={tr.type}>
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(tr.amount)}
                                </td>
                                <td>{tr.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat('pt-BR').format(new Date(tr.createdAt))}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Container>
    )
}