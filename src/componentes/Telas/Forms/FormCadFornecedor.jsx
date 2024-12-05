import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarFornecedor } from '../../../servicos/servicoFornecedor';
import { useSelector, useDispatch } from 'react-redux';
import { incluirFornecedor, atualizarFornecedor } from '../../../redux/fornecedorReducer';
import ESTADO from '../../../redux/estados'
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadFornecedor(props) {
    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaFornecedores } = useSelector((state) => state.fornecedor);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(incluirFornecedor(fornecedor));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setFornecedor({
                    codigo: 0,
                    nome: "",
                    cnpj: "",
                    email: "",
                    telefone: "",
                    endereco: ""
                });
                props.setExibirTabela(true);
            }
            else {
                //editar

                despachante(atualizarFornecedor(fornecedor));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setFornecedorSelecionado({
                    codigo: 0,
                    nome: "",
                    cnpj: "",
                    email: "",
                    telefone: "",
                    endereco: ""
                });
                props.setExibirTabela(true);

            }

        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setFornecedor({ ...fornecedor, [elemento]: valor });
    }

    if (estado === ESTADO.PENDENTE) {
        return (
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <Alert variant="primary">{mensagem}</Alert>
            </div>
        );
    } else if (estado === ESTADO.ERRO) {
        return (
            <div>
                <Alert variant="danger">{mensagem}</Alert>
                <Button onClick={() => {
                    props.setExibirTabela(true);
                }}>Voltar</Button>
            </div>
        );
    } else if (estado === ESTADO.OCIOSO) {
        return (
            <div>


                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Form.Group className="mb-3">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control
                            required
                            id="codigo"
                            name="codigo"
                            value={fornecedor.codigo}
                            onChange={manipularMudanca}
                            disabled={true}
                            type="text"
                            placeholder="codigo"
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    id="nome"
                                    name="nome"
                                    value={fornecedor.nome}
                                    onChange={manipularMudanca}
                                    type="text"
                                    placeholder="Nome"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    required
                                    id="cnpj"
                                    name="cnpj"
                                    value={fornecedor.cnpj}
                                    onChange={manipularMudanca}
                                    type="text"
                                    placeholder="CNPJ"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                id="email"
                                name="email"
                                value={fornecedor.email}
                                onChange={manipularMudanca}
                                type="email"
                                placeholder="Email"
                            />
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    required
                                    id="telefone"
                                    name="telefone"
                                    value={fornecedor.telefone}
                                    onChange={manipularMudanca}
                                    type="text"
                                    placeholder="Telefone"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            required
                            id="endereco"
                            name="endereco"
                            value={fornecedor.endereco}
                            onChange={manipularMudanca}
                            type="text"
                            placeholder="Endereço"
                        />
                    </Form.Group>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                props.setExibirTabela(true);
                                props.setModoEdicao(false);
                                props.setFornecedorSelecionado({
                                    codigo: 0,
                                    nome: "",
                                    cnpj: "",
                                    email: "",
                                    telefone: "",
                                    endereco: ""
                                });
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    mensagemExibida ? <Alert variant="sucess">{mensagem}</Alert> : ""
                }
            </div>
        );
    }
}
