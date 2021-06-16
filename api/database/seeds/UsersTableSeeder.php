<?php

use Illuminate\Database\Seeder;
use App\Entities\User;

/**
 * Seeder para gerar usuário padrão
 */
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         /**
         * Gera usuário padrão
         */
        User::create([
            'name' => 'João Administrador',
            'email' => 'admin@email.com',
            'password' => bcrypt('123456'),
            'imagem' => 'img/uploads/perfil/imagem_perfil_33234.jpeg',
            'id_perfil' => 1,
            'st_ativo' => true
        ]);

        User::create([
            'name' => 'João Usuário',
            'email' => 'usuario@email.com',
            'password' => bcrypt('123456'),
            'imagem' => 'img/uploads/perfil/imagem_perfil_15964.png',
            'id_perfil' => 2,
            'st_ativo' => false
        ]);
    }
}
