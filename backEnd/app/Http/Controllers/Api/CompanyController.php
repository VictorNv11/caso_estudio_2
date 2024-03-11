<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Exception;
use App\Models\User;

// Genera los códigos aleatorios
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    // Función principal
    public function index()
    {
        try {
            $company = Company::all();
            return $company;
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
                'document' => 'nullable|file|mimes:pdf,xlsx,xls|max:2048', // Ejemplo: solo acepta archivos PDF de hasta 2MB
            ]);

            // Genera un código de aprobación genérico
            $approvalCode = Str::random(10);

            // Crea la compañía
            $company= new Company();
            $company->name_company = $request->name_company;
            $company->address = $request->address;
            $company->nit = $request->nit;
            $company->phone = $request->phone;
            $company->email = $request->email;
            $company->approval_code = $approvalCode;

             // Procesar el documento
            if ($request->hasFile('document')) {
                $file = $request->file('document');
                $path = $file->store('documents'); // Guarda el archivo en la carpeta 'documents' dentro del almacenamiento de Laravel
                $company->document = $path;
            }

            // Guarda la compañía creada
            $company->save();
            return response()->json(['message' => 'Compañía creada con éxito'], 201);

        } catch(Exception $e) {
            return response()->json(['error' => 'Hubo un error al crear la compañía: ' . $e->getMessage()], 500);
        }
             
    }

    public function approve(Request $request, string $id)
    {
        try {
            // Verifica si el usuario está autenticado y tiene el rol adecuado
            if (Auth::check()) {
                // Encuentra la compañía por su ID
                $company = Company::findOrFail($id);
            

            if (Auth::user()->roles->contains('description', 'Administrador') || Auth::user()->roles->contains('description', 'Super Administrador')) {
                // Verifica si el código de aprobación proporcionado coincide con el código de la compañía
                if ($request->approval_code !== $company->approval_code) {
                    return response()->json(['error' => 'Código de aprobación incorrecto'], 400);
                }

                // Actualiza el estado de la compañía a "Aprobada"
                $company->status = true;
                $company->approval_code = null; // Limpia el código de aprobación
                $company->save();

                return response()->json(['message' => 'Compañía aprobada con éxito'], 200);
            } else {
                return response()->json(['error' => 'No tienes permisos para aprobar compañías'], 403);
            }
       } else {
            return response()->json(['error' => 'Debes iniciar sesión para aprobar compañías'], 401);
        } 
    } catch(Exception $e) {
            return response()->json(['error' => 'Hubo un error al aprobar la compañía: ' . $e->getMessage()], 500);
        }
    }

    // Leer (Read)
    public function show(string $id)
    {
        try {
            $company = Company::find($id);
            if (!$company) {
                return response()->json(['error' => 'No se encontró la compañía'], 404);
            }
            return $company;
        } catch(Exception $e) {
            return response()->json(['error' => 'Hubo un error al recuperar la compañía: ' . $e->getMessage()], 500);
        }
    }

    // Actualizar (Update)
    public function update(Request $request, string $id)
    {
        try {
            // Busca la compañía por su Id
            $company = Company::findOrFail($id);

            // Válida los campos antes de actualizar la compañía
            $request->validate([
                'name_company' => 'sometimes|string|max:255',
                'address' => 'sometimes|string|max:255',
                'nit' => 'sometimes|string|max:255',
                'phone' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|max:255',
                'status' => 'sometimes|boolean',
                'document' => 'nullable|file|mimes:pdf,xlsx,xls|max:2048', // Ejemplo: solo acepta archivos PDF de hasta 2MB
            ]);

            // Actualizar solo los campos válidos
            $company->fill($request->all());

            // Guardar la compañía actualizada
            $company->save();

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
