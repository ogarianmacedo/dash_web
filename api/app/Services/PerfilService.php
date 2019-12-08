<?php

namespace App\Services;

use App\Entities\Perfil;
use DB;

class PerfilService
{
    private $perfil;

    public function __construct(Perfil $perfil)
    {
        $this->perfil = $perfil;
    }

    public function buscaPerfis()
    {
        $perfis = $this->perfil->get();
        return $perfis;
    }

}