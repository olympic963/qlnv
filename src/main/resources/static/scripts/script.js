var api = "http://localhost:8081/danhsach/";
		let apiGet = api;
		let apiPost = api;
		let apiEdit = (index) => api + index;
		let apiDelete = (index) => api + index;

		function showAddEmployee() {
			document.querySelector('.container_input').classList.remove('hidden');
		}
		function hiddenAddEmployee() {
			document.querySelector('.container_input').classList.add('hidden');
		}

		function showEditRow(index) {
			showAddEmployee();
			let dsTable = document.querySelector(`#row-${index}`).querySelectorAll('td');
			document.querySelector("#ten").value = dsTable[1].innerText;
			document.querySelector("#mail").value = dsTable[2].innerText;
			document.querySelector("#sdt").value = dsTable[3].innerText;
			document.querySelector("#diachi").value = dsTable[4].innerText;
			document.querySelector("#vitri").value = dsTable[5].innerText;
			document.querySelector("#js-control_button").innerHTML = `
    <input class="submit" type="button" onclick="hiddenAddStudent()" value="Thoát">        
    <input class="submit" type="button" onclick="putRow(${index})" value="Chỉnh sửa nhân viên">`
		}

		function showAddRow() {
			showAddEmployee()
			document.querySelector("#js-control_button").innerHTML = `
    <input class="submit" type="button" onclick="hiddenAddEmployee()" value="Thoát">        
    <input class="submit" type="button" onclick="postRow()" value="Thêm nhân viên">`
		}

		function addRow(id, name, email, phone,address, role) {
			let row = document.querySelector('#table').insertRow();
			row.setAttribute("class", "row");
			row.setAttribute("id", `row-${id}`);
			row.innerHTML = ` 
    <td >${id}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${address}</td>
    <td>${role}</td>
    <td><a class="link" onclick="showEditRow(${id})">Sửa</a></td>
    <td><a class="link" onclick="deleteRow(${id})">Xóa</a></td>
    `
		}

		function getNhanVien() {
			fetch(apiGet)
				.then(response => response.json())
				.then((data) => {
					for (let employee of data) {
						addRow(employee.id, employee.name, employee.email, employee.phone, employee.address, employee.role);
					}
				})
				.catch((error) => {
					console.error(error);
				})
		}
		getNhanVien();

		function callAPI(data, method, apiSend, innerFunction) {
			fetch(apiSend, {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then((data) => {
					innerFunction(data);
				})
				.catch((error) => {
					console.error(error);
				})
		}

		function postRow() {
			let data = {
				name: document.querySelector("#ten").value,
				email: document.querySelector("#mail").value,
				phone: document.querySelector("#sdt").value,
				address: document.querySelector("#diachi").value,
				role: document.querySelector("#vitri").value
			};
			callAPI(data, "POST", apiPost, (data) => {
				addRow(data.id, data.name, data.email);
				document.querySelector("#ten").value = "";
				document.querySelector("#mail").value = "";
				document.querySelector("#sdt").value = "";
				document.querySelector("#diachi").value = "";
				document.querySelector("#vitri").value = "";
				hiddenAddStudent();
			});
		}

		function putRow(index) {
			let data = {
				id: index,
				name: document.querySelector("#ten").value,
				email: document.querySelector("#mail").value,
				phone: document.querySelector("#sdt").value,
				address: document.querySelector("#diachi").value,
				role: document.querySelector("#vitri").value
			};
			callAPI(data, "PUT", apiEdit(index), (dataResponse) => {
				let dsTable = document.querySelector(`#row-${index}`).querySelectorAll('td');
				dsTable[1].innerText = data.name;
				dsTable[2].innerText = data.email;
				dsTable[3].innerText = data.phone;
				dsTable[4].innerText = data.address;
				dsTable[5].innerText = data.role;
				document.querySelector("#ten").value = "";
				document.querySelector("#mail").value = "";
				document.querySelector("#sdt").value = "";
				document.querySelector("#diachi").value = "";
				document.querySelector("#vitri").value = "";
				hiddenAddEmployee();
			});
		}

		function deleteRow(index) {
			if (confirm(`Ban muon xoa nhan vien co id ${index}`)) {
				callAPI(null, "DELETE", apiDelete(index), (data) => {
					document.querySelector(`#row-${index}`).remove();
				});
			}
		};