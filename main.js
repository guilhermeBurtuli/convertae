const API_KEY = 'f8aea567f49379f39518'
const API_URL = 'https://free.currconv.com/api/v7/convert?q'
const API_FLAG = 'https://restcountries.com/v3.1/currency'

function start() {
    getCountries()
}

async function convertCurrency() {
    var icon = ''
    var form = document.getElementById("form")
    var to = form.moedaconvert.value
    var for1 = form.moedaconvertida.value
    if(to == 1 || for1 == 1) {
        alert("Selecione as moedas para converter.")
    } else {
        let response = await fetch(`${API_URL}=${to}_${for1},${for1}_${to}&compact=ultra&apiKey=${API_KEY}`)
        response = await response.json()
        var value = Object.values(response)
        var convertendo = document.getElementById("convertendo").value
        if(convertendo == "") {
            alert("Digite um valor para converter.")
        } else {
            var convertido = convertendo * value[0]
            // let response2 = await fetch('data/currencies.json')
            // response2 = response2.json()
            // Object.values(response2).forEach(element => {
            //     if(element.id == `${for1}`) {
            //         icon = element.currencySymbol
            //     }
            // });
            document.getElementById("convertido").value = `${icon}` + convertido.toFixed(2)
            let flag = await fetch(`${API_FLAG}/${for1}`)
            flag = await flag.json()
            document.getElementById("paises-container").innerHTML = ''
            document.getElementById("nome-moeda").style.display = "flex"
            document.getElementById("nome-moeda").innerHTML = `O ${for1} é usado em:`
            /*
            flag.forEach(element => {
                if(element.translations.por.common != 'Ilhas Menores Distantes dos Estados Unidos') {
                    document.getElementById("pais").innerHTML += `<img id="bandeira" src="${element.flags.png}">`
                    document.getElementById("pais").innerHTML += `<span id="nomepais">${element.translations.por.common}</span>`   
                }
            });
            */
            flag.forEach(element => {
                if(element.translations.por.common != 'Ilhas Menores Distantes dos Estados Unidos') {
                    document.getElementById("paises-container").innerHTML += `<div class="pais"> <img id="bandeira" src="${element.flags.png}"> <span id="nomepais">${element.translations.por.common}</span> </div>`   
                }
            });
        }
    }
    /*document.getElementById("nomepais").innerHTML = `${flag[0].translations.por.common}`*/
    // document.getElementById("convertido").value = ``
}

function order(data11) {
    var html = ''
    var currencies = Object.keys(data11).map(function(key) {
        return { codigo: key, nome: data11[key] };
    });

    currencies.sort(function (currencieA, currencieB) {
        return currencieA.codigo > currencieB.codigo ? 1 : -1;
    });

    currencies.forEach(element => {
        html += `<option value='${element.codigo}'>${element.codigo}</option>`
    });

    return html
}

async function getCountries(){
    let response = await fetch('currencies.json')
    let payload = await response.json()
    let html = order(payload)
    document.getElementById("moedaconvert").innerHTML += html
    document.getElementById("moedaconvertida").innerHTML += html
}

function mouseEmCima(imagem) {
   
    imagem.src="icone-link-depois.png";
    
}
    
 function mouseFora(imagem) {
    
    imagem.src="icone-link-antes.png";
    
}
