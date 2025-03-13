export const loginUser = async (credentials) => {
    console.log('%c🔐 Intento de login', 'color: blue; font-weight: bold');

    try {
        const response = await fetch('http://tu-api-url/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            console.log('%c❌ Error de conexión', 'color: red; font-weight: bold');
            return {
                success: false,
                role: -1 // Error de conexión
            };
        }

        const data = await response.json();
        console.log('%c✅ Respuesta del servidor:', 'color: green; font-weight: bold', data);
        return data;
        
    } catch (error) {
        console.error('%c❌ Error:', 'color: red; font-weight: bold', error);
        return {
            success: false,
            role: -1 // Error general o credenciales inválidas
        };
    }
};