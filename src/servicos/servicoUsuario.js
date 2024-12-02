const urlBase = 'https://bcc-backend-lp-2-evandro.vercel.app/usuarios';

export async function gravarUsuario(Usuarios) {
    const resposta = await fetch(urlBase, {
        'method':"POST",
        'headers': {
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(Usuarios)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(Usuarios) {
    const resposta = await fetch(urlBase + "/" + Usuarios.codigo, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(Usuarios)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function deletarUsuario(Usuarios) {
    const resposta = await fetch(urlBase + "/" + Usuarios.codigo, {
        "method": "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;

}

export async function consultarUsuario() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}   

export async function login(nomeUsuario, senhaUsuario) {
    const resposta = await fetch(urlBase + "login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nomeUsuario,
            senha: senhaUsuario
        })
    });
    return await resposta.json();
}