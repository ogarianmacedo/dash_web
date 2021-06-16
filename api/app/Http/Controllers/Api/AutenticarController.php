<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

/**
 * Class AutenticarController
 * @package App\Http\Controllers\Api
 */
class AutenticarController extends Controller
{
    /**
     * @var JWTAuth
     */
    private $jwtAuth;

    /**
     * AutenticarController constructor.
     * @param JWTAuth $jwtAuth
     */
    public function __construct(JWTAuth $jwtAuth)
    {
        $this->jwtAuth = $jwtAuth;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        // pega credenciais da solicitação
        $credentials = $request->only('email', 'password');

        // verifica as credenciais e criar um token para o usuário
        if (!$token = $this->jwtAuth->attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $usuario = $this->jwtAuth->authenticate($token);
        if($usuario->st_ativo == 0){
            return response()->json(['error' => 'usuario_inativo'], 401);
        }

        // retorna o token
        return response()->json(compact('token', 'usuario'));
    }

    /**
     * @return JsonResponse
     */
    public function refresh()
    {
        $token = $this->jwtAuth->getToken();
        $token = $this->jwtAuth->refresh($token);

        return response()->json(compact('token'));
    }

    /**
     * @return JsonResponse
     */
    public function logout()
    {
        $token = $this->jwtAuth->getToken();
        $this->jwtAuth->invalidate($token);

        return response()->json(['logout']);
    }

    /**
     * @return JsonResponse
     * @throws JWTException
     */
    public function getUsuarioAutenticado()
    {
        if (!$usuario = $this->jwtAuth->parseToken()->authenticate()) {
            return response()->json(['error' => 'user_not_found'], 404);
        }

        // o token é válido e encontramos o usuário por meio da sub-reivindicação
        return response()->json(compact('usuario'));
    }
}
