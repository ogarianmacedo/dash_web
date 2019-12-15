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
        try {
            DB::beginTransaction();

            $novoUsuario['name'] = $dados['nome'];
            $novoUsuario['email'] = $dados['email']; 
            $novoUsuario['id_perfil'] = $dados['perfil']; 
            $novoUsuario['st_ativo'] = $dados['status']; 
            $novoUsuario['imagem'] = $dados['imagem']; 
            $novoUsuario['password'] = bcrypt($dados['senha']);
            
            $this->usuario->create($novoUsuario);

            DB::commit();
            return response()->json(['success' => 'usuario_salvo']); 

        } catch (Exception $e){
            return $e->getMessage();
        }
    }

    public function upload($dadosArquivo)
    {
        if($dadosArquivo->hasFile('imagem')){
            $imagem = $dadosArquivo->file('imagem');

            $ext = $imagem->guessClientExtension();
            $diretorio = "img/uploads/perfil/";
            $nomeImg = $diretorio . 'imagem_perfil_' . rand(11111,99999) . '.' . $ext;
            $imagem->move($diretorio, $nomeImg);

            return $nomeImg;
        }
    }

    public function visualizarUsuario($id)
    {
        $usuario = $this->usuario->with('perfil')->findOrFail($id);
        return $usuario;
    }

    public function alterarStatususuario($id)
    {
        try {
            DB::beginTransaction();

            $usuario = $this->usuario->with('perfil')->find($id);
            if($usuario['st_ativo']){
                $novoStatus = false;
            } else {
                $novoStatus = true;
            }

            $alterarDado['st_ativo'] =  $novoStatus;
            $this->usuario->find($id)->update($alterarDado);

            DB::commit();
            return response()->json(['success' => 'status_aterado']); 

        } catch (Exception $e){
            return $e->getMessage();
        }
    }
}