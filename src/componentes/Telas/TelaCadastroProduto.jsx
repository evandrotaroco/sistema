import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formularios/FormCadProduto";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { produtos } from "../../dados/mockProdutos";

export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeProdutos, setListaDeProdutos] = useState(produtos);
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Produto
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaDeProdutos={listaDeProdutos} setListaDeProdutos={setListaDeProdutos} setExibirTabela={setExibirTabela} /> :
                        <FormCadProdutos listaDeProdutos={listaDeProdutos} setListaDeProdutos={setListaDeProdutos} setExibirTabela={setExibirTabela} />
                }
            </Pagina>
        </div>
    );

}