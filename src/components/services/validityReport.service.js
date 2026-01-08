import { jsPDF } from "jspdf";
import { useUserStore } from "@/store/user.store";

export function generateReport(products) {
  const doc = new jsPDF({
    orientation: "l",
    unit: "px",
    format: "a4",
  });

  const { user } = useUserStore.getState();

  const colab = "Kamila Trindade";
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const pageNumber = "01";

  doc.addImage("../../logo-senna-report.png", "PNG", 0, 0, 132, 46);

  doc.setTextColor(99, 99, 99);
  doc.setFontSize("12");
  doc.text(`Gerado por: ${colab}`, 16, 418);
  doc.text(`Data da Emissão: ${currentDate}`, 16, 428);

  products.map((product) => {
    doc.text(product?.validity_id, 16, 64);
    doc.text(product?.request_id, 32, 64);
    doc.text(product?.product_id, 48, 64);
    doc.text(product?.product_code, 64, 64);
    doc.text(product?.description, 80, 64);
    doc.text(product?.quantity, 96, 64);
    doc.text(
      product?.validity_date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
      112,
      64,
    );
    doc.text(
      product?.created_at.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
      128,
      64,
    );
    doc.text(product?.buyer_id, 144, 64);
    doc.text(product?.treat_id, 160, 64);
  });

  doc.text(`${pageNumber}`, 604, 428);

  doc.save("teste.pdf");
}
