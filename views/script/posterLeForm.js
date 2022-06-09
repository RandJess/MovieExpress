const form =document.getElementById('formulaire')

form.addEventListener('submit', addMovie )


function addMovie(event) {
    console.log("We're using addMovieUsingFetch()");
    event.preventDefault();

    if(fetch){
        fetch('/movies', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(checkStatus)
        .catch(function(error) {
            console.log('request failed', error)
        });
    }
    
}


function checkStatus(response){
    if(response.status >= 200 && response.status < 300){
        let newMovieDiv = document.createElement('div')
        const movieTitle = document.getElementById('titleMovies').value
        const movieYear = document.getElementById('yearMovies').value
        newMovieDiv.innerHTML = `-${movieTitle} - ${movieYear}`
        document.querySelector('#liste-Movies').appendChild(newMovieDiv)
        form.reset()
    }
}