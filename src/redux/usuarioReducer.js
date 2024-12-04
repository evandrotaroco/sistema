import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, deletarUsuario, gravarUsuario, alterarUsuario, login } from "../servicos/servicoUsuario";

import ESTADO from "./estados";

export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async () => {
    try {
        const resultado = await consultarUsuario();
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Usuarios recuperados com sucesso",
                "listaUsuarios": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Usuarios do backend.",
                "listaUsuarios": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaUsuarios": []
        }
    }
});

export const apagarUsuario = createAsyncThunk('apagarUsuario', async (usuario) => {
    try {
        const resultado = await deletarUsuario(usuario);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "nome": usuario.nome
        };
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

export const incluirUsuario = createAsyncThunk('incluirUsuario', async (usuario) => {

    try {
        const resultado = await gravarUsuario(usuario);
        if (resultado.status) {
            usuario.nome = resultado.nome;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "usuario": usuario
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

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resultado = await alterarUsuario(usuario);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "usuario": usuario
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const loginUsuario = createAsyncThunk('usuario/login', async (credenciais) => {
    try {
        const resultado = await login(credenciais.nome, credenciais.senha);
        if (resultado.status) {
            return {
                status: true,
                mensagem: "Login realizado com sucesso",
                usuario: resultado.usuario
            };
        } else {
            return {
                status: false,
                mensagem: resultado.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro: " + erro.message
        };
    }
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // *** BUSCAR UsuarioS ***

            .addCase(buscarUsuarios.pending, (state) => {
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição... (buscando)"
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaUsuarios = action.payload.listaUsuarios;
            })

            // *** APAGAR UsuarioS ***

            .addCase(apagarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (exclusão)";
            })
            .addCase(apagarUsuario.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaUsuarios = state.listaUsuarios.filter((item) => item.nome !== action.payload.nome);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(apagarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** INCLUIR UsuarioS ***

            .addCase(incluirUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (incluindo)";
            })
            .addCase(incluirUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios.push(action.payload.usuario);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** ATUALIZAR UsuarioS ***

            .addCase(atualizarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (atualizando)";
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = state.listaUsuarios.map((item) => item.nome === action.payload.usuario.nome ? action.payload.usuario : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default usuarioReducer.reducer;