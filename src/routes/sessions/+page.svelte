<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import { invalidateAll } from '$app/navigation';
    import { browser } from '$app/environment';
    
    export let data: PageData;
    export let form;

    $: sessions = data?.sessionList;

    browser ? setInterval(invalidateAll, 1000) : null;

</script>

<div class="background">
    <h1>Sessions</h1>

    <ul>
        {#each sessions as session}
            <li><a href="/sessions/{session.name}">{session.name} - {session.messages.length}</a></li>
        {/each}
    </ul>
    
    <a href="/">Home</a>
    
    <form class="form" action="?/create" method="post" use:enhance>
        <input type="text" name="sessionName">
        <button>Create Session</button>
        {#if form?.sessionName}
            <span>{form.sessionName}</span>
        {/if}
    </form>
</div>

<style>
    .background{
        width: 100%;
        height: 100%;
        display: grid;
        align-items: center;
        place-items: center;
        justify-content: center;  
        background-color: #006774;      
    }
    h1{
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        font-size: 4em;
    }
</style>
