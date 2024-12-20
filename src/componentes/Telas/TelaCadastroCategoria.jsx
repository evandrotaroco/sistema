import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Forms/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaCategoria from "./Tabelas/TabelaCategoria"
 
export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaCategoria, setListaCategoria] = useState([]);
    const [categoriaSel, setCategoriaSel] = useState({
        codigo: 0,
        descricao: ""
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h3>Cadastro de Categoria</h3>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaCategoria
                        listaCategoria={listaCategoria}
                        setListaCategoria={setListaCategoria}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setCategoriaSel={setCategoriaSel}
                    /> : 
                    <FormCadCategorias
                        listaCategoria={listaCategoria}
                        setListaCategoria={setListaCategoria}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setCategoriaSel={setCategoriaSel}
                        categoriaSel={categoriaSel}
                        modoEdicao={modoEdicao}
                    />
                }
            </Pagina>
        </div>
    );
}