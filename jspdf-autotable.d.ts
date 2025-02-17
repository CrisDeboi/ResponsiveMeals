/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "jspdf-autotable" {
    import { jsPDF } from "jspdf";
  
    interface jsPDF {
      autoTable: (options: any) => void;
    }
  
    export default function autoTable(doc: jsPDF, options: any): void;
  }
  