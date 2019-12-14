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
     * Rotas modulo usuarios
     */
    Route::get('usuario/autenticado', 'AutenticarController@getUsuarioAutenticado');
    Route::get('usuarios/busca-usuarios', 'UsuarioController@buscaUsuarios');
    Route::post('usuarios/novo', 'UsuarioController@novoUsuario');
    Route::post('usuarios/upload', 'UsuarioController@upload');

    /**
     * Rotas modulo perfis
     */
    Route::get('perfil/busca-perfis', 'PerfilController@buscaPerfis');
    
});
