<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Exception;

class CompanyController extends Controller
{
    // Función principal
    public function index()
    {
        try {
            $companies = Company::all();
            return $companies;
        } catch(Exception $e) {
            return response()->json(['error' => 'Hubo un error al obtener las compañías: ' . $e->getMessage()], 500);
        }
        
    }

    // Creación de compañías (Create)
    public function store(Request $request)
    {
        try {

            // Válida los campos antes de crear la compañía
            $request->validate([
                'name_company' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'nit' => 'required|string|max:10',
                'phone' => 'required|string|max:10',
                'email' => 'required|email|max:255',
                'status' => 'required|boolean',
                'document' => 'nullable|file|mimes:pdf|max:2048', // Ejemplo: solo acepta archivos PDF de hasta 2MB
            ]);

            $companies= new Company();
            $companies->name_company = $request->name_company;
            $companies->address = $request->address;
            $companies->nit = $request->nit;
            $companies->phone = $request->phone;
            $companies->email = $request->email;
            $companies->status = $request->status;

             // Procesar el documento
            if ($request->hasFile('document')) {
                $file = $request->file('document');
                $path = $file->store('documents'); // Guarda el archivo en la carpeta 'documents' dentro del almacenamiento de Laravel
                $companies->document = $path;
            }

            // Guarda la compañía creada
            $companies->save();
            return response()->json(['message' => 'Compañía creada con éxito'], 201);

        } catch(Exception $e) {
            return response()->json(['error' => 'Hubo un error al crear la compañía: ' . $e->getMessage()], 500);
        }
             
    }

    // Leer (Read)
    public function show(string $id)
    {
        try {
            $companies = Company::find($id);
            if (!$companies) {
                return response()->json(['error' => 'No se encontró la compañía'], 404);
            }
            return $companies;
        } catch(Exception $e) {
            return response()->json(['error' => 'Hubo un error al recuperar la compañía: ' . $e->getMessage()], 500);
        }
    }

    // Actualizar (Update)
    public function update(Request $request, string $id)
    {
        try {
            // Busca la compañía por su Id
            $companies = Company::findOrFail($id);

            // Válida los campos antes de actualizar la compañía
            $request->validate([
                'name_company' => 'sometimes|string|max:255',
                'address' => 'sometimes|string|max:255',
                'nit' => 'sometimes|string|max:255',
                'phone' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|max:255',
                'status' => 'sometimes|boolean',
                'document' => 'nullable|file|mimes:pdf|max:2048', // Ejemplo: solo acepta archivos PDF de hasta 2MB
            ]);

            // Actualizar solo los campos válidos
            $companies->fill($request->all());

            // Guardar la compañía actualizada
            $companies->save();

            return response()->json(['message' => 'Compañía actualizada con éxito'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Hubo un error al actualizar la compañía: ' . $e->getMessage()], 500);
        }
    }

    // Eliminar (Delete)
    public function destroy(string $id)
    {
        try {
            Company::destroy($id);
            return response()->json(['message' => 'Compañía eliminada con éxito'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Hubo un error al eliminar la compañía: ' . $e->getMessage()], 500);
        }
        
    } 
}
