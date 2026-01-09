import { jsPDF } from "jspdf";
import { useUserStore } from "@/store/user.store";
import treatments from "@/files/treatments.json";

export function generateReport(payload) {
  const doc = new jsPDF({
    orientation: "l",
    unit: "px",
    format: "a4",
  });

  const { user } = useUserStore.getState();

  const truncateText = (text, maxWidth) => {
    if (!text) return "";

    const textWidth = doc.getTextWidth(text);

    if (textWidth <= maxWidth) {
      return text;
    }

    // Adicionar reticências e ir removendo caracteres até caber
    let truncated = text;
    while (doc.getTextWidth(truncated + "...") > maxWidth && truncated.length > 0) {
      truncated = truncated.slice(0, -1);
    }

    return truncated + "...";
  };

  const products = payload.map((prod) => ({
    ...prod,
    treat_description: treatments.find((treat) => treat.id === prod?.treat_id)?.description,
    description: truncateText(prod?.description, 290),
  }));

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const PRODUCTS_PER_PAGE = 22;
  const START_Y = 64; // Posição Y inicial para os produtos
  const LINE_HEIGHT = 16; // Espaçamento entre linhas

  // Função para criar o cabeçalho de cada página
  const createHeader = () => {
    doc.addImage("../../logo-senna-report.png", "PNG", 0, 0, 132, 46);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("black");
    doc.text("ID", 16, 48);
    doc.text("Filial", 36, 48);
    doc.text("Cod. Prod", 68, 48);
    doc.text("Descrição", 120, 48);
    doc.text("Quant", 388, 48);
    doc.text("Dt. Valid.", 426, 48);
    doc.text("Tratativa", 480, 48);
  };

  // Função para criar o rodapé de cada página
  const createFooter = (pageNumber) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(99, 99, 99);
    doc.text(`Gerado por: ${user?.name} - ${user?.winthor_id}`, 16, 418);
    doc.text(`Data da Emissão: ${currentDate}`, 16, 428);
    doc.text(String(pageNumber).padStart(2, "0"), 604, 428);
  };

  // Calcular o número total de páginas
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Iterar sobre as páginas
  for (let page = 0; page < totalPages; page++) {
    // Adicionar nova página (exceto na primeira)
    if (page > 0) {
      doc.addPage();
    }

    // Criar cabeçalho
    createHeader();

    // Calcular índices dos produtos para esta página
    const startIndex = page * PRODUCTS_PER_PAGE;
    const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, products.length);

    // Renderizar produtos da página atual
    doc.setFont("helvetica", "normal");
    doc.setTextColor("black");

    for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];
      const rowIndex = i - startIndex;
      const yPosition = START_Y + rowIndex * LINE_HEIGHT;

      // Renderizar cada campo do produto
      doc.text(String(product?.product_id || ""), 16, yPosition);
      doc.text(String(product?.branch_id || ""), 36, yPosition);
      doc.text(String(product?.product_code || ""), 68, yPosition);
      doc.text(String(product?.description || ""), 120, yPosition);
      doc.text(String(product?.quantity || ""), 388, yPosition);

      // Formatar data de validade
      if (product?.validity_date) {
        const validityDate = new Date(product.validity_date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        doc.text(validityDate, 426, yPosition);
      }

      // Tratativa
      doc.text(String(product?.treat_description || ""), 480, yPosition);
    }

    // Criar rodapé com número da página
    createFooter(page + 1);
  }

  // Salvar o PDF
  doc.save(`relatorio_tratativas_${currentDate}.pdf`);
}
