<?php

namespace App\Http\Controllers\Excel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Cliente;


class ImportController extends Controller
{   

    public function index()
    {
        $clientes = cliente::all();
        return  $clientes;
    }

    public function importar(Request $request){
        if($request->hasFile('documento')){
            $path = $request->file('documento')->getRealPath();
            $datos = Excel::load($path, function($reader){})->get();

            if(!empty($datos) && $datos->count()){
                $datos = $datos->toArray();
                for($i=0; $i< count($datos); $i++){
                    $datosImportar[] = $datos[$i]; 
                }
            }

            Cliente::insert($datosImportar);

        }

        return back();
    }

    public function exportar(){

        $cliente = Cliente::all();

        Excel::create('cliente', function($excel) use ($cliente){
            $excel->sheet('Exportar', function($sheet) use ($cliente){
                $sheet->fromArray($cliente);
            });
        })->export('xls');
    }
}