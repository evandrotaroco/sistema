import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { apagarUsuario, buscarUsuarios } from "../../../redux/usuarioReducer";
import { useEffect, useContext } from "react";
import { ContextoUsuario } from "../../../App";
import ESTADO from "../../../redux/estados";

export default function TabelaUsuario(props) {
    const { estado, mensagem, listaUsuarios } = useSelector(state => state.usuario);
    const { usuario } = useContext(ContextoUsuario);
    const despachante = useDispatch();

    useEffect(() => {
        despachante(buscarUsuarios());
    }, [despachante]);

    function editarUsuario(usuario) {
        props.setModoEdicao(true);
        props.setUsuarioSelecionado(usuario);
        props.setExibirTabela(false);
    }

    function excluirUsuario(usuario) {
        if (window.confirm("Deseja realmente excluir o usuario " + usuario.nome)) {
            despachante(apagarUsuario(usuario));
        }
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
            </div>
        );
    } else if (estado === ESTADO.OCIOSO) {
        return (
            <div>
                <Container>
                    {(usuario.privilegio !== "Basico" && usuario.privilegio !== "") && (
                        <Button className="mb=3" variant="primary"
                            onClick={() => {
                                props.setExibirTabela(false);
                            }}>
                            Adicionar
                        </Button>
                    )}

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Privilégio</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaUsuarios?.map((usuarioTabela) => {
                                    return (
                                        <tr key={usuarioTabela.nome}>
                                            <td>{usuarioTabela.nome}</td>
                                            <td>{usuarioTabela.email}</td>
                                            <td>{usuarioTabela.privilegio}</td>
                                            
                                            {(usuario.privilegio !== "Basico" && usuario.privilegio !== "") && (
                                                <td>
                                                    <Button onClick={() => {
                                                        editarUsuario(usuarioTabela);
                                                    }} variant="warning">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </Button>

                                                    <Button onClick={() => {
                                                        excluirUsuario(usuarioTabela);
                                                    }} variant="danger">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </Button>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    <p>Quantidade de usuários cadastrados: {listaUsuarios.length}</p>
                </Container>
            </div>
        );
    }
}
