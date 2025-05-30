/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { getToken } from "../../services/AuthService";

const Report = () => {
  interface Cliente {
    idCliente: number;
    nombre: string;
    fechaRegistro: string;
    email: string;
    suscripcion: {
      idSuscripcion: number;
      nombre: string;
    };
  }
  const [data, setData] = useState<Cliente[]>([]);
  const chartRef = useRef<Chart<"bar"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener datos de ejemplo
  useEffect(() => {
    const token = getToken();
    fetch("http://localhost:8080/responsivemeals/clientes", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        return response.json();
      })
      .then((data) => {
        const datosFiltrados = data.filter((cliente: any) => cliente.nombre.toLowerCase() !== "admin");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const datosTransformados = datosFiltrados.map((cliente: any) => ({
          ...cliente,
          nombre_suscripcion: cliente.suscripcion?.nombre || "Sin suscripción",
        }));
        setData(datosTransformados);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message); // Opcional: manejar el estado de error
      })
      .finally(() => setLoading(false)); // Opcional: manejar estado de carga
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
      {
        Header: "Suscripción",
        accessor: "nombre_suscripcion" as keyof Cliente,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: { row: any }) =>
          row.original.suscripcion?.nombre || "Sin suscripción",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const suscripciones = data.reduce<Record<string, number>>((acc, cliente) => {
    const nombreSuscripcion = cliente.suscripcion?.nombre || "Sin suscripción";

    acc[nombreSuscripcion] = (acc[nombreSuscripcion] || 0) + 1;
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
        cliente.suscripcion?.nombre || "Sin suscripción",
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
            {/* Encabezados de la tabla */}
            <thead>
              {headerGroups.map((headerGroup) => {
                // Extrae key del objeto de props
                const { key, ...restHeaderGroupProps } =
                  headerGroup.getHeaderGroupProps();
                return (
                  <tr key={key} {...restHeaderGroupProps}>
                    {headerGroup.headers.map((column) => {
                      // Extrae key de las props de cada columna
                      const { key: columnKey, ...restColumnProps } =
                        column.getHeaderProps();
                      return (
                        <th
                          key={columnKey}
                          {...restColumnProps}
                          style={{
                            border: "1px solid black",
                            padding: "5px",
                            backgroundColor: "#F89D53",
                          }}
                        >
                          {column.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>

            {/* Filas de la tabla */}
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                // Extrae key del objeto de props
                const { key, ...restRowProps } = row.getRowProps();
                return (
                  <tr key={key} {...restRowProps}>
                    {row.cells.map((cell) => {
                      // Extrae key de las props de cada celda
                      const { key: cellKey, ...restCellProps } =
                        cell.getCellProps();
                      return (
                        <td
                          key={cellKey}
                          {...restCellProps}
                          style={{
                            border: "1px solid black",
                            padding: "5px",
                            backgroundColor: "#FBC59A",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
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
