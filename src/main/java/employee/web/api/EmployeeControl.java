package employee.web.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.util.Collections;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import employee.data.EmployeeRepository;
import employee.Employee;

@RestController
@RequestMapping(path = "/danhsach", produces = "application/json")
@CrossOrigin(origins = "*")
public class EmployeeControl {
	private EmployeeRepository myEmployeeRepo;

	public EmployeeControl(EmployeeRepository myEmployeeRepo) {
		this.myEmployeeRepo = myEmployeeRepo;
	}

	@GetMapping
	public Iterable<Employee> getAllEmployee() {
		return myEmployeeRepo.findAll();
	}

	@PostMapping(consumes = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Employee postEmployee(@RequestBody Employee myemployee) {
		return myEmployeeRepo.save(myemployee);
	}
	
	@PutMapping("/{id}") 
	public Map<String, String> putEmployee(@PathVariable long id, @RequestBody Employee myEmployee) { 
//		Employee myEmployee = myEmployeeRepo.findById(id).get();
		myEmployeeRepo.save(myEmployee); 
		return Collections.singletonMap("message", "Edit " + id + " succsess");
	} 
	@DeleteMapping("/{id}")
	public Map<String, String> deleteEmployee(@PathVariable long id) {
		Employee myEmployee = myEmployeeRepo.findById(id).get();
		myEmployeeRepo.delete(myEmployee); 
		return Collections.singletonMap("message", "Delete " + id + " succsess");
	}
}


