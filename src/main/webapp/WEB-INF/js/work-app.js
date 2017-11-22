$(function(){
	//loading books from server
	var $bookList = $('.bookList');
	var $formElem = $('form');
	var $delButtons = $('.remove');
	
	function addBook(book){
		var $newLi = $('<li>', {class: 'list-group-item list-group-item-action'});
		var $newP = $('<p>', {class: 'showDetails'}).text(book.title+"   ").attr('data-id', book.id).css('display', 'inline');
		var $newDel = $('<button>', {class: 'remove btn btn-outline-info'}).text('Delete').attr('data-id', book.id);
		var $newDiv = $('<div>', { class: book.id }).css('display', 'block');
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
				id: parseInt( $('ul.bookList').children().length ) + 1,
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
			.done(function(response){
				addBook(book);
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
		
		$editDiv = $('<div>',{class: 'edit'}).css('display', 'none').attr('data-id', book.id).attr('accept-charset','utf-8');
		$inputTitle = $('<input>').attr('type','text').attr('name','title').attr('placeholder','new title');
		$inputAuthor = $('<input>').attr('type','text').attr('name','author').attr('placeholder','new author');
		$inputPublisher = $('<input>').attr('type','text').attr('name','publisher').attr('placeholder','new publisher');
		$inputType = $('<input>').attr('type','text').attr('name','type').attr('placeholder','new type');
		$inputIsbn = $('<input>').attr('type','text').attr('name','isbn').attr('placeholder','new isbn');
		$saveBtn = $('<button>',{class: 'save btn btn-outline-info'}).text('Save').attr('data-id', book.id);		
		
		$editDiv.append($inputTitle);
		$editDiv.append('<br>');
		$editDiv.append($inputAuthor);
		$editDiv.append('<br>');
		$editDiv.append($inputPublisher);
		$editDiv.append('<br>');
		$editDiv.append($inputType);
		$editDiv.append('<br>');
		$editDiv.append($inputIsbn);
		$editDiv.append('<br>');
		$editDiv.append($saveBtn);
		
		$newUl.append($newAuthor);
		$newUl.append($newId);
		$newUl.append($newPublisher);
		$newUl.append($newType);
		$newUl.append($newIsbn);
		$newUl.append($newEdit);
		$newUl.append($editDiv);
		
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
	
			if( $div.children().length == 0 ){
				$div.append(addBookDetails(book)).hide().slideDown();
			}else{
				if($div.css('display')=='none'){
					$div.css('display', 'block').hide().slideDown();
				}else {	
					$div.css('display', 'none').show().slideUp();				
				}
			}
	
		})
		
//		$(this).data('clicked', true);
		
	})
	
	//editing book
	var $editButtons = $('button.edit');
	
	$bookList.on('click', 'button.edit', function(){
		
		if( $(this).next().css('display')=='none' ){
			$(this).next().css('display', 'block').hide().slideDown();
			$(this).text('Cancel');
		}else{
			$(this).next().css('display', 'none').show().slideUp();
			$(this).text('Edit');
		}
		
		
	})
	
	$bookList.delegate('.save','click', function(){
		
//		event.preventDefault();
		var $div = $(this).closest('div');
		
		var editedBook = {
				id: $div.attr('data-id'),
				isbn: $div.find('[name=isbn]').val(),
				title: $div.find('[name=title]').val(),
				author: $div.find('[name=author]').val(),
				publisher: $div.find('[name=publisher]').val(),
				type: $div.find('[name=type]').val()
				
		};
		
		$.ajax({
			url: '/Warsztaty5/books/edit/'+$div.attr('data-id'),
			method: 'PUT',
			data: JSON.stringify(editedBook),
			dataType: 'json',
			contentType: 'application/json'
		})
//		.done(function(book){
//			addBook(book);
		.done(function(response){
			console.log('Book edited successfully.');
			console.log( $div.closest('li').children().eq(0) );
			$div.closest('li').children().eq(0).text( $div.find('[name=title]').val() );
			$div.closest('ul').children().eq(0).text( 'Author: '+ $div.find('[name=author]').val());
			$div.closest('ul').children().eq(2).text( 'Publisher: '+ $div.find('[name=publisher]').val());
			$div.closest('ul').children().eq(3).text( 'Type: '+ $div.find('[name=type]').val());
			$div.closest('ul').children().eq(4).text( 'Isbn: '+ $div.find('[name=isbn]').val());
			$div.css('display', 'none').show().slideUp();
			$div.closest('ul').find('button.edit').text('Edit');
			
		})
		.fail(function(response){
			alert('error saving book');
			console.log(response);
		})
		
		
	})
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
	
});
