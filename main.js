async function listMoedas() {
    try {
        const response = await fetch(`http://127.0.0.1:8080/moedas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });    
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';
        result.forEach(moeda => {
            var linha = document.createElement('tr');            

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailMoeda('${moeda.id}');">${moeda.id}</a>`;
            linha.appendChild(id);

            var nome = document.createElement('td');
            nome.innerHTML = moeda.nome;
            linha.appendChild(nome);

            var sigla = document.createElement('td');
            sigla.innerHTML = moeda.sigla;
            linha.appendChild(sigla);

            var simbolo = document.createElement('td');
            simbolo.innerHTML = moeda.simbolo;
            linha.appendChild(simbolo);

            var acoes = document.createElement('td');
            acoes.innerHTML = `<button onClick="deleteMoeda('${moeda.id}');">x</button>`;
            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function createMoeda() {
    var moeda = {
        "id": uuidv4(),
        "nome": document.getElementById('detail-nome').value,
        "sigla": document.getElementById('detail-sigla').value,
        "simbolo": document.getElementById('detail-simbolo').value    
    }

    try {
        const response = await fetch('http://127.0.0.1:8080/moedas', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'            },
            body: JSON.stringify(moeda)
        });
       listMoedas();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteMoeda(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/moedas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        listMoedas();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function detailMoeda(id) {
    try {
        const result = await fetch(`http://127.0.0.1:8080/moedas/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var moeda = await result.json();
        document.getElementById('detail-id').value = moeda.id;
        document.getElementById('detail-nome').value = moeda.nome;
        document.getElementById('detail-sigla').value = moeda.sigla;
        document.getElementById('detail-simbolo').value = moeda.simbolo;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function filterMoedas() {
    var filter = document.getElementById('filter').value.toString().trim();
    if (filter.length < 3) return;
    listMoedas();
}

async function cleanMoeda() {
    document.getElementById('detail-id').value = '';
    document.getElementById('detail-nome').value = '';
    document.getElementById('detail-sigla').value = '';
    document.getElementById('detail-simbolo').value = '';
}