async function loadProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    window.location.href = "auth.html"; // Send to login if not logged in
    return;
  }
  
  // Get profile data from the "profiles" table
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (profile) {
    document.getElementById('usernameDisplay').innerText = profile.username;
    document.getElementById('followerCount').innerText = profile.followers;
  }
}

// Function to change password
async function changePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) alert(error.message);
  else alert("Password updated!");
}