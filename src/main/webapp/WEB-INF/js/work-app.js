$(function(){
	//loading books from server
	var $bookList = $('.bookList');
	var $formElem = $('form');
	var $delButtons = $('.remove');
//	var $titleElems = $('p').addClass('showDetails');
	
	function addBook(book){
		var $newLi = $('<li>', {class: 'list-group-item list-group-item-action'});
		var $newP = $('<p>', {class: 'showDetails'}).text(book.title+"   ").attr('data-id', book.id).css('display', 'inline');
		var $newDel = $('<button>', {class: 'remove btn btn-outline-info'}).text('Delete').attr('data-id', book.id);
		var $newDiv = $('<div>', { class: book.id }).css('display', 'inline');
		$newLi.append($newP);
		$newLi.append($newDel);
		$newLi.append($newDiv);
		
		$bookList.append($newLi);
		
	}
		
	$.ajax({
		url: '/Warsztaty5/books/',
		method: 'GET'		
	})
	.done(function(books){
		$.each(books, function(i, book){
			addBook(book);
		});
	})
	.fail(function(){
		alert('error loading books');
	})
	
	//posting new books to the server
	$formElem.on('submit', function(){
		
		event.preventDefault();
		
		var book = {
				id: "0",
				isbn: $formElem.find('[name=isbn]').val(),
				title: $formElem.find('[name=title]').val(),
				author: $formElem.find('[name=author]').val(),
				publisher: $formElem.find('[name=publisher]').val(),
				type: $formElem.find('[name=type]').val()
		};
		
		if(book.isbn != "" &&
		   book.title !="" &&
		   book.author !="" &&
		   book.publisher !="" &&
		   book.type !=""){
			
			$.ajax({
				url: '/Warsztaty5/books/add',
				method: 'POST',
				data: JSON.stringify(book),
				dataType: 'json',
				contentType: 'application/json'
			})
//			.done(function(book){
//				addBook(book);
			.done(function(response){
				console.log('Book added successfully.')
			})
			.fail(function(response){
				alert('error saving book');
				console.log(response);
			})
			
		}else {
			console.log('All fields must be filled');
		}

		
	});
	
	//deleting books
	$bookList.delegate('.remove', 'click', function(){
		
		var $li = $(this).closest('li');
		
		$.ajax({
			url: '/Warsztaty5/books/remove/'+$(this).attr('data-id'),
			method: 'DELETE',
		})
		.done(function(){
			$li.fadeOut(300, function(){
				$(this).remove();
			});
		})
		
	})
	
	//loading book by Id
	var $titleElems = $('ul').find('.showDetails');
	console.log($titleElems);
	
	function addBookDetails(book){
		$newUl = $('<ul>').css('list-style-type', 'circle');
		$newAuthor = $('<li>').text('Author: '+book.author).css('font-style','italic');
		$newId = $('<li>').text('Id: '+book.id).css('font-style','italic');
		$newPublisher = $('<li>').text('Publisher: '+book.publisher).css('font-style','italic');
		$newType = $('<li>').text('Type: '+book.type).css('font-style','italic');
		$newIsbn = $('<li>').text('Isbn: '+book.isbn).css('font-style','italic');
		$newEdit = $('<button>', {class: 'edit btn btn-outline-info'}).text('Edit').attr('data-id', book.id);
		
		$editForm = $('<form>',{class: 'edit'}).css('display', 'none').attr('data-id', book.id).attr('accept-charset','utf-8');
		$inputTitle = $('<input>').attr('type','text').attr('name','title').attr('placeholder','new title');
		$inputAuthor = $('<input>').attr('type','text').attr('name','author').attr('placeholder','new author');
		$inputPublisher = $('<input>').attr('type','text').attr('name','publisher').attr('placeholder','new publisher');
		$inputType = $('<input>').attr('type','text').attr('name','type').attr('placeholder','new type');
		$inputIsbn = $('<input>').attr('type','text').attr('name','isbn').attr('placeholder','new isbn');
		$saveInput = $('<input>',{class: 'save btn btn-outline-info'}).attr('type','submit').attr('value','Save').attr('data-id', book.id);		
		
		$editForm.append($inputTitle);
		$editForm.append('<br>');
		$editForm.append($inputAuthor);
		$editForm.append('<br>');
		$editForm.append($inputPublisher);
		$editForm.append('<br>');
		$editForm.append($inputType);
		$editForm.append('<br>');
		$editForm.append($inputIsbn);
		$editForm.append('<br>');
		$editForm.append($saveInput);
		
		$newUl.append($newAuthor);
		$newUl.append($newId);
		$newUl.append($newPublisher);
		$newUl.append($newType);
		$newUl.append($newIsbn);
		$newUl.append($newEdit);
		$newUl.append($editForm);
		
		return $newUl;
	}
	
	$bookList.delegate('.showDetails','click', function(){
		
//		if($(this).data('clicked')) {
//			return;
//		}
		
		var $div = $(this).next().next(); 
		
		$.ajax({
			url: '/Warsztaty5/books/'+$(this).attr('data-id'),			
		})
		.done(function(book){
	
//				$div.append( addBookDetails(book) );
			if( $div.children().length == 0 ){
				$div.append(addBookDetails(book));
			}else{
				if($div.css('display')=='none'){
					$div.css('display', 'inline');
				}else {				
					$div.css('display', 'none');				
				}
			}
	
		})
		
//		$(this).data('clicked', true);
		
	})
	
	//editing book
	var $editButtons = $('button.edit');
	
	$bookList.on('click', 'button.edit', function(){
		
		if( $(this).next().css('display')=='none' ){
			$(this).next().css('display', 'block');
			$(this).text('Cancel');
		}else{
			$(this).next().css('display', 'none');
			$(this).text('Edit');
		}
		
		
	})
	
	var $editFormElems = $('form.edit');
	
	$bookList.delegate('submit','form.edit', function(){
		
		event.preventDefault();
		
		var editedBook = {
//				id: $(this).attr('data-id'),
				isbn: $(this).find('[name=isbn]').val(),
				title: $(this).find('[name=title]').val(),
				author: $(this).find('[name=author]').val(),
				publisher: $(this).find('[name=publisher]').val(),
				type: $(this).find('[name=type]').val(),
				_method:"PUT"
//				id: $editFormElems.find('[name=bookId]').val(),
//				isbn: $editFormElems.find('[name=isbn]').val(),
//				title: $editFormElems.find('[name=title]').val(),
//				author: $editFormElems.find('[name=author]').val(),
//				publisher: $editFormElems.find('[name=publisher]').val(),
//				type: $editFormElems.find('[name=type]').val()
				
		};
		
		$.ajax({
			url: '/Warsztaty5/books/edit/'+$(this).attr('data-id'),
			method: 'PUT',
			data: JSON.stringify(editedBook),
			dataType: 'json',
			contentType: 'application/json'
		})
//		.done(function(book){
//			addBook(book);
		.done(function(response){
			console.log(elem);
			console.log(elem.attr('data-id'));
			console.log('Book edited successfully.')
		})
		.fail(function(response){
			alert('error saving book');
			console.log(response);
		})
		
		
	})
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
	
});
