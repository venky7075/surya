document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    alert(`Logging in...\nEmail: ${email}`);
    
    // Here you can integrate API calls for authentication
});

