<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PerfilService;

class PerfilController extends Controller
{
    private $service;

    public function __construct(PerfilService $service)
    {
        $this->service = $service;
    }

    public function buscaPerfis()
    {
        $perfis = $this->service->buscaPerfis();
        return response()->json(compact('perfis'));
    }

}