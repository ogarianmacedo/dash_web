<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\UsuarioService;

class UsuarioController extends Controller
{
    private $service;

    public function __construct(UsuarioService $service)
    {
        $this->service = $service;
    }

    public function novoUsuario(Request $request)
    {
        $retorno = $this->service->novoUsuario($request->all());

        if($retorno) {
            return $retorno; 
        } else {
            return response()->json(['error' => 'error_salvar_usuario']); 
        }
    }

}