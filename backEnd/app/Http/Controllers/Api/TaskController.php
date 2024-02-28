<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $task = Task::all();
        return $task;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $task = new Task();
        $task->id = $request->id;
        $task->description = $request->description;
        $task->done = $request->done;
        $task->price= $request->price;
  


        $task->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = task::find($id);
        return $task;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    public function completeServicio($id)
    {
        try {
            // Busca el servicio en la base de datos
            $task = Task::find($id);

            if (!$task) {
                return response()->json(['error' => 'Servicio no encontrado'], 404);
            }

           
        // Si el servicio ya está completo, lo marca como incompleto (done a false), 
        // de lo contrario, lo marca como completo (done a true)
        $task->done = !$task->done;

            // Guarda los cambios en la base de datos
            $task->save();

            // Respuesta exitosa
            return response()->json(['message' => 'Servicio marcado como completo']);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = task::findOrFail($request->id);
        $task->description = $request->description;
        $task->done = $request->done;
        $task->price= $request->price;
    
        $task->save();
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::destroy($id);
        return $task;
    }
}
