<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description'
    
    ];

    public function users(){
        return $this->belongsToMany('App\Models\User')->withTimesTamps();
    }

    public function usuarios(){
        return $this->belongsToMany('App\Models\Usuarios')->withTimesTamps();
    }
    public function super_admin(){
        return $this->belongsToMany('App\Models\Super_Admin')->withTimesTamps();
    }
    
}
