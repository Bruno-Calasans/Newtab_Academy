

    // cada pessao da tabela
    class Pessoa{

        constructor(nome='', telefone='', experiencia=false){
            this.nome = nome
            this.tel = telefone
            this.exp = experiencia ? 'Sim': 'Não'
        }
    }

    // funções genéricas
    isArray = dado => dado.constructor == Array
    isObj = dado =>  dado instanceof Object

    // cria um elemento HTML com a classe desejada
    function criarElemento(tag, classeId, usarId=false){

        const elemento = document.createElement(tag)

        if(classeId && !usarId) elemento.className = classeId 
        else if(classeId) elemento.id = classeId 
        else return elemento

        return elemento
    }

    // pega qualquer elemento HTML por classe ou id
    function getElemento(classeId, usarId=true){

        if(usarId) return document.getElementById(classeId)
        else return document.getElementsByClassName(classeId)
    }
   
   function transformArray(collection){

        let array = []

        if(collection instanceof NodeList || collection instanceof HTMLAllCollection)
            for(let item of collection) array.push(item)
        
        // se for um objeto
        else 
            for(let atrb in collection) array.push(collection[atrb])

       return array
      
   }

   function selector(selector, all=false){

       if(all) return document.querySelectorAll(selector)
       else return document.querySelector(selector)
   }

    class Table{

        constructor(tableId, dados) {

            // referente à tabela e aos dados
            this.elemento = getElemento(tableId)
            this.dados = dados
            this.tableId = tableId

            // head da tabela
            this.head = {
                id: selector(`#${tableId} thead`).id, 
                elemento: selector(`#${tableId} thead`),
                linha: selector(`#${tableId} thead tr`),
                celulas: selector(`#${tableId} thead th`, true)
            }

            // body da tabela
            this.body = {
                id: selector(`#${tableId} tbody`).id, 
                elemento: selector(`#${tableId} tbody`),
                celulas: selector(`#${tableId} tbody td`, true),
                linhas: {
                    elementos: transformArray(selector(`#${tableId} tbody tr`, true)),
                    classe: selector(`#${tableId} tbody tr`) ? selector(`#${tableId} tbody tr`).className : '',
                }
            }

            // configurações iniciais da tabela
            this.inserirLinhas('table-row', this.dados)
        }

        // getters e setters
        get numLinhas(){return this.body.elemento.children.length}
        get numColunas(){return this.head.linha.children.length}

        // remove uma linha pra sempre
        removerLinha(index){

            // se tiver o index
            if(index <= this.numLinhas - 1){

                this.body.linhas.elementos[index].remove()
                // atualizando o array de linhas
                this.body.linhas.elementos.splice(index, 1) 
                return true
            }
            // caso não encontre ou não exista
            return false
        }

        // remove todas as linhas pra sempre
        limpar(){

            if(this.numLinhas > 0){
                while (this.numLinhas) this.removerLinha(0)
                return true
            }
            else return false
        }

        atualizar(){

            // atualizando head
            let tableId = this.tableId

            this.head = {
                id: selector(`#${tableId} thead`).id, 
                elemento: selector(`#${tableId} thead`),
                linha: selector(`#${tableId} thead tr`),
                celulas: selector(`#${tableId} thead th`, true)
            }
          
            // atualizando body
            this.body = {
                id: selector(`#${tableId} tbody`).id, 
                elemento: selector(`#${tableId} tbody`),
                celulas: selector(`#${tableId} tbody td`, true),
                linhas: {
                    elementos: transformArray(selector(`#${tableId} tbody tr`, true)),
                    classe: selector(`#${tableId} tbody tr`).className
                }
            }
        }

        atualizarLinhas(){

            this.atualizar()
            this.inserirLinhas('table-row', this.dados)
        }

        // cria uma linha
        criarLinha(classeId, dados){
            
            // se for um objeto
            dados = isObj(dados) ? transformArray(dados) : dados

            // o número de dados tem que ser igual ao número de colunas
            const linha = criarElemento('tr', classeId)

            for(let dado of dados){

                let td = criarElemento('td')
                td.innerHTML = dado
                linha.appendChild(td)
            }

            // criando o botão
            const btn = criarElemento('button', 'btnAlterar')
            const td = criarElemento('td')
            btn.innerHTML = 'Alterar'
            td.appendChild(btn)
            linha.appendChild(td)

            return linha
        }

        // cria várias linhas
        criarLinhas(classeId, ...dados){

            let linhas = []

            //console.log(dados);
            if(dados.length == 1) dados = dados[0]

            for(let dado of dados){

                let linha = this.criarLinha(classeId, dado)
                linhas.push(linha)
            }

            return linhas
        }

        // insere uma linha na tabela
        inserirLinha(linha, classeId){

            // se não for um elemento HTML
            if(!(linha instanceof HTMLElement)){

                classeId = classeId ?? 'table-row'
                let novaLinha = this.criarLinha(classeId, linha)
                this.body.elemento.appendChild(novaLinha)
                return
            }
            this.body.elemento.appendChild(linha)
        }

        // insere várias linhas na tabela
        inserirLinhas(classeId, ...dados){

            if(dados.length == 1) dados = dados[0]
                let linhas = this.criarLinhas(classeId, dados)
                
            linhas.forEach(linha => this.inserirLinha(linha))
            this.atualizar()
        }

        getLinha(index){

            if(index > this.numLinhas - 1) return false
            let linha = this.body.linhas.elementos[index]
            return linha
        }

        alterarLinha(index, novosDados){

            // pegando a linha
            let linha = this.getLinha(index)
            if(!linha) return null

            // caso seja um objeto, será transformado em array
            let dados = isObj(novosDados) ? transformArray(novosDados) : novosDados

            // pegando todos os tds da linha em forma de array
            let tds = transformArray(linha.children)

            // cada elemento de tds será um table data da linha
            for(let i = 0; i < dados.length; i++) tds[i].innerHTML = dados[i]
        }

    }

    // testes
    const p1 = new Pessoa('Fudido Fudência', '12314124')
    const p2 = new Pessoa('Ana Aloprada', '11321314', true)
    const p3 = new Pessoa('Clemência Lopes', '4324325', true)
    const p4 = new Pessoa('Eclesiástico Elástico', '44694896')

    // lista com todas as pessoas
    let pessoas = [p1, p2, p3, p4]

    // criando uma tabela
   const table = new Table('lista', pessoas)
