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
            'name' => 'Luigi Bros',
            'email' => 'luigi@email.com',
            'password' => bcrypt('123456'),
            'imagem' => 'assets/imagens/uploads/perfil/luigi.png',
            'perfil_id' => 1,
            'ativo' => true
        ]);
    }
}
