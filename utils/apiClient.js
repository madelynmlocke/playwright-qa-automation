export async function createAccount(request, userData) {
    return await request.post('/api/createAccount', {
        form: userData
    });
}

export async function getUserDetailByEmail(request, email) {
    return await request.get('/api/getUserDetailByEmail', {
        params: { email }
    });
}

export async function updateAccount(request, userData) {
    return await request.put('/api/updateAccount', {
            form: userData
        });
}

export async function deleteAccount(request, { email, password }) {
    return await request.delete('/api/deleteAccount', {
        form: {
            email,
            password
        }
    });
}