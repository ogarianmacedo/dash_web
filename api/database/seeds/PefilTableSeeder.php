<?php

use Illuminate\Database\Seeder;
use App\Entities\Perfil;

class PefilTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Perfil::create([
            'no_perfil' => 'Administrador',
            'st_ativo' => true
        ]);

        Perfil::create([
            'no_perfil' => 'Usuário Loja',
            'st_ativo' => true
        ]);

        Perfil::create([
            'no_perfil' => 'Usuário',
            'st_ativo' => true
        ]);
       
    }
}
