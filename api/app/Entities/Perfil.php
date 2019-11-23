<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected  $table = 'perfil';

    protected $fillable = [
        'no_perfil', 'st_ativo'
    ];
}
