import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCategoria, excluirCategoria, gravarCategoria, alterarCategoria } from "../servicos/servicoCategoria";

import ESTADO from "./estados";

export const buscarCategorias = createAsyncThunk('buscarCategorias', async () => {
    try {
        const resultado = await consultarCategoria();
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Categorias recuperados com sucesso",
                "listaCategoria": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Categorias do backend.",
                "listaCategoria": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaCategoria": []
        }
    }
});

export const apagarCategoria = createAsyncThunk('apagarCategoria', async (categoria) => {
    try {
        const resultado = await excluirCategoria(categoria);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": categoria.codigo
        };
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

export const incluirCategoria = createAsyncThunk('incluirCategoria', async (categoria) => {

    try {
        const resultado = await gravarCategoria(categoria);
        if (resultado.status) {
            categoria.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "categoria": categoria
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const atualizarCategoria = createAsyncThunk('atualizarCategoria', async (categoria) => {
    try {
        const resultado = await alterarCategoria(categoria);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "categoria": categoria
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

const categoriaReducer = createSlice({
    name: 'categoria',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaCategoria: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // *** BUSCAR Categorias ***

            .addCase(buscarCategorias.pending, (state) => {
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição... (buscando)"
            })
            .addCase(buscarCategorias.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategoria = action.payload.listaCategoria;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategoria = action.payload.listaCategoria;
                }
            })
            .addCase(buscarCategorias.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaCategoria = action.payload.listaCategoria;
            })

            // *** APAGAR CategoriaS ***

            .addCase(apagarCategoria.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (exclusão)";
            })
            .addCase(apagarCategoria.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaCategoria = state.listaCategoria.filter((item) => item.codigo !== action.payload.codigo);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(apagarCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** INCLUIR CategoriaS ***

            .addCase(incluirCategoria.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (incluindo)";
            })
            .addCase(incluirCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategoria.push(action.payload.categoria);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** ATUALIZAR CategoriaS ***

            .addCase(atualizarCategoria.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (atualizando)";
            })
            .addCase(atualizarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategoria = state.listaCategoria.map((item) => item.codigo === action.payload.categoria.codigo ? action.payload.categoria : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default categoriaReducer.reducer;