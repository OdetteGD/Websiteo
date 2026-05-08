const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('artFile').files[0];
    const title = document.getElementById('artTitle').value;
    
    // 1. Upload image to Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
        .from('art-folder')
        .upload(fileName, file);

    if (storageError) return alert("Upload failed");

    // 2. Save Art Details to Database
    const { data: urlData } = supabase.storage.from('art-folder').getPublicUrl(fileName);
    
    const { error: dbError } = await supabase.from('posts').insert([
        { 
            title: title, 
            image_url: urlData.publicUrl, 
            user_id: (await supabase.auth.getUser()).data.user.id 
        }
    ]);

    if (!dbError) alert("Published successfully!");
});