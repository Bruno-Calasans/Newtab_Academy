

    // pegando os elementos
    const closeBtn = document.getElementById('closeBtn')
    const menuToggle = document.getElementById('menu-toggle')
    const menu = document.getElementById('menu')
    
    // adicionando eventos
    menuToggle.onclick = openSideMenu
    closeBtn.onclick = closeSideMenu

    function openSideMenu(){

        // exibindo o menu
        menu.setAttribute('style', 'display: initial')

        // alterando a classe da lista do menu
        const lista = document.querySelector('.menu-list')
        if(lista) lista.className = 'menu-list-toggle'

        // alterando a classe dos items da lista
        const items = document.querySelectorAll('.list-item')
        if(items){
            for(let item of items) {item.className = 'list-item-toggle'}
        }

        // exibindo o botão de fechar
        closeBtn.setAttribute('style', 'display: initial')
    }

    function closeSideMenu(){

        // verificando largura da viewport
        const larguraAtual = document.body.clientWidth

        // ocultando o menu
        menu.removeAttribute('style')

        // alterando a classe da lista do menu
        const lista = document.querySelector('.menu-list-toggle')
        if(lista) lista.className = 'menu-list'

        // alterando a classe de cada item da lista
        const items = document.querySelectorAll('.list-item-toggle')
        if(items){
            for(let item of items) {item.className = 'list-item'}
        }

        // ocultando o botão de fechar
        closeBtn.removeAttribute('style')
    }

    // fechando menu-toggle ao clicar fora dele
    document.body.onclick = (e) => {
    if(e.target.id != 'menu-toggle'
    && e.target.className != 'menu-list-toggle') closeSideMenu()}

