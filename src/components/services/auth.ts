import type { DataUser } from '../../types/auth';
import { supabase } from './DatabaseConnection';

export const signUpNewUser = async (dataUser: DataUser): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
        email: dataUser.email,
        password: dataUser.pass,
    });
    if (error) {
        console.error('Error signing up:', error.message);
    } else {
        console.log('User signed up and username inserted successfully:', data);
    }
};
