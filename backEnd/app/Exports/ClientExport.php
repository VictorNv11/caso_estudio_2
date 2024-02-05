<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use App\Models\Cliente;

class ClienteExport implements FromCollection
{
    private $clientes;

    public function __construct($clientes)
    {
        $this->clientes = $clientes;
    }

    public function collection()
    {
        return $this->clientes;
    }
}
