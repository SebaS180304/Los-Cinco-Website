export const loginUser = async (credentials) => {
    console.log('%c🔐 Intento de login', 'color: blue; font-weight: bold');

    try {
        const orderedCredentials = {
            user: credentials.user,
            password: credentials.password
        };

        // Updated to use the full URL since proxy isn't working
        const response = await fetch('http://10.22.167.201:5000/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(orderedCredentials)
        });

        if (!response.ok) {
            console.log('%c❌ Error de conexión', 'color: red; font-weight: bold');
            return {
                success: false,
                role: -1
            };
        }

        const data = await response.json();
        console.log('%c✅ Respuesta del servidor:', 'color: green; font-weight: bold', data);
        return data;
        
    } catch (error) {
        console.error('%c❌ Error:', 'color: red; font-weight: bold', error);
        return {
            success: false,
            role: -1
        };
    }
};