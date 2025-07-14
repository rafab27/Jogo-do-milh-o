
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const perguntas = [
  {
    enunciado: "O que é um Sistema de Informação?",
    alternativas: [
      "A) Apenas computadores conectados à internet",
      "B) Conjunto de componentes para coletar, processar e distribuir informação",
      "C) Uma linguagem de programação",
    ],
    correta: "B"
  },
  {
    enunciado: "O que é hardware?",
    alternativas: [
      "A) Parte física do computador",
      "B) Programas e aplicativos",
      "C) Sistema operacional",
    ],
    correta: "A"
  },
  {
    enunciado: "Qual das opções é um exemplo de software?",
    alternativas: [
      "A) Placa-mãe",
      "B) Windows",
      "C) Cabo de rede",
    ],
    correta: "B"
  },
  {
    enunciado: "O que é um banco de dados?",
    alternativas: [
      "A) Um tipo de memória RAM",
      "B) Um conjunto de dados organizados para acesso e manipulação",
      "C) Um antivírus",
    ],
    correta: "B"
  },
  {
    enunciado: "Qual linguagem é mais usada para interagir com bancos de dados?",
    alternativas: [
      "A) HTML",
      "B) SQL",
      "C) CSS",
    ],
    correta: "B"
  },
  {
    enunciado: "O que significa a sigla TI?",
    alternativas: [
      "A) Tecnologia Indústria",
      "B) Teoria da Informação",
      "C) Tecnologia da Informação",
    ],
    correta: "C"
  },
  {
    enunciado: "O que é um sistema ERP?",
    alternativas: [
      "A) Sistema de edição de imagens",
      "B) Sistema de planejamento de recursos empresariais",
      "C) Um tipo de computador",
    ],
    correta: "B"
  },
  {
    enunciado: "Qual é a função do sistema operacional?",
    alternativas: [
      "A) Fornecer energia ao hardware",
      "B) Proteger o computador de vírus",
      "C) Gerenciar o hardware e fornecer interface para o usuário",
    ],
    correta: "C"
  },
  {
    enunciado: "O que é cloud computing (computação em nuvem)?",
    alternativas: [
      "A) Armazenamento local",
      "B) Execução de serviços e armazenamento via internet",
      "C) Um antivírus",
    ],
    correta: "B"
  },
  {
    enunciado: "Qual destes é um banco de dados relacional?",
    alternativas: [
      "A) Excel",
      "B) MongoDB",
      "C) MySQL",
    ],
    correta: "C"
  },
  {
    enunciado: "O que representa a camada física em redes de computadores?",
    alternativas: [
      "A) Cabos, conectores e sinais elétricos",
      "B) Login e senhas",
      "C) Aplicativos de chat",
    ],
    correta: "A"
  },
  {
    enunciado: "Qual das alternativas representa um protocolo da Internet?",
    alternativas: [
      "A) HDMI",
      "B) TCP/IP",
      "C) USB",
    ],
    correta: "B"
  },
  {
    enunciado: "O que é um sistema legado?",
    alternativas: [
      "A) Um sistema recente",
      "B) Sistema descontinuado ou antigo ainda em uso",
      "C) Um tipo de backup",
    ],
    correta: "B"
  },
  {
    enunciado: "Qual é o principal objetivo de um sistema de informação em uma empresa?",
    alternativas: [
      "A) Aumentar os gastos",
      "B) Substituir funcionários",
      "C) Apoiar processos e tomada de decisão",
    ],
    correta: "C"
  },
  {
    enunciado: "Quem são os usuários finais de um sistema de informação?",
    alternativas: [
      "A) Apenas os desenvolvedores",
      "B) As pessoas que utilizam os dados gerados pelo sistema",
      "C) O hardware do sistema",
    ],
    correta: "B"
  }
];


const premiacoes = [1000, 5000, 10000, 25000, 50000];

let nomeJogador = "";
let rodadaAtual = 0;
let totalPremio = 0;
let perguntaAtual = null;

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function fazerPergunta(pergunta, rodada) {
  console.log(`\n🔹 Rodada ${rodada + 1} - Valendo R$${premiacoes[rodada].toLocaleString()}`);
  console.log(`🔸 Pergunta: ${pergunta.enunciado}`);
  pergunta.alternativas.forEach(alternativa => console.log(alternativa));
  console.log("Digite A, B ou C para responder. Ou digite P para parar.");
}

function perguntarRodada(perguntasSelecionadas) {
  if (rodadaAtual >= 5) {
    finalizarJogo("concluiu todas as rodadas");
    return;
  }

  perguntaAtual = perguntasSelecionadas[rodadaAtual];
  fazerPergunta(perguntaAtual, rodadaAtual);

  rl.question("Sua resposta: ", resposta => {
    resposta = resposta.trim().toUpperCase();

    if (resposta === "P") {
      finalizarJogo("parou");
      return;
    }

    if (resposta === perguntaAtual.correta) {
      console.log("✅ Resposta correta!");
      totalPremio += premiacoes[rodadaAtual];
      rodadaAtual++;
      perguntarRodada(perguntasSelecionadas);
    } else {
      console.log(`❌ Resposta errada! A correta era: ${perguntaAtual.correta}`);
      totalPremio = 0;
      finalizarJogo("errou");
    }
  });
}

function finalizarJogo(motivo) {
  console.log(`\n🎉 Fim de jogo, ${nomeJogador}!`);
  console.log(`Você ${motivo} na rodada ${rodadaAtual + 1}.`);
  console.log(`Premiação final: R$${totalPremio.toLocaleString()}`);
  if (perguntaAtual) {
    console.log(`A resposta correta era: ${perguntaAtual.correta}`);
  }
  rl.question("\nDeseja jogar novamente? (S/N): ", resposta => {
    if (resposta.trim().toUpperCase() === "S") {
      iniciarJogo();
    } else {
      console.log("Obrigado por jogar! 👋");
      rl.close();
    }
  });
}

function iniciarJogo() {
  rodadaAtual = 0;
  totalPremio = 0;
  const perguntasSelecionadas = embaralhar([...perguntas]).slice(0, 5);

  rl.question("Digite seu nome para começar: ", nome => {
    nomeJogador = nome.trim();
    console.log(`\nSeja bem-vindo, ${nomeJogador}! Vamos jogar o Show do Milhão! 💰`);
    perguntarRodada(perguntasSelecionadas);
  });
}

iniciarJogo();
