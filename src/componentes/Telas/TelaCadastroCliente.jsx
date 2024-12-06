import { Alert } from "react-bootstrap";
import FormCadCliente from "./Forms/FormCadCliente";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaCliente from "./Tabelas/TabelaCliente";


export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        codigo:0,
        nome:"",
        email:"",
        telefone:"",
        cpf:"",
        endereco:""
    });

  
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h3>
                        Cadastro de Cliente
                    </h3>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCliente setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setClienteSelecionado={setClienteSelecionado} /> :
                        <FormCadCliente setExibirTabela={setExibirTabela}
                                         clienteSelecionado={clienteSelecionado}
                                         setClienteSelecionado={setClienteSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}
                                         />
                }
            </Pagina>
        </div>
    );

}