import os

def listar_archivos_directorios(ruta):
    for elemento in os.listdir(ruta):
        ruta_completa = os.path.join(ruta, elemento)
        if os.path.isdir(ruta_completa):
            print(f'Directorio: {ruta_completa}')
            listar_archivos_directorios(ruta_completa)
        else:
            print(f'Archivo: {ruta_completa}')

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Listar archivos y directorios de una ubicación específica.')
    parser.add_argument('ruta', metavar='RUTA', type=str, help='La ruta a listar')
    args = parser.parse_args()

    ruta = args.ruta
    if not os.path.exists(ruta):
        print("La ruta especificada no existe.")
    else:
        listar_archivos_directorios(ruta)
