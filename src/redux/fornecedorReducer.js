import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarFornecedor, deletarFornecedor, gravarFornecedor, alterarFornecedor } from "../servicos/servicoFornecedor";

import ESTADO from "./estados";

export const buscarFornecedores = createAsyncThunk('buscarFornecedores', async () => {
    try {
        const resultado = await consultarFornecedor();
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Fornecedores recuperados com sucesso",
                "listaFornecedores": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Fornecedores do backend.",
                "listaFornecedores": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaFornecedores": []
        }
    }
});

export const apagarFornecedor = createAsyncThunk('apagarFornecedor', async (fornecedor) => {
    try {
        const resultado = await deletarFornecedor(fornecedor);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": fornecedor.codigo
        };
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

export const incluirFornecedor = createAsyncThunk('incluirFornecedor', async (fornecedor) => {

    try {
        const resultado = await gravarFornecedor(fornecedor);
        if (resultado.status) {
            fornecedor.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "fornecedor": fornecedor
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

export const atualizarFornecedor = createAsyncThunk('atualizarFornecedor', async (fornecedor) => {
    try {
        const resultado = await alterarFornecedor(fornecedor);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "fornecedor": fornecedor
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

const fornecedorReducer = createSlice({
    name: 'fornecedor',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaFornecedores: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // *** BUSCAR FornecedorS ***

            .addCase(buscarFornecedores.pending, (state) => {
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição... (buscando)"
            })
            .addCase(buscarFornecedores.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores = action.payload.listaFornecedores;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores = action.payload.listaFornecedores;
                }
            })
            .addCase(buscarFornecedores.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaFornecedores = action.payload.listaFornecedores;
            })

            // *** APAGAR FornecedorS ***

            .addCase(apagarFornecedor.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (exclusão)";
            })
            .addCase(apagarFornecedor.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaFornecedores = state.listaFornecedores.filter((item) => item.codigo !== action.payload.codigo);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(apagarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** INCLUIR FornecedorS ***

            .addCase(incluirFornecedor.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (incluindo)";
            })
            .addCase(incluirFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores.push(action.payload.fornecedor);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** ATUALIZAR FornecedorS ***

            .addCase(atualizarFornecedor.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (atualizando)";
            })
            .addCase(atualizarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores = state.listaFornecedores.map((item) => item.codigo === action.payload.fornecedor.codigo ? action.payload.fornecedor : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default fornecedorReducer.reducer;