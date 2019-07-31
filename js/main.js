
let makeData=(response)=>{
	console.log("connected");
	let movies = response.Search;
	console.log(movies);
 if(data.Response="True"){

 let output ='';
    $.each(movies, (index, movies) => {
       output += `
<div class="col-md-3">
<div class="well text-center">
<img src ="${movies.Poster}">
<br>
<p>${movies.Title}</p>
<a href="#" onclick = "movieSelected('${movies.imdbID}')" class="btn btn-primary">Movie Info</a>
</div>
</div>`;
});
    $('#data').html(output);
}
else
{
    $('#data').html(`
    <div class="alert alert-danger" role="alert">
      No Results Found!
    </div>`)
  }
	
};

$(document).ready(() => {
function notify() {
  let searchText = ($('#searchText').val());
  sendData(searchText);
}
$( "button" ).on( "click", notify );

});


$(document).ready(() => {

$('#searchForm').on(('submit'),(e)=>{
	e.preventDefault();
	let searchText = ($('#searchText').val());
	console.log(searchText);
    sendData(searchText);
});

});


let sendData=(searchText) => {
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'http://www.omdbapi.com/?apikey=ec3316a8&s='+searchText,
		success:(data) =>{
			console.log(data);
			makeData(data);
		}
                           
		 /*{
			console.log(data);
			let movies = data.Search;
			console.log(movies);

      let output ='';
    $.each(movies, (index, movies) => {
       output += `
<div class="col-md-3">
<div class="well text-center">
<img src ="${movies.Poster}">
<p>${movies.Title}</p>
</div>
</div>`;
      });
      $('#data').html(output);
		}*/,

		error:(searchText) => {
	   $('#error').append(`<img src="images/giphy.gif">`);
}
	});
};
function movieSelected(id){

	sessionStorage.setItem('movieid',id);
	window.location = 'movie.html';
	return false;
};
function getMovie(movieid){
	let movieId = sessionStorage.getItem('movieid');
	console.log(movieId);
	$.ajax({

		type:'GET',
		dataType:'json',
		url:'http://www.omdbapi.com/?apikey=ec3316a8&i='+movieId,
		success:(response)=>{
			console.log(response);
			let output = 
			`
			<div class="row">
			<div class="col-md-4">
			<img src="${response.Poster}" heigth="300px;">
			</div>

			<div class=col-md-8>
			<h2>${response.Title}</h2>
			<ul class = "list-group">
            <li class="list-group-item"><strong>Genre:</strong>${response.Genre}</li>
			<li class="list-group-item"><strong>Released:</strong>${response.Released}</li>
			<li class="list-group-item"><strong>Rated:</strong>${response.Rated}</li>
			<li class="list-group-item"><strong>ImdbRating:</strong>${response.imdbRating}</li>
			<li class="list-group-item"><strong>Director:</strong>${response.Director}</li>
			<li class="list-group-item"><strong>Writer:</strong>${response.Writer}</li>
			<li class="list-group-item"><strong>Actors:</strong>${response.Actors}</li>

			</ul>
			</div>
			</div>
			<div >
			<div class="well">
			<h2>Plot</h2>
			<p>${response.Plot}</p>
			<a href="http://imdb.com/title/${response.imdbID}" target = "_blank" class= "btn btn-primary">VIEW IMDB</a>
			<a href="index.html" class= "btn btn-warning">GO BACK</a>
			</div>
			</div>
			`;
			$("#movie").append(output);
		}

	})
}


