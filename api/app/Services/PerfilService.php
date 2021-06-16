<?php

namespace App\Services;

use App\Entities\Perfil;
use DB;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class PerfilService
 * @package App\Services
 */
class PerfilService
{
    private $perfil;

    /**
     * PerfilService constructor.
     * @param Perfil $perfil
     */
    public function __construct(Perfil $perfil)
    {
        $this->perfil = $perfil;
    }

    /**
     * @return Perfil[]|Collection
     */
    public function buscaPerfis()
    {
        $perfis = $this->perfil->get();
        return $perfis;
    }
}