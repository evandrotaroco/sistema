import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incluirCliente, atualizarCliente } from '../../../redux/clienteReducer';
import ESTADO from '../../../redux/estados'

export default function FormCadCliente(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaClientes } = useSelector((state) => state.cliente);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(incluirCliente(cliente));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setCliente({
                    codigo: 0,
                    nome: "",
                    cpf: "",
                    email: "",
                    telefone: "",
                    endereco: ""
                });
                props.setExibirTabela(true);
            }
            else {
                //editar

                despachante(atualizarCliente(cliente));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setClienteSelecionado({
                    codigo: 0,
                    nome: "",
                    cpf: "",
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
        setCliente({ ...cliente, [elemento]: valor });
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
                            value={cliente.codigo}
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
                                    value={cliente.nome}
                                    onChange={manipularMudanca}
                                    type="text"
                                    placeholder="Nome"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    required
                                    id="cpf"
                                    name="cpf"
                                    value={cliente.cpf}
                                    onChange={manipularMudanca}
                                    type="text"
                                    placeholder="CPF"
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
                                value={cliente.email}
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
                                    value={cliente.telefone}
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
                            value={cliente.endereco}
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
