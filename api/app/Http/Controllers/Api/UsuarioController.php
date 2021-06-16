<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\UsuarioService;

/**
 * Class UsuarioController
 * @package App\Http\Controllers\Api
 */
class UsuarioController extends Controller
{
    private $service;

    /**
     * UsuarioController constructor.
     * @param UsuarioService $service
     */
    public function __construct(UsuarioService $service)
    {
        $this->service = $service;
    }

    /**
     * @return JsonResponse
     */
    public function buscaUsuarios()
    {
        $usuarios = $this->service->buscaUsuarios();
        return response()->json(compact('usuarios'));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function novoUsuario(Request $request)
    {
        $retorno = $this->service->novoUsuario($request->all());
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'error_cadastrar_usuario']); 
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function upload(Request $request)
    {
        $retorno = $this->service->upload($request);
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'error_salvar_imagem']); 
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function visualizarUsuario($id)
    {
        $retorno = $this->service->visualizarUsuario($id);
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'usuario_nao_encontado']); 
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function alterarStatusUsuario($id)
    {
        $retorno = $this->service->alterarStatusUsuario($id);
        if($retorno) {
            return response()->json(compact('retorno')); 
        } else {
            return response()->json(['error' => 'error_alterar_status']); 
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
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