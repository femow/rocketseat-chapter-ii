import ReactModal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useState } from "react";

interface INewTransactionModalProps {
    isNewTransactionModalOpen: boolean;
    onCloseNewTransactionModal: () => void;
}

ReactModal.setAppElement('#root')
export function NewTransactionModal ({ isNewTransactionModalOpen, onCloseNewTransactionModal }: INewTransactionModalProps) {
    const [type, setType] = useState('deposit')

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
            <Container>
                <h2>Cadastrar transação</h2>
                <input type="text" placeholder="Título"/>
                <input type="number" name="" id="" placeholder="Valor"/>
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
                <input type="text" placeholder="Categoria"/>
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </ReactModal>
    )
}