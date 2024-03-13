<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('name_company');
            $table->string('address');
            $table->integer('nit')->unique();
            $table->bigInteger('phone')->unique();
            $table->string('email')->unique();
            $table->string('document')->nullable();
            $table->boolean('status')->default(false); // Cambia el valor predeterminado a false
            $table->string('approval_code')->nullable(); // Código de Aprobación
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
