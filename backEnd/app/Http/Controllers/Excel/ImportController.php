<?php

namespace App\Http\Controllers\Excel;

// Importación controllers, modelo y librería excel
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Cliente;
use App\Exports\ClienteExport;
use Illuminate\Support\Facades\Log;
use Exception;


class ImportController extends Controller
{
    // Función principal
    public function index()
    {
        $clientes = Cliente::all();
        return  $clientes;
    }
    
    public function show(string $id)
    {
        $clientes = Cliente::find($id);
        return $clientes;
    }

    // Función de importación a la base de datos
    public function importar(Request $request)
    {

        try {
            $nombreColumnas = ["id", "cc_nit", "nombre_completo", "direccion", "ciudad", "telefono", "correo_electronico"];
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

    // Función de exportación al frontend para la tabla
    public function exportar()
    {

        $clientes = Cliente::all();

        return response()->json(['clientes' => $clientes], 200);
    }
    // Creación de usuarios (Create)
    public function store(Request $request)
    {
        $clientes = new Cliente();
        $clientes->cc_nit = $request->cc_nit;
        $clientes->nombre_completo = $request->nombre_completo;
        $clientes->direccion = $request->direccion;
        $clientes->ciudad = $request->ciudad;
        $clientes->telefono = $request->telefono;
        $clientes->correo_electronico = $request->correo_electronico;

        $clientes->save();
    }

    // Actualizar (Update)
    public function update(Request $request, string $id)
    {
        $clientes = Cliente::findOrFail($id);
        $clientes->cc_nit = $request->cc_nit;
        $clientes->nombre_completo = $request->nombre_completo;
        $clientes->direccion = $request->direccion;
        $clientes->ciudad = $request->ciudad;
        $clientes->telefono = $request->telefono;
        $clientes->correo_electronico = $request->correo_electronico;

        $clientes->save();
        return $clientes;
    }

    // Eliminar (Delete)
    public function destroy(string $id)
    {
        $clientes = Cliente::destroy($id);
        return $clientes;
    }
}
