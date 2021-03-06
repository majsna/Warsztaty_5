package pl.coderslab.main;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/books")
public class BookController {
		
	public MockBookService mockBookService;
	
	@Autowired
	public BookController(MockBookService mockBookService) {
		this.mockBookService = mockBookService;
	}
		
	@RequestMapping("/")
	@ResponseBody
	public List<Book> getBookList(){				
		return mockBookService.getList();
	}
	
	@RequestMapping("/{id}")
	@ResponseBody
	public Book showBookDetails(@PathVariable long id) {	
		return mockBookService.getBookById(id);
	}
	
	@RequestMapping("/remove/{id}")
	@ResponseBody
	public List<Book> removeBook(@PathVariable long id){
		Book bookToRemove = mockBookService.getBookById(id);
		mockBookService.removeFromList(bookToRemove);
		return mockBookService.getList();
	}
	
	@RequestMapping(value =	"/add",	method = RequestMethod.POST)
	@ResponseBody
	public List<Book> addBook(@RequestBody String book){

		ObjectMapper mapper = new ObjectMapper();
				
		try {
			Book newBook = mapper.readValue(book, Book.class);
			mockBookService.addToList(newBook);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return mockBookService.getList();
	}
	
	@RequestMapping(value =	"/edit/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public List<Book> editBook(@RequestBody String editedBook,
							   @PathVariable long id ){

		ObjectMapper mapper = new ObjectMapper();
				
		try {
			Book newBook = mapper.readValue(editedBook, Book.class);
			
			for(Book b : mockBookService.getList()) {
				if(b.getId() == id) {
					b.setTitle(newBook.getTitle());
					b.setAuthor(newBook.getAuthor());
					b.setPublisher(newBook.getPublisher());
					b.setType(newBook.getType());
					b.setIsbn(newBook.getIsbn());
					mockBookService.updateBook(b);
				}
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}

		return mockBookService.getList();
	}
	
	
	@RequestMapping("/home")
	public String homePage() {		
		return "index";
	}
	
	
	
	

}
