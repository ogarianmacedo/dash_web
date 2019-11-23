<?php

namespace App\Services;

use App\Entities\User;
use DB;

class UsuarioService
{
    public function novoUsuario($dados)
    {
        if($dados['password'] == $dados["password_confirmation"]){

            $dados['ativo'] = true;
            $dados['password'] = bcrypt($dados['password']);
            
            User::create($dados);
            return response()->json(['success' => 'usuario_salvo']); 
        } else {
            return response()->json(['error' => 'senhas_diferentes']); 
        }
    }
}