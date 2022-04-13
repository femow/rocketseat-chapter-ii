import ReactModal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
interface INewTransactionModalProps {
    isNewTransactionModalOpen: boolean;
    onCloseNewTransactionModal: () => void;
}

ReactModal.setAppElement('#root')
export function NewTransactionModal ({ isNewTransactionModalOpen, onCloseNewTransactionModal }: INewTransactionModalProps) {
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, seAmount] = useState(0);
    const [category, setCategory] = useState('');
    const { createTransaction } = useTransactions();

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        
        await createTransaction({ title, type, amount, category });

        setType('deposit');
        setTitle('');
        seAmount(0);
        setCategory('');
        onCloseNewTransactionModal();
    }

    return (
        <ReactModal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={onCloseNewTransactionModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button"
                onClick={onCloseNewTransactionModal}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}/>
                <input type="number"placeholder="Valor" value={amount} onChange={e => seAmount(Number(e.target.value))}/>
                <TransactionTypeContainer>
                    <RadioBox
                        onClick={() => setType('deposit')}
                        type="button"
                        isActive={type === 'deposit'}
                        activeColor="green"
                        >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        onClick={() => setType('withdraw')}
                        type="button"
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input type="text" placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)}/>
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </ReactModal>
    )
}