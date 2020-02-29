import { Perfil } from "./perfil";

export interface Usuario {
    id: number;
    name: string;
    email: string;
    imagem: string;
    id_perfil: number;
    st_ativo: boolean;
    created_at: string;
    updated_at: string;
    perfil: Perfil;
}
