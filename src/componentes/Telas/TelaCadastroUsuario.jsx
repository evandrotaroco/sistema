import { Alert } from "react-bootstrap";
import FormCadUsuario from "./Forms/FormCadUsuario.jsx";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaUsuario from "./Tabelas/TabelaUsuario.jsx";


export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [produtos, setProdutos] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        nome:"",
        email:"",
        senha:"",
        senhaConfirmada:"",
        privilegio:""
    });

  
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h3>
                        Cadastro de Usuário
                    </h3>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuario setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setUsuarioSelecionado={setUsuarioSelecionado} /> :
                        <FormCadUsuario setExibirTabela={setExibirTabela}
                                         usuarioSelecionado={usuarioSelecionado}
                                         setUsuarioSelecionado={setUsuarioSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}
                                         />
                }
            </Pagina>
        </div>
    );

}