
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
	integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
	crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
	integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
	crossorigin="anonymous"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
	integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
	crossorigin="anonymous"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"
	integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
	crossorigin="anonymous"></script>

</head>
<body>

	<div class="jumbotron">

		<div class="row">

			<div class="col-sm-2">
				<h2>Add book form:</h2>
				<form accept-charset=utf-8>
					<input type="text" name="isbn" placeholder="isbn"
						class="alert alert-info" /><br> <input type="text"
						name="title" placeholder="title" class="alert alert-info" /><br>
					<input type="text" name="author" placeholder="author"
						class="alert alert-info" /><br> <input type="text"
						name="publisher" placeholder="publisher" class="alert alert-info" /><br>
					<input type="text" name="type" placeholder="type"
						class="alert alert-info" /><br> <input type="submit"
						value="Add" class="btn btn-outline-info" class="alert alert-info" /><br>
				</form>
			</div>


			<div class="col-sm-3">
				<h2>List of books:</h2>
				<ul class='bookList list-group'></ul>
			</div>

		</div>
	</div>

</body>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"
	integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
	crossorigin="anonymous"></script>
<!-- <script type="text/javascript" src="js/book.js"></script>  
<script type="text/javascript" src="js/app.js"></script> -->
<script type="text/javascript" src="/Warsztaty5/resources/work-app.js"></script>
</html>