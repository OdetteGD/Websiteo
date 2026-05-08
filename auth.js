const SUPABASE_URL = 'https://zylksrieycibomgmdork.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bGtzcmlleWNpYm9tZ21kb3JrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk5NTEyMiwiZXhwIjoyMDkzNTcxMTIyfQ.dpigD9jtPIiU16oIoxb-Q26obiJ4v3Q_kP3LKMw18Ow';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authBtn = document.getElementById('authBtn');
const toggleAuth = document.getElementById('toggleAuth');

let isSignUp = false;

// Toggle between Login and Signup
toggleAuth.addEventListener('click', (e) => {
  isSignUp = !isSignUp;
  authTitle.innerText = isSignUp ? "Create Account" : "Login";
  authBtn.innerText = isSignUp ? "Sign Up" : "Login";
  toggleAuth.innerText = isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up";
});

// Handle Form Submission
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (isSignUp) {
    // Sign Up Logic
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert("Signup successful! Check your email for verification.");
      // Create a profile record in the DB
      await supabase.from('profiles').insert([{ id: data.user.id, username: email.split('@')[0] }]);
    }
  } else {
    // Login Logic
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else {
      window.location.href = "index.html"; // Redirect to home
    }
  }
});