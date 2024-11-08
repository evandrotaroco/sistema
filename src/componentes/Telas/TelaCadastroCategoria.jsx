import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Forms/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useState, useEffect } from "react";
import TabelaCategoria from "./Tabelas/TabelaCategoria"
import { consultarCategoria } from "../../servicos/servicoCategoria";
 
export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaCategoria, setListaCategoria] = useState([]);
    const [categoriaSel, setCategoriaSel] = useState({
        codigo: 0,
        descricao: ""
    });

    useEffect(()=>{
        consultarCategoria().then((lista)=>{
            setListaCategoria(lista);
        })
    }, []);

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Categoria</h2>
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