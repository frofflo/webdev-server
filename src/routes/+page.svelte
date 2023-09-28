<script>
    
    import { enhance } from "$app/forms";

</script>

<h1>Welcome</h1>

<form method="POST" action="/login?/logout" use:enhance>
    <label>
        <button>Log out</button> 
    </label>
</form>

<br>

<nav>
    <a href="/sessions">Sessions</a>
</nav>

