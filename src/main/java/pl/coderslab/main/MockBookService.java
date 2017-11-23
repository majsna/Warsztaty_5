package pl.coderslab.main;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MockBookService {

	private List<Book> list;
	private DataSource dataSource;
	
	@Autowired
	public MockBookService(DataSource dataSource) {
		
		this.dataSource = dataSource;
		list = new ArrayList<>();

	}

	public List<Book> getList() {
		Connection connection;		
		try {
			connection = dataSource.getConnection();
			PreparedStatement ps = connection.prepareStatement(
					"Select * from books;");
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				boolean isBookOnList = false;
				for(Book b: list) {
					if(b.getId() == rs.getLong(1)) {
						isBookOnList = true;
					}
				}
				if(isBookOnList == false) {
					Book tmpBook = new Book(
							rs.getLong(1),
							rs.getString(6),
							rs.getString(2),
							rs.getString(3),
							rs.getString(4),
							rs.getString(5));
					list.add(tmpBook);
				}				
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public Book getBookById(long id) {
		for( Book book : this.list ) {
			if( id == book.getId()) {
				return book;
			}
		}
		Book bookDB = new Book();
		Connection connection;
		try {
			connection = dataSource.getConnection();
			PreparedStatement ps = connection.prepareStatement(
					"Select * from books where id = ? ;");
			ps.setInt(1, (int)id);

			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				bookDB.setId(id);
				bookDB.setTitle(rs.getString(2));
				bookDB.setAuthor(rs.getString(3));
				bookDB.setPublisher(rs.getString(4));
				bookDB.setType(rs.getString(5));
				bookDB.setIsbn(rs.getString(6));
			}
			connection.close();
			return bookDB;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public void addToList(Book book) {
		Connection connection;
		try {
			connection = dataSource.getConnection();
			PreparedStatement ps = connection.prepareStatement(
					"insert into books values (?,?,?,?,?,?);");
			ps.setInt(1, (int)book.getId());
			ps.setString(2, book.getTitle());
			ps.setString(3, book.getAuthor());
			ps.setString(4, book.getPublisher());
			ps.setString(5, book.getType());
			ps.setString(6, book.getIsbn());
			ps.executeUpdate();
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.list.add(book);
	}
	
	public void removeFromList(Book book) {
		Connection connection;
		try {
			connection = dataSource.getConnection();
			PreparedStatement ps = connection.prepareStatement(
					"delete from books where id = ? ;");
			ps.setInt(1, (int)book.getId());
			ps.executeUpdate();
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.list.remove(book);
	}
	
	public void updateBook(Book book) {
		Connection connection;
		try {
			connection = dataSource.getConnection();
			PreparedStatement ps = connection.prepareStatement(
					"update books set title=?, author=?, publisher=?, type=?, isbn=? where id=?; ");
			ps.setString(1, book.getTitle() );
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getPublisher());
			ps.setString(4, book.getType());
			ps.setString(5, book.getIsbn());
			ps.setInt(6, (int)book.getId());
			ps.executeUpdate();
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void setList(List<Book> list) {
		this.list = list;
	}

}
