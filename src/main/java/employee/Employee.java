package employee;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Data;
@Data
@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Size(min=5, message="Name must be at least 5 characters long")
	private String name;
	
	@NotNull(message="Email need not null")
	@NotBlank(message="Email dang sai dinh dang")
	private String email;
	
	@NotNull(message="Phone need not null")
	@Size(min=10,message="So dien thoai phai tren 10 chu so")
	private String phone;
	
	@NotNull(message="Addres need not null")
	private String address;
	
	@NotNull(message="Role need not null")
	private String role;
}

