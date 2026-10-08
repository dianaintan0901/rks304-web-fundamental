import socket
from oop.scanner import TCPPortScanner
from oop.report import PDFReportExporter, JSONReportExporter

class MainApp:
    """Entry point aplikasi Port Scanner berbasis OOP."""

    def main(self):
        print("=== APLIKASI PORT SCANNER & EXPORTER (OOP) ===")
        target = input("Masukkan IP atau Domain target (contoh: 127.0.0.1): ").strip()

        try:
            start = int(input("Masukkan port awal (contoh: 1): "))
            end = int(input("Masukkan port akhir (contoh: 1024): "))
        except ValueError:
            print("[!] Masukkan angka port yang valid.")
            return

        # 1. Buat scanner (resolusi host + inisialisasi)
        try:
            scanner = TCPPortScanner(target, start, end, timeout=0.4)
        except socket.gaierror:
            return

        # 2. Jalankan pemindaian (polimorfisme: scan())
        open_ports = scanner.scan()

        # 3. Ekspor hasil ke PDF & JSON (polimorfisme: export())
        safe_target = target.replace('.', '_').replace(':', '_')
        pdf_filename = f"scan_report_{safe_target}.pdf"
        json_filename = f"scan_report_{safe_target}.json"

        exporters = [
            PDFReportExporter(scanner, pdf_filename),
            JSONReportExporter(scanner, json_filename)
        ]

        for exporter in exporters:
            exporter.export()


if __name__ == "__main__":
    app = MainApp()
    app.main()