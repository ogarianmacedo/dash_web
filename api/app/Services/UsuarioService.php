<?php

namespace App\Services;

use App\Entities\User;
use DB;

class UsuarioService
{
    private $usuarios;

    public function __construct(User $usuarios)
    {
        $this->usuarios = $usuarios;
    }

    public function buscaUsuarios()
    {
        $usuarios = $this->usuarios->all();
        return $usuarios;
    }

    public function novoUsuario($dados)
    {
        DB::beginTransaction();

        if($dados['password'] == $dados["password_confirmation"]){

            $dados['ativo'] = true;
            $dados['password'] = bcrypt($dados['password']);
            
            $this->usuarios->create($dados);

            DB::commit();
            return response()->json(['success' => 'usuario_salvo']); 
        } else {
            return response()->json(['error' => 'senhas_diferentes']); 
        }
    }
}