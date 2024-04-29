import fs from "fs";

const content = "Minha mensagem!";

fs.writeFile("meuarquivo.txt", content, function (error) {
    if (error) {
      console.error("Erro ao escrever o arquivo:", error);
      return;
    }
    console.log("Arquivo escrito com sucesso!");
  });
