import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incluirUsuario, atualizarUsuario } from '../../../redux/usuarioReducer';

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaUsuarios } = useSelector((state) => state.usuario);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(incluirUsuario(usuario));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setUsuario({
                    nome: "",
                    email: "",
                    senha: "",
                    senhaConfirmada: "",
                    privilegio: ""
                });
                props.setExibirTabela(true);
            }
            else {
                //editar
                despachante(atualizarUsuario(usuario));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    nome: "",
                    email: "",
                    senha: "",
                    senhaConfirmada: "",
                    privilegio: ""
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
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <div>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome de Usuário</Form.Label>
                    <Form.Control
                        required
                        disabled={props.modoEdicao}
                        id="nome"
                        name="nome"
                        value={usuario.nome}
                        onChange={manipularMudanca}
                        type="text"
                        placeholder="Nome de Usuário"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        disabled={props.modoEdicao}
                        id="email"
                        name="email"
                        value={usuario.email}
                        onChange={manipularMudanca}
                        type="email"
                        placeholder="Email"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Privilégio</Form.Label>
                    <Form.Select
                        required
                        id="privilegio"
                        name="privilegio"
                        value={usuario.privilegio}
                        onChange={manipularMudanca}
                        aria-label="Privilégio"
                    >   <option value=""></option>
                        <option value="Basico">Básico</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Admin">Admin</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                        type="password"
                        placeholder="Senha"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirme a senha</Form.Label>
                    <Form.Control
                        required
                        id="senhaConfirmada"
                        name="senhaConfirmada"
                        value={usuario.senhaConfirmada}
                        onChange={manipularMudanca}
                        type="password"
                        placeholder="Confirme a senha"
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
                            props.setUsuarioSelecionado({
                                nome: "",
                                email: "",
                                senha: "",
                                senhaConfirmada: "",
                                privilegio: ""
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