<?php

namespace App\Http\Controllers\Api;

// Importaciones del controlador, request y validaciones
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;


class CompanyController extends Controller
{
    // Función principal
    public function index()
    {
        $company = Company::all();
        return $company;
    }

    // Creación de compañías (Create)
    public function store(Request $request)
    {

        $validator=$request->validate([
            'name_company' => 'required|string',
            'address' => 'required|string',
            'nit' => 'required|unique:companies,nit',
            'phone' => 'required',
            'email' => 'required|email',
            'document' => 'nullable|mimes:pdf,doc,docx,xls,csv|max:2048', // Agrega validación para el tipo y tamaño del documento
            'status' => 'boolean',
        ]);

        try{
            $company = new Company();
            $company->name_company =$request->name_company;
            $company->address =$request->address;
            $company->nit =$request->nit;
            $company->phone =$request->phone;
            $company->email =$request->email;
            $company->status =$request->status;
            $company->fill($request->except('document'));
            $company->save();


               // Procesar el documento
        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $path = $file->store('documents'); // Guarda el archivo en la carpeta 'documents' dentro del almacenamiento de Laravel
            $company->document = $path;
        }

        return response()->json(['message' => 'Compañía creada con éxito'], 201);

        } catch(\Exception $e){
            Log::error('error al crear la compañia: ' . $e->getMessage());
            return response()->json(['error'=>'error al crear la compañia'], Response::HTTP_BAD_REQUEST);
        }
        
    }

    // Leer (Read)
    public function show(string $id)
    {
        $company = Company::find($id);
        if (!$company) {
            return response()->json(['message' => 'Compañía no encontrada'], 404);
        }
        return $company;
    }

    // Actualizar (Update)
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name_company' => 'required|string',
            'address' => 'required|string',
            'nit' => ['required', 'string', Rule::unique('companies')->ignore($id)],
            'phone' => 'required|string',
            'email' => 'required|email',
            'status' => 'boolean',
        ]);
        try{
            $company = Company::findOrFail($id);
           
            $company->fill($request->all());
            $company->save();

        return response()->json(['message' => 'Compañía actualizada con éxito'], 201);

        } catch(\Exception $e){
            Log::error('error al actualizar la compañia: ' . $e->getMessage());
            return response()->json(['error' => 'Error al actualizar la compañía', 'message' => $e->getMessage()], 400);
        }
        
    }

    // Eliminar (Delete)
    public function destroy(string $id)
    {

        $company = Company::destroy($id);


        if (!$company) {
            return response()->json(['message' => 'Compañía no encontrada'], 404);
        }

        return response()->json(['message' => 'Compañía eliminada con éxito']);
    }
}
