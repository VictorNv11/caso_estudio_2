<?php

namespace App\Http\Controllers\Excel;

// Importación controllers, modelo y librería excel
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Cliente;
use Exception;


class ImportController extends Controller
{
    // Función principal
    public function index()
    {
        $clientes = cliente::all();
        return  $clientes;
    }

    // Función de importación a la base de datos
    public function importar(Request $request)
    {

        try {
            $nombreColumnas = ["id", "cc/nit", "nombre_completo", "direccion", "ciudad", "telefono", "correo_electronico"];
            $data = json_decode($request->getContent(), true);
            $dataContenido = $data['contenido'];
            if (!empty($dataContenido)) {
                foreach ($dataContenido as $contenido) {
                    $datos = array_combine($nombreColumnas, $contenido);
                    if (!empty($datos)) {
                        Cliente::insert($datos);
                    }
                }
                $resultado = "EXITOSO";
                return response()->json(['mensaje' => $resultado], 200);
            } else {
                return response()->json(['mensaje' => "no llego informacion"], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    // Función de exportación al frontend
    public function exportar()
    {

        $cliente = Cliente::all();

        Excel::create('cliente', function ($excel) use ($cliente) {
            $excel->sheet('Exportar', function ($sheet) use ($cliente) {
                $sheet->fromArray($cliente);
            });
        })->export('xls');
    }
}
