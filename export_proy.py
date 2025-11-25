import os

# Carpeta raíz de tu proyecto
ROOT_DIR = os.path.abspath(".")  # Puedes cambiarlo si quieres
# Archivo de salida
OUTPUT_FILE = "proyecto_completo.txt"

# Extensiones y carpetas que vamos a ignorar
IGNORED_DIRS = {"node_modules", "venv", "__pycache__", ".git", ".next", "build"}
IGNORED_EXTS = {".pyc", ".pyo", ".log", ".db", ".sqlite", ".DS_Store"}

def is_ignored(path):
    # Ignorar carpetas
    for ignored in IGNORED_DIRS:
        if ignored in path.split(os.sep):
            return True
    # Ignorar extensiones
    _, ext = os.path.splitext(path)
    if ext in IGNORED_EXTS:
        return True
    return False

def write_file_content(file_path, output):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        output.write(f"\n--- RUTA: {file_path} ---\n")
        output.write(content)
        output.write("\n" + "="*80 + "\n")
    except Exception as e:
        print(f"No se pudo leer {file_path}: {e}")

def main():
    with open(OUTPUT_FILE, "w", encoding="utf-8") as output:
        for root, dirs, files in os.walk(ROOT_DIR):
            # Filtrar dirs ignoradas
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
            for file in files:
                file_path = os.path.join(root, file)
                if not is_ignored(file_path):
                    write_file_content(file_path, output)
    print(f"Archivo de proyecto generado: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
