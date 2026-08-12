/****************************************************
 * UNIVITÓRIA TEC
 * Landing Page
 * script.js
 * Parte 1
 ****************************************************/

/****************************************************
 CONFIGURAÇÕES
****************************************************/

const CONFIG = {

    whatsapp:"5531984033532",

    api:"https://script.google.com/macros/s/SEU_SCRIPT/exec",

    token:"hian2002",

    animationOffset:0.15,

    counterDuration:1800

};

/****************************************************
 INICIALIZAÇÃO
****************************************************/

document.addEventListener("DOMContentLoaded", () => {

    iniciarHeader();

    iniciarScrollSuave();

    iniciarAnimacoes();

    iniciarContadores();

    iniciarBotaoTopo();

    iniciarMenuMobile();

});

/****************************************************
 HEADER
****************************************************/

function iniciarHeader(){

    const header =
        document.querySelector(".header");

    if(!header) return;

    window.addEventListener("scroll", () => {

        if(window.scrollY > 40){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/****************************************************
 MENU MOBILE
****************************************************/

function iniciarMenuMobile(){

    const botao =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".menu");

    if(!botao || !menu) return;

    botao.addEventListener("click", () => {

        menu.classList.toggle("active");

        botao.classList.toggle("active");

    });

    menu.querySelectorAll("a").forEach(item=>{

        item.addEventListener("click",()=>{

            menu.classList.remove("active");

            botao.classList.remove("active");

        });

    });

}

/****************************************************
 SCROLL SUAVE
****************************************************/

function iniciarScrollSuave(){

    document
    .querySelectorAll('a[href^="#"]')
    .forEach(link=>{

        link.addEventListener("click",function(e){

            e.preventDefault();

            const destino =
            document.querySelector(
                this.getAttribute("href")
            );

            if(destino){

                destino.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

}

/****************************************************
 SCROLL REVEAL
****************************************************/

function iniciarAnimacoes(){

    const elementos = document.querySelectorAll(

        ".fade-up,.fade-left,.fade-right"

    );

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:CONFIG.animationOffset

        }

    );

    elementos.forEach(el=>{

        observer.observe(el);

    });

}

/****************************************************
 CONTADORES
****************************************************/

function iniciarContadores(){

    const contadores =
    document.querySelectorAll(

        "[data-counter]"

    );

    if(contadores.length===0) return;

    const observer =
    new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animarNumero(entry.target);

                observer.unobserve(entry.target);

            }

        });

    });

    contadores.forEach(contador=>{

        observer.observe(contador);

    });

}

function animarNumero(elemento){

    const numeroFinal =
    parseInt(
        elemento.dataset.counter
    );

    const inicio = 0;

    const incremento =
    numeroFinal /
    (CONFIG.counterDuration/16);

    let numero = inicio;

    const timer =
    setInterval(()=>{

        numero += incremento;

        if(numero >= numeroFinal){

            numero = numeroFinal;

            clearInterval(timer);

        }

        elemento.innerText =
        Math.floor(numero);

    },16);

}

/****************************************************
 BOTÃO VOLTAR AO TOPO
****************************************************/

function iniciarBotaoTopo(){

    const botao =
    document.querySelector(".btn-topo");

    if(!botao) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            botao.classList.add("show");

        }else{

            botao.classList.remove("show");

        }

    });

    botao.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/****************************************************
 UTILITÁRIOS
****************************************************/

function selecionar(seletor){

    return document.querySelector(seletor);

}

function selecionarTodos(seletor){

    return document.querySelectorAll(seletor);

}

function criarElemento(tag,classe){

    const elemento =
    document.createElement(tag);

    if(classe){

        elemento.className = classe;

    }

    return elemento;

}

function esperar(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

function debounce(func,delay){

    let timeout;

    return (...args)=>{

        clearTimeout(timeout);

        timeout = setTimeout(()=>{

            func.apply(this,args);

        },delay);

    };

}

/****************************************************
 EVENTOS GLOBAIS
****************************************************/

window.addEventListener(

    "resize",

    debounce(()=>{

        console.log("Resize:",window.innerWidth);

    },300)

);

console.log(

    "%cUniVitória TEC",

    "color:#0057B8;font-size:18px;font-weight:bold;"

);

console.log(

    "%cLanding Page carregada com sucesso.",

    "color:green;font-size:14px"

);


/****************************************************
 FAQ ACCORDION
****************************************************/

function iniciarFAQ(){

    const perguntas =
    document.querySelectorAll(".faq-question");

    if(perguntas.length === 0) return;

    perguntas.forEach(botao=>{

        botao.addEventListener("click",()=>{

            const item =
            botao.parentElement;

            document
            .querySelectorAll(".faq-item")
            .forEach(faq=>{

                if(faq !== item){

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}

/****************************************************
 CARROSSEL DE DEPOIMENTOS
****************************************************/

let indiceDepoimento = 0;

function iniciarCarrossel(){

    const cards =
    document.querySelectorAll(".depoimento");

    if(cards.length <= 1) return;

    cards.forEach((card,index)=>{

        if(index !== 0){

            card.style.display="none";

        }

    });

    setInterval(()=>{

        cards[indiceDepoimento].style.display="none";

        indiceDepoimento++;

        if(indiceDepoimento >= cards.length){

            indiceDepoimento = 0;

        }

        cards[indiceDepoimento].style.display="block";

    },5000);

}

/****************************************************
 MÁSCARA TELEFONE
****************************************************/

function iniciarMascaraTelefone(){

    const telefone =
    document.querySelector("#telefone");

    if(!telefone) return;

    telefone.addEventListener("input",e=>{

        let valor =
        e.target.value.replace(/\D/g,'');

        valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );

        e.target.value = valor;

    });

}

/****************************************************
 VALIDAÇÃO FORMULÁRIO
****************************************************/

function validarFormulario(){

    const nome =
    document.querySelector("#nome");

    const telefone =
    document.querySelector("#telefone");

    const email =
    document.querySelector("#email");

    const curso =
    document.querySelector("#curso");

    if(nome && nome.value.trim().length < 3){

        mostrarToast(
            "Informe um nome válido.",
            "erro"
        );

        nome.focus();

        return false;

    }

    if(telefone){

        const numero =
        telefone.value.replace(/\D/g,'');

        if(numero.length < 10){

            mostrarToast(
                "Telefone inválido.",
                "erro"
            );

            telefone.focus();

            return false;

        }

    }

    if(email){

        const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regex.test(email.value)){

            mostrarToast(
                "E-mail inválido.",
                "erro"
            );

            email.focus();

            return false;

        }

    }

    if(curso && curso.value === ""){

        mostrarToast(
            "Selecione um curso.",
            "erro"
        );

        curso.focus();

        return false;

    }

    return true;

}

/****************************************************
 LOADER
****************************************************/

function mostrarLoader(){

    const loader =
    document.querySelector(".loader");

    if(loader){

        loader.style.display="block";

    }

}

function esconderLoader(){

    const loader =
    document.querySelector(".loader");

    if(loader){

        loader.style.display="none";

    }

}

/****************************************************
 TOAST
****************************************************/

function mostrarToast(texto,tipo="sucesso"){

    const toast =
    document.createElement("div");

    toast.className =
    "toast " + tipo;

    toast.innerHTML = texto;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },500);

    },3500);

}

/****************************************************
 HOVER NOS CARDS
****************************************************/

function iniciarHoverCards(){

    document
    .querySelectorAll(
        ".curso-card,.beneficio-card,.step,.cred-card"
    )
    .forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform =
            "translateY(-8px)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform =
            "translateY(0px)";

        });

    });

}

/****************************************************
 EFEITO NOS BOTÕES
****************************************************/

function iniciarRipple(){

    document
    .querySelectorAll("button")
    .forEach(botao=>{

        botao.addEventListener("click",function(e){

            const circulo =
            document.createElement("span");

            const diametro =
            Math.max(
                this.clientWidth,
                this.clientHeight
            );

            circulo.style.width =
            diametro + "px";

            circulo.style.height =
            diametro + "px";

            circulo.className =
            "ripple";

            circulo.style.left =
            (e.offsetX - diametro/2)+"px";

            circulo.style.top =
            (e.offsetY - diametro/2)+"px";

            this.appendChild(circulo);

            setTimeout(()=>{

                circulo.remove();

            },700);

        });

    });

}

/****************************************************
 INICIALIZAÇÃO
****************************************************/

document.addEventListener("DOMContentLoaded",()=>{

    iniciarFAQ();

    iniciarCarrossel();

    iniciarMascaraTelefone();

    iniciarHoverCards();

    iniciarRipple();

});

/****************************************************
 INTEGRAÇÃO COM GOOGLE APPS SCRIPT
****************************************************/

async function enviarFormulario(event){

    event.preventDefault();

    if(!validarFormulario()){

        return;

    }

    mostrarLoader();

    const dados = {

        action: "create",

        token: CONFIG.token,

        nome:
            document.querySelector("#nome").value.trim(),

        telefone:
            document.querySelector("#telefone").value.trim(),

        email:
            document.querySelector("#email").value.trim(),

        curso:
            document.querySelector("#curso").value,

        observacoes:
            document.querySelector("#observacoes")
            ? document.querySelector("#observacoes").value.trim()
            : "",

        origem:
            "Landing Page"

    };

    try{

        const resposta =
        await fetch(

            CONFIG.api,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(dados)

            }

        );

        const resultado =
        await resposta.json();

        esconderLoader();

        if(resultado.sucesso){

            mostrarToast(

                "Cadastro enviado com sucesso!"

            );

            limparFormulario();

            enviarEventoMeta();

            enviarEventoGA();

            redirecionarWhatsapp(dados);

        }else{

            mostrarToast(

                resultado.mensagem ||

                "Erro ao enviar.",

                "erro"

            );

        }

    }

    catch(error){

        esconderLoader();

        console.error(error);

        mostrarToast(

            "Não foi possível enviar os dados.",

            "erro"

        );

    }

}

/****************************************************
 LIMPAR FORMULÁRIO
****************************************************/

function limparFormulario(){

    const form =
    document.querySelector("#leadForm");

    if(form){

        form.reset();

    }

}

/****************************************************
 WHATSAPP
****************************************************/

function redirecionarWhatsapp(dados){

    const mensagem =

`Olá!

Acabei de preencher o formulário da UniVitória TEC.

Nome: ${dados.nome}

Curso de interesse: ${dados.curso}

Gostaria de receber mais informações.`;

    const url =

`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

    setTimeout(()=>{

        window.open(

            url,

            "_blank"

        );

    },1200);

}

/****************************************************
 META PIXEL
****************************************************/

function enviarEventoMeta(){

    if(typeof fbq === "function"){

        fbq(

            "track",

            "Lead"

        );

    }

}

/****************************************************
 GOOGLE ANALYTICS
****************************************************/

function enviarEventoGA(){

    if(typeof gtag === "function"){

        gtag(

            "event",

            "generate_lead",

            {

                event_category:"Landing",

                event_label:"Formulario"

            }

        );

    }

}

/****************************************************
 BOTÃO WHATSAPP FIXO
****************************************************/

function iniciarWhatsapp(){

    const botao =

    document.querySelector(".whatsapp");

    if(!botao) return;

    botao.addEventListener(

        "click",

        ()=>{

            const texto =

            encodeURIComponent(

                "Olá! Gostaria de saber mais sobre o Técnico por Competência."

            );

            window.open(

                `https://wa.me/${CONFIG.whatsapp}?text=${texto}`,

                "_blank"

            );

        }

    );

}

/****************************************************
 PRELOADER
****************************************************/

window.addEventListener(

    "load",

    ()=>{

        const loader =

        document.querySelector(".preloader");

        if(loader){

            loader.classList.add("hide");

            setTimeout(()=>{

                loader.remove();

            },500);

        }

    }

);

/****************************************************
 ANO AUTOMÁTICO NO RODAPÉ
****************************************************/

function atualizarAno(){

    const ano =

    document.querySelector("#ano");

    if(ano){

        ano.innerText =

        new Date().getFullYear();

    }

}

/****************************************************
 VERIFICAR API
****************************************************/

async function testarAPI(){

    try{

        const resposta =

        await fetch(

            CONFIG.api +

            "?action=status"

        );

        console.log(

            "API Online",

            resposta.status

        );

    }

    catch(error){

        console.warn(

            "API indisponível"

        );

    }

}

/****************************************************
 COPIAR PIX
****************************************************/

function copiarTexto(texto){

    navigator.clipboard.writeText(texto);

    mostrarToast(

        "Texto copiado!"

    );

}

/****************************************************
 VOLTAR AO TOPO
****************************************************/

function voltarAoTopo(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/****************************************************
 EVENTOS
****************************************************/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        atualizarAno();

        iniciarWhatsapp();

        testarAPI();

        const formulario =

        document.querySelector("#leadForm");

        if(formulario){

            formulario.addEventListener(

                "submit",

                enviarFormulario

            );

        }

    }

);