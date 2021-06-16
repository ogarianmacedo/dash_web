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
            'no_perfil' => 'ADMINISTRADOR',
            'st_ativo' => true
        ]);

        Perfil::create([
            'no_perfil' => 'USUARIO_LOJA',
            'st_ativo' => true
        ]);

        Perfil::create([
            'no_perfil' => 'USUARIO',
            'st_ativo' => true
        ]);
    }
}
