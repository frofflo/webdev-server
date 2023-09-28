<script lang="ts">
    import { enhance } from "$app/forms";
  
    export let form: { username?: string , password?: string} = {};

</script>

<form method="POST" action="?/login" use:enhance>
    <label>
        Username
        <input name="username" type="login">
    </label>
    <label>
        Password
        <input name="password" type="password">
    </label>
    <button>Log in</button>

    {#if form?.password}
        <span class="errorMessage">{form.password}</span>
    {/if}
</form>

<style>
    .errorMessage{
        color: red;
    }
</style>