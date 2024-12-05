const urlBase = 'https://bcc-backend-lp-2-evandro.vercel.app/usuarios';

export async function gravarUsuario(usuarios) {
    const resposta = await fetch(urlBase, {
        'method':"POST",
        'headers': {
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuarios)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(usuarios) {
    const resposta = await fetch(urlBase + "/" + usuarios.nome, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(usuarios)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function deletarUsuario(usuarios) {
    const resposta = await fetch(urlBase + "/" + usuarios.nome, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({ nome: usuarios.nome })
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
    const resposta = await fetch(urlBase + "/login", {
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