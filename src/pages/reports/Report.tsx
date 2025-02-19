import React, { useEffect, useRef, useState } from "react";
import { useTable, Column } from "react-table";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../ChartConfig";
import { Chart } from "chart.js";
import "./Report.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button } from "react-bootstrap";

const Report = () => {
  interface Cliente {
    idCliente: number;
    nombre: string;
    fechaRegistro: string;
    email: string;
    suscripcion: string;
  }
  const [data, setData] = useState<Cliente[]>([]);
  const chartRef = useRef<Chart<"bar"> | null>(null);

  // Obtener datos de ejemplo
  useEffect(() => {
    fetch("http://localhost:8080/responsivemeals/clientes")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Configuración de columnas para la tabla
  const columns: Column<Cliente>[] = React.useMemo(
    () => [
      { Header: "ID", accessor: "idCliente" as keyof Cliente },
      { Header: "Nombre", accessor: "nombre" as keyof Cliente },
      {
        Header: "Fecha de registro",
        accessor: "fechaRegistro" as keyof Cliente,
      },
      { Header: "Email", accessor: "email" as keyof Cliente },
      { Header: "Suscripción", accessor: "suscripcion" as keyof Cliente },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const suscripciones = data.reduce<Record<string, number>>((acc, cliente) => {
    acc[cliente.suscripcion] = (acc[cliente.suscripcion] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(suscripciones), // Tipos de suscripción
    datasets: [
      {
        label: "Cantidad de Usuarios por suscripción",
        data: Object.values(suscripciones),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Informe de Clientes", 14, 15);

    // Datos de la tabla

    autoTable(doc, {
      head: [["ID", "Nombre", "Fecha de Registro", "Email", "Suscripción"]],
      body: data.map((cliente) => [
        cliente.idCliente,
        cliente.nombre,
        cliente.fechaRegistro,
        cliente.email,
        cliente.suscripcion,
      ]),
      startY: 25,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).lastAutoTable?.finalY ?? 25;
    const chart = chartRef.current;
    if (chart && chart.canvas) {
      const image = chart.canvas.toDataURL("image/png");
      doc.addImage(image, "PNG", 14, finalY + 10, 160, 80);
    }

    // Descargar PDF
    doc.save("informe.pdf");
  };
  return (
    <>
      <Header />
      <div className="report-container">
        <h1 id="report-titulo">Informe de Clientes</h1>

        {/* Tabla */}
        <div className="table-container">
        <table
          {...getTableProps()}
          style={{ border: "1px solid black", marginBottom: "20px" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{ border: "1px solid black", padding: "5px" ,backgroundColor:"#F89D53"}}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: "1px solid black", padding: "5px" , backgroundColor:"#FBC59A"}}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>

        {/* Gráfico */}
        <Bar data={chartData} ref={chartRef} />
        {/* Botón para exportar */}
        <div className="export-container">
          <Button
            onClick={exportToPDF}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#C65D1A",
              borderColor: "#C65D1A",
            }}
          >
            Exportar a PDF
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Report;
