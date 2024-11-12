
import { redirect } from '@sveltejs/kit';

export const load = ({ locals, cookies }) => {
    locals.user = undefined;  
    cookies.delete('Authorization', { path: '/' }); 
    
    redirect(303, '/login')
    return {
        status: 'Logged out',
    };
};