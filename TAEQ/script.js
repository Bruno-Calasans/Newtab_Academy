
function somar(){

    let n1 = document.getElementById('n1').value
    let n2 = document.getElementById('n2').value

    if(n1 == '' | n2 == ''){
        alert('Todos os campos devem ser preenchidos!')

    }else if(n1 < 0 | n2 < 0){
        alert('Os valores não podem ser negativos!')

    }else{
        let resultado = document.getElementById('resultado')
        resultado.value = `${Number(n1) + Number(n2)}`
    }
    
}