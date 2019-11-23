<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/**
 * Rotas de autenticação
 */
Route::post('autenticar/login', 'Api\AutenticarController@login');
Route::post('autenticar/refresh', 'Api\AutenticarController@refresh');
Route::get('autenticar/logout', 'Api\AutenticarController@logout');

Route::group(['middleware' => 'jwt.auth', 'namespace' => 'Api\\'], function(){
    /**
     * Rotas modulo perfil
     */
    Route::get('usuario/autenticado', 'AutenticarController@getUsuarioAutenticado');

    /**
     * Rotas modulo usuarios
     */
    Route::get('usuarios/busca-usuarios', 'UsuarioController@buscaUsuarios');
    //Route::post('usuarios/novo', 'UsuarioController@novoUsuario');
    
});
