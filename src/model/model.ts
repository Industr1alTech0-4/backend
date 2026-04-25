

export async function modelFetch(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(' http://0.0.0.0:8000/predict', {
        method: 'POST',
        body: formData,
    });
    
    const data = await response.json();
    return data;
}

