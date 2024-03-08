<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;

class CompanyController extends Controller
{
    // Función principal
    public function index()
    {
        $companies = Company::all();
        return $companies;
    }

    // Creación de compañías (Create)
    public function store(Request $request)
    {
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


        $companies->save();

        return response()->json(['message' => 'Compañía creada con éxito'], 201);
    }

    // Leer (Read)
    public function show(string $id)
    {
        $companies = Company::find($id);
        return $companies;
    }

    // Actualizar (Update)
    public function update(Request $request, string $id)
    {
        $companies = Company::findOrFail($id);
        $companies->name_company = $request->name_company;
        $companies->address = $request->address;
        $companies->nit = $request->nit;
        $companies->phone = $request->phone;
        $companies->email = $request->email;
        $companies->status = $request->has('status') ? $request->status : false;
        

        $companies->save();
        return $companies;
    }

    // Eliminar (Delete)
    public function destroy(string $id)
    {
        $companies = Company::destroy($id);
        return $companies;
    } 
}
