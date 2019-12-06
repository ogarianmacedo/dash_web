<?php

namespace App\Services;

use App\Entities\User;
use DB;

class UsuarioService
{
    private $usuario;

    public function __construct(User $usuario)
    {
        $this->usuario = $usuario;
    }

    public function buscaUsuarios()
    {
        $usuarios = $this->usuario->with('perfil')->get();
        return $usuarios;
    }

    public function novoUsuario($dados)
    {
        DB::beginTransaction();

        if($dados['password'] == $dados["password_confirmation"]){

            $dados['st_ativo'] = true;
            $dados['password'] = bcrypt($dados['password']);
            
            $this->usuario->create($dados);

            DB::commit();
            return response()->json(['success' => 'usuario_salvo']); 
        } else {
            return response()->json(['error' => 'senhas_diferentes']); 
        }
    }
}