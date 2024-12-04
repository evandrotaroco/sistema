import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import { ContextoUsuario } from "../../App";
import { login } from "../../servicos/servicoUsuario.js";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    function manipularSubmissao(evento) {
        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada = senha.current.value;
        login(usuarioDigitado, senhaDigitada)
            .then((resposta) => {
                if (resposta.status) {
                    setUsuario({
                        "usuario": usuarioDigitado,
                        "logado": true,
                        "privilegio": resposta.privilegio
                    });
                }
                else {
                    window.alert(resposta.mensagem);
                }
            });
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o usuário"
                        ref={nomeUsuario}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Informe a senha"
                        ref={senha}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>

            </Form>
        </Container>

    );
}