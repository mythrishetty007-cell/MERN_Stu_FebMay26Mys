export default function SearchShortcut(params) {
    function handleKeyDown() {
        if(event.key === "Enter"){
            alert("Search Initiated");
        }
        if(event.key === "Escape"){
            alert("Search Cleared");
        }
    }
    return(
        <section>
            <h2>Keyboard Search</h2>
            <input type="text" placeholder="Press Enter" 
            onKeyDown={handleKeyDown} />
        </section>
    );
}