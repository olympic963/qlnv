package employee.data;
import org.springframework.data.repository.CrudRepository;
import employee.Employee;
public interface EmployeeRepository extends CrudRepository<Employee, Long>{
}