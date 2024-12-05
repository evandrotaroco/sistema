import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Forms/FormCadProduto";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";


export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo:0,
        descricao:"",
        precoCusto:0,
        precoVenda:0,
        qtdEstoque:0,
        urlImagem:"",
        dataValidade:"",
        categoria: {},
        fornecedor: {}
    });

  
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h3>
                        Cadastro de Produto
                    </h3>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setProdutoSelecionado={setProdutoSelecionado} /> :
                        <FormCadProdutos setExibirTabela={setExibirTabela}
                                         produtoSelecionado={produtoSelecionado}
                                         setProdutoSelecionado={setProdutoSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}