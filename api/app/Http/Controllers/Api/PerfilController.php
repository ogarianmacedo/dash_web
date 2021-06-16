<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PerfilService;

/**
 * Class PerfilController
 * @package App\Http\Controllers\Api
 */
class PerfilController extends Controller
{
    private $service;

    /**
     * PerfilController constructor.
     * @param PerfilService $service
     */
    public function __construct(PerfilService $service)
    {
        $this->service = $service;
    }

    /**
     * @return JsonResponse
     */
    public function buscaPerfis()
    {
        $perfis = $this->service->buscaPerfis();
        return response()->json(compact('perfis'));
    }
}