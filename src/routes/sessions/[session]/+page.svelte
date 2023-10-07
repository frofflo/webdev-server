<script lang="ts">
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    export let data;
    export let form;
    let messageCount = 0
    let textChat: HTMLDivElement

    browser ? setInterval(invalidateAll, 1000) : null;

    if (browser){
        setInterval(() => {
            if (messageCount != data.messages.length) {
                messageCount = data.messages.length
                textChat.scrollTo(0, textChat.scrollHeight)
            }
        }, 1)
    }

</script>
{#if form?.msg}
    <span class="error alertTabSlide">{form.msg}</span>
{/if}
<div class="backGround">
    <div class="leftSide">
        <h1 class="heading">Välkommen:<span class="myUser">{data.username}</span>!,Till sessionen:<span style="color: white;">{data.session}</span></h1>
        <div class="textChat" style="overflow-y:scroll;" bind:this={textChat}>
            {#each data.messages as message}
            {#if message.user==data.username}
                <span class="myMessage"><span class="Message">{message.content}</span><span class="myUser">:{message.user}</span></span>
            {/if}
            {#if message.user!=data.username}
                <span class="diffText"><span class="diffUser">{message.user}:</span><span class="diffMessage">{message.content}</span></span>
            {/if}
            <br>
            {/each}
        </div>
        
        <div class="inputBackground">
            <form class="form" action="?/message" method="post" use:enhance>
                <input autofocus class="messageBar" type="text"name="message">
                <button class="inputButton">Send Message</button>
            </form>
        </div>
    </div>

    <div class="rightSide">
        <a href="/sessions" class="button">Sessions</a>
    </div>
</div>

<!-- #006774, #FE8E3D -->
<style>
    :global(body){
        overflow: hidden;
    }
    .backGround{
        display: flex;
        width: 100%;
        height: 100%;
        z-index: -5;
        background-color: #006774;
    }
    .rightSide{
        width: 50%;
        height: 100%;
        display: grid;
        align-items: center;
        place-items: center;
        justify-content: center;   
        border-left: 3px solid gray;
    }
    .leftSide{
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        border-right: 3px solid gray;
    }
    .heading{
        padding-top: 1%;
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        width: 100%;
        text-align: center;
    }
    .inputBackground{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
        height: 14%;
        background-color: #FE8E3D;
        z-index: 100;
        margin-left: 2.5%;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }
    .form{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }
    .messageBar{
        width: 75%;
        border: none;
        outline: none;
        background-color: rgb(235, 235, 235);
        color: rgb(60, 60, 60);
        padding: 9px 0 9px 9px;
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        font-size: 1.2em;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }
    .inputButton{
        width: 22%;
        border: none;
        outline: none;
        background-color: rgb(245, 245, 245);
        color: rgb(60, 60, 60);
        padding: 9px 9px 9px 9px;
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        font-size: 1.2em;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }
    a.button{
        -webkit-appearance: button;
        -moz-appearance: button;
        appearance: button;

        text-decoration: none;
        width: fit-content;
        height: fit-content;
        border: none;
        outline: none;
        background-color: rgb(245, 245, 245);
        color: rgb(60, 60, 60);
        padding: 2px 2px 2px 2px;
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        font-size: 1.2em;
        border-radius: 2.5px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }
    a.button:hover{
        background-color: rgb(201, 201, 201);
    }
    a.button:active{
        background-color: rgb(157, 157, 157);
    }
    .error{
        border: solid grey 3px;
        padding: 5px 5px 5px 10px;
        border-radius: 5px;
        width: fit-content;
        background-color: #006774;
        font-size: 2em;
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        transform: translateY(-150%);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }
    .alertTabSlide {
        transform: translate(-50%, -220%);
        animation: 2.5s alertTabSlide forwards;
    }
    @keyframes alertTabSlide {
        0% {
        transform: translate(-50%, -220%);
        }
        15% {
        transform: translate(-50%, 10%);
        }
        85% {
        transform: translate(-50%, 10%);
        }
        100% {
        transform: translate(-50%, -220%);
        }
    }
    .textChat{
        display: flex;
        flex-direction: column;
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        color: gray;
        margin-left: 2.5%;
        margin-top: 1%;
        background-color: white;
        height: 75%;
        width: 95%;
        padding: 1% 1% 1% 1%;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        word-wrap: break-word;
        position: relative;
    }
    .myMessage{
        background-color: rgb(62, 62, 62);
        text-align: right;
        border-radius: 10px;
        border-bottom-right-radius: 2px;
        align-self: flex-end;
    }
    .diffText{
        background-color: rgb(80, 80, 80);
        border-radius: 10px;
        border-bottom-left-radius: 2px;
        align-self: flex-start;
    }
    .diffText, .myMessage{
        width: fit-content;
        max-width: 50%;
        padding: 12px;
    }
    .inputButton:hover{
        background-color: rgb(235, 235, 235);
    }
    .inputButton:active{
        background-color: rgb(197, 197, 197);
    }
        /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
    .myUser{
        color: #FE8E3D;
    }
    .Message{
        color:white;
    }
    .diffUser{
        color: #33a9b8;
    }
    .diffMessage{
        color: white;
    }
</style>