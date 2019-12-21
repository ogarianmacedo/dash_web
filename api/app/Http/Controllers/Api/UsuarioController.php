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

    public function buscaUsuarios()
    {
        $usuarios = $this->service->buscaUsuarios();
        return response()->json(compact('usuarios'));
    }

    public function novoUsuario(Request $request)
    {
        $retorno = $this->service->novoUsuario($request->all());
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'error_cadastrar_usuario']); 
        }
    }

    public function upload(Request $request)
    {
        $retorno = $this->service->upload($request);
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'error_salvar_imagem']); 
        }
    }

    public function visualizarUsuario($id)
    {
        $retorno = $this->service->visualizarUsuario($id);
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'usuario_nao_encontado']); 
        }
    }

    public function alterarStatusUsuario($id)
    {
        $retorno = $this->service->alterarStatusUsuario($id);
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'error_alterar_status']); 
        }
    }

    public function editarUsuario($id, Request $request)
    {
        $retorno = $this->service->editarUsuario($id, $request->all());
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'error_editar_usuario']); 
        }
    }

}