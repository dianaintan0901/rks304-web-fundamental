import socket
from datetime import datetime
from abc import ABC, abstractmethod


class BaseScanner(ABC):
    """Kelas abstrak dasar untuk semua jenis scanner."""

    def __init__(self, target_host: str):
        self._target_host = target_host
        self._target_ip = self._resolve_host(target_host)
        self._scan_duration = ""

    @property
    def target_host(self) -> str:
        return self._target_host

    @property
    def target_ip(self) -> str:
        return self._target_ip

    @property
    def scan_duration(self) -> str:
        return self._scan_duration

    def _resolve_host(self, target_host: str) -> str:
        """Menyelesaikan nama host menjadi alamat IP."""
        try:
            return socket.gethostbyname(target_host)
        except socket.gaierror:
            print("\n[!] Host tidak dapat diselesaikan. Periksa kembali nama/IP target.")
            raise

    @abstractmethod
    def scan(self):
        """Metode abstrak yang harus diimplementasikan oleh subclass."""
        pass


class TCPPortScanner(BaseScanner):
    """Implementasi scanner untuk protokol TCP."""

    def __init__(self, target_host: str, start_port: int, end_port: int,
                 timeout: float = 0.5):
        super().__init__(target_host)
        self._start_port = start_port
        self._end_port = end_port
        self._timeout = timeout
        self._open_ports = []

    @property
    def start_port(self) -> int:
        return self._start_port

    @property
    def end_port(self) -> int:
        return self._end_port

    @property
    def open_ports(self) -> list:
        return self._open_ports

    def scan(self):
        """Melakukan pemindaian port TCP."""
        start_time = datetime.now()
        print("." * 50)
        print(f" Memindai Target IP: {self.target_ip}")
        print(f" Rentang Port     : {self.start_port} - {self.end_port}")
        print(f" Waktu Mulai      : {start_time}")
        print("." * 50)

        self._open_ports = []

        try:
            for port in range(self.start_port, self.end_port + 1):
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.settimeout(self._timeout)
                result = s.connect_ex((self.target_ip, port))
                s.close()
                if result == 0:
                    print(f"[+] Port {port} : TERBUKA")
                    self._open_ports.append(port)
        except KeyboardInterrupt:
            print("\n[!] Pemindaian dibatalkan oleh pengguna (Ctrl+C).")

        end_time = datetime.now()
        self._scan_duration = str(end_time - start_time)

        print("." * 50)
        print(f" Pemindaian Selesai. Total port terbuka ditemukan: {len(self._open_ports)}")
        print("." * 50)
        return self._open_ports