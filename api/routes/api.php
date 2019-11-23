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
Route::post('autenticar/login', 'Api\AutenticarController@login');
Route::post('autenticar/refresh', 'Api\AutenticarController@refresh');
Route::get('autenticar/logout', 'Api\AutenticarController@logout');

Route::group(['middleware' => 'jwt.auth', 'namespace' => 'Api\\'], function(){
    Route::get('usuario/autenticado', 'AutenticarController@getUsuarioAutenticado');

    Route::post('usuario/novo', 'UsuarioController@novoUsuario');

    Route::get('usuarios/index', 'UsuarioController@index');
});
