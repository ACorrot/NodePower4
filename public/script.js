fetch(window.location.href + '.json', {
    headers: {
        'Accept': 'application/json',
    },
})
    .then(result => result.json())
    .then(data => {
        console.log(data)
    })

fetch('/ping', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        value: 42,
    })
})
    .then(result => result.json())
    .then(data => console.log(data))

document.getElementById('board').addEventListener("click", function( event ) {
    if(event.target.id != "board") {
        console.log(event.target.innerHTML = event.target.id)
    } else {
        //Ne rien faire, car on ne veut pas pouvoir intéragir avec le tableau
    }
}, true);
