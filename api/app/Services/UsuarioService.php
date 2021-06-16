<?php

namespace App\Services;

use App\Entities\User;
use DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;

/**
 * Class UsuarioService
 * @package App\Services
 */
class UsuarioService
{
    private $usuario;

    /**
     * UsuarioService constructor.
     * @param User $usuario
     */
    public function __construct(User $usuario)
    {
        $this->usuario = $usuario;
    }

    /**
     * @return User[]|Builder[]|Collection
     */
    public function buscaUsuarios()
    {
        $usuarios = $this->usuario->with('perfil')->get();
        return $usuarios;
    }

    /**
     * @param $dados
     * @return JsonResponse|string
     */
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

    /**
     * @param $dadosArquivo
     * @return string
     */
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

    /**
     * @param $id
     * @return Collection|Model|null
     */
    public function visualizarUsuario($id)
    {
        $usuario = $this->usuario->with('perfil')->findOrFail($id);
        return $usuario;
    }

    /**
     * @param $id
     * @return JsonResponse|string
     */
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

    /**
     * @param $id
     * @param $dados
     * @return JsonResponse|string
     */
    public function editarUsuario($id, $dados)
    {
       try {
            DB::beginTransaction();

            $editaUsuario['name'] = $dados['name'];
            $editaUsuario['email'] = $dados['email']; 
            $editaUsuario['id_perfil'] = $dados['perfil']; 
            $editaUsuario['st_ativo'] = $dados['status']; 

            if(!empty($dados['imagem'])){
                $editaUsuario['imagem'] = $dados['imagem']; 
            }

            if(!empty($dados['senha'])){
                $editaUsuario['password'] = bcrypt($dados['senha']);
            } else {
                unset($editaUsuario['password']);
            }
            
            $this->usuario->find($id)->update($editaUsuario);

            DB::commit();
            return response()->json(['success' => 'usuario_editado']); 

        } catch (Exception $e){
            return $e->getMessage();
        }
    }
}