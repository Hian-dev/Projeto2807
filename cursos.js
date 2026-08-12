/*==================================================
 UniVitória TEC
 cursos.js
 PARTE 1
==================================================*/

/***************************************************
 CURSOS
****************************************************/

const cursos = {

    saude: [

        "Técnico em Agente Comunitário de Saúde",
        "Técnico em Análises Clínicas",
        "Técnico em Cuidador de Idosos",
        "Técnico em Enfermagem",
        "Técnico em Equipamentos Biomédicos",
        "Técnico em Estética",
        "Técnico em Farmácia",
        "Técnico em Gerência em Saúde",
        "Técnico em Nutrição e Dietética",
        "Técnico em Saúde Bucal",
        "Técnico em Veterinária"

    ],

    gestao: [

        "Técnico em Administração",
        "Técnico em Contabilidade",
        "Técnico em Logística",
        "Técnico em Marketing",
        "Técnico em Qualidade",
        "Técnico em Recursos Humanos",
        "Técnico em Secretaria Escolar",
        "Técnico em Segurança do Trabalho",
        "Técnico em Serviços Jurídicos",
        "Técnico em Vendas",
        "Técnico em Eventos"

    ],

    tecnologia: [

        "Técnico em Biotecnologia",
        "Técnico em Design Gráfico",
        "Técnico em Desenvolvimento de Sistemas",
        "Técnico em Informática para Internet",
        "Técnico em Rede de Computadores",
        "Técnico em Sistemas de Energia Renovável",
        "Técnico em Telecomunicações"

    ],

    industria: [

        "Técnico em Automação Industrial",
        "Técnico em Eletromecânica",
        "Técnico em Eletrotécnica",
        "Técnico em Eletrônica",
        "Técnico em Manutenção de Máquinas Industriais",
        "Técnico em Máquinas Pesadas",
        "Técnico em Metalurgia",
        "Técnico em Refrigeração e Climatização",
        "Técnico em Soldagem",
        "Técnico em Manutenção de Máquinas Navais"

    ],

    infraestrutura: [

        "Técnico em Agrimensura",
        "Técnico em Edificações",
        "Técnico em Mineração",
        "Técnico em Prevenção e Combate ao Incêndio",
        "Técnico em Defesa Civil",
        "Técnico em Trânsito"

    ],

    meioambiente: [

        "Técnico em Meio Ambiente"

    ],

    servicos: [

        "Técnico em Gastronomia",
        "Técnico em Óptica",
        "Técnico em Designer de Interiores",
        "Técnico em Guia de Turismo",
        "Técnico em Química"

    ]

};

/***************************************************
 ÍCONES DAS ÁREAS
****************************************************/

const icones = {

    saude: "🩺",
    gestao: "💼",
    tecnologia: "💻",
    industria: "⚙️",
    infraestrutura: "🏗️",
    meioambiente: "🌱",
    servicos: "🎨"

};

/***************************************************
 DESCRIÇÃO PADRÃO
****************************************************/

const descricaoPadrao =

"Certificação técnica por competência, reconhecida nacionalmente, processo 100% online e diploma válido em todo o Brasil.";

/***************************************************
 CRIA CARD
****************************************************/

function criarCard(nomeCurso, area){

    return `

    <div class="card-curso fade">

        <div class="tag-mec">

            MEC

        </div>

        <div class="card-icon">

            <span style="font-size:40px">

                ${icones[area]}

            </span>

        </div>

        <div class="status">

            Matrículas Abertas

        </div>

        <h3>

            ${nomeCurso}

        </h3>

        <p>

            ${descricaoPadrao}

        </p>

        <div class="card-footer">

            <button

                class="card-btn"

                onclick="abrirCurso('${nomeCurso}')"

            >

                Saiba Mais

            </button>

        </div>

    </div>

    `;

}

/***************************************************
 RENDERIZA UMA ÁREA
****************************************************/

function renderizarArea(nomeArea){

    const container =

    document.getElementById(nomeArea);

    if(!container) return;

    container.innerHTML = "";

    cursos[nomeArea].forEach(curso=>{

        container.innerHTML +=

        criarCard(curso,nomeArea);

    });

}

/***************************************************
 RENDERIZA TODAS AS ÁREAS
****************************************************/

function renderizarCursos(){

    renderizarArea("saude");

    renderizarArea("gestao");

    renderizarArea("tecnologia");

    renderizarArea("industria");

    renderizarArea("infraestrutura");

    renderizarArea("meioambiente");

    renderizarArea("servicos");

}

/***************************************************
 INICIALIZAÇÃO
****************************************************/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        renderizarCursos();

    }

);


/*==================================================
 UniVitória TEC
 cursos.js
 PARTE 2
==================================================*/

/***************************************************
 ORDENA TODOS OS CURSOS
****************************************************/

Object.keys(cursos).forEach(area => {

    cursos[area].sort((a, b) => a.localeCompare(b));

});

/***************************************************
 PESQUISA
****************************************************/

const campoPesquisa = document.getElementById("pesquisa");

if (campoPesquisa) {

    campoPesquisa.addEventListener("keyup", pesquisarCursos);

}

function pesquisarCursos() {

    const termo = campoPesquisa.value
        .toLowerCase()
        .trim();

    Object.keys(cursos).forEach(area => {

        const container = document.getElementById(area);

        container.innerHTML = "";

        let quantidade = 0;

        cursos[area].forEach(curso => {

            if (curso.toLowerCase().includes(termo)) {

                quantidade++;

                container.innerHTML += criarCard(curso, area);

            }

        });

        atualizarTitulo(area, quantidade);

    });

    animarCards();

}

/***************************************************
 ATUALIZA QUANTIDADE
****************************************************/

function atualizarTitulo(area, quantidade){

    const secao =
        document.getElementById(area)
        .parentElement;

    const titulo =
        secao.querySelector("h2");

    const nomes = {

        saude:"🩺 Saúde",

        gestao:"💼 Gestão",

        tecnologia:"💻 Tecnologia",

        industria:"⚙️ Indústria",

        infraestrutura:"🏗 Infraestrutura",

        meioambiente:"🌱 Meio Ambiente",

        servicos:"🎨 Serviços"

    };

    titulo.innerHTML =

    `${nomes[area]}
    <span style="
        color:#0A8DFF;
        font-size:18px;
        font-weight:600;
    ">
        (${quantidade})
    </span>`;

}

/***************************************************
 CONTADOR INICIAL
****************************************************/

function atualizarTodosOsTitulos(){

    Object.keys(cursos).forEach(area=>{

        atualizarTitulo(

            area,

            cursos[area].length

        );

    });

}

document.addEventListener(

    "DOMContentLoaded",

    atualizarTodosOsTitulos

);

/***************************************************
 ABRIR CURSO
****************************************************/

function abrirCurso(nomeCurso) {

    enviarLead(nomeCurso);

    const slug = nomeCurso
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

    window.location.href =
        `PAGINASCURSOS/${slug}.html`;
}

/***************************************************
 ANIMAÇÃO DOS CARDS
****************************************************/

function animarCards(){

    const elementos =

    document.querySelectorAll(".fade");

    const altura =

    window.innerHeight * .9;

    elementos.forEach(card=>{

        const posicao =

        card.getBoundingClientRect().top;

        if(posicao < altura){

            card.classList.add("show");

        }

    });

}

window.addEventListener(

    "scroll",

    animarCards

);

document.addEventListener(

    "DOMContentLoaded",

    animarCards

);

/***************************************************
 PESQUISA COM ENTER
****************************************************/

document.addEventListener(

    "keydown",

    function(e){

        if(e.key==="Enter"){

            pesquisarCursos();

        }

    }

);

/***************************************************
 LIMPAR PESQUISA
****************************************************/

function limparPesquisa(){

    campoPesquisa.value="";

    renderizarCursos();

    atualizarTodosOsTitulos();

    animarCards();

}

/***************************************************
 MENSAGEM QUANDO NÃO ENCONTRAR
****************************************************/

function verificarResultados(){

    let total=0;

    Object.keys(cursos).forEach(area=>{

        total +=

        document
        .getElementById(area)
        .children.length;

    });

    let aviso =

    document.getElementById("semResultado");

    if(!aviso){

        aviso=document.createElement("div");

        aviso.id="semResultado";

        aviso.style.textAlign="center";

        aviso.style.padding="40px";

        aviso.style.fontSize="22px";

        aviso.style.color="#0057B8";

        document.body.appendChild(aviso);

    }

    if(total===0){

        aviso.innerHTML=

        "Nenhum curso encontrado.";

    }else{

        aviso.innerHTML="";

    }

}

campoPesquisa.addEventListener(

    "keyup",

    verificarResultados

);


/*==================================================
 UniVitória TEC
 cursos.js
 PARTE 3
==================================================*/

/***************************************************
TOTAL DE CURSOS
****************************************************/

function atualizarTotalCursos(){

    let total = 0;

    Object.keys(cursos).forEach(area=>{

        total += cursos[area].length;

    });

    const span = document.getElementById("totalCursos");

    if(span){

        span.innerHTML = total;

    }

}

document.addEventListener(

    "DOMContentLoaded",

    atualizarTotalCursos

);

/***************************************************
CURSOS EM DESTAQUE
****************************************************/

const cursosDestaque = [

    "Técnico em Enfermagem",

    "Técnico em Segurança do Trabalho",

    "Técnico em Desenvolvimento de Sistemas",

    "Técnico em Eletrotécnica",

    "Técnico em Administração",

    "Técnico em Estética"

];

function destacarCursos(){

    document.querySelectorAll(".card-curso")
    .forEach(card=>{

        const titulo =
        card.querySelector("h3").innerText;

        if(cursosDestaque.includes(titulo)){

            const selo =
            document.createElement("div");

            selo.className="curso-destaque";

            selo.innerHTML="⭐ Destaque";

            card.prepend(selo);

        }

    });

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        setTimeout(

            destacarCursos,

            500

        );

    }

);

/***************************************************
BOTÃO VOLTAR AO TOPO
****************************************************/

const btnTopo =

document.querySelector(".btn-topo");

window.addEventListener(

    "scroll",

    ()=>{

        if(!btnTopo) return;

        if(window.scrollY>500){

            btnTopo.classList.add("show");

        }else{

            btnTopo.classList.remove("show");

        }

    }

);

if(btnTopo){

btnTopo.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

}

/***************************************************
BOTÃO WHATSAPP
****************************************************/

const whatsapp =

document.querySelector(".whatsapp");

if(whatsapp){

    whatsapp.onclick=()=>{

        const mensagem =

        encodeURIComponent(

        "Olá! Gostaria de receber informações sobre os cursos técnicos da UniVitória TEC."

        );

        window.open(

        `https://wa.me/5569999999999?text=${mensagem}`,

        "_blank"

        );

    };

}

/***************************************************
HEADER FIXO
****************************************************/

const header =

document.querySelector("header");

window.addEventListener(

"scroll",

()=>{

if(window.scrollY>80){

header.classList.add("header-scroll");

}else{

header.classList.remove("header-scroll");

}

}

);

/***************************************************
LAZY LOADING DAS IMAGENS
****************************************************/

function lazyImages(){

const imagens=

document.querySelectorAll("img[data-src]");

const observer=

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=

entry.target;

img.src=

img.dataset.src;

img.removeAttribute("data-src");

observer.unobserve(img);

}

});

}

);

imagens.forEach(img=>{

observer.observe(img);

});

}

document.addEventListener(

"DOMContentLoaded",

lazyImages

);

/***************************************************
SCROLL SUAVE MENU
****************************************************/

document

.querySelectorAll('a[href^="#"]')

.forEach(link=>{

link.addEventListener(

"click",

function(e){

e.preventDefault();

const destino=

document.querySelector(

this.getAttribute("href")

);

if(destino){

destino.scrollIntoView({

behavior:"smooth"

});

}

}

);

});

/***************************************************
PREPARAÇÃO PARA CRM
****************************************************/

function enviarLead(curso){

console.log(

"Lead enviado:",

curso

);

/*

Aqui será integrado futuramente
ao CRM da UniVitória TEC.

Exemplo:

fetch(API_URL,{

method:"POST",

body:JSON.stringify({

curso

})

})

*/

}

/***************************************************
ABRIR CURSO
****************************************************/

/*function abrirCurso(nomeCurso){

enviarLead(nomeCurso);

const slug =

nomeCurso

.normalize("NFD")

.replace(/[\u0300-\u036f]/g,"")

.replace(/[^\w\s]/g,"")

.replace(/\s+/g,"-")

.toLowerCase();

window.location.href=

`curso.html?curso=${slug}`;

}*/

/***************************************************
EFEITO RIPPLE BOTÕES
****************************************************/

document

.querySelectorAll(".card-btn")

.forEach(botao=>{

botao.addEventListener(

"click",

function(e){

const ripple=

document.createElement("span");

ripple.className="ripple";

this.appendChild(ripple);

const x=

e.offsetX;

const y=

e.offsetY;

ripple.style.left=x+"px";

ripple.style.top=y+"px";

setTimeout(()=>{

ripple.remove();

},600);

}

);

});

/***************************************************
LOG
****************************************************/

console.log(

"%cUniVitória TEC",

"color:#0057B8;font-size:24px;font-weight:bold"

);

console.log(

"Catálogo carregado com sucesso."

);

/***************************************************
FIM
****************************************************/